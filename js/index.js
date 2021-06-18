const search = document.getElementById('search')
const matchList = document.getElementById('match-list')

const debounce = (fn, d) => {
    let timer
    let context = this

    // cant access search.value here

    return () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(context, [search.value]) //context is nothing but the window object here
        }, d)
    }
}

const debounceRequest = debounce(filterSearch, 500)

// search states from json data and filter
async function filterSearch(searchText) {

    let matches

    // do not show any result if input string in empty
    if (searchText.trim().length === 0) {
        matches = []
    } else {
        console.log('making api call')
        const res = await fetch('./data/data.json')
        const states = await res.json()

        const regex = new RegExp(`^${searchText}`, 'gi') // gi flag removes the case sensitiveness

        // get matches to current text input
        matches = states.filter(state => {
            return state.name.match(regex) || state.abbr.match(regex)
        })
    }

    // show matches with list
    outputHtml(matches)
}

function outputHtml(matches) {
    if (matches.length > 0) {
        const html = matches.map(match => `
            <div class="card card-body mb-1" >
                <h4>${match.name} (${match.abbr}) <span class="text-primary" >${match.capital}</span></h4>
                <small>Lat: ${match.lat} / Long: ${match.long}<small>
            </div>
        `).join('')

        matchList.innerHTML = html
    } else {
        matchList.innerHTML = ''
    }
}

search.addEventListener('keyup', () => debounceRequest())