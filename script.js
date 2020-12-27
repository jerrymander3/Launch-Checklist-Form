// Write your JavaScript code here!

        window.addEventListener("load", function() {
            let form = document.querySelector("form");
            fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
               response.json().then( function(json) {
                  document.getElementById("missionTarget").innerHTML = `<h2>Mission Destination</h2>
                     <ol>
                        <li>Name: ${json[3].name}</li>
                        <li>Diameter: ${json[3].diameter}</li>
                        <li>Star: ${json[3].star}</li>
                        <li>Distance from Earth: ${json[3].distance}</li>
                        <li>Number of Moons: ${json[3].moons}</li>
                     </ol>
                     <img src="${json[3].image}"></img>`;
               });
               console.log(response);
            } );
            form.addEventListener("submit", function(event) {
                event.preventDefault();
                let pilotNameInput = document.querySelector("input[name=pilotName]");
                let copilotNameInput = document.querySelector("input[name=copilotName]");
                let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
                let cargoMassInput = document.querySelector("input[name=cargoMass]");
                let trueSubmit = true;
                if (pilotNameInput.value === "" || copilotNameInput.value === "" || 
                    fuelLevelInput.value === "" || cargoMassInput.value === ""){
                    alert("All fields are required");
                    trueSubmit = false;
                }
                if(!isNaN(pilotNameInput.value) || !isNaN(copilotNameInput.value) ||
                     isNaN(fuelLevelInput.value) || isNaN(cargoMassInput.value)){
                    alert("One of your submission inputs is invalid");
                    trueSubmit = false;
                }

                let launchStatus = document.getElementById("launchStatus");
                let faultyItems = document.getElementById("faultyItems");
                if (trueSubmit) {
                    faultyItems.style.visibility = "visible";
                } else {
                    faultyItems.style.visibility = "hidden";
                }
                
                document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotNameInput.value} ready`;
                document.getElementById("copilotStatus").innerHTML = `Co-Pilot ${copilotNameInput.value} ready`;
                
                if (fuelLevelInput.value < 10000 || cargoMassInput.value > 10000) {
                    launchStatus.innerHTML = "Shuttle not ready for launch";
                    launchStatus.style.color = "red";
                    if (fuelLevelInput.value < 10000){
                        document.getElementById("fuelStatus").innerHTML = `Fuel level too low for launch`;  
                    } else {
                        document.getElementById("fuelStatus").innerHTML = `Fuel level high enough for launch`;
                    }
                    if (cargoMassInput.value > 10000){
                        document.getElementById("cargoStatus").innerHTML = "Cargo mass too high for launch";
                    } else {
                        document.getElementById("cargoStatus").innerHTML = "Cargo mass low enough for launch";
                    }
                } else if (!trueSubmit) {
                    launchStatus.innerHTML = "Shuttle not ready for launch";
                    launchStatus.style.color = "red";
                } else {
                    launchStatus.innerHTML = "Shuttle is ready for launch!";
                    launchStatus.style.color = "green"; 
                }
                
            });
        });

/* This block of code shows how to format the HTML once you fetch some planetary JSON!

*/
