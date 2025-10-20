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
