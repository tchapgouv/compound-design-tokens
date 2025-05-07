/*
Copyright 2024 New Vector Ltd.
Copyright 2023 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import type { Transform, TransformedToken } from "style-dictionary/types";

/**
 * A transformer to weight values to UIKit `Font.Weight`
 * https://developer.apple.com/documentation/swiftui/font/weight
 */

export default {
  name: "swift/typography/name",
  type: "name",
  transitive: true,
  filter: (token) => token.type === "typography",
  transform: (token: TransformedToken) => {
    /**
     * Mapping between https://docs.tokens.studio/available-tokens/typography-tokens
     */

    const fontSizeTokens: Record<string, string> = {
      Xl: "XL",
      Lg: "LG",
      Md: "MD",
      Sm: "SM",
      Xs: "XS",
    };

    // Remove 'font' prefix.
    let varName = token.name.replace(/^(font)/, "");
    // Lowercase first letter.
    varName = varName.charAt(0).toLowerCase() + varName.slice(1);
    // Replace font size token.
    for (const key in fontSizeTokens) {
      varName = varName.replace(key, fontSizeTokens[key]);
    }
    // Remove 'Regular' suffix.
    varName = varName.replace(/(Regular)$/, "");

    return varName;
  },
} satisfies Transform;
