const temp = document.getElementById('field');
let city = "";
let temper = "";
let lang = "en-US"



lang = navigator.language || navigator.userLanguage;
console.log(lang);

async function getCity() {
     const response = await fetch(`https://ipapi.co/json/`);
    const ip = await response.json();
    console.log(ip.city);  
    const cityCheck = document.createElement('div');
    

}

// async function getWeather() {
//     const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=Madrid&appid=3bc1ef575cc5989e4613e1cb9a754ce4
//     `);
//     const weather = await response.json();
//     console.log(weather);
//     temper = await weather;
// }

// async function getIp() {
//     const response = await fetch(`https://ipapi.co/json/`);
//     const ip = await response.json();
//     console.log(ip)

//   }
// async function getAll() {
//     const response = await fetch(`https://ipapi.co/json/`);
//     const ip = await response.json();
//     console.log(ip.city)
//     city = await ip.city;
//         const response2 = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3bc1ef575cc5989e4613e1cb9a754ce4`);
//         const weather = await response2.json();
//         console.log(weather.main);
//         temper = await weather.main;
//         temp.setAttribute('style', 'white-space: pre;');
//         temp.textContent = `Now in ${city} \r\n`
//         temp.textContent += `${Math.round(temper.temp - 273.15)} Celsius \r\n`
//         temp.textContent += `Humidity ${temper.humidity} % \r\n`
//         temp.textContent += `Pressure ${temper.pressure} hPa`
// }

async function ifCityCorrect(){
  localStorage.setItem("myEWW", city);
  const response2 = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3bc1ef575cc5989e4613e1cb9a754ce4`);
  const weather = await response2.json();
  //add to local storage
  temper = await weather.main;
  temp.setAttribute('style', 'white-space: pre;');
  temp.textContent = `Now in ${city} \r\n`
  temp.textContent += `${Math.round(temper.temp - 273.15)} Celsius \r\n`
  temp.textContent += `Humidity ${temper.humidity} % \r\n`
  temp.textContent += `Pressure ${temper.pressure} hPa`
}

function ifCityInCorrect(){
    temp.textContent = `Type your city`
    const enterCity = document.createElement('input')
    temp.after(enterCity)
    const submitCity = document.createElement('button')
    submitCity.innerText = 'Submit city';
    enterCity.after(submitCity)
    submitCity.addEventListener("click", async ()=>{
      city = enterCity.value;
      ifCityCorrect();
    });
}

// getWeather();
// getIp();

// i18next.init({
//     lng: 'en',
//     resources: {
//       en: {
//         translation: {
//           'hello': 'Hello',
//           'world': 'World'
//         }
//       },
//       fr: {
//         translation: {
//           'hello': 'Bonjour',
//           'world': 'Monde'
//         }
//       }
//     }
//   });
  
  //console.log(i18next.t('hello')); // Output: Hello
  
//   const languages = {
//     en: {
//       greeting: 'Hello'
//     },
//     fr: {
//       greeting: 'Bonjour'
//     }
//   };
  
//   const lang = 'en';
//   console.log(languages[lang].greeting); // Output: Hello
  

//getAll();





// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
//   } else {
//     console.log("Geolocation is not supported by this browser.");
//   }
  
//   function showPosition(position) {
//     console.log("Latitude: " + position.coords.latitude +
//     "<br>Longitude: " + position.coords.longitude);
//   }
  
//-----------------------------

async function easyWeatherApp() {
    // start if local storage
    const cityFetch = await fetch(`https://ipapi.co/json/`);
    const ip = await cityFetch.json();
    console.log(ip.city)
    city = await ip.city;
    temp.textContent = `Are you in ${city} or near?`
    
    const btn1 = document.createElement('button');
    temp.after(btn1);
    btn1.innerText = 'Yes';
    btn1.setAttribute('id','btn1') // no
    btn1.addEventListener("click", ifCityCorrect );
    
    const btn2 = document.createElement('button');
    btn2.innerText = 'No';
    btn1.after(btn2);
    btn2.addEventListener("click", ifCityInCorrect);
}

//  function getFromStorage(){
//   localStorage.setItem("myCat", "Tom");
//   const cat = localStorage.getItem("myCat");
//   console.log(cat); // null
// }

//getFromStorage();
easyWeatherApp();