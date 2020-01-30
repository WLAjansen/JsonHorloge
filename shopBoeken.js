// JSON importeren
let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if(this.readyState==4 && this.status == 200) {
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
