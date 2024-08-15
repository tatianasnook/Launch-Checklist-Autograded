
window.addEventListener("load", function() {
    let form = document.querySelector("form");
    form.addEventListener("submit", function(event){
        event.preventDefault();
        let pilot = document.querySelector("input[name=pilotName]").value;
        let copilot = document.querySelector("input[name=copilotName").value;
        let fuelLevel = document.querySelector("input[name=fuelLevel").value;
        let cargoLevel = document.querySelector("input[name=cargoMass").value;
        let list;
        formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel);
       
    })
    let listedPlanets;
    let listedPlanetsResponse = myFetch();

    listedPlanetsResponse.then(function(result) {
        listedPlanets = result;
    }).then(function () {
        console.log(listedPlanets);
        let planetData = pickPlanet(listedPlanets);
        addDestinationInfo(
            document, 
            planetData.name, 
            planetData.diameter, 
            planetData.star,
            planetData.distance,
            planetData.moons,
            planetData.image
        );
    })
 })
