//-------------------------------------------
//User Add
//-------------------------------------------
const addUserForm = document.getElementById("add-user");
const addUserStatus = document.getElementById("add-user-status");

addUserForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //-------------------------------------------
  let formData = new FormData(addUserForm);

  addUserStatus.innerHTML = "loading";

  fetch("userAdd", { method: "POST", body: formData })
    .then((response) => {
      if (!response.ok) {
        console.warn("Response was not okay");
        return;
      }
      return response.text();
    })
    .then((data) => {
      addUserStatus.innerHTML = data;
    });

  //-------------------------------------------
});

//-------------------------------------------
//User List
//-------------------------------------------
const userListForm = document.getElementById("user-list");
const userListContainer = document.getElementById("user-list-container");

userListForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch("userList", { method: "GET" })
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
        str += "Name: " + element.name + " | Email: " + element.email + "\n";
      });
      userListContainer.innerHTML = "<pre>" + str + "</pre>";
    });
});

//-------------------------------------------
//User Delete
//-------------------------------------------
const userDeleteForm = document.getElementById("user-delete");
const userDeleteStatus = document.getElementById("user-delete-status");

userDeleteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(userDeleteForm);

  userDeleteStatus.innerHTML = "loading";

  fetch("userDelete", { method: "DELETE", body: formData })
    .then((response) => {
      if (!response.ok) {
        console.warn("Response was not okay");
        return;
      }
      return response.text();
    })
    .then((data) => {
      userDeleteStatus.innerHTML = data;
    });
});
