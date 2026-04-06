(function () {
  "use strict";

  var CFG = {
    2024: {
      f: {
        single: [[11600, 0.10], [47150, 0.12], [100525, 0.22], [191950, 0.24], [243725, 0.32], [609350, 0.35], [Infinity, 0.37]],
        marriedJoint: [[23200, 0.10], [94300, 0.12], [201050, 0.22], [383900, 0.24], [487450, 0.32], [731200, 0.35], [Infinity, 0.37]],
        marriedSeparate: [[11600, 0.10], [47150, 0.12], [100525, 0.22], [191950, 0.24], [243725, 0.32], [365600, 0.35], [Infinity, 0.37]],
        headOfHousehold: [[16550, 0.10], [63100, 0.12], [100500, 0.22], [191950, 0.24], [243700, 0.32], [609350, 0.35], [Infinity, 0.37]],
        qualifyingSurviving: [[23200, 0.10], [94300, 0.12], [201050, 0.22], [383900, 0.24], [487450, 0.32], [731200, 0.35], [Infinity, 0.37]]
      },
      l: {
        single: [47025, 518900],
        marriedJoint: [94050, 583750],
        marriedSeparate: [47025, 291850],
        headOfHousehold: [63000, 551350],
        qualifyingSurviving: [94050, 583750]
      },
      c: {
        single: [[10756, 0.01], [25499, 0.02], [40245, 0.04], [55866, 0.06], [70606, 0.08], [360659, 0.093], [432787, 0.103], [721314, 0.113], [Infinity, 0.123]],
        marriedJoint: [[21512, 0.01], [50998, 0.02], [80490, 0.04], [111732, 0.06], [141212, 0.08], [721318, 0.093], [865574, 0.103], [1442628, 0.113], [Infinity, 0.123]],
        marriedSeparate: [[10756, 0.01], [25499, 0.02], [40245, 0.04], [55866, 0.06], [70606, 0.08], [360659, 0.093], [432787, 0.103], [721314, 0.113], [Infinity, 0.123]],
        headOfHousehold: [[21527, 0.01], [51000, 0.02], [65744, 0.04], [81364, 0.06], [96107, 0.08], [490493, 0.093], [588593, 0.103], [980987, 0.113], [Infinity, 0.123]],
        qualifyingSurviving: [[21512, 0.01], [50998, 0.02], [80490, 0.04], [111732, 0.06], [141212, 0.08], [721318, 0.093], [865574, 0.103], [1442628, 0.113], [Infinity, 0.123]]
      }
    },
    2025: {
      f: {
        single: [[11925, 0.10], [48475, 0.12], [103350, 0.22], [197300, 0.24], [250525, 0.32], [626350, 0.35], [Infinity, 0.37]],
        marriedJoint: [[23850, 0.10], [96950, 0.12], [206700, 0.22], [394600, 0.24], [501050, 0.32], [751600, 0.35], [Infinity, 0.37]],
        marriedSeparate: [[11925, 0.10], [48475, 0.12], [103350, 0.22], [197300, 0.24], [250525, 0.32], [375800, 0.35], [Infinity, 0.37]],
        headOfHousehold: [[17000, 0.10], [64850, 0.12], [103350, 0.22], [197300, 0.24], [250500, 0.32], [626350, 0.35], [Infinity, 0.37]],
        qualifyingSurviving: [[23850, 0.10], [96950, 0.12], [206700, 0.22], [394600, 0.24], [501050, 0.32], [751600, 0.35], [Infinity, 0.37]]
      },
      l: {
        single: [48350, 533400],
        marriedJoint: [96700, 600050],
        marriedSeparate: [48350, 300000],
        headOfHousehold: [64750, 566700],
        qualifyingSurviving: [96700, 600050]
      },
      c: {
        single: [[11079, 0.01], [26264, 0.02], [41452, 0.04], [57542, 0.06], [72724, 0.08], [371479, 0.093], [445771, 0.103], [742953, 0.113], [Infinity, 0.123]],
        marriedJoint: [[22158, 0.01], [52528, 0.02], [82904, 0.04], [115084, 0.06], [145448, 0.08], [742958, 0.093], [891542, 0.103], [1485906, 0.113], [Infinity, 0.123]],
        marriedSeparate: [[11079, 0.01], [26264, 0.02], [41452, 0.04], [57542, 0.06], [72724, 0.08], [371479, 0.093], [445771, 0.103], [742953, 0.113], [Infinity, 0.123]],
        headOfHousehold: [[22173, 0.01], [52530, 0.02], [67716, 0.04], [83805, 0.06], [98990, 0.08], [505208, 0.093], [606251, 0.103], [1010417, 0.113], [Infinity, 0.123]],
        qualifyingSurviving: [[22158, 0.01], [52528, 0.02], [82904, 0.04], [115084, 0.06], [145448, 0.08], [742958, 0.093], [891542, 0.103], [1485906, 0.113], [Infinity, 0.123]]
      }
    }
  };

  var NIIT = { single: 200000, marriedJoint: 250000, marriedSeparate: 125000, headOfHousehold: 200000, qualifyingSurviving: 250000 };
  var form = document.getElementById("calculator-form");
  var saleType = document.getElementById("saleType");
  var scenario = document.getElementById("scenario-fields");
  var empty = document.getElementById("empty-state");
  var results = document.getElementById("results");

  function h(v) { return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function money(v) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(v || 0); }
  function n(name) { var e = form.elements[name]; if (!e || e.value === "") { return null; } var v = Number(e.value); return Number.isFinite(v) ? v : null; }
  function s(name) { var e = form.elements[name]; return e ? String(e.value || "").trim() : ""; }
  function d(v) { if (!v) { return null; } var p = v.split("-"); if (p.length !== 3) { return null; } var x = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]), 12, 0, 0, 0); return Number.isNaN(x.getTime()) ? null : x; }
  function addYears(date, years) { var x = new Date(date.getTime()); x.setFullYear(x.getFullYear() + years); return x; }
  function longTerm(acquired, sold) { return sold.getTime() > addYears(acquired, 1).getTime(); }
  function lossLimit(status) { return status === "marriedSeparate" ? 1500 : 3000; }

  function progTax(income, brackets) {
    if (income <= 0) { return 0; }
    var tax = 0, prev = 0, i;
    for (i = 0; i < brackets.length; i += 1) {
      var upper = brackets[i][0], rate = brackets[i][1], here = Math.min(income, upper) - prev;
      if (here > 0) { tax += here * rate; }
      if (income <= upper) { break; }
      prev = upper;
    }
    return tax;
  }

  function ltTax(ordinary, gain, thresholds) {
    if (gain <= 0) { return { tax: 0, z: 0, f: 0, t: 0 }; }
    var zSpace = Math.max(0, thresholds[0] - ordinary);
    var z = Math.min(gain, zSpace);
    var remain = gain - z;
    var fSpace = Math.max(0, thresholds[1] - ordinary - z);
    var f = Math.min(remain, fSpace);
    var t = Math.max(0, remain - f);
    return { tax: (f * 0.15) + (t * 0.20), z: z, f: f, t: t };
  }

  function niit(magi, nii, status) {
    return 0.038 * Math.min(Math.max(0, nii), Math.max(0, magi - NIIT[status]));
  }

  function caTax(income, year, status) {
    var taxable = Math.max(0, income);
    var base = progTax(taxable, CFG[year].c[status]);
    var surtax = taxable > 1000000 ? (taxable - 1000000) * 0.01 : 0;
    return { taxable: taxable, base: base, surtax: surtax, total: base + surtax };
  }

  function renderScenario() {
    var type = saleType.value;
    var html = ['<div class="field-grid">'];
    function input(id, label, typeAttr, value, step) {
      html.push('<label class="field"><span>' + h(label) + '</span><input id="' + id + '" name="' + id + '" type="' + typeAttr + '"' +
        (step ? ' step="' + step + '"' : '') + (value !== "" ? ' value="' + value + '"' : '') + (typeAttr === "number" ? ' min="0"' : '') + '></label>');
    }
    if (type === "publicStock") {
      input("saleDate", "Sale date", "date", "", "");
      input("acquisitionDate", "Acquisition date", "date", "", "");
      input("shares", "Shares sold", "number", "1", "0.000001");
      input("salePrice", "Sale price per share", "number", "0", "0.01");
      input("costBasis", "Cost basis per share", "number", "0", "0.01");
      input("buyFees", "Purchase fees or commissions", "number", "0", "0.01");
      input("sellFees", "Sale fees or commissions", "number", "0", "0.01");
    } else if (type === "rsu") {
      input("saleDate", "Sale date", "date", "", "");
      input("vestDate", "Vest date", "date", "", "");
      input("shares", "Shares sold", "number", "1", "0.000001");
      input("salePrice", "Sale price per share", "number", "0", "0.01");
      input("vestFmv", "FMV per share at vest", "number", "0", "0.01");
      input("sellFees", "Sale fees or commissions", "number", "0", "0.01");
    } else {
      input("saleDate", "Sale date", "date", "", "");
      input("purchaseDate", "Purchase date", "date", "", "");
      input("grantDate", "Grant date", "date", "", "");
      input("shares", "Shares sold", "number", "1", "0.000001");
      input("salePrice", "Sale price per share", "number", "0", "0.01");
      input("grantFmv", "FMV per share on grant date", "number", "0", "0.01");
      input("purchaseFmv", "FMV per share on purchase date", "number", "0", "0.01");
      html.push('<label class="field"><span>Purchase pricing method</span><select id="pricingMode" name="pricingMode">' +
        '<option value="lowerOf">Lower of grant/purchase FMV with discount</option>' +
        '<option value="grantOnly">Grant-date FMV with discount</option>' +
        '<option value="purchaseOnly">Purchase-date FMV with discount</option>' +
        '<option value="manual">Manual purchase price and manual compensation override</option>' +
        '</select><small>Use manual mode if your broker or payroll statement already gives you the compensation amount.</small></label>');
      input("discountRate", "Plan discount (%)", "number", "15", "0.01");
      input("purchasePrice", "Actual purchase price per share", "number", "0", "0.01");
      input("ordinaryIncomeOverride", "Manual ordinary income override", "number", "", "0.01");
      input("sellFees", "Sale fees or commissions", "number", "0", "0.01");
    }
    html.push("</div>");
    scenario.innerHTML = html.join("");
  }

  function profile() {
    var e = [];
    var p = {
      year: Number(s("taxYear")),
      status: s("filingStatus"),
      fedOrd: n("federalOrdinaryIncome"),
      caOrd: n("caOrdinaryIncome"),
      magi: n("baselineMagi"),
      otherNii: n("otherNii") || 0,
      fedPaid: n("federalPrepaid") || 0,
      caPaid: n("caPrepaid") || 0
    };
    if (!CFG[p.year]) { e.push("Pick a supported tax year."); }
    if (p.fedOrd === null || p.fedOrd < 0) { e.push("Enter federal taxable ordinary income before the sale."); }
    if (p.caOrd === null || p.caOrd < 0) { e.push("Enter California taxable ordinary income before the sale."); }
    if (p.magi === null || p.magi < 0) { e.push("Enter modified AGI before the sale."); }
    return { errors: e, data: p };
  }

  function buildScenario() {
    var year = Number(s("taxYear")), type = s("saleType"), shares = n("shares"), salePrice = n("salePrice");
    var sellFees = n("sellFees") || 0, saleDate = d(s("saleDate")), e = [];
    if (!saleDate) { e.push("Enter a valid sale date."); }
    else if (saleDate.getFullYear() !== year) { e.push("The sale date needs to fall inside the selected tax year."); }
    if (!shares || shares <= 0) { e.push("Enter the number of shares sold."); }
    if (salePrice === null || salePrice < 0) { e.push("Enter a valid sale price per share."); }
    if (type === "publicStock") { return stock(year, saleDate, shares, salePrice, sellFees, e); }
    if (type === "rsu") { return rsu(year, saleDate, shares, salePrice, sellFees, e); }
    return espp(year, saleDate, shares, salePrice, sellFees, e);
  }

  function stock(year, saleDate, shares, salePrice, sellFees, e) {
    var acq = d(s("acquisitionDate")), basisPer = n("costBasis"), buyFees = n("buyFees") || 0;
    if (!acq) { e.push("Enter the acquisition date."); }
    if (basisPer === null || basisPer < 0) { e.push("Enter a valid cost basis per share."); }
    if (acq && saleDate && acq.getTime() > saleDate.getTime()) { e.push("The acquisition date cannot be after the sale date."); }
    if (e.length) { return { errors: e }; }
    var proceeds = (shares * salePrice) - sellFees, basis = (shares * basisPer) + buyFees, cap = proceeds - basis, isLt = longTerm(acq, saleDate);
    return {
      errors: [],
      label: "Public stock sale",
      ordinary: 0,
      cap: cap,
      isLt: isLt,
      proceeds: proceeds,
      basis: basis,
      reason: "No wage income is created on a normal public-stock sale. The tax result is capital gain or loss only.",
      notes: [
        "Basis starts with purchase cost plus any acquisition fees.",
        "Sale proceeds equal shares sold times sale price minus selling fees.",
        "Holding period is " + (isLt ? "long-term" : "short-term") + " because the sale happened " + (isLt ? "more than" : "one year or less than") + " one year after acquisition."
      ]
    };
  }

  function rsu(year, saleDate, shares, salePrice, sellFees, e) {
    var vest = d(s("vestDate")), vestFmv = n("vestFmv");
    if (!vest) { e.push("Enter the RSU vest date."); }
    if (vestFmv === null || vestFmv < 0) { e.push("Enter the fair market value per share at vest."); }
    if (vest && saleDate && vest.getTime() > saleDate.getTime()) { e.push("The RSU vest date cannot be after the sale date."); }
    if (e.length) { return { errors: e }; }
    var proceeds = (shares * salePrice) - sellFees, basis = shares * vestFmv, cap = proceeds - basis, isLt = longTerm(vest, saleDate), ordinary = vest.getFullYear() === year ? basis : 0;
    return {
      errors: [],
      label: "RSU sale",
      ordinary: ordinary,
      cap: cap,
      isLt: isLt,
      proceeds: proceeds,
      basis: basis,
      reason: ordinary > 0
        ? "Public-company RSUs are generally taxed as wages when they vest. Because the vest date falls in the selected tax year, the vest value is included as ordinary income."
        : "This sale uses the vest-date FMV as tax basis, but does not add RSU wage income because the vest happened outside the selected tax year.",
      notes: [
        "RSU basis starts at the fair market value on the vest date.",
        "Only the change in value after vesting becomes capital gain or loss on sale.",
        "Holding period is " + (isLt ? "long-term" : "short-term") + " because the sale happened " + (isLt ? "more than" : "one year or less than") + " one year after vesting."
      ]
    };
  }

  function espp(year, saleDate, shares, salePrice, sellFees, e) {
    var purchase = d(s("purchaseDate")), grant = d(s("grantDate")), grantFmv = n("grantFmv"), purchaseFmv = n("purchaseFmv");
    var mode = s("pricingMode"), discount = (n("discountRate") || 0) / 100, purchasePrice = n("purchasePrice"), override = n("ordinaryIncomeOverride");
    if (!purchase) { e.push("Enter the ESPP purchase date."); }
    if (!grant) { e.push("Enter the ESPP grant date."); }
    if (grantFmv === null || grantFmv < 0) { e.push("Enter the FMV on the grant date."); }
    if (purchaseFmv === null || purchaseFmv < 0) { e.push("Enter the FMV on the purchase date."); }
    if (purchase && saleDate && purchase.getTime() > saleDate.getTime()) { e.push("The purchase date cannot be after the sale date."); }
    if (grant && purchase && grant.getTime() > purchase.getTime()) { e.push("The grant date cannot be after the purchase date."); }
    if (mode === "manual" && (override === null || override < 0)) { e.push("Manual ESPP mode requires a manual ordinary-income override."); }
    var grantEq = grantFmv;
    if (mode === "lowerOf") { purchasePrice = Math.min(grantFmv, purchaseFmv) * (1 - discount); grantEq = grantFmv * (1 - discount); }
    else if (mode === "grantOnly") { purchasePrice = grantFmv * (1 - discount); grantEq = grantFmv * (1 - discount); }
    else if (mode === "purchaseOnly") { purchasePrice = purchaseFmv * (1 - discount); grantEq = grantFmv * (1 - discount); }
    else if (purchasePrice === null || purchasePrice < 0) { e.push("Enter the actual purchase price per share for the ESPP lot."); }
    if (e.length) { return { errors: e }; }
    var qualifies = saleDate.getTime() > addYears(grant, 2).getTime() && saleDate.getTime() > addYears(purchase, 1).getTime();
    var ordinaryPer = override !== null && override >= 0 ? override / shares : qualifies
      ? Math.min(Math.max(0, grantFmv - grantEq), Math.max(0, salePrice - purchasePrice))
      : Math.max(0, purchaseFmv - purchasePrice);
    var ordinary = ordinaryPer * shares, purchaseBasis = shares * purchasePrice, proceeds = (shares * salePrice) - sellFees, cap = proceeds - purchaseBasis - ordinary, isLt = longTerm(purchase, saleDate);
    return {
      errors: [],
      label: "ESPP sale",
      ordinary: ordinary,
      cap: cap,
      isLt: isLt,
      proceeds: proceeds,
      basis: purchaseBasis + ordinary,
      reason: qualifies
        ? "This is treated as a qualifying disposition because the sale happened after both the 2-year grant-date rule and the 1-year purchase-date rule."
        : "This is treated as a disqualifying disposition because one or both ESPP holding-period rules were not met.",
      notes: [
        "Purchase basis starts with what you paid for the shares.",
        "Ordinary income is added under the ESPP rules, then the remaining gain or loss is capital.",
        "Capital holding period uses the purchase date, so the capital piece is " + (isLt ? "long-term" : "short-term") + "."
      ]
    };
  }

  function fedTax(p, x) {
    var cfg = CFG[p.year], limit = lossLimit(p.status), st = 0, lt = 0, loss = 0;
    if (x.cap > 0) { if (x.isLt) { lt = x.cap; } else { st = x.cap; } }
    else if (x.cap < 0) { loss = Math.max(x.cap, -limit); }
    var ordBefore = p.fedOrd, ordAfter = p.fedOrd + x.ordinary + st + loss;
    var ordTaxBefore = progTax(ordBefore, cfg.f[p.status]), ordTaxAfter = progTax(ordAfter, cfg.f[p.status]);
    var ltBreak = ltTax(ordAfter, lt, cfg.l[p.status]), niitBefore = niit(p.magi, p.otherNii, p.status);
    var magiEffect = x.ordinary + (x.cap > 0 ? x.cap : loss), niiEffect = x.cap > 0 ? x.cap : loss;
    var niitAfter = niit(p.magi + magiEffect, p.otherNii + niiEffect, p.status);
    return {
      ordBefore: ordBefore,
      ordAfter: ordAfter,
      ordTaxBefore: ordTaxBefore,
      ordTaxAfter: ordTaxAfter,
      st: st,
      lt: lt,
      loss: loss,
      ltBreak: ltBreak,
      niitBefore: niitBefore,
      niitAfter: niitAfter,
      inc: (ordTaxAfter + ltBreak.tax + niitAfter) - (ordTaxBefore + niitBefore)
    };
  }

  function lines(id, items) {
    document.getElementById(id).innerHTML = "<ul>" + items.map(function (line) { return "<li>" + h(line) + "</li>"; }).join("") + "</ul>";
  }

  function showError(msg) {
    empty.hidden = false;
    results.hidden = true;
    empty.innerHTML = '<div class="error-banner">' + h(msg) + "</div>";
  }

  function put(id, value) {
    document.getElementById(id).textContent = money(value);
  }

  function render(p, x, fed, ca) {
    empty.hidden = true;
    results.hidden = false;
    var caCap = x.cap > 0 ? x.cap : Math.max(x.cap, -lossLimit(p.status));
    var total = fed.inc + ca.inc, net = total - p.fedPaid - p.caPaid;
    put("federal-tax-card", fed.inc);
    put("ca-tax-card", ca.inc);
    put("combined-tax-card", total);
    put("net-due-card", net);

    lines("transaction-breakdown", [
      "Type: " + x.label,
      "Sale proceeds: " + money(x.proceeds),
      "Tax basis used on sale: " + money(x.basis),
      "Ordinary income from this event: " + money(x.ordinary),
      "Capital " + (x.cap >= 0 ? "gain" : "loss") + ": " + money(Math.abs(x.cap)),
      x.reason
    ].concat(x.notes));

    var fedLines = [
      "Baseline federal taxable ordinary income: " + money(fed.ordBefore),
      "Federal ordinary taxable income after this event: " + money(fed.ordAfter),
      "Ordinary income tax moved from " + money(fed.ordTaxBefore) + " to " + money(fed.ordTaxAfter),
      "Net short-term capital gain taxed like ordinary income: " + money(fed.st),
      "Net long-term capital gain taxed at capital-gain rates: " + money(fed.lt),
      "Allowed capital loss deduction this year: " + money(Math.abs(fed.loss)),
      "Federal NIIT moved from " + money(fed.niitBefore) + " to " + money(fed.niitAfter),
      "Estimated additional federal income tax: " + money(fed.inc)
    ];
    if (fed.lt > 0) {
      fedLines.splice(6, 0, "Long-term gain stacking: " + money(fed.ltBreak.z) + " at 0%, " + money(fed.ltBreak.f) + " at 15%, " + money(fed.ltBreak.t) + " at 20%");
    }
    lines("federal-breakdown", fedLines);

    lines("ca-breakdown", [
      "California taxable income before this event: " + money(ca.before.taxable),
      "California taxable income after this event: " + money(ca.after.taxable),
      "California capital amount included this year: " + money(caCap),
      "California taxes stock gains as ordinary income, even when the federal result is long-term capital gain.",
      "California base tax moved from " + money(ca.before.base) + " to " + money(ca.after.base),
      "California 1% behavioral health surtax moved from " + money(ca.before.surtax) + " to " + money(ca.after.surtax),
      "Estimated additional California income tax: " + money(ca.inc)
    ]);

    lines("assumptions", [
      "Built for 2024 and 2025 federal rules plus California resident income tax.",
      "Assumes this is the stock transaction you want to measure for the year. Other capital gains, carryovers, or wash-sale adjustments can change the result.",
      "Does not include payroll taxes, Social Security, Medicare, California SDI, ISO AMT, or nonresident California sourcing rules.",
      "For ESPP sales, use the manual override if your W-2, Form 3922 supplement, or broker statement shows a different compensation amount.",
      "California capital losses are limited here the same way federal personal capital losses are usually limited: " + money(lossLimit(p.status)) + " for the current year."
    ]);
  }

  function submit(event) {
    event.preventDefault();
    var p = profile(), x = buildScenario(), errs = p.errors.concat(x.errors || []);
    if (errs.length) { showError(errs.join(" ")); return; }
    var pd = p.data, fed = fedTax(pd, x), before = caTax(pd.caOrd, pd.year, pd.status);
    var afterIncome = pd.caOrd + x.ordinary + (x.cap > 0 ? x.cap : Math.max(x.cap, -lossLimit(pd.status)));
    var after = caTax(afterIncome, pd.year, pd.status);
    render(pd, x, fed, { before: before, after: after, inc: after.total - before.total });
  }

  saleType.addEventListener("change", renderScenario);
  form.addEventListener("submit", submit);
  renderScenario();
}());
