const apiUrl = "http://localhost:3000/conversion_rates";
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");
    const amountInput = document.getElementById("amount");
    const convertBtn = document.getElementById("convertBtn");
    const result = document.getElementById("result");

    let conversionRates = {};

    async function loadRates() {
      try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        conversionRates = data;

        
        for (let currency in conversionRates) {
          let option1 = document.createElement("option");
          let option2 = document.createElement("option");

          option1.value = currency;
          option1.textContent = currency;

          option2.value = currency;
          option2.textContent = currency;

          fromCurrency.appendChild(option1);
          toCurrency.appendChild(option2);
        }

        fromCurrency.value = "USD";
        toCurrency.value = "NGN";
      } catch (err) {
        console.error("❌ Error fetching API:", err);
        result.textContent = "API not working. Check json-server.";
      }
    }

    function doConvert() {
      let amount = parseFloat(amountInput.value);
      let from = fromCurrency.value;
      let to = toCurrency.value;

      if (isNaN(amount)) {
        result.textContent = "⚠️ Enter a valid amount";
        return;
      }

      let converted = (amount / conversionRates[from]) * conversionRates[to];
      result.textContent = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
    }

    convertBtn.addEventListener("click", doConvert);

    loadRates();