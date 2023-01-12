export function fetchCountries(name) {
    const BASE_URL = "https://restcountries.com/v2/name/";
    const FIELDS = "name,capital,population,flag,languages"
  return  fetch(`${BASE_URL}${name}?fields=${FIELDS}`)
      .then(resp => {
          console.log(resp);
          if (!resp.ok) {
            throw new Error(resp.statusText)
        }
            return resp.json()
        })
}