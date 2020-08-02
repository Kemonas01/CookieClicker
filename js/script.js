/*
 *  Variables globales
 */

// Booléen indiquant si la partie est en cours
let playing = false;

// Niveau de difficulté (3: easy, 2: medium, 1: hard)
// = nombre de secondes pendant lesquelles le cookie est immobile
let difficulty = 3;

// Nombre de clics sur le cookie
let clickCount = 0;

// Temps restant
let remainingTime = 15;

// Numéro de la cellule où se trouve le cookie
// = numéro de l'enfant dans une grille de 9 éléments div de classe col-4
let cell = 4;

// Zone d'affichage du score et du temps restant
let state = document.querySelector("#state");

// Zone d'affichage du score
let score = document.querySelector("span#score");


// Zone d'affichage du score final (fenêtre modale)
let finalScore = document.querySelector("#click-count");

// Zone d'affichage du temps restant
let timeDisplay = document.querySelector("span#time");

// Bouton de démarrage
let startButton = document.querySelector("button");

// Cookie à cliquer
let cookieImage = document.querySelector("img#cookie");

let modal = document.getElementsByClassName("modal")[1];

let setings = document.getElementsByClassName('icon-plus')[0];

let modalSetting = document.getElementsByClassName('modal')[0];

let close = document.querySelectorAll(".close");

let colors = document.getElementById("color");

let formEl = document.querySelector('[name="test"]');

let hall = document.querySelector('[name="fame"]');

let fame = document.querySelector('.fame');

let grid = document.querySelector("div#grid");

let allCells = grid.querySelectorAll('div');

cell = 4;
allCells[cell].appendChild(cookie);

function movingCookie() {
  let cell = Math.trunc(Math.random() * 9);
  allCells[cell].appendChild(cookie);
}


function listFameFromCache()  { 
  if(navigator.onLine){
    if (window.localStorage.getItem("urlTest")){
      var urls = JSON.parse(window.localStorage.getItem("urlTest")).url
      for (var i in urls){
        fetch(urls[i])
        .then(function(resp)  {
          return resp
        })
      window.localStorage.removeItem("urlTest")
      }
    }
  }
}


fetch('./hall_of_fame.php')
  .then(response => {
    return response.json()
  })
  .then(data => {
    // Work with JSON data here
    for (let i = 0; i<data.length; i++)
    {
      fame.innerHTML +='<li>'+data[i].nickname+" à fait "+data[i].score+' clicks </li>';
    }
  })
  .catch(err => {
    // Do something for an error here
  })
fame.innerHTML += '<ul>'


formEl.addEventListener("submit",(event)=> {
  event.preventDefault();


  var form = document.querySelector("#hall_of_fame");
  var url = 'save_score.php?score='+finalScore.textContent+'&nickname='+nickname.value;
 
  
  fetch(url)
  .then(function(resp){
    return resp
    
  }).catch((err)=>{
    if (window.localStorage.getItem("urlTest")){
      var json = JSON.parse(window.localStorage.getItem("urlTest"))
      json.url.push(url)
      json = JSON.stringify(json)
      window.localStorage.setItem("urlTest", json);
    }
    else {
      window.localStorage.setItem("urlTest", JSON.stringify({url : [url]}));
    }
    
  });
  modal.classList.remove('active');
});

close[0].addEventListener("click",(event)=> {
  modal.classList.remove("active");
  modalSetting.classList.remove("active");
});

close[1].addEventListener("click",(event)=> {
  modal.classList.remove("active");
  modalSetting.classList.remove("active");
});

close[2].addEventListener("click",(event)=> {
  modal.classList.remove("active");
});

close[3].addEventListener("click",(event)=> {
  modal.classList.remove("active");
});

setings.addEventListener("click",(event) => {

  modalSetting.classList.add("active");

});
let interval;
startButton.addEventListener("click", function(event) {
    // La partie est démarrée
    playing = true;
    modal.classList.remove("active");

    // Réinitialisation de l'interface
    reset();
    interval = setInterval(movingCookie, difficulty*1000);
    // Démarrage du compte à rebours
    countdown();
  });

  cookieImage.addEventListener("click", function(event) {
    if (playing) { // Si la partie est en cours
  
      // Mise à jour du score
      clickCount++;
      score.textContent = clickCount;
      finalScore.textContent = clickCount;
    }
  });

  function reset() {
    cell = 4;
    allCells[cell].appendChild(cookie);

    // Cache le bouton start
    startButton.classList.toggle('hidden');
    // Affiche le temps restant
    timeDisplay.classList.toggle("hidden");
    state.classList.add("d-none");


  
    // Remise à zéro du score
    clickCount = 0;
    score.textContent = 0;
  
    // Réinitialisation du temps restant
    remainingTime = 15;

  }

  function countdown() {
    state.classList.remove("d-none");
    score.classList.remove("hidden");
    if (remainingTime == 0) { // Si le temps est écoulé
      // Fin de la partie
      playing = false;
      modal.classList.add("active");
      score.classList.add("hidden");
      document.getElementById('valueScore').value = clickCount;
      // Affiche le bouton start
      startButton.classList.toggle("hidden");
      clearInterval(interval);
      cell = 4;
      allCells[cell].appendChild(cookie);
      // Cache le temps restant
      timeDisplay.classList.add("hidden");
    }
    else {
      // Mise à jour des secondes restantes
      timeDisplay.textContent = remainingTime + " seconds left!";
  
      // Modification de la couleur du texte en fonction du temps
      if (remainingTime<=5)
        timeDisplay.style.color = "red";
      else if (remainingTime<=10)
        timeDisplay.style.color = "orange";
      else
        timeDisplay.style.color = "white";
  
      // Mise à jour du temps restant
      remainingTime--;
  
      // Appel de la fonction countdown dans 1 seconde
      window.setTimeout(countdown, 1000);
    }
  }

  var niveau = document.querySelectorAll("[name=level]");


    window.onload = function theme(){

      colors.addEventListener("change",(event)=> {
        localStorage.setItem("color", colors.value);
        document.querySelector("header").style.backgroundColor = localStorage.getItem("color");
      });

      niveau.forEach(level => {
        level.addEventListener('click', ()=>{
          localStorage.setItem("level", level.value);
          console.log(localStorage);
        });
      });
    
  }


  listFameFromCache()