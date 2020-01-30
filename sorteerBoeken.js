

// JSON importeren

let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    sorteerHorlogeObj.data = JSON.parse(this.responseText);
    sorteerHorlogeObj.voegJSdatumIn();
    sorteerHorlogeObj.sorteren();
  }
}
xmlhttp.open('GET', "horloges.json", true);
xmlhttp.send();

// een tabelkop in markup uitvoeren uit een array
const maakTabelKop = (arr) => {
  let kop = "<table class='horlogeSelectie'><tr>";
  arr.forEach((item) => {
    kop += "<th>" + item + "</th>";
  });
  kop += "</tr>";
  return kop;
}

// een tabelrij maken
// boolean geeft aan de rij
// uitvoer string met markup



// function die van een mount-string een nummer maakTabelKop
// waarbij januari een 0 geeft
// en december een 11
const geeftMaandNummer = (maand) => {
  let nummer;
  switch (maand) {
    case "januari": nummer = 0; break;
    case "februari": nummer = 1; break;
    case "maart": nummer = 2; break;
    case "april": nummer = 3; break;
    case "mei": nummer = 4; break;
    case "juni": nummer = 5; break;
    case "juli": nummer = 6; break;
    case "augustus": nummer = 7; break;
    case "september": nummer = 8; break;
    case "october": nummer = 9; break;
    case "november": nummer = 10; break;
    case "december": nummer = 11; break;
    default: nummer = 0

  }
  return nummer;
}

// functie dieeen string van maand jaar omzet in een date-object
const maakJSdatum = (maandJaar) => {
  let mjArray = maandJaar.split("");
  let datum = new Date(mjArray[1], geeftMaandNummer(mjArray[0]));
  return datum;
}

// functie maakt van een array een opsomming met ', ' en ' en'
const maakOpsomming = (array) => {
  let string = "";
  for(let i=0; i<array.length; i++) {
    switch (i) {
      case array.length-1 : string += array[i]; break;
      case array.length-2 : string += array[i] + " en"; break;
      default: string += array[i] + ", ";
    }
  }
  return string;
}

// object dat de boeken uitvoert en sorteert
// eigenschappen: data (sorteer)kenmerk
// methods: sorteren() en uitvoeren()
let sorteerHorlogeObj = {
  data: "", // komt van xmlhttp.onreadystatechange

  kenmerk: "model",

  // sorteervolgorde en factor
  oplopend: 1,

  // een datumObject toevoegen aan this.data uit de string uitgave
  voegJSdatumIn: function() {
    this.data.forEach((item) => {
      item.jsDatum = maakJSdatum(item.uitgave);
    });
  },

  // data sorteren
  sorteren: function() {
    this.data.sort( (a,b) => a[this.kenmerk] > b[this.kenmerk] ? 1*this.oplopend : -1*this.oplopend );
    this.uitvoeren(this.data);
  },

  // de data in een tabel uitvoeren
  uitvoeren: function(data) {
    // eerst de uitvoer leegmaken
    document.getElementById('uitvoer').innerHTML = "";
    data.forEach( horloge => {
      let sectie = document.createElement('section');
      sectie.className = 'horlogeSelectie';
      // main element met alle info behalve prijs en afbeelding
      let main = document.createElement('main');
      main.className = 'horlogeSelectie__main';

      // cover maken
      let afbeelding = document.createElement('img');
      afbeelding.className = 'horlogeSelectie__cover';
      afbeelding.setAttribute('src', horloge.cover);
      afbeelding.setAttribute('alt', horloge.model);

      // model naam maken voor het horloge
      let model = document.createElement('h3');
      model.className = 'horlogeSelectie__model';
      model.textContent = horloge.model;

      // merk toevoegen
      let merk = document.createElement('p');
      merk.className = 'horlogeSelectie__merken';
      merk.textContent = horloge.merk;

      // overige info toevoegen
      let overig = document.createElement('p');
      overig.className = 'horlogeSelectie__overig';
      overig.textContent = 'datum: '+horloge.uitgave+' | maat: '+horloge.maat+' | kleur: '+horloge.kleur+' | serienummer: '+horloge.ean;

      // prijs toevoegen
      let prijs = document.createElement('div');
      prijs.className = 'horlogeSelectie__prijs';
      prijs.textContent = horloge.prijs.toLocaleString('nl-NL', {currency: 'EUR', style: 'currency'});

      // de element toevoegen
      sectie.appendChild(afbeelding);
      main.appendChild(model);
      main.appendChild(merk);
      main.appendChild(overig);
      sectie.appendChild(main);
      sectie.appendChild(prijs);
      document.getElementById('uitvoer').appendChild(sectie);
    });
  }
}

// keuze voorsoteer opties, hier is een fout
document.getElementById('kenmerk').addEventListener('change', (e) => {
  sorteerHorlogeObj.kenmerk = e.target.value;
  sorteerHorlogeObj.sorteren();
});

document.getElementsByName('oplopend').forEach((item) => {
  item.addEventListener('click', (e)=> {
    sorteerHorlogeObj.oplopend = parseInt(e.target.value);
    sorteerHorlogeObj.sorteren();
  })
})
