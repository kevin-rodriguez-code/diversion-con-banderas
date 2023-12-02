const countriesList = document.getElementById("countries-list");
const modal = document.querySelector(".modal");

const sortCountries = (countries) => {
    const orderedCountries = countries.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
    );

    return orderedCountries;
};

const closeModal = () => {
    modal.classList.add("hidden");
};

const modalCountryDetail = (country) => {
    modal.classList.remove("hidden");
    const capital = country.capital ? country.capital[0] : "No tiene capital";
    modal.innerHTML = `
    <div>
      <div class="img-info-container">
        <img src="${country.flags[1]}" alt="image country">
        <div>
          <h2>${country.name.common}</h2>
          <p>Capital: ${capital}</p>
          <p>Población: ${country.population}</p>
          <p>Lado de la carretera: ${country.car.side}</p>
        </div>
      </div>
      <button class="close-btn" onclick="closeModal()">Cerrar</button>
    </div>
    `;
};

const printCountries = (countries) => {
    countries.forEach((country) => {
        countriesList.innerHTML += `
        <div class="card">
        <img src="${country.flags[1]}" alt="image country">
        <h2>${country.name.common}</h2>
        </div>
        `;
    });

    countries.forEach((country, index) => {
        const elementCountry = document.getElementsByClassName("card")[index];
        elementCountry.addEventListener("click", () => modalCountryDetail(country));
    });
};

const getCountries = async() => {
    try {
        const res = await fetch("https://restcountries.com/v3/all");
        if (!res.ok) {
            throw new Error("Hubo un problema cargando los países");
        }
        const countries = await res.json();
        const orderedCountries = sortCountries(countries);
        printCountries(orderedCountries);
    } catch (error) {
        console.error(error);
        countriesList.innerHTML = error;
    }
};

getCountries();