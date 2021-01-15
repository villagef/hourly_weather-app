const API = "./data/data.json";
const scrollContainer = document.querySelector(".rightColumnWrapper");
const leftShadow = document.querySelector(".shadowLeft");
const rightShadow = document.querySelector(".shadowRight");
const cardWrapper = document.querySelector(".rightColumnWrapper");
let leftScroll = false;

rightShadow.classList.add("offRight");

//this async function handle data from API and displays them 
async function fetchData() {
  await fetch(API)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data.map((d) => {
        cardWrapper.innerHTML += `
                    <div class="card flex" id="${d.id}">
                        <div class="daySection flex">
                        </div>
                        <div class="hourSection flex row" id="hourSection">
                            <p>${d.hour}</p>
                        </div>
                        <div class="forecastSection flex row" id="forecastSection">
                            <i class="fa-3x fas ${d.forecast}" style="color: #2d92e5;"></i>
                        </div>
                        <div class="tempSection flex row" id="tempSection">
                            <p>${d.temp}°</p>
                        </div>
                        <div class="rainSection flex row" id="rainSection">
                            <p>${d.rain}mm</p>
                        </div>
                        <div class="windSection flex row" id="windSection">
                            <p>${d.wind}</p>
                        </div>
                        <div class="speedSection flex row id="speedSection">
                            <p>${d.speed[0]}</p>
                            <p>${d.speed[1]} km/h</p>
                        </div>
                        <div class="pressureSection flex row" id="pressureSection">
                            <p>${d.pressure} hPa</p>
                        </div>
                    </div>
                    `;
      });
    })
    .catch((err) => console.log(err));
}

fetchData();

//this function handle left and right box shadow onScroll
function setShadows(event) {
  if (!leftScroll) {
    window.requestAnimationFrame(function () {
      if (
        event.target.scrollLeft == 0 ||
        event.target.scrollLeft <
          event.target.scrollWidth - event.target.clientWidth
      ) {
        rightShadow.classList.add("offRight");
      } else {
        rightShadow.classList.remove("offRight");
      }

      if (event.target.scrollLeft > 0) {
        leftShadow.classList.add("offLeft");
      } else {
        leftShadow.classList.remove("offLeft");
      }

      leftScroll = false;
    });
    leftScroll = true;
  }
}

scrollContainer.addEventListener("scroll", setShadows);
