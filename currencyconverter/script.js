
const currencyOne = document.getElementById('currency-one');
const currencyTwo = document.getElementById('currency-two');
const amountOne = document.getElementById('amount-one');
const amountTwo = document.getElementById('amount-two');
const rate = document.getElementById('rate');
const swapBtn = document.getElementById('swap');

//functions--------------------------------------------------
function calculateRate() {
  let currencyOneValue = currencyOne.value;
  let currencyTwovalue = currencyTwo.value;

  fetch(
    `https://v6.exchangerate-api.com/v6/d57d5ba3c4b7412606da0435/latest/${currencyOneValue}`
  )
    .then((res) => res.json())
    .then((data) => {
      const fetchedRate = data.conversion_rates[currencyTwovalue];
      rate.innerHTML = `1 ${currencyOneValue} = ${fetchedRate} ${currencyTwovalue}`;
      amountTwo.value = (amountOne.value * fetchedRate).toFixed(2);
    });
}

//event listeners----------------------------------------------
currencyOne.addEventListener('change', calculateRate);
currencyTwo.addEventListener('change', calculateRate);
amountOne.addEventListener('input', calculateRate);
amountTwo.addEventListener('input', calculateRate);

swapBtn.addEventListener('click', () => {
  const tempCurrencyOne = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = tempCurrencyOne;

  calculateRate();
});

calculateRate();
