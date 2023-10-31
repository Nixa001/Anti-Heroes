var pageSize = 20;
var currentPage = 0;
var filter = "name";
var isAsc = false;
var totalHeroes = 0;

document.addEventListener("DOMContentLoaded", () => {
  let header = document.querySelector("header");
  let tHead = document.querySelector(".table-sortable thead");
  tHead.style.top = header.clientHeight + "px";
});

function applyFilter(target, filter) {
  let currentFilter = document.querySelector(".current-filter");
  currentFilter.querySelector("span").innerHTML = "";
  if (target) {
    if (currentFilter != target) {
      if (currentFilter) {
        currentFilter.classList.toggle("current-filter");
      }
    }
    isAsc = target.classList.contains("th-sort-asc");
    target.classList.toggle("th-sort-asc");
    target.classList.add("current-filter");
    target.classList.toggle("th-sort-desc");
    if (isAsc) {
      target.querySelector(".icon").innerHTML = "arrow_drop_up";
    } else {
      target.querySelector(".icon").innerHTML = "arrow_drop_down";
    }
  }
  switch (filter) {
    case "name":
      return sortName(!isAsc);
    case "powerstats":
      return sortByPowerStat(!isAsc);
    case "full-name":
      return sortFullName(!isAsc);
    case "gender":
      return sortGender(!isAsc);
    case "race":
      return sortRace(!isAsc);
    case "height":
      return sortHeight(!isAsc);
    case "weight":
      return sortWeight(!isAsc);
    case "place_of_birth":
      return sortPlaceOfBirth(!isAsc);
    case "alignment":
      return sortAlignment(!isAsc);
    default:
      break;
  }
}

// Récupération des données depuis l'URL
/* Le code utilise la fonction `fetch` pour effectuer une requête GET à l'URL spécifiée */
var getData = () => {
  return fetch(
    "https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json"
  ).then((response) => response.json());
};

// "superheroes" contient le fichier JSON récupéré
getData().then((superheroes) => {
  totalHeroes = superheroes.length;
  const pageCount = document.querySelector(".current_page");
  const maxPage = document.querySelector(".max_page");
  pageCount.innerHTML = currentPage + 1;
  maxPage.innerHTML = Math.ceil(superheroes.length / pageSize);
  // Gestion de la sélection du nombre d'éléments par page
  document.getElementById("Size").addEventListener("change", () => {
    if (document.getElementById("Size").value == "All") {
      pageSize = superheroes.length;
      maxPage.innerHTML = Math.ceil(superheroes.length / pageSize);
      // console.log("pageSize:", pageSize);
    } else {
      pageSize = parseInt(document.getElementById("Size").value);
      maxPage.innerHTML = Math.ceil(superheroes.length / pageSize);
    }
    applyFilter(null, filter).then((data) => {
      displaySuperheroes(currentPage, data);
      updateUrl();
    });
  });

  applyFilter(null, filter).then((data) => {
    displaySuperheroes(currentPage, data);
    updateUrl();
  });
  // Affichez les superhéros de la première page au chargement initial
  // displaySuperheroes(currentPage, superheroes);

  document.getElementById("nextPage").addEventListener("click", () => {
    if (currentPage < Math.ceil(superheroes.length / pageSize) - 1) {
      currentPage++;
      pageCount.innerHTML = currentPage + 1;
      applyFilter(null, filter).then((data) => {
        displaySuperheroes(currentPage, data);
        updateUrl();
      });
    }
  });

  // Gérez le bouton "Previous"
  document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage--;
      pageCount.innerHTML = currentPage + 1;
      applyFilter(null, filter).then((data) => {
        displaySuperheroes(currentPage, data);
      });
      updateUrl();
    }
  });

  document.getElementById("search").addEventListener("keyup", () => {
    let type = document.getElementById("searchField").value;
    let input, table, tr;
    input = document.getElementById("search");
    value = input.value.toUpperCase();
    table = document.getElementById("heroesTable");
    tr = table.getElementsByTagName("tr");

    let data = superheroes.filter((hero) => {
      switch (type) {
        case "name":
          return hero.name.toLowerCase().includes(value.toLowerCase());
        case "race":
          return hero.appearance.race
            ? hero.appearance.race.toLowerCase().includes(value.toLowerCase())
            : false;
        case "full-name":
          return hero.biography.fullName
            ? hero.biography.fullName
                .toLowerCase()
                .includes(value.toLowerCase())
            : false;
        case "gender":
          return hero.appearance.gender
            ? hero.appearance.gender.toLowerCase().includes(value.toLowerCase())
            : false;
        default:
          break;
      }
    });
    currentPage = 0;
    displaySuperheroes(currentPage, data);
  });
});

// Fonction pour créer une ligne de tableau pour un superhéros
function createHeroRow(superhero) {
  const row = document.createElement("tr");
  const PowerstatsKeys = Object.keys(superhero.powerstats);
  const PowerstatsValues = Object.values(superhero.powerstats);
  let Powerstats = "";
  for (let i = 0; i < PowerstatsKeys.length; i++) {
    Powerstats +=
      `<ul key=${PowerstatsKeys[i]} value=${PowerstatsValues[i]}> ` +
      PowerstatsKeys[i] +
      ":  " +
      PowerstatsValues[i] +
      "</ul>";
  }
  row.innerHTML = `
    <td><a href="${superhero.biography.url}"><img src="${superhero.images.xs}" alt="${superhero.name}"></a>
    <td>${superhero.name}</td>
    <td>${superhero.biography.fullName}</td>
    <td class="stats">${Powerstats}</td>
    <td>${superhero.appearance.gender}</td>
    <td>${superhero.appearance.race}</td>
    <td>${superhero.appearance.height[0]}</td>
    <td>${superhero.appearance.weight[0]}</td>
    <td>${superhero.biography.placeOfBirth}</td>
    <td>${superhero.biography.alignment}</td>
`;
  return row;
}

// Fonction pour afficher les superhéros de la page spécifiée
function displaySuperheroes(page, superheroes) {
  const tbody = document.getElementById("heroesTable");
  // Effacez le contenu actuel de la table
  tbody.innerHTML = "";

  const startIndex = page * pageSize;
  const endIndex = startIndex + pageSize;

  // Boucle pour ajouter les superhéros de la page actuelle
  for (let i = 0; i < endIndex && i < superheroes.length; i++) {
    const superhero = superheroes[i];
    const row = createHeroRow(superhero);
    tbody.appendChild(row);
  }
}

document.querySelectorAll(".table-sortable th").forEach((headerCell) => {
  headerCell.addEventListener("click", async (event) => {
    let target = event.target;
    filter = target.getAttribute("name");
    applyFilter(target, filter).then((data) => {
      console.log(data);
      displaySuperheroes(currentPage, data);
      updateUrl();
    });
  });
});

function updateUrl() {
  let url = new URL(location);
  const state = { currentPage, pageSize, filter, isAsc };
  history.pushState(state, "", url);
  location.pathname;
}
