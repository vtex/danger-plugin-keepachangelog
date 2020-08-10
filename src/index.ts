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

  const pr = danger.github.pr;

  const hasChangelog = danger.git.modified_files.includes(changelogFile);
  const isTrivial = (pr.body + pr.title).includes("#trivial");

  if (isTrivial) {
    return;
  }

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

  // Check if each new entry is under a section
  const changelogAfterChanges = await getChangelogLinesAfterDiff();
  const hasSection = changelogChanges.map(line => {
    return findSection(line, changelogAfterChanges)
  }).reduce((previous, current) => {
    return previous && current
  }, true)

  if (!hasSection) {
    fail(noSection(changeVersion), changelogFile);
  }
}

const sectionLine = /### [Added|Changed|Deprecated|Removed|Fixed|Security]/;
function findSection(changelogChanges: string, changelog: string[]) {
  const indexInChangelog = changelog.indexOf(changelogChanges)

  for (let index = indexInChangelog; index >= 0; index--) {
    const changelogLine = changelog[index]

    if (sectionLine.test(changelogLine)) {
      return true
    }

    if (newVersionLine.test(changelogLine)) {
      return false
    }
  }
  return false
}

async function getAddedChangelogLines(): Promise<string[]> {
  const result = await danger.git.diffForFile(changelogFile)
  return result!.added.split("\n").map(line => line.slice(1));
}

async function getChangelogLinesAfterDiff(): Promise<string[]> {
  const result = await danger.git.diffForFile(changelogFile)
  return result!.after.split("\n");
}

const newVersionLine = /## \[[0-9]/;
function findNewVersionLine(changelogChanges: string[]) {
  return changelogChanges.find(line => newVersionLine.test(line));
}
