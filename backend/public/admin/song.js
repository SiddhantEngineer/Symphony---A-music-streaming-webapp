//-------------------------------------------
//User List
//-------------------------------------------
const songListForm = document.getElementById("song-list");
const songListContainer = document.getElementById("song-list-container");

songListForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch("songList", { method: "GET" })
    .then((response) => {
      if (!response.ok) {
        console.warn("Response was not okay");
        return;
      }
      return response.json();
    })
    .then((data) => {
      let str = "";
      data.forEach((element) => {
        str += element.name + " by : " + element.artist + "\n";
      });
      songListContainer.innerHTML = "<pre>" + str + "</pre>";
    });
});
