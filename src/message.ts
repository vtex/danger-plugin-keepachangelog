export const noChangelog = (versionChange) => `We follow [keepachangelog](https://keepachangelog.com/) standards.

Please, change the file \`CHANGELOG.md\` adding a small summary of your changes under the \`[Unreleased]\` section. Example:

\`\`\`diff
 ## [Unreleased]
${versionChange ? `\n+## [1.0.1] - ${(new Date).toISOString().slice(0, 10)}` : ''}
+ ### Fixed
+ - Issue with image sizing in the SKU Selector.
\`\`\`

Possible types of changes:
-  \`Added\` for new features.
-  \`Changed\` for changes in existing functionality.
-  \`Deprecated\` for soon-to-be removed features.
-  \`Removed\` for now removed features.
-  \`Fixed\` for any bug fixes.
-  \`Security\` in case of vulnerabilities.
`

export const missingVersion = `We follow [keepachangelog](https://keepachangelog.com/) standards.

Please add a line with the new version and current date in ISO format. Example:

\`\`\`diff
 ## [Unreleased]

+## [1.0.1] - ${(new Date).toISOString().slice(0, 10)}

 ### Fixed
 - Issue with image sizing in the SKU Selector.
\`\`\`
`

export const removeVersionChange = (wrongLine: string) => {
  return `Please remove the line \`${wrongLine}\` from \`CHANGELOG.md\`
  This will be automatically added once this PR is merged.`
}

export const noSection = (versionChange) => `We follow [keepachangelog](https://keepachangelog.com/) standards.

Please, add a section to your changelog entry. Example:

\`\`\`diff
 ## [Unreleased]
${versionChange ? `\n+## [1.0.1] - ${(new Date).toISOString().slice(0, 10)}` : ''}
+ ### Fixed
 - Issue with image sizing in the SKU Selector.
\`\`\`

You can use one of the following sections:
-  \`Added\` for new features.
-  \`Changed\` for changes in existing functionality.
-  \`Deprecated\` for soon-to-be removed features.
-  \`Removed\` for now removed features.
-  \`Fixed\` for any bug fixes.
-  \`Security\` in case of vulnerabilities.
`
