import API_KEY from './config.js';

const converterButton = document.getElementById('converterButton');
const inputDollar = document.getElementById('dollar-rate');

converterButton.addEventListener('click', (e) => {
  convertCurrency();
});

const convertCurrency = async () => {
  const inputAmount = document.getElementById('amount').value;

  inputDollar.textContent = 'Calculando...';

  await fetchData(inputAmount);
};

const fetchData = async (dollarValue) => {
  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`);

    if (!response.ok) {
      throw new Error('Não foi possível carregar os dados da taxa de câmbio.');
    }

    const data = await response.json();
    const exchangeRate = data.conversion_rates.BRL;

    if (dollarValue) {
      const dollarConverted = (exchangeRate * dollarValue).toFixed(2);
      inputDollar.textContent = `${dollarConverted.replace('.', ',')}`;
    } else {
      inputDollar.textContent = `${exchangeRate.toFixed(2).replace('.', ',')}`;
    }

  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    inputDollar.textContent = 'Erro ao converter valor';
  }
};

fetchData();
