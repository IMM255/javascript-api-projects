let api =  `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

const fromDropdown = document.getElementById("from-currency-select");
const toDropdown = document.getElementById("to-currency-select");


//Create Dropdown  from the currencies array
currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value =  currency;
    option.text = currency;
    fromDropdown.add(option);
});

//Request same thing for the other dropdown
currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value =  currency;
    option.text = currency;
    toDropdown.add(option);
});

//Setting default values
fromDropdown.value = "IDR";
toDropdown.value = "USD";

let convertCurrency = () => {
    //create References
    const amount = document.querySelector("#amount").value;
    const fromCurrency = fromDropdown.value;
    const toCurrency = toDropdown.value;
    
    //if input field is not empty
    if(amount.length != 0){
        fetch(api)
        .then(resp => resp.json())
        .then((data) => {
            let fromExchangesRate = data.conversion_rates[fromCurrency];
            let toExchangesRate = data.conversion_rates[toCurrency];
            const convertedAmount = (amount / fromExchangesRate) * toExchangesRate;
            result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
        });
    }else{
        alert("please fill in the amount");
    }
};

document.querySelector("#convert-button")
.addEventListener("click", convertCurrency);
window.addEventListener("load",convertCurrency);


