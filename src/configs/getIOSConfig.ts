/*
Copyright 2024 New Vector Ltd.
Copyright 2023 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import StyleDictionary from "style-dictionary";
import type {
  FormatFnArguments,
  PlatformConfig,
  TransformedToken,
} from "style-dictionary/types";
import type { Theme } from "../@types";
import iosExclude from "../filters/ios/exclude";
import { isCoreColor, isNotCoreColor } from "../filters/isCoreColor";
import createTemplate from "../utils/createTemplate";
import isTypographyToken from "../filters/isTypographyToken";

function swiftClassMembers(args: FormatFnArguments) {
  return createTemplate(
    "../formats/templates/swift/class-members.template",
    args,
  );
}

/*
 * Config that builds colorsets and creates SwiftUI Colors.
 */
export function getIOSColorConfig(theme: Theme): PlatformConfig {
  StyleDictionary.registerFormat({
    name: "swift/class-members",
    format: swiftClassMembers,
  });
  return {
    transforms: [
      "attribute/cti",
      "camelCaseDecimal",
      "attribute/color",
      "swift/token/ti",
      "swift/coreColorSet",
      "ts/resolveMath",
    ],
    options: {
      theme,
    },
    actions: ["ios/colorset"],
    buildPath: "assets/ios/swift/",
    files: [
      {
        filter: (token: TransformedToken) =>
          token.type === "color" && isCoreColor.filter(token),
        destination: "CompoundCoreColorTokens.swift",
        format: "ios-swift/class.swift",
        options: {
          showFileHeader: false,
          outputReferences: true,
          import: "SwiftUI",
          className: "CompoundCoreColorTokens",
        },
      },
      {
        filter: (token: TransformedToken) =>
          token.type === "color" && isNotCoreColor.filter(token),
        destination: "CompoundColorTokens.swift",
        format: "swift/class-members",
        options: {
          showFileHeader: false,
          outputReferences: true,
          import: ["SwiftUI"],
          objectType: "class",
          accessControl: "public",
          referenceClass: "CompoundCoreColorTokens",
          className: "CompoundColorTokens",
        },
      },
    ],
  };
}

/*
 * Config that creates UIKit Colors.
 */
export function getIOSUIColorConfig(theme: Theme): PlatformConfig {
  StyleDictionary.registerFormat({
    name: "swift/class-members",
    format: swiftClassMembers,
  });
  return {
    transforms: [
      "attribute/cti",
      "camelCaseDecimal",
      "attribute/color",
      "swift/token/ti",
      "swift/coreUIColorSet",
      "ts/resolveMath",
    ],
    options: {
      theme,
    },
    buildPath: "assets/ios/swift/",
    files: [
      {
        filter: (token: TransformedToken) =>
          token.type === "color" && isCoreColor.filter(token),
        destination: "CompoundCoreUIColorTokens.swift",
        format: "ios-swift/class.swift",
        options: {
          showFileHeader: false,
          outputReferences: true,
          import: "UIKit",
          className: "CompoundCoreUIColorTokens",
        },
      },
      {
        filter: (token: TransformedToken) =>
          token.type === "color" && isNotCoreColor.filter(token),
        destination: "CompoundUIColorTokens.swift",
        format: "swift/class-members",
        options: {
          showFileHeader: false,
          outputReferences: true,
          import: ["UIKit"],
          objectType: "class",
          accessControl: "public",
          referenceClass: "CompoundCoreUIColorTokens",
          className: "CompoundUIColorTokens",
        },
      },
    ],
  };
}

/*
 * Config that creates the remaining iOS tokens.
 */
export function getCommonIOSConfig(): PlatformConfig {
  StyleDictionary.registerFormat({
    name: "swift/class-members",
    format: swiftClassMembers,
  });
  return {
    transforms: [
      "attribute/cti",
      "camelCaseDecimal",
      "swift/literalFont",
      "swift/token/ti",
      "swift/pxToCGFloat",
      "swift/toFontWeight",
      "swift/svgToImageView",
      "ts/resolveMath",
      "swift/typography/name",
      "swift/typography/value",
    ],
    buildPath: "assets/ios/swift/",
    files: [
      {
        filter: (token: TransformedToken) => token.type === "icon",
        destination: "CompoundIcons.swift",
        format: "swift/class-members",
        options: {
          showFileHeader: false,
          outputReferences: true,
          import: ["SwiftUI"],
          objectType: "class",
          accessControl: "public",
          className: "CompoundIcons",
        },
      },
      {
        filter: (token: TransformedToken) =>
          token.type !== "color" &&
          token.type !== "icon" &&
          token.type !== "typography" &&
          iosExclude.filter(token),
        destination: "CompoundDesignTokens.swift",
        format: "ios-swift/class.swift",
        options: {
          showFileHeader: false,
          outputReferences: true,
          import: "SwiftUI",
          className: "CompoundDesignTokens",
        },
      },
      {
        filter: (token: TransformedToken) =>
          isTypographyToken.filter(token),
          destination: "TypographyTokens.swift",
          format: "swift/class-members",
          options:{
            showFileHeader: false,
            outputReferences: true,
            import: ["SwiftUI"],
            objectType: "struct",
            accessControl: "public",
            className: "CompoundFonts",
        },
      },
    ],
  };
}
