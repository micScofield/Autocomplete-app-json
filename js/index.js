import debounce from "./debounce.js"
import filterSearch from "./filterSearch.js"

const search = document.getElementById('search')

search.addEventListener('keyup', () => debounceRequest())

const debounceRequest = debounce(filterSearch, 500) // pass in the method to call and a delay in between api calls