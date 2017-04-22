$(document).ready(() => {

	let giantArray = [];
	let counter = 0;

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
							let whichButtonClicked = e.currentTarget;
					determineWhichToWrite(whichButtonClicked);
				});
	}

///////////////////////////////////////////////////////////////////////////////////////////////


	const determineWhichToWrite = (whichButtonClicked) => {
		let matchingId;
		let matchingCharacter;
		let matchingCharacterObject;
		let matchingCharacterObjectGender;
		let clickedTeam = whichButtonClicked.id;
		giantArray.forEach((object) => {
			if (object.name == clickedTeam){
				matchingId = object.id;
			}
		});
		giantArray.forEach((object) => {
			if (object.team_id == matchingId) {						
				matchingCharacterObject = object;
				if (matchingCharacterObject.gender_id == 0) {
					matchingCharacterObjectGender = "Female";
				} else {matchingCharacterObjectGender = "Male";}
				writeCharacterToDom(matchingCharacterObject, clickedTeam, matchingCharacterObjectGender);
		}

		})
	}

	const writeCharacterToDom = (matchingCharacterObject, clickedTeam, matchingCharacterObjectGender) => {
		// add one to counter here, and reset counter somewhere to add `<div class="row">` and `</div>`

  		let validatedCharacterDescrip;
  		let characterString;

  		if (matchingCharacterObject.description === "" && matchingCharacterObjectGender === "Male") {
  			validatedCharacterDescrip = "1234567890";
  		} else if (matchingCharacterObject.description === "" && matchingCharacterObjectGender === "Female") {
  			validatedCharacterDescrip = "abcde fghij klmno pqrst uvwxy z";
  		} else {
  			validatedCharacterDescrip = matchingCharacterObject.description;
  		}

		counter++;
		console.log(counter);

		// if (counter % 4 === 0) {
  //               characterString = `<div class="row">`;
  //           }

		characterString = `<div class="col-md-3 characterCard" id="${matchingCharacterObject.name}">
                				<h3>${matchingCharacterObject.name}</h3>
                				<img src="${matchingCharacterObject.image}" class="characterImage ${matchingCharacterObjectGender}" alt="Character Image">
                				<h4>Description: ${validatedCharacterDescrip}</h4>
                				<h4>Team: ${clickedTeam}</h4>
                				<h4>Gender: ${matchingCharacterObjectGender}</h4>
                				</div>`;
            // if (i % 4 === 3) {
            //         characterString += `</div>`;
            //     }
            $("#character-container").append(characterString);
	}

});