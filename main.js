$(document).ready(() => {

	let giantArray = [];

	$(".team-selector").click((e)=> {
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
							let whichButtonClicked = e.currentTarget
					determineWhichToWrite(whichButtonClicked);
				});
	}

///////////////////////////////////////////////////////////////////////////////////////////////


	const determineWhichToWrite = (whichButtonClicked) => {
		$("#character-container").html("");
		console.log("team name button pressed: ", whichButtonClicked.id);
		let matchingId;
		let matchingCharacter;
		let clickedTeam = whichButtonClicked.id;
		giantArray.forEach((object) => {
			if (object.name == clickedTeam){
				console.log("match found and the id is: ", object.id);
				matchingId = object.id;
				matchingTeamName = object.name;
			}
		});
		giantArray.forEach((object) => {
				if (object.team_id == matchingId) {						
					matchingCharacterObject = object;
					writeCharacterToDom(matchingCharacterObject, clickedTeam);
		}
		})

	}

	const writeCharacterToDom = (matchingCharacterObject, clickedTeam) => {
		let characterString = `<div class="col-md-3 characterCard" id="${matchingCharacterObject.name}">
                				<h3>${matchingCharacterObject.name}</h3>
                				<img src="${matchingCharacterObject.image}" class="img-circle thumbnail" alt="Character Image">
                				<h4>${matchingCharacterObject.description}</h4>
                				<h4>Team: ${clickedTeam}</h4>
                				<h4>Gender: ${matchingCharacterObject.gender_id}</h4>
                				</div>`;
            $("#character-container").append(characterString);
	}






	const writeProductCardsToDOM = (array) => {				// below similar to previous exercise. using for reference

            $("#character-container").html("");
            characterString = "";
            if (i % 4 === 0) {
                characterString += `<div class="row">`;
            }
            for (var i = 0; i < array.length; i++) {

								types.forEach(function(passedType){
									if (passedType.id === array[i].type){
										array[i].typeName = passedType.name;
										array[i].categoryId = passedType.category_id;
									}
								});

								categories.forEach(function(passedCategory){
									if (passedCategory.id === array[i].categoryId){
										array[i].categoryName = passedCategory.name;
									}
								});

                characterString += `<div class="col-md-3 characterCard ${array[i].type}" id="${array[i].name}">
                				<h3>${array[i].name}</h3>
                				<img src="${array[i].image}" class="img-circle thumbnail" alt="Product Image">
                				<h4>${array[i].description}</h4>
                				<h4>Type: ${array[i].typeName}</h4>
                				<h4>Category: ${array[i].categoryName}</h4>
                				</div>`;

                if (i % 4 === 3) {
                    characterString += `</div>`;
                }
            }
            $("#character-container").html(characterString);
        }

});