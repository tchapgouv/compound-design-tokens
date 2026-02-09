//
//  File.swift
//  CompoundDesignTokens
//
//  Created by Nicolas Buquet on 29/09/2025.
//

import Foundation
import SwiftUI

extension UINavigationBarAppearance {
    fileprivate static let navigationBarTitleFont = UIFont(name: "Marianne-Medium", size: 16.0)!
    fileprivate static let navigationBarLargeTitleFont = UIFont(name: "Marianne-Medium", size: 21.0)!
    
    public func withTchapFonts() -> Self {
        self.titleTextAttributes = [.font: Self.navigationBarTitleFont]
        self.largeTitleTextAttributes = [.font: Self.navigationBarLargeTitleFont]
        return self
    }
    
    // Set Tchap font globally for UINavigationBar.
    // Be carfull: it won't be used in custom header Room view.
    public static func setNavigationBarAppearance() {
        UINavigationBar.appearance().standardAppearance = UINavigationBarAppearance().withTchapFonts()
        UINavigationBar.appearance().compactAppearance = UINavigationBarAppearance().withTchapFonts()
        UINavigationBar.appearance().scrollEdgeAppearance = UINavigationBarAppearance().withTchapFonts()
    }
}

struct TchapNavigationBarTitleModifier: ViewModifier {
    func body(content: Content) -> some View {
        content
        .font(Font(UINavigationBarAppearance.navigationBarTitleFont))
    }
}

extension View {
    public func tchapNavigationBarTitleFont() -> some View {
        self.modifier(TchapNavigationBarTitleModifier())
    }
}
