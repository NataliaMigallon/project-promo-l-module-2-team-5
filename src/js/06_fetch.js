"use strict";

const createBtn = document.querySelector(".js-create-btn");
const cardResultElement = document.querySelector(".js-card-result");
const urlShareElement = document.querySelector(".js-share__link");
const shareContainer = document.querySelector(".js-share__container");

function handleCreateBtn(ev) {
  ev.preventDefault();
  console.log("Mis datos", getUserData());

  const url =
    "https://us-central1-awesome-cards-cf6f0.cloudfunctions.net/card/";
  const data = getUserData();

  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Server response:", data);
      if (data.success === true) {
        cardResultElement.innerHTML = data.cardURL;
        urlShareElement.innerHTML = data.cardURL; //para que pinte en la interfaz
        shareContainer.classList.remove("hidden");
      } else {
        cardResultElement.innerHTML = data.error;
        urlShareElement.innerHTML = "ERROR. No se ha podido crear la tarjeta";
      }
    });
}

createBtn.addEventListener("click", handleCreateBtn);
