const tbodyEl = document.querySelector("tbody");
const regionsEl = document.getElementById("regions");
const continentEl = document.getElementById("continent");

regionsEl.addEventListener("change", (e) => {
  let selectedCountry = e.target.value;
  tbodyEl.innerHTML = "";
  continentEl.innerHTML = "";
  continentEl.innerHTML = `${
    selectedCountry.slice(0, 1).toUpperCase() + selectedCountry.slice(1)
  }`;
  fetchCountryData(selectedCountry);
});

async function fetchCountryData(region = "europe") {
  try {
    await fetch(`https://restcountries.com/v3.1/region/${region}`)
      .then((res) => res.json())
      .then((res) => {
        const sortedCountries = res.sort((a, b) => {
          const nameA = a.name.common.toUpperCase();
          const nameB = b.name.common.toUpperCase();
          return nameA.localeCompare(nameB);
        });
        let num = 1;
        sortedCountries.forEach((country) => {
          console.log(country);
          tbodyEl.innerHTML += `
          <tr>
            <th scope="row">${num++}</th>
            <td>${country.name.common}</td>
            <td>${country.capital}</td>
            <td><img src=${country.flags.png}  width="50px"/></td>
            <td>${Object.values(country.languages)[0]}</td>
            <td><a href="${
              country.maps.googleMaps
            }" target="_blank" title="Open in google map" class="text-decoration-none">View</a></td>
          </tr>`;
        });
      });
  } catch (error) {
    console.error("Error fetching country data:", error);
  }
}

fetchCountryData();
