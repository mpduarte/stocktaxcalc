// swift-tools-version: 5.10

import PackageDescription

let package = Package(
    name: "StockTaxCalc",
    platforms: [
        .macOS(.v13)
    ],
    products: [
        .executable(name: "StockTaxCalcMacApp", targets: ["StockTaxCalcMacApp"])
    ],
    targets: [
        .executableTarget(
            name: "StockTaxCalcMacApp",
            path: ".",
            exclude: [
                ".git",
                "__pycache__",
                ".gitignore",
                "README.md",
                "server.py",
                "start_mac.command"
            ],
            sources: [
                "MacApp"
            ],
            resources: [
                .copy("web")
            ]
        )
    ]
)
