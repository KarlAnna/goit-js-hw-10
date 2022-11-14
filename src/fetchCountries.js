export default fetchCountries

function fetchCountries(name){
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`).then(c => {
        return c.json()
    })
}