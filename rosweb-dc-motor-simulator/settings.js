settingsButton = document.querySelector("#settings-button");
settingsDiv = document.querySelector("#settings-div");

settingsButton.addEventListener("click", (ev) => {
  settingsDiv.classList.toggle("hide");
});
