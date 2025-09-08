import syncfs from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import type { Platform } from "./@types";

export async function embedResources(platform: Platform) {
  await _embedFonts(platform);
  await _embedCode(platform);
}

async function _embedFonts(platform: Platform) {
  console.log("Embed fonts for platform: %s…", platform);

  let srcFolder: string;
  let dstFolder: string;
  let authorizedExtensions: string[];

  switch (platform) {
    case "web":
      srcFolder = "../source_assets/fonts/web";
      dstFolder = "../assets/web/fonts";
      authorizedExtensions = [".woff", ".woff2", ".css"]; // including leading '.' is mandatory.
      await _add_font_css_to_index();
      break;
    case "android":
      srcFolder = "../source_assets/fonts/desktop";
      dstFolder = "../assets/android/res/fonts";
      authorizedExtensions = [".otf"]; // including leading '.' is mandatory.
      break;
    case "ios":
      srcFolder = "../source_assets/fonts/desktop";
      dstFolder = "../assets/ios/swift/fonts";
      authorizedExtensions = [".otf"]; // including leading '.' is mandatory.
      break;
    default:
      throw `Unsupported platform: ${platform}`;
  }

  await _copyFolder(srcFolder, dstFolder, authorizedExtensions, true);

  // Rename font files for Android
  if (platform === "android") {
    await _renameAndroidFonts(dstFolder);
  }

  console.log("✔︎ Fonts embedded for platform: %s", platform);
}

async function _renameAndroidFonts(fontsFolder: string) {
  const folderUrl = new URL(fontsFolder, import.meta.url);
  const files = await fs.readdir(folderUrl);

  for (const file of files) {
    const oldPath = path.join(folderUrl.pathname, file);
    const newName = file
      .replace(/[\s-]/g, "_")
      .replace(/([A-Z])/g, "_$1")
      .replace(/_+/g, "_")
      .replace(/^_|_$/g, "")
      .toLowerCase(); // use snake case format.
    const newPath = path.join(folderUrl.pathname, newName);

    if (oldPath !== newPath) {
      await fs.rename(oldPath, newPath);
    }
  }
}

async function _embedCode(platform: Platform) {
  console.log("Embed code for platform: %s…", platform);

  let srcFolder: string;
  let dstFolder: string;
  let authorizedExtensions: string[];

  switch (platform) {
    case "web":
      srcFolder = "../source_assets/web/js";
      dstFolder = "../assets/web/js";
      authorizedExtensions = [".ts", ".js"]; // including leading '.' is mandatory.
      break;
    case "android":
      srcFolder = "../source_assets/android/src";
      dstFolder = "../assets/android/src";
      authorizedExtensions = [".kt", ".java"]; // including leading '.' is mandatory.
      break;
    case "ios":
      srcFolder = "../source_assets/ios/swift";
      dstFolder = "../assets/ios/swift";
      authorizedExtensions = [".swift"]; // including leading '.' is mandatory.
      break;
    default:
      throw `Unsupported platform: ${platform}`;
  }

  await _copyFolder(srcFolder, dstFolder, authorizedExtensions, false);

  console.log("✔︎ Code embedded for platform: %s", platform);
}

async function _copyFolder(
  source: string,
  destination: string,
  authorizedExtensions: string[],
  emptyDestination = false,
) {
  const srcUrl = new URL(source, import.meta.url);
  const dstUrl = new URL(destination, import.meta.url);

  // Check if source directory exists
  try {
    const srcStats = await fs.stat(srcUrl);
    if (!srcStats.isDirectory()) {
      console.log(`Source path ${source} is not a directory, skipping...`);
      return;
    }
  } catch (_e) {
    console.log(`Source directory ${source} does not exist, skipping...`);
    return;
  }

  if (emptyDestination) {
    // Remove destination folder if it already exists.
    try {
      if ((await fs.stat(dstUrl)).isDirectory()) {
        await fs.rm(dstUrl, { recursive: true });
      }
    } catch (_e) {
      // No need to output error if destination folder does not exist.
      // console.log(err);
    }
  }

  // Copy folder. It will create the destination folder.
  await fs.cp(srcUrl, dstUrl, {
    recursive: true,
    filter: (source, _destination): boolean | Promise<boolean> => {
      if (syncfs.statSync(source).isDirectory()) {
        // Should return 'true' for a Directory, else all its content is ignored.
        return true;
      }

      return authorizedExtensions.indexOf(path.extname(source)) >= 0;
    },
  });
}
async function _add_font_css_to_index() {
  fs.appendFile(
    path.join("assets", "web", "css", "compound-design-tokens.css"),
    `@import url("../fonts/Marianne.css");`,
    "utf-8",
  );
}
