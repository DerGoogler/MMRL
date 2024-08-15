const { Octokit } = require("@octokit/rest");
const fs = require("fs");
const path = require("path");
const pkg = require("./package.json");
require("dotenv").config({ path: path.resolve(__dirname, "local.properties") });

const REPO = {
  OWNER: "DerGoogler",
  NAME: "MMRL",
  TAG: `v${pkg.config.version_name}`,
  TOKEN: process.env.GITHUB_TOKEN,
};

if (!REPO.TOKEN) {
  console.error("Please set GITHUB_TOKEN, OWNER, REPO, and TAG_NAME in your local.properties file");
  process.exit(1);
}

const octokit = new Octokit({
  auth: REPO.TOKEN,
});

const uploadAPKFiles = async (releaseId, apkFiles) => {
  for (const apkFile of apkFiles) {
    const filePath = path.resolve(apkFile);
    const fileName = path.basename(filePath);
    const fileData = fs.readFileSync(filePath);
    const fileSize = fs.statSync(filePath).size;

    try {
      await octokit.repos.uploadReleaseAsset({
        owner: REPO.OWNER,
        repo: REPO.NAME,
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
      owner: REPO.OWNER,
      repo: REPO.NAME,
      tag_name: REPO.TAG,
      name: REPO.TAG,
      body: `Changelogs are readable [here](https://github.com/DerGoogler/MMRL/wiki/Changelog) or directly in the app.

Web: https://mmrl.dergoogler.com
Blog: `,
      draft: false,
      prerelease: pkg.config.prerelease,
    });

    const releaseId = release.data.id;
    console.log(`Created release with ID: ${releaseId}`);

    // Specify your APK files here
    const apkFiles = fs
      .readdirSync(path.resolve(__dirname, "app/default/release"))
      .flatMap((file) => path.resolve(__dirname, "app/default/release", file));

    await uploadAPKFiles(releaseId, apkFiles);
  } catch (error) {
    console.error("Failed to create release or upload APK files:", error);
  }
};

createReleaseAndUploadAPKFiles();
