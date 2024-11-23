# Welcome to the Nimbus Docs

The documentation site publishes to https://docs.elk.zone. We use [Docus](https://docus.dev) to generate the site and deploy through Netlify.

## Quickstart

Follow these steps to get started.

### Prerequisites

You need the following to contribute to Nimbus's documentation:

- A GitHub account. [Follow GitHub's instructions to create an account](https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github) if you don't have one already.
- Git installed on your machine. [See the git-scm documentation for installation instructions](https://git-scm.com/downloads).
- Node >20 installed on your machine.
  - Use `node -v` to see which version you have installed.
  - Use `nvm install node` to upgrade to the latest version.
  - Refer to the [nvm docs](https://github.com/nvm-sh/nvm#installing-and-updating) for information on installing `nvm`.
- pnpm installed on your machine. [See the pnpm documentation for installation instructions](https://pnpm.io/installation).
- Optionally, install [ni](https://github.com/antfu/ni#ni). See [Local Setup](../README.md#local-setup) for more information.

### Install and Preview

1. [Fork the Nimbus GitHub project](https://github.com/nimbus-town/nimbus/fork) into your own account.
2. Clone your fork to your local machine. See [GitHub's instructions for more information](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo#cloning-your-forked-repository).
3. From your terminal, `cd` to the directory you cloned into (`cd nimbus` by default).
4. Run `pnpm i` or `ni` to install the project dependencies.
5. Run `pnpm --filter nimbus-docs dev` or `nr --filter nimbus-docs dev` to run the development server.

Once the server has started up, you can access the live preview at http://localhost:3000/. This preview reloads when you save changes to the documentation.

### Contributing

When you are ready to submit work back to the main Nimbus repo, create a pull request (PR).

1. If your fork has gone out of sync with the main repository, synchronize your fork with the upstream repo on GitHub. See [GitHub's instructions for more information](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork).
2. Do your work in a branch on your fork.

      Run `git checkout -b branchNameToUse` in your terminal to create a working branch. Replace `branceNameToUse` with a meaningful branch name.
3. Do your work in your preferred editor.
4. Commit changes often and write meaningful commits.
5. Push the changes from your local machine to your fork on GitHub.
6. Go to your fork of the Nimbus project in your GitHub account.
7. Select the **Pull Request** tab.
8. Select **New Pull Request**.
9.  Confirm the repo/branches to compare.
   - The base repo should be **nimbus-town/nimbus**.
   - The base branch should be **main**.
   - The head repository should be your fork.
   - Compare branch should be your working branch you want to submit.

      If you don't see four drop-downs, be sure you are comparing across forks.
10. Add a description of the changes your request makes.
11. Select **Add Pull Request**.

Other team members will review your PR and make comments or suggestions through the PR.

You can continue making additional changes and/or apply feedback by making additional commits to the branch on your fork.

> **Important** Always work in your own fork/branch.

## Writing

Follow these guidelines when writing documentation for Nimbus.

### Tips

- Docs are in the `docs/content` folder.
- Write in standard markdown.
- Refer to the Docus [writing pages](https://docus.dev/introduction/writing-pages) guide.
- Docus provides additional [components](https://docus.dev/api/components) to extend basic markdown.

Avoid screenshots until Nimbus reaches a stable release.

### Standards

Write in **American English** using spelling as found in [Merriam-Webster](https://www.merriam-webster.com). Translation and localization is handled separately as/when availability or necessity allow.

Use [**semantic linefeeds**](https://rhodesmill.org/brandon/2012/one-sentence-per-line/) with no more than one sentence per line.

To create paragraphs, use a blank line.

There are no house style rules currently. When we add any, they will be found in this document.

#### Style Guides

Use the first guide that mentions a usable standard from the order below:

1. Refer to the U.S. Government's [Federal Plain Language Guidelines](https://www.plainlanguage.gov/guidelines/) as a base standard.
2. For user interface, device, and other technical guidance, refer to [Google's Developer Style Guide](https://developers.google.com/style).
3. As a secondary reference to the Google guide, refer to [Microsoft's Style Guide](https://docs.microsoft.com/style-guide/welcome/), then the [Chicago Manual of Style, 17th Edition](https://www.chicagomanualofstyle.org/home.html).

We use [Merriam-Webster](https://www.merriam-webster.com/) as the standard dictionary for spelling.

### Images

Place image files in the `/docs/public/images` folder. You can create subfolders to organize the images.

To add an image to a doc, use standard markdown with [alt text](https://accessibility.huit.harvard.edu/describe-content-images):

```md
[![Alt text](/docs/images/image.svg)](URL.for.hyperlink)
[![StackBlitz logo](/docs/images/stackblitz.svg)](https://stackblitz.com/)
```
