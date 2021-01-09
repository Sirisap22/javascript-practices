const warriorsGames = [
  {
    awayTeam: {
      team: "Golden State",
      points: 119,
      isWinner: true,
    },
    homeTeam: {
      team: "Houston",
      points: 106,
      isWinner: false,
    },
  },
  {
    awayTeam: {
      team: "Golden State",
      points: 105,
      isWinner: false,
    },
    homeTeam: {
      team: "Houston",
      points: 127,
      isWinner: true,
    },
  },
  {
    homeTeam: {
      team: "Golden State",
      points: 126,
      isWinner: true,
    },
    awayTeam: {
      team: "Houston",
      points: 85,
      isWinner: false,
    },
  },
  {
    homeTeam: {
      team: "Golden State",
      points: 92,
      isWinner: false,
    },
    awayTeam: {
      team: "Houston",
      points: 95,
      isWinner: true,
    },
  },
  {
    awayTeam: {
      team: "Golden State",
      points: 94,
      isWinner: false,
    },
    homeTeam: {
      team: "Houston",
      points: 98,
      isWinner: true,
    },
  },
  {
    homeTeam: {
      team: "Golden State",
      points: 115,
      isWinner: true,
    },
    awayTeam: {
      team: "Houston",
      points: 86,
      isWinner: false,
    },
  },
  {
    awayTeam: {
      team: "Golden State",
      points: 101,
      isWinner: true,
    },
    homeTeam: {
      team: "Houston",
      points: 92,
      isWinner: false,
    },
  },
];

// for (let teamData of warriorsGames) {
//   const awayTeam = teamData.awayTeam;
//   const homeTeam = teamData.homeTeam;
//   const createdEle = document.createElement("li");
//   if (awayTeam.points > homeTeam.points) {
//     createdEle.innerHTML = `${awayTeam.team} @ ${homeTeam.team} <b>${awayTeam.points}</b>-${homeTeam.points}`;
//   } else {
//     createdEle.innerHTML = `${awayTeam.team} @ ${homeTeam.team} ${awayTeam.points}-<b>${homeTeam.points}</b>`;
//   }

//   for (let currentMatch in teamData) {
//     if (teamData[currentMatch].team === "Golden State" && teamData[currentMatch].isWinner) createdEle.classList.add("win");
//     else if (teamData[currentMatch].team === "Golden State" && !teamData[currentMatch].isWinner) createdEle.classList.add("loss");
//   }
//   document.body.appendChild(createdEle);
// }

const makeChart = (games, favTeam) => {
  const ulParent = document.createElement("ul");
  for (let game of games) {
    const gameLi = document.createElement("li");
    gameLi.innerHTML = getScoreLine(game);
    gameLi.classList.add(isWinner(game, favTeam) ? "win" : "loss");
    ulParent.appendChild(gameLi);
  }
  return ulParent;
};

const getScoreLine = ({ homeTeam, awayTeam }) => {
  const { team: hTeam, points: hPoints } = homeTeam;
  const { team: aTeam, points: aPoints } = awayTeam;
  const teamNames = `${aTeam} @ ${hTeam}`;
  let scoreLine;
  if (aPoints > hPoints) {
    scoreLine = `<b>${aPoints}</b>-${hPoints}`;
  } else {
    scoreLine = `${aPoints}-<b>${hPoints}</b>`;
  }
  return `${teamNames} ${scoreLine}`;
};

const isWinner = ({ homeTeam, awayTeam }, favTeam) => {
  const target = homeTeam.team === favTeam ? homeTeam : awayTeam;
  return target.isWinner;
};

const gsSection = document.querySelector("#gs");
const hrSection = document.querySelector("#hr");
const gschart = makeChart(warriorsGames, "Golden State");
const hrchart = makeChart(warriorsGames, "Houston");
gsSection.appendChild(gschart);
hrSection.appendChild(hrchart);
