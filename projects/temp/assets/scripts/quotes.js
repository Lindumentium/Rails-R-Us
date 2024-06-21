let quotes = [];

// Fetch quotes and initialize slideshow
fetch('assets/quotes.json')
  .then(response => response.json())
  .then(data => {
    quotes = data.quotes;
    showRandomQuote();
    setInterval(showRandomQuote, 15000); // Change quote every 15 seconds
  })
  .catch(error => console.error('Error fetching quotes:', error));

function showRandomQuote() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById('quoteText').innerText = randomQuote.text;
  document.getElementById('quoteAuthor').innerText = randomQuote.author;
}
