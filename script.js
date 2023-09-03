const temp1 = document.createElement('div');
const btn1 = document.createElement('button');
const btn2 = document.createElement('button');
const temp2 = document.createElement('div');
let city;
localStorage.getItem("myEWW") ? city=localStorage.getItem("myEWW") : city="";
let temper = "";
let lang = "en-US"

lang = navigator.language || navigator.userLanguage;
console.log(lang);

function weatherText(city, temper) {
  let text = `Now in ${city} \r\n`;
  text += `${Math.round(temper.temp - 273.15)} Celsius \r\n`;
  text += `Humidity ${temper.humidity} % \r\n`
  text += `Pressure ${temper.pressure} hPa`
  return text
}

async function tempMsg() {
  const response2 = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3bc1ef575cc5989e4613e1cb9a754ce4`);
  const weather = await response2.json();
  temper = await weather.main;
  temp2.setAttribute('style', 'white-space: pre;');
  temp2.textContent = weatherText(city, temper);
  document.body.appendChild(temp2);
}

async function ifCityCorrect(){
  localStorage.setItem("myEWW", city);
  const response2 = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3bc1ef575cc5989e4613e1cb9a754ce4`);
  const weather = await response2.json();
  temper = await weather.main;
  chrome.browserAction.setIcon({path: `/icons/{Math.round(temper.temp - 273.15)}.png`});
  temp2.setAttribute('style', 'white-space: pre;');
  temp2.textContent = weatherText(city, temper);
  document.body.appendChild(temp2);
  temp1.remove();
  btn1.remove();
  btn2.remove();
}

function ifCityInCorrect(){
    temp1.textContent = `Type your city`
    const enterCity = document.createElement('input')
    temp1.after(enterCity)
    const submitCity = document.createElement('button')
    submitCity.innerText = 'Submit city';
    enterCity.after(submitCity)
    btn1.remove();
    btn2.remove();
    submitCity.addEventListener("click", async ()=>{
      city = enterCity.value;
      localStorage.setItem("myEWW", city);
      enterCity.remove();
      submitCity.remove();
      ifCityCorrect();
    });
}

async function getCity(){
      const cityFetch = await fetch(`https://ipapi.co/json/`);
      const ip = await cityFetch.json();
      console.log(ip.city)
      city = await ip.city;
      temp1.textContent = `Are you in ${city} or near?`
}

async function easyWeatherApp() {
    if (localStorage.getItem("myEWW")) {     // start if local storage
      temp1.textContent = `Are you still in ${city} or near?`;
      document.body.appendChild(temp1);
    } else {
      getCity()         
    }
      temp1.after(btn1);
      btn1.innerText = 'Yes';
      btn1.addEventListener("click", ifCityCorrect );
      
      btn2.innerText = 'No';
      btn1.after(btn2);
      btn2.addEventListener("click", ifCityInCorrect);

      temp2.textContent = weatherText(city, temper);
      document.body.appendChild(temp2);

      tempMsg()
    }

easyWeatherApp();