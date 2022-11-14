const dugmeFormular = document.querySelector(".button-form");
const brisanje = document.querySelector(".brisanje");

function proveriIme() {
  const ime = document.querySelector("#name").value;
  const regEx = /.{2,20}/;
  if (regEx.test(ime)) {
    proveriAdresu();
  } else {
    alert("Ime nije ispravano.");
  }
}

function proveriAdresu() {
  const adresa = document.querySelector("#email").value;
  const regEx = /^\w{1,20}@\w{4,10}\.com$/;
  if (regEx.test(adresa)) {
    proveriTelefon();
  } else {
    alert("Adresa E-pošte nije ispravna.");
  }
}

function proveriTelefon() {
  const telefon = document.querySelector("#telephone").value;
  const regEx = /^0\d{7,9}$/;
  if (regEx.test(telefon)) {
    proveriPoruku();
  } else {
    alert(
      "Telefon nije ispravan, mora počinjati sa 0 i imati od 8 do 10 cifara."
    );
  }
}

function proveriPoruku() {
  const poruka = document.querySelector("#message").value;
  const regEx = /.{1,140}/;
  if (regEx.test(poruka)) {
    sacuvatiPoruku();
  } else {
    alert("Poruka može sadržati najviše 140 karaktera.");
  }
}

function sacuvatiPoruku() {
  let nizPoruka;
  if (!localStorage.getItem("nizPoruka")) {
    nizPoruka = [];
  } else {
    nizPoruka = JSON.parse(localStorage.getItem("nizPoruka"));
  }
  let novaPoruka = {
    ime: document.querySelector("#name").value,
    adresa: document.querySelector("#email").value,
    telefon: document.querySelector("#telephone").value,
    poruka: document.querySelector("#message").value,
  };

  nizPoruka.push(novaPoruka);
  localStorage.setItem("nizPoruka", JSON.stringify(nizPoruka));
  sortiranjePoruka();
}

function sortiranjePoruka() {
  const nizPoruka = JSON.parse(localStorage.getItem("nizPoruka"));
  function compare(a, b) {
    if (a.adresa < b.adresa) {
      return -1;
    }
    if (a.adresa > b.adresa) {
      return 1;
    }
    return 0;
  }

  nizPoruka.sort(compare);
  localStorage.setItem("nizPoruka", JSON.stringify(nizPoruka));
  ispisivanjePoruka();
}

function ispisivanjePoruka() {
  const nizPoruka = JSON.parse(localStorage.getItem("nizPoruka"));
  const tabela = document.querySelector(".add-message");
  ukloniPrethodnuTabelu(tabela);
  for (let poruka of nizPoruka) {
    const noviRed = document.createElement("tr");
    tabela.append(noviRed);
    const poljeIme = document.createElement("td");
    poljeIme.innerText = `${poruka.ime}`;
    noviRed.append(poljeIme);
    const poljeAdresa = document.createElement("td");
    poljeAdresa.innerText = `${poruka.adresa}`;
    noviRed.append(poljeAdresa);
    const poljePoruka = document.createElement("td");
    poljePoruka.innerText = `${poruka.poruka}`;
    noviRed.append(poljePoruka);
  }
  isprazniPolja();
}

function ukloniPrethodnuTabelu(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function isprazniPolja () {
  document.querySelector("#name").value = '';
  document.querySelector("#email").value = '';
  document.querySelector("#telephone").value = '';
  document.querySelector("#message").value = '';
}

dugmeFormular.addEventListener("click", function (event) {
  event.preventDefault();
  proveriIme();
});

window.onload = function () {
  ispisivanjePoruka();
};



brisanje.addEventListener("click", function () {
  const tabela = document.querySelector(".add-message");
  localStorage.removeItem('nizPoruka');
  ukloniPrethodnuTabelu(tabela);
});
