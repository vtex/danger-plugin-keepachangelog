// Provides dev-time type structures for  `danger` - doesn't affect runtime.
import { DangerDSLType } from "../node_modules/danger/distribution/dsl/DangerDSL";
declare var danger: DangerDSLType;
export declare function message(
  message: string,
  file?: string,
  line?: number
): void;
export declare function warn(
  message: string,
  file?: string,
  line?: number
): void;
export declare function fail(
  message: string,
  file?: string,
  line?: number
): void;
export declare function markdown(
  message: string,
  file?: string,
  line?: number
): void;

import { noChangelog, noSection, missingVersion, removeVersionChange } from "./message";

interface Options {
  changeVersion?: Boolean,
}

const changelogFile = "CHANGELOG.md";
const defaultOptions: Options = {
  changeVersion: true,
}

/**
 * Makes changes to CHANGELOG consistent with keepachangelog standard
 */
export async function keepachangelog(options: Options = defaultOptions) {
  const changeVersion = options.changeVersion ?? true

  // const pr = danger.github.pr;
  const pr = danger.gitlab.mr;

  const hasChangelog = danger.git.modified_files.includes(changelogFile);
  // const isTrivial = (pr.body + pr.title).includes("#trivial");

  // if (isTrivial) {
  //   return;
  // }

  if (!hasChangelog) {
    fail(noChangelog(changeVersion), changelogFile);
    return;
  }

  // Check if a line with a version bump was added as one of the CHANGELOG.md changes
  const changelogChanges = await getAddedChangelogLines();

  const newVersionLine = findNewVersionLine(changelogChanges);
  if (!newVersionLine && changeVersion === true) {
    fail(missingVersion, changelogFile)
  }
  if (newVersionLine && changeVersion === false) {
    fail(removeVersionChange(newVersionLine), changelogFile);
  }

  const sectionLine = findSection(changelogChanges);
  if (!sectionLine) {
    fail(noSection(changeVersion), changelogFile);
  }
}

const sectionLine = /### [Added|Changed|Deprecated|Removed|Fixed|Security]/
function findSection(changelogChanges: string[]) {
  return changelogChanges.find(line => sectionLine.test(line));
}

async function getAddedChangelogLines(): Promise<string[]> {
  const result = await danger.git.diffForFile(changelogFile)
  return result!.added.split("\n").map(line => line.slice(1));
}

const newVersionLine = /## \[[0-9]/;
function findNewVersionLine(changelogChanges: string[]) {
  return changelogChanges.find(line => newVersionLine.test(line));
}
