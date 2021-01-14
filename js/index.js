const cardWrapper = document.querySelector(".rightColumnWrapper");
const cardSection = document.querySelector(".rightColumnSection");
class WeatherApp {
    constructor() {
        this.API = './data/data.json';
    }

    async fetchData() {
        await fetch(this.API)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                data.map(d => {
                    cardWrapper.innerHTML +=  `
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
                            <p>${d.temp}</p>
                        </div>
                        <div class="rainSection flex row" id="rainSection">
                            <p>${d.rain}</p>
                        </div>
                        <div class="windSection flex row" id="windSection">
                            <p>${d.wind}</p>
                        </div>
                        <div class="speedSection flex row id="speedSection">
                            <p>${d.speed[0]}</p>
                            <p>${d.speed[1]}</p>
                        </div>
                        <div class="pressureSection flex row" id="pressureSection">
                            <p>${d.pressure} hPa</p>
                        </div>
                    </div>
                    `
                })
            })
            .catch(err => console.log(err));
    }
    
}

//handle left arrow
$(".leftArrow").click(function() {
    var box = $(".rightColumnWrapper"),
      x;
      
      x = ((box.width() / 2)) - box.scrollLeft();
      box.animate({
        scrollLeft: -x,
      })
  })

  //handle right arrow
$(".rightArrow").click(function() {
    var box = $(".rightColumnWrapper"),
      x;

      x = ((box.width() / 2)) + box.scrollLeft();
      box.animate({
        scrollLeft: +x,
      })
  })
  
  



