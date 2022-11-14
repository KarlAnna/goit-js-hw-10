import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box')
const list = document.querySelector('.country-list')
const container = document.querySelector('.country-info')


const debouncedFetch = debounce(onInput, DEBOUNCE_DELAY)
input.addEventListener('input', debouncedFetch)

function onInput(e) {
    e.preventDefault()
    const name = e.target.value.trim()
    list.innerHTML = ''
    container.innerHTML = ''
    if (!name) {
        return
    }

    fetchCountries(name)
        .then(c => {
            if (c.length > 10) {
                return Notify.info('Too many matches found. Please enter a more specific name.n');
            } else if (c.length === 1) {
                renderCountryCard(c)
                return
            }
            renderCountryList(c)
        })
        .catch(e => {
            Notify.failure('Oops, there is no country with that name');
        })
    
}

function renderCountryList(countries) {
    const listMarkup = countries.map(({ flags, name}) => {
        return `
        <li>
            <h2>
                <img width=40 heigth=40 src=${flags.svg}>
                ${name.official}
            </h2>
        </li>
        `
    }).join('')
        list.insertAdjacentHTML('afterbegin', listMarkup)
}

function renderCountryCard(country) {
    const cardMarkup = country.map(({ flags, name, capital, population, languages}) => {
        return `
        <div class='js-country-info'>
            <h1>
                <img width=40 heigth=40 src=${flags.svg}>
                ${name.official}
            </h1>
            <h2>Capital: <span>${capital}</span></h2>
            <h2>Population: <span>${population}</span></h2>
            <h2>Languages: <span>${Object.values(languages)}</span></h2>
        </div>
        `
    }).join('')
        list.innerHTML = cardMarkup
}