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

//-------------------------------------------
//User List
//-------------------------------------------
const addSongForm = document.getElementById("addsong-form");
const fileInput = document.getElementById("mp3");
const fileName = document.getElementById("name");
fileInput.addEventListener("change", (e) => {
  fileName.value = fileInput.files[0].name.replace(".mp3", "");
});
const addSongError = document.getElementById("addsong-error");
addSongForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(addSongForm);
  console.log(...formData.entries());
  addSongError.innerHTML = "loading";
  fetch("songAdd", { method: "POST", body: formData })
    .then((response) => {
      if (!response.ok) {
        console.warn("Response was not okay");
        return;
      }
      return response.text();
    })
    .then((data) => {
      addSongError.innerHTML = data;
    });
});

//-------------------------------------------
//Song Delete
//-------------------------------------------
const songDeleteForm = document.getElementById("song-delete");
const songDeleteStatus = document.getElementById("song-delete-status");

songDeleteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(songDeleteForm);

  songDeleteStatus.innerHTML = "loading";

  fetch("songDelete", { method: "DELETE", body: formData })
    .then((response) => {
      if (!response.ok) {
        console.warn("Response was not okay");
        return;
      }
      return response.text();
    })
    .then((data) => {
      songDeleteStatus.innerHTML = data;
    });
});
