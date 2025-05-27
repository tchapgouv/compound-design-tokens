import Foundation
import SwiftUI

// from: https://jacobzivandesign.com/technology/custom-fonts-from-swift-package/
public enum CompoundDesignTokensResources {
    fileprivate static func registerFont(fontURL: URL) {
        guard let fontDataProvider = CGDataProvider(url: fontURL as CFURL),
            let fontRef = CGFont(fontDataProvider) else {
                print("[CompoundDesignTokensResources]: Failed to load font: '\(fontURL)': 'fontDataProvider' or 'fontRef' is nil")
                return
        }
      
        var fontError: Unmanaged<CFError>?
      
        if CTFontManagerRegisterGraphicsFont(fontRef, &fontError),
             let postScriptName = fontRef.postScriptName {
                 print("[CompoundDesignTokensResources]: Successfully loaded font: '\(postScriptName)'.")
        }
        else if let fontError = fontError?.takeRetainedValue() {
            let errorDescription = CFErrorCopyDescription(fontError)
                print("[CompoundDesignTokensResources]: Failed to load font '\(fontURL)': \(String(describing: errorDescription))")
        }
    }

    public static func registerFonts() {
        print("[CompoundDesignTokensResources]: Register fonts")
        Bundle.module.urls(forResourcesWithExtension: nil, subdirectory: "fonts")?.forEach {
            registerFont(fontURL: $0)
        }
    }
    
    fileprivate static let navigationBarTitleFont = UIFont(name: "Marianne-Medium", size: 16.0)!
    fileprivate static let navigationBarLargeTitleFont = UIFont(name: "Marianne-Medium", size: 21.0)!
    
    public static func setAppearance() {
        let appearanceAttributes = UINavigationBarAppearance()
        
        appearanceAttributes.titleTextAttributes = [.font: navigationBarTitleFont]
        appearanceAttributes.largeTitleTextAttributes = [.font: navigationBarLargeTitleFont]
        
        UINavigationBar.appearance().standardAppearance = appearanceAttributes
        UINavigationBar.appearance().compactAppearance = appearanceAttributes
        UINavigationBar.appearance().scrollEdgeAppearance = appearanceAttributes
    }
}
