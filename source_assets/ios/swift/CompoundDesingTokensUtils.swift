import Foundation
import UIKit

public enum CompoundDesignTokensUtils {
    public static func listFonts() {
        print("[CompoundDesignTokensUtils]: List fonts")
        for family: String in UIFont.familyNames {
            print(family)
            for names: String in UIFont.fontNames(forFamilyName: family) {
                print("\t -> \(names)")
            }
        }
    }
}
