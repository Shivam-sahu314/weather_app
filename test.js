 const apiKey = "0461b357658aa5892867600c5ffd6aa0";

document.getElementById("weatherForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const city = document.getElementById("cityInput").value;
  const weatherResult = document.getElementById("weatherResult");

  weatherResult.innerHTML = "Loading...";

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      const temp = data.main.temp;
      const description = data.weather[0].description;
      const icon = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      weatherResult.innerHTML = `
        <h2>${data.name}</h2>
        <img src="${iconUrl}" alt="${description}" />
        <p><strong>${temp}°C</strong></p>
        <p>${description}</p>
      `;
    })
    .catch(error => {
      weatherResult.innerHTML = `<p style="color: red;">${error.message}</p>`;
    });
});
