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

    interface StringIndexableObj { [key: string]: any; }

    const filterKeys = ['fontFamily', 'fontWeight', 'fontSize']

    let output = "";

    let callback = (accumulator: StringIndexableObj, item: {[key: string]: any}) => {
      const key = item[0];
      const value = item[1];

      const textStyleProperty = textStylePropertiesMapping[key];

      if (textStyleProperty && filterKeys.includes(textStyleProperty)) {
        accumulator[textStyleProperty] = value;
      }

      return accumulator;
    };

    const filteredProps = Object.entries(token.value).reduce(callback, {} as StringIndexableObj);

    const fontFamily = filteredProps.fontFamily;
    const fontWeight = filteredProps.fontWeight;
    const fontSize = filteredProps.fontSize;

    if (fontFamily && fontWeight && fontSize) {
      output = `Font.custom(CompoundDesignTokens.${fontFamily}, size: CompoundDesignTokens.${fontSize}).weight(CompoundDesignTokens.${fontWeight})`;
    }

    return output;
  } 
} satisfies Transform;