let USDformatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

let EURformatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
});

let INRformatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0,
});

let MGAformatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "MGA",
  minimumFractionDigits: 0,
});

let currency = "INR"
let currency_conversion_factor = 1

const changeCurrency = (newCurrency) => {
  currency = newCurrency
  if (currency == "EUR") {
    currency_conversion_factor = {
      2018 : 1.1809545,
      2020 : 1.142196,
      2022 : 1.05
    }
  }
  else if (currency == "INR") {
    currency_conversion_factor = {
      2020 : 0.013495356,
      2022 : 0.0127,
    }
  }
   else if (currency == "MGA") {
    currency_conversion_factor = {
      2020 : 0.0002640087,
      2022 : 0.00023,
    }
  }
  else {
    currency_conversion_factor = 1
  }
}

const getUserCurrency = () => {
  return currency
}

const formatAmount = (amount) => {
  var formatted_amount = ""
  if (currency == "USD") {
    formatted_amount = USDformatter.format(amount);
  }
  else if (currency == "EUR") {
    formatted_amount = EURformatter.format(amount)
  }
  else if (currency == "INR") {
    formatted_amount = INRformatter.format(amount)
  }
  else if (currency == "MGA") {
    formatted_amount = MGAformatter.format(amount)
  }
  return formatted_amount//.replace(',', '.')
}

const formatPercent = (amount) => {
  return amount.toFixed(2) + '%'
}

export default {
  formatAmount,
  formatPercent,
  changeCurrency,
  getUserCurrency
};
