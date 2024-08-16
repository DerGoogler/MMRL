const { publish } = require("gh-pages");
const { config } = require("./package.json");
const { readFileSync, statSync, readdirSync } = require("fs");
const { resolve, basename, extname } = require("path");
require("dotenv").config({ path: resolve(__dirname, "local.properties") });
const { program } = require("commander");
const { spawn } = require("child_process");

program
  .command("website")
  .description("Publishes the app to the provided repo")
  .option("-p, --prerelease", "Publish the app as a prerelease")
  .option("-r, --remote [REMOTE]", "Use another remote", "mmrl-web")
  .option("-b, --branch [BRANCH]", "Use another branch", "master")
  .option("-o, --owner [OWNER]", "Use repo owner", "DerGoogler")
  .option("-n, --name [NAME]", "Use repo name", "mmrl-web")
  .option("-l, --blog <BLOG>", "Add a blog link to the release (Placeholder)")
  .action((opt) => {
    const __dir = ["app/src/main/assets/www"];
    publish(resolve(__dirname, ...__dir), {
      branch: opt.branch,
      repo: `https://github.com/${opt.owner}/${opt.name}.git`,
      dest: opt.prerelease ? "prerelease" : ".",
      nojekyll: true,
      cname: config.cname,
      remote: opt.remote,
      message: "CLI Auto-generated MMRL Web Update",
      user: {
        name: "github-actions[bot]",
        email: "github-actions[bot]@users.noreply.github.com",
      },
      add: true,
    });
  });

program
  .command("github")
  .description("Publishes the app to GitHub releases")
  .option("-p, --prerelease", "Publish the app as a prerelease")
  .option("-o, --owner [OWNER]", "Use repo owner", "DerGoogler")
  .option("-n, --name [NAME]", "Use repo name", "MMRL")
  .option("-l, --blog <BLOG>", "Add a blog link to the release")
  .option("-v, --verTag [VERTAG]", "Use a custom version tag", "v{tag}")
  .option("-t, --token [TOKEN]", "Use another GitHub token", process.env.GITHUB_TOKEN)
  .action(async (opt) => {
    const versionTag = opt.verTag.replace(/{tag}/gm, config.version_name);

    const { Octokit } = await import("@octokit/rest");

    const octokit = new Octokit({
      auth: opt.token,
    });

    const uploadAPKFiles = async (releaseId, apkFiles) => {
      for (const apkFile of apkFiles) {
        const filePath = resolve(apkFile);
        const fileName = basename(filePath);
        const fileData = readFileSync(filePath);
        const fileSize = statSync(filePath).size;

        try {
          await octokit.repos.uploadReleaseAsset({
            owner: opt.owner,
            repo: opt.name,
            release_id: releaseId,
            name: fileName,
            data: fileData,
            headers: {
              "content-type": "application/vnd.android.package-archive",
              "content-length": fileSize,
            },
          });
          console.log(`Uploaded ${fileName} successfully.`);
        } catch (error) {
          console.error(`Failed to upload ${fileName}:`, error);
        }
      }
    };

    const createReleaseAndUploadAPKFiles = async () => {
      try {
        // Create a new release
        const release = await octokit.repos.createRelease({
          owner: opt.owner,
          repo: opt.name,
          tag_name: versionTag,
          name: versionTag,
          body: `Changelogs are readable [here](https://github.com/DerGoogler/MMRL/wiki/Changelog) or directly in the app.\n\nWeb: https://mmrl.dergoogler.com\nBlog: ${
            opt.blog ? opt.blog : "-"
          }`,
          draft: false,
          prerelease: opt.prerelease,
        });

        const releaseId = release.data.id;
        console.log(`Created release with ID: ${releaseId}`);

        // Specify your APK files here
        const __dir = ["app/default/release"];
        const apkFiles = readdirSync(resolve(__dirname, ...__dir))
          .flatMap((file) => resolve(__dirname, ...__dir, file))
          .filter((fns) => extname(fns) === ".apk");

        await uploadAPKFiles(releaseId, apkFiles);
      } catch (error) {
        console.error("Failed to create release or upload APK files:", error);
      }
    };

    createReleaseAndUploadAPKFiles();
  });

program.parse();