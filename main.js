$(document).ready(() => {

	giantArray = [];

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

Promise.all([loadTeams(),loadGenders(), loadCharacters()])
		.then(function(results){
			results.forEach(function(ajaxCalls){
				ajaxCalls.forEach(function(each){
					giantArray.push(each);
				});
			});
					console.log("giantArray: ", giantArray);

// 			writeDOM();
		});




});