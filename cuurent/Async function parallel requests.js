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

// const fetchNextPlanets = (url = "https://swapi.dev/api/planets/") => {
//   console.log("Loading next 10 planets.");
//   return axios.get(url);
// };
// const printPlanets = ({ data }) => {
//   for (let planet of data.results) {
//     console.log(planet.name);
//   }
//   return Promise.resolve(data.next);
// };

// fetchNextPlanets()
//   .then(printPlanets)
//   .then(fetchNextPlanets)
//   .then(printPlanets)
//   .then(fetchNextPlanets)
//   .then(printPlanets)
//   .catch((err) => {
//     console.log(err);
//   });

// async function getPlanets() {
//   const res = await axios.get("http://swapi.dev/api/planets/");
//   console.log(res.data);
// }
// getPlanets().catch((err) => {
//   console.log("IN CATCH!!!", error);
// });

// async function getPlanets() {
//   try {
//     const res = await axios.get("http://swapi.dev/api/planets/");
//     console.log(res.data);
//   } catch (error) {
//     console.log("IN CATCH!!!", error);
//   }
// }

// // SEQUENTIAL REQUESTS!
// async function get3Pokemon() {
//   const poke1 = await axios.get("https://pokeapi.co/api/v2/pokemon/1/");
//   const poke2 = await axios.get("https://pokeapi.co/api/v2/pokemon/2/");
//   const poke3 = await axios.get("https://pokeapi.co/api/v2/pokemon/3/");
//   console.log(poke1.data);
//   console.log(poke2.data);
//   console.log(poke3.data);
//   3;
// }

// //PARALLEL REQUESTS!
// async function get3Pokemon() {
//   //Get promises to variables.
//   const prom1 = axios.get("https://pokeapi.co/api/v2/pokemon/1/");
//   const prom2 = axios.get("https://pokeapi.co/api/v2/pokemon/2/");
//   const prom3 = axios.get("https://pokeapi.co/api/v2/pokemon/3/");
//   // Get data from promises to variables.
//   const poke1 = await prom1;
//   const poke2 = await prom2;
//   const poke3 = await prom3;
//   console.log(poke1.data);
//   console.log(poke2.data);
//   console.log(poke3.data);
// }

// get3Pokemon();

async function get3Pokemon() {
  try {
    //Get promises to variables.
    const prom1 = axios.get("https://pokeapi.co/api/v2/pokemon/1/");
    const prom2 = axios.get("https://pokeapi.co/api/v2/pokemon/2/");
    const prom3 = axios.get("https://pokeapi.co/api/v2/pokemon/3/");
    // Get data from promises to variables.
    const results = await Promise.all([prom1, prom2, prom3]);
    printPokemon(results);
  } catch (error) {
    console.log("CATCHED", error);
  }
}

function printPokemon(results) {
  for (let pokemon of results) {
    console.log(pokemon.data.name);
  }
}
