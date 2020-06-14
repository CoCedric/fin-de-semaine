//  Ligne 12

let timer = document.getElementById("timer");
let hourDigit = document.getElementsByClassName("hour")[0];
let minuteDigit = document.getElementsByClassName("minute")[0];
let secondDigit = document.getElementsByClassName("second")[0];
let clock = Array.from({ lenght: 4 });
let pourcent = 0;

function newRatio() {
  //
  //  Rendu ici, doit creer une node
  //
}

function dayString(j) {
  switch (j) {
    case 0:
      return "Dimanche";
      break;
    case 1:
      return "Lundi";
      break;
    case 2:
      return "Mardi";
      break;
    case 3:
      return "Mercredi";
      break;
    case 4:
      return "Jeudi";
      break;
    case 5:
      return "Vendrdi";
      break;
    case 6:
      return "Samedi";
      break;
    default:
      console.error("dayString incorect");
  }
}

function weekProgress() {
  let ratio = 0;

  function hour(p) {
    // doit retourner un x / 1 de la journee avec secondes
    let [h, m, s] = [clock[1], clock[2], clock[3]];
    return ((h - 6) * 3600 + m * 60 + s) / 36000;
  }

  function day() {
    // return a week() un % si la journe est fini ou commencee
    // si au travail => hourXX() pour avoir le temps reel

    // en finissant tout ca j'ai pense que j'aurais pu juste initialiser un nombre et lui ajouter des periodes...

    if (clock[1] < 6) {
      return 0;
    } else if (clock[1] > 6 && clock[1] < 11 && clock[2] < 57) {
      return hour(AM);
    } else if (
      clock[1] > 11 &&
      clock[2] >= 57 &&
      clock[1] <= 12 &&
      clock[2] < 27
    ) {
      console.log("Break!");
      return 6 / 40;
    } else if (
      clock[1] >= 12 &&
      clock[2] > 27 &&
      clock[1] <= 16 &&
      clock[2] < 30
    ) {
      return hour(PM);
    } else {
      return 0.25;
    }
  }
  function week() {
    // return 1 ou 0 de la semaine
    // si semaine en cours, => day() pour avoir un x / 1
    i = 0;
    if (clock[0] < 1) {
      return 0;
    } else if (clock[0] > 0 && clock[0] < 5) {
      i = day() + clock[0] / 4;
    } else {
      i = 1;
    }

    ratio = i.toPrecision(2);
    if (ratio !== pourcent) {
      newRatio();
    }
  }

  return ratio;
}

function updater() {
  console.log("updating");
  let time = new Date();
  let jour = time.getDay();
  let curMinute = time.getMinutes();
  let curSecond = time.getSeconds();
  let curHour = time.getHours();
  clock = [jour, curHour, curMinute, curSecond];
  printer();
}

function printer() {
  timer.innerHTML = dayString(clock[0]);
  [hourDigit.innerHTML, minuteDigit.innerHTML, secondDigit.innerHTML] = [
    clock[1],
    clock[2],
    clock[3],
  ];
}

updater();
setInterval(() => {
  updater();
  weekProgress();
}, 1000);
