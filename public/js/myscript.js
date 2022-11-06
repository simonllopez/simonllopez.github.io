const host = "http://localhost:3000";

pathname = window.location.pathname;
time = new Date();

let lastSesion = localStorage.getItem("last_sesion");

if (lastSesion) {
  lastSesion = new Date(lastSesion);
  var diff = Math.abs(lastSesion - time);
  var seconds = Math.floor(diff / 1000);
  if (seconds > 60 * 60) console.log("nueva sesión");
  else {
    console.log(`Último reinicio ${seconds}`);
    localStorage.setItem("last_sesion", time);
  }
} else {
  lastSesion = time;
  localStorage.setItem("last_sesion", time);
}

let localdata = sessionStorage.getItem("data");
let local_time = sessionStorage.getItem("time");

localdata ? (localdata += `;${pathname}`) : (localdata = pathname);
local_time ? (local_time += `;${time}`) : (local_time = time);

sessionStorage.setItem("data", localdata);
sessionStorage.setItem("time", local_time);

// console.log(window.location.pathname);

fetch(host + "/data" + pathname, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ data: localdata, time: local_time }), // body data type must match "Content-Type" header
})
  .then((response) => response.json())
  .then((data) => console.log(data));

function SessionEnd() {
  alert("confirm exit is being called");
  fetch(host + "/close" + pathname);
  return false;
}
// document.cookie = "0001";
