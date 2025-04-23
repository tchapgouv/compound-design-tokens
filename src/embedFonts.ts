import fs from "node:fs/promises";
import syncfs from "node:fs";
import path from "node:path";
import type { Platform } from "./@types";

export async function embedFonts(platform: Platform) {
    
    console.log('Embed fonts for platform: %s…', platform);

    var srcFolder: string
    var dstFolder: string 
    var authorizedExtensions: string[];

    switch (platform) {
    case "web":
        srcFolder = "../fonts/web";
        dstFolder = "../assets/web/fonts";
        authorizedExtensions = [".woff", ".woff2"]; // including leading '.' is mandatory.
        break;
    case "android":
        srcFolder = "../fonts/desktop";
        dstFolder = "../assets/android/res/fonts";
        authorizedExtensions = [".otf"]; // including leading '.' is mandatory.
        break;
    case "ios":
        srcFolder = "../fonts/desktop";
        dstFolder = "../assets/ios/swift/fonts";
        authorizedExtensions = [".otf"]; // including leading '.' is mandatory.
        break;
    default:
        throw `Unsupported platform: ${platform}`;
    }

    var srcUrl = new URL(srcFolder, import.meta.url);
    var dstUrl = new URL(dstFolder, import.meta.url);

    // Remove destination folder if it already exists.\
    try {
        if ((await fs.stat(dstUrl)).isDirectory()) {
            await fs.rm(dstUrl, {recursive: true});
        }
    } catch (err) {
        // No need to output error if destination folder does not exist.
        // console.log(err);
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

    console.log('✔︎ Fonts embedded for platform: %s', platform);

}