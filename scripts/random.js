var songs = [];
var current = -1;

function showRandomSong() {
  if (!songs.length) {
    return;
  }
  var next = current;
  while (songs.length > 1 && next === current) {
    next = Math.floor(Math.random() * songs.length);
  }
  current = next;
  var song = songs[current];
  var src = "../" + song.image;
  document.getElementById("random-title").textContent = song.id + " - " + song.name;
  document.getElementById("random-link").href = src;
  var image = document.getElementById("random-image");
  image.src = src;
  image.alt = song.name;
}

fetch("../data/songs.json")
  .then(function(response) { return response.json(); })
  .then(function(data) {
    songs = data;
    showRandomSong();
  })
  .catch(function(error) {
    document.getElementById("random-title").textContent = "Lieder konnten nicht geladen werden.";
    console.error(error);
  });

document.getElementById("random-button").addEventListener("click", showRandomSong);
