console.log("Starting lunr script...");

var lunrIndex,
  $results,
  documents;

const INDEX_FILE = 'https://raw.githubusercontent.com/lgulich/cantusmagister24/master/data/songs.json?token=AFLQOBBDWGMSGQBDFJR3APC7VBMLQ';

function initLunr() {
  $.getJSON(INDEX_FILE)
    .done(function(index) {
      documents = index;

      lunrIndex = lunr(function(){
        this.ref('no')
        this.field('name')
        this.field('category')
        this.field('text')
        this.field('image')

        documents.forEach(function(doc) {
          try {
            this.add(doc)
          } catch (e) {
            console.error("Error: could not add doc")
          }
        }, this)
      })
    })
    .fail(function(jqxhr, textStatus, error) {
      var err = textStatus + ", " + error;
      console.error("Error getting Lunr index file:", err);
    });
}


function search(query) {
  return lunrIndex.search(query).map(function(result) {
    return documents.filter(function(page) {
      try {
        console.log(page)
        return page.no === result.ref;
      } catch (e) {
        console.log('whoops')
      }
    })[0];
  });
}

function renderResults(results) {
  if (!results.length) {
    return;
  }

  results.slice(0, 10).forEach(function(result) {
    var $result = $("<li>");

    $result.append($("<a>", {
      href: "../" + result.image,
      text: "» " + result.name
    }));

    $results.append($result);
  });
}

function initUI() {
  $results = $("#results");

  $("#search").keyup(function(){
    $results.empty();
    var query = $(this).val();
    if (query.length < 2) {
      return;
    }

    var results = search(query);

    renderResults(results);
  });
}

console.log("before init");
initLunr();
console.log("after init");

$(document).ready(function(){
  initUI();
});

console.log("after document");
