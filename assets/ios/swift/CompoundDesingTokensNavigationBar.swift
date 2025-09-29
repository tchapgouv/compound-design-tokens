import Foundation
import SwiftUI

extension UINavigationBarAppearance {
  fileprivate static let navigationBarTitleFont = UIFont(name: "Marianne-Medium", size: 16.0)!
  fileprivate static let navigationBarLargeTitleFont = UIFont(name: "Marianne-Medium", size: 21.0)!

  public func withTchapFonts() -> Self {
    self.titleTextAttributes = [.font: UIFont(name: "Marianne-Medium", size: 16.0)!]
    self.largeTitleTextAttributes = [.font: UIFont(name: "Marianne-Medium", size: 21.0)!]
      return self
  }
}

