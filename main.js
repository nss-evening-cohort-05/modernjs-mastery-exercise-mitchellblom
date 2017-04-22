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
		console.log("getting to determine");
		console.log("team name button pressed: ", whichButtonClicked.id);

		giantArray.forEach((each) => {
			console.log("team name of all objects: ", each.name);
		})
		

		 // for (var i = 0; i < giantArray.length; i++) {
			// 		console.log(giantArray.teams);
		 // 	if (whichButtonClicked.id === giantArray.name) {
			// 	}
		 // }

			// giantArray.forEach((whichButtonClicked) => {
			// 	if (whichButtonClicked.id === giantArray.name) {
			// 		console.log(giantArray.name);
			// 	}
			// })

			// match team button clicked to team id.
			// console.log the team id number
			// write to dom only those characters who have a matching team_id

				// 			writeProductCardsToDOM(giantArray);

	}

	const writeProductCardsToDOM = (array) => {

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