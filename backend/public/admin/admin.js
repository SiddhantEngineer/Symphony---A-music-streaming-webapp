const root = document.getElementById("root");
const userNav = document.getElementById("user-nav");
let state = "";

userNav.addEventListener("click", () => {
  if (state == "user") {
    return;
  }
  fetch("user", { method: "GET" })
    .then((res) => {
      if (!res.ok) {
        console.error("RES NOT OKAY: " + res);
        return "ERROR";
      }
      return res.text();
    })
    .then((data) => {
      root.innerHTML = "";
      root.innerHTML = data;
      const script = document.createElement("script");
      script.src = "user.js";
      document.body.appendChild(script);
      state = "user";
    });
});
