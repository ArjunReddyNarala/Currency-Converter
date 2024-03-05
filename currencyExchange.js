const BASE_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
let button = document.querySelector("form button");
let fromCur = document.querySelector(".from select");
let toCur = document.querySelector(".to select");
let message = document.querySelector(".msg");

for(const selectOption of dropdowns)
{
    for(curCode in countryList)
    {
        let newOption = document.createElement("option");
        newOption.innerText = curCode;
        newOption.value = curCode;
        if(selectOption.name === "from" && curCode === "USD")
        {
            newOption.selected="selected";
        } else if(selectOption.name === "to" && curCode === "INR")
        {
            newOption.selected="selected";
        }
        selectOption.append(newOption);
    }
    selectOption.addEventListener("change",(evt) =>{
        updateFlag(evt.target);
    });
}

const currencyUpdate = async () => {
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal==="" || amtVal<1)
    {
        amtVal=1;
        amount.value=1;
    }

    const URL = `${BASE_URL}/${fromCur.value.toLowerCase()}/${toCur.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let dataReadable = await response.json();
    let rate = dataReadable[toCur.value.toLowerCase()];
    
    let finalAmount=amtVal*rate;
    message.innerText=`${amtVal} ${fromCur.value} = ${finalAmount}${toCur.value}`;

}

const updateFlag = (element) => {
    let curCode=element.value;
    let countryCode=countryList[curCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src=newSrc;
};



button.addEventListener("click",(evt) => {
    evt.preventDefault();
    currencyUpdate();
});

window.addEventListener("load",() => {
    currencyUpdate();
});
