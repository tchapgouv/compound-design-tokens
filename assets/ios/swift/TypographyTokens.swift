
//
// TypographyTokens.swift
//

import SwiftUI

public struct CompoundFonts {
    public let bodyLG = Font.system(size: UIFontMetrics.default.scaledValue(for: CompoundDesignTokens.fontSizeBodyLg), weight: CompoundDesignTokens.fontWeightRegular)
    public let bodyLGMedium = Font.system(size: UIFontMetrics.default.scaledValue(for: CompoundDesignTokens.fontSizeBodyLg), weight: CompoundDesignTokens.fontWeightMedium)
    public let bodyLGSemibold = Font.system(size: UIFontMetrics.default.scaledValue(for: CompoundDesignTokens.fontSizeBodyLg), weight: CompoundDesignTokens.fontWeightSemibold)
    public let bodyMD = Font.system(size: UIFontMetrics.default.scaledValue(for: CompoundDesignTokens.fontSizeBodyMd), weight: CompoundDesignTokens.fontWeightRegular)
    public let bodyMDMedium = Font.system(size: UIFontMetrics.default.scaledValue(for: CompoundDesignTokens.fontSizeBodyMd), weight: CompoundDesignTokens.fontWeightMedium)
    public let bodyMDSemibold = Font.system(size: UIFontMetrics.default.scaledValue(for: CompoundDesignTokens.fontSizeBodyMd), weight: CompoundDesignTokens.fontWeightSemibold)
    public let bodySM = Font.system(size: UIFontMetrics.default.scaledValue(for: CompoundDesignTokens.fontSizeBodySm), weight: CompoundDesignTokens.fontWeightRegular)
    public let bodySMMedium = Font.system(size: UIFontMetrics.default.scaledValue(for: CompoundDesignTokens.fontSizeBodySm), weight: CompoundDesignTokens.fontWeightMedium)
    public let bodySMSemibold = Font.system(size: UIFontMetrics.default.scaledValue(for: CompoundDesignTokens.fontSizeBodySm), weight: CompoundDesignTokens.fontWeightSemibold)
    public let bodyXS = Font.system(size: UIFontMetrics.default.scaledValue(for: CompoundDesignTokens.fontSizeBodyXs), weight: CompoundDesignTokens.fontWeightRegular)
    public let bodyXSMedium = Font.system(size: UIFontMetrics.default.scaledValue(for: CompoundDesignTokens.fontSizeBodyXs), weight: CompoundDesignTokens.fontWeightMedium)
    public let bodyXSSemibold = Font.system(size: UIFontMetrics.default.scaledValue(for: CompoundDesignTokens.fontSizeBodyXs), weight: CompoundDesignTokens.fontWeightSemibold)
    public let headingLG = Font.custom(CompoundDesignTokens.fontFamilyTchap, size: CompoundDesignTokens.fontSizeHeadingLg).weight(CompoundDesignTokens.fontWeightRegular)
    public let headingLGBold = Font.custom(CompoundDesignTokens.fontFamilyTchap, size: CompoundDesignTokens.fontSizeHeadingLg).weight(CompoundDesignTokens.fontWeightBold)
    public let headingLGSemibold = Font.custom(CompoundDesignTokens.fontFamilyTchap, size: CompoundDesignTokens.fontSizeHeadingLg).weight(CompoundDesignTokens.fontWeightSemibold)
    public let headingMD = Font.custom(CompoundDesignTokens.fontFamilyTchap, size: CompoundDesignTokens.fontSizeHeadingMd).weight(CompoundDesignTokens.fontWeightRegular)
    public let headingMDBold = Font.custom(CompoundDesignTokens.fontFamilyTchap, size: CompoundDesignTokens.fontSizeHeadingMd).weight(CompoundDesignTokens.fontWeightBold)
    public let headingMDSemibold = Font.custom(CompoundDesignTokens.fontFamilyTchap, size: CompoundDesignTokens.fontSizeHeadingMd).weight(CompoundDesignTokens.fontWeightBold)
    public let headingSM = Font.custom(CompoundDesignTokens.fontFamilyTchap, size: CompoundDesignTokens.fontSizeHeadingSm).weight(CompoundDesignTokens.fontWeightRegular)
    public let headingSMBold = Font.custom(CompoundDesignTokens.fontFamilyTchap, size: CompoundDesignTokens.fontSizeHeadingSm).weight(CompoundDesignTokens.fontWeightBold)
    public let headingSMMedium = Font.custom(CompoundDesignTokens.fontFamilyTchap, size: CompoundDesignTokens.fontSizeHeadingSm).weight(CompoundDesignTokens.fontWeightMedium)
    public let headingSMSemibold = Font.custom(CompoundDesignTokens.fontFamilyTchap, size: CompoundDesignTokens.fontSizeHeadingSm).weight(CompoundDesignTokens.fontWeightSemibold)
    public let headingXL = Font.custom(CompoundDesignTokens.fontFamilyTchap, size: CompoundDesignTokens.fontSizeHeadingXl).weight(CompoundDesignTokens.fontWeightRegular)
    public let headingXLBold = Font.custom(CompoundDesignTokens.fontFamilyTchap, size: CompoundDesignTokens.fontSizeHeadingXl).weight(CompoundDesignTokens.fontWeightBold)
    public let headingXLSemibold = Font.custom(CompoundDesignTokens.fontFamilyTchap, size: CompoundDesignTokens.fontSizeHeadingXl).weight(CompoundDesignTokens.fontWeightSemibold)
    public init() { }
}
