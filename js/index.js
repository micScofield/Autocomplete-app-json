const search = document.getElementById('search')
const matchList = document.getElementById('match-list')

search.addEventListener('input', () => searchStates(search.value))

// search states from json data and filter
async function searchStates(searchText) {

    const res = await fetch('./data/data.json')
    const states = await res.json()

    const regex = new RegExp(`^${searchText}`, 'gi') // gi flag removes the case sensitiveness

    // get matches to current text input
    let matches = states.filter(state => {
        return state.name.match(regex) || state.abbr.match(regex)
    })

    // do not show any result if input string in empty
    if (searchText.trim().length === 0) {
        matches = []
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