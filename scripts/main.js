console.log("Starting lunr script...");

var lunrIndex,
  $results,
  songs;

const INDEX_FILE = 'https://raw.githubusercontent.com/lgulich/cantusmagister24/master/data/songs.json?token=AFLQOBCFL3EU7QTUUWGYYJS7ZF4YA';

function initLunr() {
  $.getJSON(INDEX_FILE)
    .done(function(index) {
      songs = index;

      lunrIndex = lunr(function(){
        this.ref('id')
        this.field('name')
        this.field('category')
        this.field('text')
        this.field('image')

        songs.forEach(function(song) {
          try {
            this.add(song)
          } catch (e) {
            console.error("Error: Could not add song to index.")
          }
        }, this)
      })
    })
    .fail(function(jqxhr, textStatus, error) {
      var err = textStatus + ", " + error;
      console.error("Error getting Lunr index file:", err);
    });
}


function search(query, category) {
  console.log("categ: "+category)
  escapedQuery = query.replace(" ", "\ ")
  var fullQuery;
  if(category == ""){
    fullQuery = "+*"+escapedQuery+"*";
  } else {
    fullQuery = "+*"+escapedQuery+"* +category:"+category;
  }
  return lunrIndex.search(fullQuery).map(function(result) {
    return songs.filter(function(song) {
      try {
        console.log(song)
        return song.id === result.ref;
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

    $result.append($("<br>",));
    $result.append($("<br>",));

    $results.append($result);
  });
}

function initUI() {
  $results = $("#results");
  $category = $("#category");

  $("#search").keyup(function(){
    $results.empty();
    var query = $(this).val();
    if (query.length < 2) {
      return;
    }

    var results = search(query, category.value);

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
