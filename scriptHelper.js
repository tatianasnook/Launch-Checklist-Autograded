require('cross-fetch/polyfill');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionTarget = document.querySelector("#missionTarget");
    missionTarget.innerHTML = `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}"/>
    `;
 }
 
 function validateInput(testInput) {
    if (testInput === "") {
        return "Empty";
    } else if (isNaN(testInput)) {
        return "Not a Number";
    } else {
        return "Is a Number";
    }
 }
 
 function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    if (validateInput(pilot) === 'Empty' || validateInput(copilot) === 'Empty' ||
        validateInput(fuelLevel) === 'Empty' || validateInput(cargoLevel) === 'Empty') {
        alert("All fields are required!");
        return;
    }
    if (validateInput(pilot) === 'Not a Number' && validateInput(copilot) === 'Not a Number' &&
        validateInput(fuelLevel) === 'Is a Number' && validateInput(cargoLevel) === 'Is a Number') {
        
        document.querySelector('#pilotStatus').innerHTML = `Pilot ${pilot} is ready for launch`;
        document.querySelector('#copilotStatus').innerHTML = `Co-pilot ${copilot} is ready for launch`;

        let fuel = Number(fuelLevel);
        let cargo = Number(cargoLevel);
        let launchStatus = document.querySelector('#launchStatus');
        let faultyItems = document.querySelector('#faultyItems');
        let fuelStatus = document.querySelector('#fuelStatus');
        let cargoStatus = document.querySelector('#cargoStatus');
        
        if(fuel < 10000){
            launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
            launchStatus.style.color = 'red';
            faultyItems.style.visibility = 'visible';
            fuelStatus.innerHTML = 'Fuel level too low for launch';
        } else {
            fuelStatus.innerHTML = 'Fuel level high enough for launch';
        }
        if (cargo > 10000){
            launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
            launchStatus.style.color = 'red';
            faultyItems.style.visibility = 'visible';
            cargoStatus.innerHTML = 'Cargo mass too heavy for launch';
        } else {
            cargoStatus.innerHTML = 'Cargo mass low enough for launch';
        }
        if (fuel >= 10000 && cargo <= 10000){
            launchStatus.innerHTML = 'Shuttle is Ready for Launch';
            launchStatus.style.color = 'green';
            faultyItems.style.visibility = 'visible';
            fuelStatus.innerHTML = 'Fuel level high enough for launch';
            cargoStatus.innerHTML = 'Cargo mass low enough for launch';
        }
        
    } else {
        alert("Make sure to enter valid information for each field!");
    }
}

 async function myFetch() {
     let planetsReturned;
 
     planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json")
     .then(function(response) {
        return response.json();
    });
     return planetsReturned;
 }
 
 function pickPlanet(planets) {
    let index = Math.floor(Math.random() * planets.length);
    return planets[index]
 }
 
 module.exports.addDestinationInfo = addDestinationInfo;
 module.exports.validateInput = validateInput;
 module.exports.formSubmission = formSubmission;
 module.exports.pickPlanet = pickPlanet; 
 module.exports.myFetch = myFetch;
