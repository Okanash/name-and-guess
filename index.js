// }
let input = document.getElementById("search");
let btn = document.getElementById("btn");
let genderApi = "https://api.genderize.io/?name=";
let ageApi = "https://api.agify.io?name=";
let nationalizeApi = " https://api.nationalize.io?name=";
let countriesApi = " https://restcountries.com/v3.1/alpha?codes=";
let ul = document.getElementById("ul");
let div = document.getElementById("cards");
const history = document.getElementById("history");

btn.addEventListener("click", function () {
  let getGender = fetch(`${genderApi}${input.value}`);
  // console.log(getGender);
  getGender
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((JSON) => {
      let genStatus = JSON.gender;
      // console.log(genStatus);
      let genList = document.createElement("li");
      genList.innerHTML = genStatus;
      ul.appendChild(genList);
    });
  let getAge = fetch(`${ageApi}${input.value}`);
  // console.log(getAge);
  getAge
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((JSON) => {
      // console.log(JSON);
      let ageStatus = JSON.age;
      // console.log(ageStatus);
      let ageList = document.createElement("li");
      ageList.innerHTML = ageStatus;
      ul.appendChild(ageList);
    });
  let nationAge = fetch(`${nationalizeApi}${input.value}`);
  // console.log(nationAge);
  nationAge
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((JSON) => {
      // console.log(JSON);
      let nationStatus = JSON.country;
      let code = [];

      ul.innerHTML = "";
      for (let i = 0; i < nationStatus.length; i++) {
        code.push(nationStatus[i].country_id);
        let nationList = document.createElement("li");
        nationList.innerHTML = nationStatus[i].country_id;
        ul.appendChild(nationList);
      }
      let countryCode = code.toString();
      fetch(`${countriesApi}${countryCode}`).then((res) => {
        res.json().then((data) => {
          data.forEach((element) => {
            let imgSrc = element.flags.png;
            let img = document.createElement("img");
            img.src = imgSrc;
            div.appendChild(img);
          });
          console.log(data);
        });
      });
      if (!localStorage.getItem("names")) {
        localStorage.setItem("names", input.value);
        renderHistory();
      } else {
        let localStorageData = localStorage.getItem("names");
        localStorage.setItem("names", `${localStorageData},${input.value}`);
        renderHistory();
      }
    });
});

function renderHistory() {
  if (!localStorage.getItem("names")) {
    history.innerText = "no history yet";
    return;
  }
  history.innerHTML = "";
  let names = localStorage.getItem("names");

  names.split(",").forEach((item) => {
    let li = document.createElement("li");
    li.innerText = item;
    history.appendChild(li);
  });
}

renderHistory();
input.addEventListener("keypress", function (e) {
  if (e.keyCode === 32) {
    e.preventDefault();
  }
});
