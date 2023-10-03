const temp1 = document.createElement('div');
const btn1 = document.createElement('button');
const btn2 = document.createElement('button');
const temp2 = document.createElement('div');
let city = "";
localStorage.getItem("myEWW") ? city=localStorage.getItem("myEWW") : city="";
let temper = "";
let lang = ""

lang = navigator.language || navigator.userLanguage;
console.log(lang);

function weatherText(city, temper) {
  let text = `Now in ${city} \r\n`;
  text += `${(temper.temp - 273.15)^0} Celsius \r\n`;
  text += `Humidity ${temper.humidity} % \r\n`
  text += `Pressure ${temper.pressure} hPa`
  return text
}

const getCity = async () => {
  const cityFetch = await fetch(`https://ipapi.co/json/`);
  const ip = await cityFetch.json();
  return ip.city;
}

async function getWeather(cityarg){
const city = await cityarg();
const weatherFetch = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${await city}&appid=3bc1ef575cc5989e4613e1cb9a754ce4`);
const weather = await weatherFetch.json();
return await weather.main;
}

function getDataFromLS() {
  if (localStorage.getItem("myEWW")) {
    return localStorage.getItem("myEWW");
  }
  else {
    return false;
  }
}

async function ifCityCorrect(){
   localStorage.setItem("myEWW", city);
   temp1.remove();
   btn1.remove();
   btn2.remove();

}

function ifCityInCorrect(){
    temp2.textContent = '';
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
      temp1.remove();
      enterCity.remove();
      submitCity.remove();
      temp2.textContent = weatherText( city, await getWeather(() => city))
    });
}

async function easyWeatherApp() {
  console.log(await getCity());
  console.log(await getWeather(getCity));
  console.log(getDataFromLS())
  const aaa = localStorage.getItem("myEWW")
  console.log(getDataFromLS())
  if (getDataFromLS()) {
    const city = getDataFromLS();
    temp1.textContent = `Are you still in ${city} or near?`
    document.body.insertBefore(temp1, document.body.firstChild);

    temp1.after(btn1);
    btn1.innerText = 'Yes';
    btn1.addEventListener("click", ifCityCorrect );
    
    btn2.innerText = 'No';
    btn1.after(btn2);
    btn2.addEventListener("click", ifCityInCorrect );

    temp2.setAttribute('style', 'white-space: pre;');
    temp2.textContent = weatherText(await city, await getWeather(getCity))
    document.body.insertBefore(temp2, document.body.firstChild);
  } else {
    console.log(temp1)
    const city = await getCity()
    temp1.textContent = `Are you in ${await city} or near?`
    document.body.prepend(temp1);
  
    temp1.after(btn1);
    btn1.innerText = 'Yes';
    btn1.addEventListener("click", ifCityCorrect );
    
    btn2.innerText = 'No';
    btn1.after(btn2);
    btn2.addEventListener("click", ifCityInCorrect );

    temp2.setAttribute('style', 'white-space: pre;');
    temp2.textContent = weatherText(await city, await getWeather(getCity))
    btn2.after(temp2);
    
  }

}

easyWeatherApp();