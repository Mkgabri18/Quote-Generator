const $quoteContainer = document.getElementById("quote-container");
const $quoteText = document.getElementById("quote");
const $quoteAuthor = document.getElementById("author");
const $twitterBtn = document.getElementById("twitter");
const $newQuoteBtn = document.getElementById("new-quote");
const $loader = document.getElementById("loader");


let apiQuotes = [];

// Show loader
function loading() {
    $loader.hidden  = false;
    $quoteContainer.hidden = true;
}

// Hide loader
function complete() {
    $quoteContainer.hidden = false;
    $loader.hidden = true;
}

// Show new Quote
function newQuote() {
    loading();
    if(apiQuotes.length>0) {
        const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
        if(!quote.author) {
            $quoteAuthor.textContent = "Unknown";
        } else {
            $quoteAuthor.textContent = quote.author;
        }
        if(quote.text.length > 50) {
            $quoteText.classList.add("long-quote");
        } else {
            $quoteText.classList.remove("long-quote");
        }
        $quoteText.textContent = quote.text;

        complete(); //hide loader
    }
}

// Get quotes from API
async function getQuotes() {
    loading();
    const apiUrl = "https://type.fit/api/quotes";
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // catch error
        alert(error)
    }
}

// Tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${$quoteText.textContent} - ${$quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event listener
$newQuoteBtn.addEventListener('click', newQuote);
$twitterBtn.addEventListener('click', tweetQuote)

//On load
getQuotes();


