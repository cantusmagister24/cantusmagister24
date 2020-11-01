
console.log("Starting lunr script...");

const INDEX_FILE = 'https://raw.githubusercontent.com/lgulich/cantusmagister24/master/data/songs.json?token=AFLQOBBDWGMSGQBDFJR3APC7VBMLQ';

// Get index data and load index

// fetch(INDEX_FILE).then(response => {
//   return response.json();
// });

var index;

fetch(INDEX_FILE)
  .then(response => { return response.json(); })
  .then(json => {
    // elasticlunr.clearStopWords();
    index = lunr.Index.load(json);
    // queryInput.disabled = false; 
    // queryInput.focus();
});

// fetch(INDEX_FILE)
//     .then(function (res) {return res.json();})
//     .then(function (data) {
//               const idx = lunr.Index.load(data);
//     });

// fetch(INDEX_FILE)
//   .then(response => response.json())
//   .then(data => lunr.Index.load(JSON.parse(data)));
  // .then(data => console.log(data));



// var idx = lunr.Index.load(JSON.parse(data))
