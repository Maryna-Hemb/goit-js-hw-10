import './css/styles.css';
import { fetchCountries } from "./fetchCountries";
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector("#search-box");
const listEl = document.querySelector(".country-list");
const infoEl = document.querySelector(".country-info");



inputEl.addEventListener("input", debounce(onInput, DEBOUNCE_DELAY, { leading: false,
    trailing: true,
}))
      

function onInput(evt) {
               
    const name = inputEl.value.trim() 
       
    if (name.length === 0) { cleanInformarion();  return }
       
    fetchCountries(name)
        .then(data => {
        if (data.length > 10) {
            return Notify.info("Too many matches found. Please enter a more specific name.")
        }
        else if (data.length > 1) { listEl.innerHTML = createMarkupList(data) }
        else if (data.length === 1) { infoEl.innerHTML = createMarkupInfo(data) }
        })    
        .catch(err => { cleanInformarion();  createErrorMarkup()})    
  
}

function createMarkupList(arr) {
    infoEl.innerHTML = "";
    return arr.map(({
           name,
            flag
        }) =>
        `<li class="list-item">
        <img src="${flag}" alt="flag class="list-item__flag style="width:40px; height:auto">
        <h2 class="list-item__country">${name}</h2>
        </li>`
    ).join('')    
}

function createMarkupInfo(arr) {
    listEl.innerHTML = "";    
    return arr.map(({
           name,
        flag,
        capital,
        population,
        languages : {0: {name : languages}}
        }) =>
        `<div class="list-item">
        <img src="${flag}" alt="flag class="list-item__flag style="width:40px; height:auto">
        <h2>${name}</h2>
        </div>
        <h3>Capital:<span>"${capital}"</span></h3>
        <h3>Population:<span>"${population}"</span></h3>
        <h3>Languages:<span>"${languages}"</span></h3>
        `
    ).join('')    
}

function createErrorMarkup(){
    return Notify.failure("Oops, there is no country with that name")
}

function cleanInformarion() {
    listEl.innerHTML = "";
    infoEl.innerHTML = ""
}

