
class WeatherApp {
    constructor() {
        this.API = './data/data.json';
    }

    async initData() {
        const response = await fetch(this.API);
        const parsedResponse = await response.json();

        console.log(parsedResponse)
    }
}



