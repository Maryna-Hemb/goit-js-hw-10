import './css/styles.css';
import { fetchCountries } from "./fetchCountries";
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector("#search-box");
const listEl = document.querySelector(".country-list");
const infoEl = document.querySelector(".country-info");

inputEl.addEventListener("input", debounce(onInput, DEBOUNCE_DELAY, { leading: false,
      trailing: true,}))

function onInput(evt) {
   
     const name = inputEl.value 
    
    console.log(name)

    
    
    fetchCountries(name).then(data => {
        console.log(data.length);
        if (data.length > 10) {
            return Notify.info("Too many matches found. Please enter a more specific name.")
        }
        // if(data.length > 1) {listEl.innerHTML=}
    })
//     .then(data => list.innerHTML = createMarkup(data.forecast.forecastday))
//     .catch(err => list.innerHTML = createErrorMarkup())
    
}





