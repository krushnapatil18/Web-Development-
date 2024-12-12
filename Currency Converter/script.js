
const url = "https://2024-03-06.currency-api.pages.dev/v1/currencies";
const countries = document.querySelectorAll(".countries select");
const btn = document.querySelector(".btn button")
const to_country = document.querySelector(".to select")
const from_country = document.querySelector(".from select")

for (let select of countries) {
  for (let key in countryList) {
    let new_option = document.createElement("option");
    new_option.innerText = key;
    new_option.value = key;
    if (select.name === "from" && key === "INR") {
      new_option.selected = "selected";
    } else if (select.name === "to" && key === "USD") {
      new_option.selected = "selected";
    }
    select.append(new_option);
  }
  
  select.addEventListener("change", (evt) => {
    updateflag(evt.target);

  });
}

function updateflag(element) {
  let countrycode = element.value;
  let country = countryList[countrycode];
  let newSrc = `https://flagsapi.com/${country}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}


btn.addEventListener("click", async (evt)=>{
  evt.preventDefault()
  amt = document.querySelector(".amount input")
  let x = amt.value
  if (x<=0) {
    alert("Enter correct value")
  }
  const from = from_country.value.toLowerCase() 
  const to = to_country.value.toLowerCase() 
  let response = await fetch(`${url}/${from}.json`);
  let data = await response.json()
  let ex_rate = data[`${from}`][`${to}`]
  let converted_data = (ex_rate * x).toFixed(2)
  const result = `${x} ${from.toUpperCase()} = ${converted_data} ${to.toUpperCase()}`
  let print_result = document.querySelector(".amount_result")
  print_result.innerHTML = result
  
})
