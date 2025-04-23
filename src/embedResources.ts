import fs from "node:fs/promises";
import syncfs from "node:fs";
import path from "node:path";
import type { Platform } from "./@types";

export async function embedResources(platform: Platform) {
    await _embedFonts(platform);
    await _embedCode(platform);
}

async function _embedFonts(platform: Platform) {
    console.log('Embed fonts for platform: %s…', platform);

    var srcFolder: string
    var dstFolder: string 
    var authorizedExtensions: string[];

    switch (platform) {
    case "web":
        srcFolder = "../source_assets/fonts/web";
        dstFolder = "../assets/web/fonts";
        authorizedExtensions = [".woff", ".woff2"]; // including leading '.' is mandatory.
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

    console.log('✔︎ Fonts embedded for platform: %s', platform);
}

async function _embedCode(platform: Platform) {
    console.log('Embed code for platform: %s…', platform);

    var srcFolder: string
    var dstFolder: string 
    var authorizedExtensions: string[];

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

    console.log('✔︎ Code embedded for platform: %s', platform);
}

async function _copyFolder(source: string, destination: string, authorizedExtensions: string[], emptyDestination: boolean = false) {
    var srcUrl = new URL(source, import.meta.url);
    var dstUrl = new URL(destination, import.meta.url);

    if (emptyDestination) {
        // Remove destination folder if it already exists.
        try {
            if ((await fs.stat(dstUrl)).isDirectory()) {
                await fs.rm(dstUrl, {recursive: true});
            }
        } catch (err) {
            // No need to output error if destination folder does not exist.
            // console.log(err);
        }
    }

    // Copy folder if source exists. It will create the destination folder.
    if ((await fs.stat(srcUrl)).isDirectory()) {
        await fs.cp(srcUrl, dstUrl, {recursive: true, filter: (source, destination): boolean | Promise<boolean> => {
            
            if (syncfs.statSync(source).isDirectory()) {
                // Should return 'true' for a Directory, else all its content is ignored.
                return true;
            }

            return authorizedExtensions.indexOf(path.extname(source)) >= 0;
        }});
    }
}