

const API = "./data/data.json";

const scrollContainer = document.querySelector(".rightColumnWrapper");
const leftShadow = document.querySelector(".shadowLeft");
const rightShadow = document.querySelector(".shadowRight");
const cardWrapper = document.querySelector(".rightColumnWrapper");
let leftScroll = false;

rightShadow.classList.add("offRight");

//this async function handle data from API and displays them 
(async function fetchData() {
  await fetch(API)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data.map((d) => {
        cardWrapper.innerHTML += `
                    <div class="card flex" id="${d.id}">
                        <div class="daySection flex">
                          <p>${handleDate(d.hour, d.date)}</p>
                        </div>
                        <div class="hourSection flex row" id="hourSection">
                            <p>${d.hour}</p>
                        </div>
                        <div class="forecastSection flex row" id="forecastSection">
                            <i class="fa-3x fas ${d.forecast}" style="color: #2d92e5;"></i>
                        </div>
                        <div class="tempSection flex row" id="tempSection">
                            <p>${handleLine(d.temp)}</p>
                        </div>
                        <div class="rainSection flex row" id="rainSection">
                          ${handleBar(d.rain)}
                        </div>
                        <div class="windSection flex row" id="windSection">
                            <i class="fas fa-long-arrow-alt-up fa-2x" style="transform: rotate(${d.windDeg}deg)"></i>
                            <p>${d.wind}</p>
                        </div>
                        <div class="speedSection flex row id="speedSection">
                            <p>${d.speed[0]}</p>
                            <p>${d.speed[1]} km/h</p>
                        </div>
                        <div class="pressureSection flex row" id="pressureSection">
                            <p>${handlePressure(d.pressure)}</p>
                        </div>
                    </div>
                    `;
      });
    })
    .catch((err) => console.log(err));
})();


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

//call for setShadow function
scrollContainer.addEventListener("scroll", setShadows);


//day text label handle
function handleDate(h,d) {
  const today = new Date("Fri Jan 15 2021 GMT+0100 (czas środkowoeuropejski standardowy)");
  const tomorrow = new Date("Sat Jan 16 2021 GMT+0100 (czas środkowoeuropejski standardowy)");
  const hour = "00:00";
  
  if (h == hour && formatDate(d) == formatDate(today)) {
    return 'Dzisiaj';
  } 
  else if (h == hour && formatDate(d) == formatDate(tomorrow)) {
    return 'Jutro'
  }
  else {
    return '';
  }
}

//date format
function formatDate(date) {
  let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}


function handleBar(r) {
  if(r != 0) {
    return `
    <div class="rainWrapper">
      <div class="rainChart" style="height: ${r*10}%"></div>
      <div class="rainLabel">
        <p>${r} mm</p>
      </div>
    </div>
    `
  } else {
    return ''
  }
}


function handleLine(r) {
  if(r) {
    return `
    <div class="lineWrapper">
      <div class="lineChart" style="height: ${r*4}%"></div>
      <div class="lineLabel flex">
        <p>${r}°</p>
        <p class="dot"></p>
      </div>
    </div>
    `
  } else {
    return ''
  }
}

function handlePressure(r) {
  let pressure = new String(r);
  let lastNumber = '';

  if(pressure.length == 4) {
    lastNumber = pressure.charAt([2]) + pressure.charAt([3]);
  } else {
    lastNumber = pressure.charAt([2]) - 10;
  }
  
  let h = parseInt(lastNumber) + 40;
  
  if(r) {
    return `
    <div class="pressureWrapper">
      <div class="pressureChart" style="height: ${h}%"></div>
      <div class="pressureLabel flex">
        <p>${r} hPa</p>
        <p class="dot"></p>
      </div>
    </div>
    `
  } else {
    return ''
  }
}