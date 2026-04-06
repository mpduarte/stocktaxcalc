# Stock Sale Tax Estimator

This is a lightweight browser app for estimating the federal and California income-tax impact of:

- Publicly traded stock sales
- RSU sales
- ESPP sales

## Run it in WSL

From the project directory in WSL:

```bash
python3 server.py
```

Then open [http://127.0.0.1:8000](http://127.0.0.1:8000).

If port `8000` is already in use:

```bash
PORT=8017 python3 server.py
```

## Run it on a Mac

From Terminal:

```bash
bash start_mac.command
```

Or in Finder, double-click `start_mac.command`.

The script will:

- Move into the app directory
- Pick an open localhost port
- Start the Python server
- Open the app in your default browser

## What it includes

- 2024 and 2025 federal income tax brackets
- 2024 and 2025 California resident income tax brackets
- Federal long-term capital gains stacking
- Federal net investment income tax estimate
- California treatment of stock gains as ordinary income
- Reasoning breakdowns for transaction math, federal tax, and California tax

## Important limits

- Estimates income tax only, not payroll taxes, California SDI, or AMT
- Does not model wash sales, ISO exercises, or multi-transaction netting
- ESPP results are most reliable when you use the manual override if payroll or broker records already show compensation income
