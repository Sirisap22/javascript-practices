// const firstReq = new XMLHttpRequest();
// firstReq.addEventListener("load", function () {
//   console.log("FIRST IT WORKED");
//   const data = JSON.parse(this.responseText);
//   const filmURL = data.results[0].films[0];
//   const filmReq = new XMLHttpRequest();
//   filmReq.addEventListener("load", function () {
//     console.log("SECOND IT WORKED");
//     const filmData = JSON.parse(this.responseText);
//     console.log("filmData", filmData);
//   });
//   filmReq.addEventListener("error", function (e) {
//     console.log("error", e);
//   });
//   filmReq.open("GET", filmURL);
//   filmReq.send();
//   //   for (let planets of data.results) {
//   //     console.log(planets.name);
//   //   }
// });
// firstReq.addEventListener("error", () => {
//   console.log("404 ERROR");
// });
// firstReq.open("GET", "https://swapi.dev/api/planets/");
// firstReq.send();
// console.log("request sent");

// const checkStatusAndParse = (response) => {
//   if (!response.ok) {
//     throw new Error(`Status Code Error: ${response}`);
//   }
//   return response.json();
// };

// const printPlanets = (data) => {
//   console.log("Loaded 10 more planets.");
//   for (let planet of data.results) {
//     console.log(planet.name);
//   }
//   return Promise.resolve(data.next);
// };
// const fetchNextPlanets = (url = "https://swapi.dev/api/planets/") => {
//   return fetch(url);
// };

// fetchNextPlanets()
//   .then(checkStatusAndParse)
//   .then(printPlanets)
//   .then(fetchNextPlanets)
//   .then(checkStatusAndParse)
//   .then(printPlanets)
//   .then(fetchNextPlanets)
//   .then(checkStatusAndParse)
//   .then(printPlanets)
//   .catch((err) => {
//     console.log("SOMETHING WENT WRONG");
//     console.log(err);
//   });

const fetchNextPlanets = (url = "https://swapi.dev/api/planets/") => {
  console.log("Loading next 10 planets.");
  return axios.get(url);
};
const printPlanets = ({ data }) => {
  for (let planet of data.results) {
    console.log(planet.name);
  }
  return Promise.resolve(data.next);
};

fetchNextPlanets()
  .then(printPlanets)
  .then(fetchNextPlanets)
  .then(printPlanets)
  .then(fetchNextPlanets)
  .then(printPlanets)
  .catch((err) => {
    console.log(err);
  });
