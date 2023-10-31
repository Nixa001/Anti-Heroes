var sortByPowerStat = async (asc) => {
  let start = currentPage * pageSize;
  start = start + pageSize > totalHeroes ? totalHeroes - pageSize : start;
  let end = start + window.pageSize;
  const superheroes = await getData();
  superheroes.sort((a, b) => {
    let overAllA = Object.values(a.powerstats).reduce(
      (acc, stat) => acc + parseInt(stat) / 6
    );
    let overAllB = Object.values(b.powerstats).reduce(
      (acc_1, stat_1) => acc_1 + parseInt(stat_1) / 6
    );
    return overAllA - overAllB;
  });
  return await (asc
    ? superheroes.slice(start, end)
    : superheroes.reverse().slice(start, end));
};

var sortName = async (asc) => {
  let start = currentPage * pageSize;
  start = start + pageSize > totalHeroes ? totalHeroes - pageSize : start;
  let end = start + pageSize;
  const superheroes = await getData();
  superheroes.sort((b, a) => {
    let fa = a.name.toLowerCase(),
      fb = b.name.toLowerCase();
    return fa - fb;
  });
  return asc
    ? superheroes.slice(start, end)
    : superheroes.reverse().slice(start, end);
};

var sortFullName = async (asc) => {
  let start = currentPage * pageSize;
  start = start + pageSize > totalHeroes ? totalHeroes - pageSize : start;
  let end = start + pageSize;
  const superheroes = await getData();
  superheroes.sort((a, b) => {
    let fullNameA = a.biography.fullName.toLowerCase();
    let fullNameB = b.biography.fullName.toLowerCase();
    if (!fullNameA) {
      return 1;
    }
    const { fa, fb } = firstDifferentCharacter(fullNameA, fullNameB);
    return fb
      ? asc
        ? fa.charCodeAt(0) - fb.charCodeAt(0)
        : fb.charCodeAt(0) - fa.charCodeAt(0)
      : -1;
  });
  return superheroes.slice(start, end);
};

function firstDifferentCharacter(string1, string2) {
  for (let i = 0; i < string1.length; i++) {
    if (string1[i] !== string2[i]) {
      return {
        fa: string1[i],
        fb: string2[i],
      };
    }
    return { fa: string1[string1.length - 1], fb: null };
  }
}

var sortGender = async (asc) => {
  let start = currentPage * pageSize;
  start = start + pageSize > totalHeroes ? totalHeroes - pageSize : start;
  let end = start + pageSize;
  const superheroes = await getData();
  superheroes.sort((a, b) => {
    const genderA = a.appearance.gender.toLowerCase();
    const genderB = b.appearance.gender.toLowerCase();
    if (genderA == "-") {
      return 1;
    }
    if (genderB == "-") {
      return 0;
    }

    return asc
      ? genderA.charCodeAt(0) - genderB.charCodeAt(0)
      : genderB.charCodeAt(0) - genderA.charCodeAt(0);
  });
  return superheroes.slice(start, end);
};

var sortRace = async (asc) => {
  let start = currentPage * pageSize;
  start = start + pageSize > totalHeroes ? totalHeroes - pageSize : start;
  let end = start + pageSize;
  const superheroes = await getData();
  superheroes.sort((a, b) => {
    if (a.appearance.race == null) {
      return 1;
    }
    if (b.appearance.race == null) {
      return 0;
    }
    const raceA = a.appearance.race.toLowerCase();
    const raceB = b.appearance.race.toLowerCase();

    return asc
      ? raceA.charCodeAt(0) - raceB.charCodeAt(0)
      : raceB.charCodeAt(0) - raceA.charCodeAt(0);
  });
  return superheroes.slice(start, end);
};

var sortHeight = async (asc) => {
  let start = currentPage * pageSize;
  start = start + pageSize > totalHeroes ? totalHeroes - pageSize : start;
  let end = start + pageSize;
  const superheroes = await getData();
  superheroes.sort((a, b) => {
    if (a.appearance.height[0] == "-") {
      return 1;
    }
    if (b.appearance.height[0] == "-") {
      return 0;
    }
    const heightA = parseFloat(a.appearance.height[0].replace("'", "."));
    const heightB = parseFloat(b.appearance.height[0].replace("'", "."));

    return asc ? heightA - heightB : heightB - heightA;
  });
  return superheroes.slice(start, end);
};

var sortWeight = async (asc) => {
  let start = currentPage * pageSize;
  start = start + pageSize > totalHeroes ? totalHeroes - pageSize : start;
  let end = start + pageSize;
  const superheroes = await getData();
  superheroes.sort((a, b) => {
    if (a.appearance.weight[0].charAt(0) == "-") {
      return 1;
    }
    if (b.appearance.weight[0].charAt(0) == "-") {
      return 0;
    }
    const weightA = parseFloat(a.appearance.weight[0].split(" ")[0]);
    const weightB = parseFloat(b.appearance.weight[0].split(" ")[0]);

    return asc ? weightA - weightB : weightB - weightA;
  });
  return superheroes.slice(start, end);
};

var sortPlaceOfBirth = async (asc) => {
  let start = currentPage * pageSize;
  start = start + pageSize > totalHeroes ? totalHeroes - pageSize : start;
  let end = start + pageSize;
  const superheroes = await getData();
  superheroes.sort((a, b) => {
    let plaOfBirthA = a.biography.placeOfBirth.toLowerCase();
    let placeOfBirthB = b.biography.placeOfBirth.toLowerCase();
    if (plaOfBirthA == "-") {
      return 1;
    }
    if (placeOfBirthB == "-") {
      return 0;
    }
    const { fa, fb } = firstDifferentCharacter(plaOfBirthA, placeOfBirthB);
    return fb
      ? asc
        ? fa.charCodeAt(0) - fb.charCodeAt(0)
        : fb.charCodeAt(0) - fa.charCodeAt(0)
      : -1;
  });
  return superheroes.slice(start, end);
};

var sortAlignment = async (asc) => {
  let start = currentPage * pageSize;
  start = start + pageSize > totalHeroes ? totalHeroes - pageSize : start;
  let end = start + pageSize;
  const superheroes = await getData();
  superheroes.sort((a, b) => {
    if (a.biography.alignment == "-") {
      return 1;
    }
    if (b.biography.alignment == "-") {
      return 0;
    }
    const alignmentA = a.biography.alignment.toLowerCase();
    const alignmentB = b.biography.alignment.toLowerCase();

    return asc
      ? alignmentA.charCodeAt(0) - alignmentB.charCodeAt(0)
      : alignmentB.charCodeAt(0) - alignmentA.charCodeAt(0);
  });
  return superheroes.slice(start, end);
};
