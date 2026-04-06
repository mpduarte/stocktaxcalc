import AppKit
import SwiftUI
import WebKit

struct ContentView: View {
    private let bundledIndexURL = Bundle.module.url(
        forResource: "index",
        withExtension: "html",
        subdirectory: "web"
    )

    var body: some View {
        Group {
            if let bundledIndexURL {
                CalculatorWebView(indexURL: bundledIndexURL)
            } else {
                ContentUnavailableView(
                    "Missing Calculator Files",
                    systemImage: "exclamationmark.triangle",
                    description: Text("The bundled web assets could not be loaded from the app package.")
                )
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .padding(32)
            }
        }
    }
}

struct CalculatorWebView: NSViewRepresentable {
    let indexURL: URL

    func makeCoordinator() -> Coordinator {
        Coordinator()
    }

    func makeNSView(context: Context) -> WKWebView {
        let configuration = WKWebViewConfiguration()
        configuration.defaultWebpagePreferences.allowsContentJavaScript = true

        let webView = WKWebView(frame: .zero, configuration: configuration)
        webView.navigationDelegate = context.coordinator
        webView.allowsMagnification = true
        webView.loadFileURL(indexURL, allowingReadAccessTo: indexURL.deletingLastPathComponent())
        return webView
    }

    func updateNSView(_ webView: WKWebView, context: Context) {
    }

    final class Coordinator: NSObject, WKNavigationDelegate {
        func webView(
            _ webView: WKWebView,
            decidePolicyFor navigationAction: WKNavigationAction,
            decisionHandler: @escaping (WKNavigationActionPolicy) -> Void
        ) {
            guard let url = navigationAction.request.url else {
                decisionHandler(.allow)
                return
            }

            if url.isFileURL {
                decisionHandler(.allow)
                return
            }

            NSWorkspace.shared.open(url)
            decisionHandler(.cancel)
        }
    }
}
