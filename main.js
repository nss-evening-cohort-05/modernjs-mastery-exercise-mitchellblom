$(document).ready(() => {

	let giantArray = [];
	let counter = [];

	$(".team-selector").click((e)=> {
		$("#character-container").html("");
		dataGetter(e)
	});

    const loadTeams = () => {
        return new Promise((resolve, reject) => {
            $.ajax("./db/teams.json")
                .done((data1) => {
                    resolve(data1.teams);
                })
                .fail((error1) => {
                    reject(error1);
                });
        });
    };

    const loadGenders = () => {
        return new Promise((resolve, reject) => {
            $.ajax("./db/genders.json")
                .done((data2) => {
                    resolve(data2.genders);
                })
                .fail((error2) => {
                    reject(error2);
                });
        });
    };

    const loadCharacters = () => {
        return new Promise((resolve, reject) => {
            $.ajax("./db/characters.json")
                .done((data3) => {
                    resolve(data3.characters);
                })
                .fail((error3) => {
                    reject(error3);
                });
        });
    };

    const dataGetter = (e) => {
    	giantArray = [];
		Promise.all([loadTeams(),loadGenders(), loadCharacters()])
				.then(function(results){
					results.forEach(function(ajaxCalls){
						ajaxCalls.forEach(function(each){
							giantArray.push(each);
						});
					});
							console.log("giantArray: ", giantArray);
							let whichButtonClicked = e.currentTarget;
					determineWhichToWrite(whichButtonClicked);
				});
	}

///////////////////////////////////////////////////////////////////////////////////////////////


	const determineWhichToWrite = (whichButtonClicked) => {
		console.log("team name button pressed: ", whichButtonClicked.id);
		let matchingId;
		let matchingCharacter;
		let matchingCharacterObject;
		let clickedTeam = whichButtonClicked.id;
		giantArray.forEach((object) => {
			if (object.name == clickedTeam){
				matchingId = object.id;
			}
		});
		giantArray.forEach((object) => {
			if (object.team_id == matchingId) {						
				matchingCharacterObject = object;
				writeCharacterToDom(matchingCharacterObject, clickedTeam);
		}

		giantArray.forEach((object) => {
			// console.log(matchingCharacterObject);
			// if (matchingCharacterObject.gender_id == object.id) {
				// matchingCharacterObject.gender_name = determineGender();
			// 	console.log(matchingCharacterObject.gender_name);
			// }
		})

		})
	}

	// const determineGender = (matchingCharacterObject) => {
	// 	console.log(matchingCharacterObject);
	// 	giantArray.forEach((object) => {
	// 		if (matchingCharacterObject.gender_id == object.id) {
	// 	}

	// 	return genderName;
	// }



	const writeCharacterToDom = (matchingCharacterObject, clickedTeam) => {
		// add one to counter here, and reset counter somewhere to add `<div class="row">` and `</div>`

		// if (i % 4 === 0) {
  //               characterString += `<div class="row">`;
  //           }

		let characterString = `<div class="col-md-3 characterCard" id="${matchingCharacterObject.name}">
                				<h3>${matchingCharacterObject.name}</h3>
                				<img src="${matchingCharacterObject.image}" class="characterImage thumbnail" alt="Character Image">
                				<h4>${matchingCharacterObject.description}</h4>
                				<h4>Team: ${clickedTeam}</h4>
                				<h4>Gender: ${matchingCharacterObject.gender_id}</h4>
                				</div>`;
            // if (i % 4 === 3) {
            //         characterString += `</div>`;
            //     }
            $("#character-container").append(characterString);

	}

});