/*
Copyright 2024 New Vector Ltd.
Copyright 2023 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import type { Transform, TransformedToken } from "style-dictionary/types";

export default {
  name: "swift/typography/value",
  type: "value",
  transitive: true,
  filter: (token) => token.type === "typography",
  transform: (token: TransformedToken) => {
    /**
     * Mapping between https://docs.tokens.studio/available-tokens/typography-tokens
     * and https://developer.android.com/reference/kotlin/androidx/compose/ui/text/TextStyle
     * Unsupported property:
     *  - paragraphSpacing
     */
    const textStylePropertiesMapping: Record<string, string> = {
      fontFamily: "fontFamily",
      fontWeight: "fontWeight",
      lineHeight: "lineHeight",
      fontSize: "fontSize",
      letterSpacing: "letterSpacing",
      paragraphIndent: "textIndent",
    };

    const filterKeys: string[] = ["fontFamily", "fontWeight", "fontSize"];

    let output = "";

    const filteredProps: Record<string, string> = {};

    for (const key in token.value) {
      const value = token.value[key];

      const textStyleProperty = textStylePropertiesMapping[key];

      if (textStyleProperty && filterKeys.includes(textStyleProperty)) {
        filteredProps[textStyleProperty] = value;
      }
    }

    const fontFamily = filteredProps.fontFamily;
    const fontWeight = filteredProps.fontWeight;
    const fontSize = filteredProps.fontSize;

    if (fontFamily && fontWeight && fontSize) {
      // On iOS, system font "SF Pro" is only usable through `Font.system(…)` calls.
      if (fontFamily === '"SF Pro"') {
        output = `Font.system(size: UIFontMetrics.default.scaledValue(for: CompoundDesignTokens.${fontSize}), weight: CompoundDesignTokens.${fontWeight})`;
      } else {
        output = `Font.custom(CompoundDesignTokens.${fontFamily}, size: CompoundDesignTokens.${fontSize}).weight(CompoundDesignTokens.${fontWeight})`;
      }
    }

    return output;
  },
} satisfies Transform;
