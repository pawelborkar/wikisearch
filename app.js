const url = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';

const formDOM = document.querySelector('.form')
const inputDOM = document.querySelector('.form-input')
const resultDOM = document.querySelector('.results')

formDOM.addEventListener('submit', (e) => {
    e.preventDefault()      //Prevent loading of the webpage after submitting the form.
    const value = inputDOM.value
    if (!value) {
        resultDOM.innerHTML = "<div class='error'>Please enter a valid search term</div>"
        return;
    }
    fetchResults(value);
})


const fetchResults = async (searchValue) => {
    resultDOM.innerHTML = "<div class='loading'></div>"

    try {
        const response = await fetch(`${url}${searchValue}`)
        const data = await response.json()
        const results = data.query.search;
        if (results.length < 1) {
            resultDOM.innerHTML = "<div class = 'error'>Results not found for the input search term.</div>"
            return;
        }
        renderResults(results);

    } catch (error) {
        resultDOM.innerHTML = "<div class = f'error'>Something went wrong...</div>"
    }

}

const renderResults = (list) => {

    const CardList = list.map(item => {
        console.log(list);
        const { title, snippet, wordcount, pageid } = item;
        console.log(pageid);

        return `<a href=http://en.wikipedia.org/?curid=${pageid}>
        <h2>${title}</h2>
        <p>
        ${snippet}
        </p>
        <span>
        ${Math.ceil(wordcount / 238)} minutes read
        </span>
        </a>`

    }).join('')
    resultDOM.innerHTML = `<div class='articles'>
    ${CardList}
    </div>`

}



/* WIKI URLS

const url =
  'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=searchValue';

===================================
list=search - perform a full text search
srsearch="inputValue" - search for page titles or content matching  this value.
srlimit=20 How many total pages to return.
format=json json response
"origin=*" fix cors errors
===================================

const page_url = 'href=http://en.wikipedia.org/?curid=${pageid}';


*/