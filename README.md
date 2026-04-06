# Stock Sale Tax Estimator

This repo now contains both:

- A native macOS SwiftUI app that bundles the calculator into a desktop window
- A lightweight browser version for WSL or quick local testing

Both versions estimate the federal and California income-tax impact of:

- Publicly traded stock sales
- RSU sales
- ESPP sales

## Double-click the Mac app

On a Mac, you can double-click:

`Stock Tax Calculator.app`

The bundle will open the calculator directly from Finder. If the app stays inside this repo, it will use the latest files from `web/`. If you move the app somewhere else on your Mac, it falls back to the bundled copy inside the app package.

## Run the native macOS app from Terminal

From Terminal on a Mac:

```bash
swift run StockTaxCalcMacApp
```

Or use:

```bash
bash start_mac.command
```

You can also open `Package.swift` in Xcode and run the `StockTaxCalcMacApp` target there.

The SwiftUI macOS app bundles the calculator files locally, so it does not need the Python server.

## Run the browser version in WSL

From the project directory in WSL:

```bash
python3 server.py
```

Then open [http://127.0.0.1:8000](http://127.0.0.1:8000).

If port `8000` is already in use:

```bash
PORT=8017 python3 server.py
```

The browser server now serves the shared files from `web/`.

## Run it on a Mac with one script

From Terminal or Finder:

```bash
bash start_mac.command
```

The script will prefer the native Swift app when `swift` is available. If not, it falls back to the browser version with the Python server.

## What it includes

- 2024 and 2025 federal income tax brackets
- 2024 and 2025 California resident income tax brackets
- Federal long-term capital gains stacking
- Federal net investment income tax estimate
- California treatment of stock gains as ordinary income
- Reasoning breakdowns for transaction math, federal tax, and California tax
- A native macOS wrapper using SwiftUI and `WKWebView`
- A double-clickable `.app` launcher for Finder on Mac

## Important limits

- Estimates income tax only, not payroll taxes, California SDI, or AMT
- Does not model wash sales, ISO exercises, or multi-transaction netting
- ESPP results are most reliable when you use the manual override if payroll or broker records already show compensation income
