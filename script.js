/* =========================
CURRENT COORDINATES
========================= */

let currentLat = null;
let currentLon = null;

/* =========================
ELEMENTS
========================= */

const conversionType =
document.getElementById('conversionType');

const decimalSection =
document.getElementById('decimalSection');

const dmsSection =
document.getElementById('dmsSection');

const dmsResults =
document.getElementById('dmsResults');

const decimalResults =
document.getElementById('decimalResults');

/* =========================
SWITCH MODE
========================= */

conversionType.addEventListener(
'change',
switchMode
);

function switchMode(){

clearAllFields();

if(
conversionType.value ===
'decimalToDMS'
){

decimalSection.style.display =
'block';

dmsSection.style.display =
'none';

dmsResults.style.display =
'block';

decimalResults.style.display =
'none';

}

else{

decimalSection.style.display =
'none';

dmsSection.style.display =
'block';

dmsResults.style.display =
'none';

decimalResults.style.display =
'block';

}

}

/* =========================
DECIMAL TO DMS
========================= */

function decimalToDMS(decimal){

const absolute =
Math.abs(decimal);

const degrees =
Math.floor(absolute);

const minutesNotTruncated =
(absolute - degrees) * 60;

const minutes =
Math.floor(minutesNotTruncated);

const seconds =
(
(minutesNotTruncated - minutes) * 60
).toFixed(2);

return{

degrees,
minutes,
seconds

};

}

/* =========================
CONVERT DECIMAL TO DMS
========================= */

function convertDecimalToDMS(){

const lat =
parseFloat(
document.getElementById('decimalLat').value
);

const lon =
parseFloat(
document.getElementById('decimalLon').value
);

/* VALIDATION */

if(
isNaN(lat) ||
isNaN(lon)
){

return;

}

if(
lat > 90 ||
lat < -90
){

alert(
'Latitude Must Be Between -90 And 90'
);

return;

}

if(
lon > 180 ||
lon < -180
){

alert(
'Longitude Must Be Between -180 And 180'
);

return;

}

/* SAVE */

currentLat = lat;
currentLon = lon;

/* LATITUDE */

const latDMS =
decimalToDMS(lat);

document.getElementById('latDeg')
.value =
latDMS.degrees;

document.getElementById('latMin')
.value =
latDMS.minutes;

document.getElementById('latSec')
.value =
latDMS.seconds;

document.getElementById('latDir')
.value =
lat >= 0 ? 'N' : 'S';

/* LONGITUDE */

const lonDMS =
decimalToDMS(lon);

document.getElementById('lonDeg')
.value =
lonDMS.degrees;

document.getElementById('lonMin')
.value =
lonDMS.minutes;

document.getElementById('lonSec')
.value =
lonDMS.seconds;

document.getElementById('lonDir')
.value =
lon >= 0 ? 'E' : 'W';

}

/* =========================
DMS TO DECIMAL
========================= */

function dmsToDecimal(
deg,
min,
sec,
dir
){

let decimal =

parseFloat(deg || 0) +

parseFloat(min || 0) / 60 +

parseFloat(sec || 0) / 3600;

/* AUTO DIRECTION */

if(
dir === 'S' ||
dir === 'W'
){

decimal *= -1;

}

return decimal;

}

/* =========================
CONVERT DMS TO DECIMAL
========================= */

function convertDMSToDecimal(){

const latitude =

dmsToDecimal(

document.getElementById('inputLatDeg').value,

document.getElementById('inputLatMin').value,

document.getElementById('inputLatSec').value,

document.getElementById('inputLatDir').value

);

const longitude =

dmsToDecimal(

document.getElementById('inputLonDeg').value,

document.getElementById('inputLonMin').value,

document.getElementById('inputLonSec').value,

document.getElementById('inputLonDir').value

);

/* VALIDATION */

if(
latitude > 90 ||
latitude < -90
){

alert(
'Latitude Must Be Between -90 And 90'
);

return;

}

if(
longitude > 180 ||
longitude < -180
){

alert(
'Longitude Must Be Between -180 And 180'
);

return;

}

/* SAVE */

currentLat = latitude;
currentLon = longitude;

/* RESULTS */

document.getElementById('resultLat')
.innerText =
latitude.toFixed(8);

document.getElementById('resultLon')
.innerText =
longitude.toFixed(8);

}

/* =========================
LIVE CONVERT
========================= */

/* DECIMAL INPUTS */

document
.getElementById('decimalLat')
.addEventListener(
'input',
convertDecimalToDMS
);

document
.getElementById('decimalLon')
.addEventListener(
'input',
convertDecimalToDMS
);

/* DMS INPUTS */

const dmsInputs = [

'inputLatDeg',
'inputLatMin',
'inputLatSec',
'inputLatDir',

'inputLonDeg',
'inputLonMin',
'inputLonSec',
'inputLonDir'

];

dmsInputs.forEach(id => {

document
.getElementById(id)

.addEventListener(
'input',
convertDMSToDecimal
);

});

/* =========================
COPY RESULTS
========================= */

function copyResults(){

let text = '';

if(
conversionType.value ===
'decimalToDMS'
){

text = `

Latitude DMS:
${document.getElementById('latDeg').value}°
${document.getElementById('latMin').value}'
${document.getElementById('latSec').value}"
${document.getElementById('latDir').value}

Longitude DMS:
${document.getElementById('lonDeg').value}°
${document.getElementById('lonMin').value}'
${document.getElementById('lonSec').value}"
${document.getElementById('lonDir').value}

`;

}

else{

text = `

Latitude:
${document.getElementById('resultLat').innerText}

Longitude:
${document.getElementById('resultLon').innerText}

`;

}

navigator.clipboard
.writeText(text);

alert('Results Copied');

}

/* =========================
CLEAR ALL
========================= */

function clearAllFields(){

const inputs =
document.querySelectorAll('input');

inputs.forEach(input => {

input.value = '';

});

document.getElementById('resultLat')
.innerText = '---';

document.getElementById('resultLon')
.innerText = '---';

currentLat = null;
currentLon = null;

}

/* =========================
OPEN MAP
========================= */

function openMap(){

if(
currentLat === null ||
currentLon === null
){

alert('No Coordinates Available');

return;

}

window.open(

`https://www.google.com/maps?q=${currentLat},${currentLon}`,

'_blank'

);

}

/* =========================
START
========================= */

switchMode();