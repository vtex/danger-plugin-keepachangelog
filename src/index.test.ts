import keepachangelog from "./index";
import { noChangelog, removeVersionChange, noSection } from "./message";

declare const global: any;

describe("keepachangelog()", () => {
  beforeEach(() => {
    global.warn = jest.fn();
    global.message = jest.fn();
    global.fail = jest.fn();
    global.markdown = jest.fn();
  });

  afterEach(() => {
    global.warn = undefined;
    global.message = undefined;
    global.fail = undefined;
    global.markdown = undefined;
  });

  it("skip if trivial", () => {
    global.danger = {
      git: { modified_files: [] },
      github: {
        pr: { title: "#trivial title", body: "body" }
      }
    };

    keepachangelog();

    expect(global.fail).not.toHaveBeenCalled();
  });

  it("fail if there's no changelog changes", () => {
    global.danger = {
      git: { modified_files: [] },
      github: {
        pr: { title: "title", body: "body" }
      }
    };

    keepachangelog();

    expect(global.fail).toHaveBeenCalledWith(noChangelog(true), "CHANGELOG.md");
  });

  it("fail if there's no new version line", async () => {
    global.danger = {
      git: {
        modified_files: ["CHANGELOG.md"],
        diffForFile: jest.fn(() => {
          return Promise.resolve({
            added: "+- Translation.\n+"
          });
        })
      },
      github: {
        pr: { title: "title", body: "body" }
      }
    };

    await keepachangelog();

    expect(global.fail).toHaveBeenCalledWith(noSection(true), "CHANGELOG.md");
  });

  it("fail if there's no section", async () => {
    global.danger = {
      git: {
        modified_files: ["CHANGELOG.md"],
        diffForFile: jest.fn(() => {
          return Promise.resolve({
            added: "+## [1.0.1] - 2020-03-20\n+- Translation.\n+"
          });
        })
      },
      github: {
        pr: { title: "title", body: "body" }
      }
    };

    await keepachangelog();

    expect(global.fail).toHaveBeenCalledWith(noSection(true), "CHANGELOG.md");
  });

  it("fail if there's version change when versionLine option is false", async () => {
    global.danger = {
      git: {
        modified_files: ["CHANGELOG.md"],
        diffForFile: jest.fn(() => {
          return Promise.resolve({
            added: "+## [1.0.1] - 2020-03-20\n+### Fixed\n+- Translation.\n+"
          });
        })
      },
      github: {
        pr: { title: "title", body: "body" }
      }
    };

    await keepachangelog({ changeVersion: false });

    expect(global.fail).toHaveBeenCalledWith(
      removeVersionChange("## [1.0.1] - 2020-03-20"),
      "CHANGELOG.md"
    );
  });
});
