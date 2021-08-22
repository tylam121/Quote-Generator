const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')

let apiQuotes = []; //use let so that the value can be changed later

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote
function newQuotes() {
    loading();
   // Pick a random quote from apiQuotes array
   const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
   // Check if Author field is blank and replace it with 'Unknown'
   if (!quote.author) {
       authorText.textContent = 'Unknown'
   } else {
     authorText.textContent = quote.author;
   }
   // Check Quote length to determine styling
   if (quote.text.length > 120) {
       quoteText.classList.add('long-quote')
   } else {
       quoteText.classList.remove('long-quote')
   }
   // Set Quote, Hide Loader
   quoteText.textContent = quote.text;
   complete();
}

// Get Quotes From API
async function getQuotes () {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json(); //To turn the fetched data into a global variables
    newQuotes()
    } catch (error) {
        alert("Error")
        // Catch Error Here
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`; //backticks
    window.open(twitterUrl, '_blank') //'_blank' allow the window to open in a new tab
}

// Event Listener
newQuoteBtn.addEventListener('click', newQuotes);
twitterBtn.addEventListener('click', tweetQuote);

// // On Load
getQuotes();

/* local array
set the local array into a var;
remove the async function;
just the newQuote function and the apiQuote var therein will be replaced by the local array var
*/
