var matchData;
var matchesEvent;
var path = "http://ubuntu@ec2-52-35-34-216.us-west-2.compute.amazonaws.com:3000"; //TODO: Put in AWS info

window.addEventListener('load', function() {
    table = document.getElementById("matchData");

	eventList = ["2016wagg","2018waahs","2018wasno","2018idbo","2018pncmp"];
	if (localStorage.length !== 0) {
	loop1:
	    for (var j=0; j<eventList.length; j++) {
	    	eventNombre = eventList[j];
	    	for (var i=0; i<localStorage.length; i++) {
	        	var key = localStorage.key(i);
	    		//console.log(key);                                                            // Test
	            if (eventNombre.concat("Matches") == key) {
	                isThere = true;
					matchesEvent = eventNombre.toString();
					//console.log(matchesEvent);
					break loop1;
				}
	        }
	    }
	}
    matchData = [];
    for (var key in localStorage) {
        try {
            key = JSON.parse(localStorage.getItem(key));
            isTele = key.isTele;
            if(!key.isTele) {
                ////console.log("Not a Match");
                continue;
            }
            ////console.log("Pushing match");
            matchData.push(key);
        } catch(err) {
            ////console.log("Not a Match");
            continue;
        }
    }

    ////console.log(matchData);

    matchData.sort(function(a, b) {
        return parseInt(a.match) - parseInt(b.match);
    });

    matchData.forEach(function(oneMatch) {
        ////console.log("Good Match");
        row = table.insertRow(-1);
        name = oneMatch.match;
		name = name.concat(".");
		name = name.concat(oneMatch.teamNo);
		//console.log(name);
        row.id = "row-" + name.toString();
		////console.log(document.getElementById(row.id));
		check = row.insertCell(-1);
		match = row.insertCell(-1);
        team = row.insertCell(-1);
		deleter = row.insertCell(-1);
        // submit = row.insertCell(-1);
		////console.log(row.id);
		////console.log(name + "Box");

		check.innerHTML = "<input type=\"checkbox\" id=\"" + name + "Box\" class=\"checkbox\" value=false>";
		//console.log(check.innerHTML);
		match.innerHTML = oneMatch.match;
        team.innerHTML = oneMatch.teamNo;
		deleter.innerHTML = "<button id=\"" + name + "_deleter\" class=\"deleters\" onClick=\"deleteMatch(\'" + name + "\');\">Delete</button>";
		//console.log(deleter.innerHTML);
        // submit.innerHTML = "<button id=\"" + name + "\" class=\"submitButtons\" onclick=\"sendData(" + name + ");\">Submit Data</button>";
	});
});

function checkAll() {
	var elems = document.getElementsByClassName("checkbox");
	if (document.getElementById("checkboxAll").checked) {
		for (var i=0; i<elems.length; i++) {
			elems[i].checked = true;
		}
	} else {
		for (var i=0; i<elems.length; i++) {
			elems[i].checked = false;
		}
	}
}

function deleteMatch(name) {
	eventList = ["2016wagg","2018waahs","2018wasno","2018idbo","2018pncmp"];
	if (localStorage.length !== 0) {
	loop1:
	    for (var j=0; j<eventList.length; j++) {
	    	eventNombre = eventList[j];
	    	for (var i=0; i<localStorage.length; i++) {
	        	var key = localStorage.key(i);
	    		//console.log(key);                                                            // Test
	            if (eventNombre.concat("Matches") == key) {
	                isThere = true;
					matchesEvent = eventNombre.toString();
					//console.log(matchesEvent);
					break loop1;
				}
	        }
	    }
	}
	//console.log("yes");
	//console.log(name);
	toDelete = document.getElementById("row-" + name);
	toDelete.parentNode.removeChild(toDelete);

	name = name.toString();
	lsToDelete = name.split(".");
	match = lsToDelete[0];
	match = parseInt(match);
	team = lsToDelete[1];
	team = parseInt(team);
	//console.log(lsToDelete);
	console.log(matchesEvent);
	for (var key in localStorage) {
		try {
			key = JSON.parse(localStorage.getItem(key));
            isTele = key.isTele;
            if(!key.isTele) {
                ////console.log("Not a Match");
                continue;
            } else {
            	if(team === key.teamNo && match === key.match) {
					//console.log("HEYOOOO");
					//console.log(key);
					finnaDelete = matchesEvent.toString() + "_" + team.toString() + "_" + match.toString() + "_Object";
					finnaDelete = finnaDelete.toString();
					console.log(finnaDelete);
					localStorage.removeItem(finnaDelete);
				}
            }
		} catch(err) {
			continue;
		}
	}
}

function sendAll() {
    checkboxes = document.getElementsByClassName("checkbox");
    //console.log(checkboxes);
    Array.from(checkboxes).forEach(function(checkbox, i) {
        if(checkbox.checked) {
			elemId = checkbox.id;
			elemId = elemId.split('B');
            //console.log(elemId[0]);
            sendData(elemId[0]);
        }
    });
}

function sendData(matchThing) {
	//console.log(matchThing);
	matchTeam = matchThing.toString();
	matchTeamArr = matchTeam.split(".");
	match = matchTeamArr[0];
	match = parseInt(match);
	team = matchTeamArr[1];
	team = parseInt(team);
    for (var i = 0; i < matchData.length; i++) {
        if(matchData[i].match === match && matchData[i].teamNo === team) {
			//console.log(matchData[i]);
            post(matchData[i], matchTeam);

        	table = document.getElementById("send_messages");
            row = table.insertRow(-1);
        	////console.log("row-" + match.toString());
            //toDelete = document.getElementById("row-" + match.toString() + "." + team.toString());
        	////console.log(toDelete);
        	row.innerHTML = "<p>Data sent for match " + match + ".</p>";
            //stoDelete.parentNode.removeChild(toDelete);
        }
	}
};

    //TODO: Don't assume that the server actually got it. Also make sure to use the new match and team vars

    /*for (var key in localStorage) {
        try {
            content = JSON.parse(localStorage.getItem(key));
            thisMatch = content.match
            if(!content.isTele) {
                continue;
            }
            if(thisMatch == match) {
                localStorage.removeItem(key);
            }
        } catch(err) {
            continue;
        }
    }*/


function post(parameters, matchTeam) {
	//console.log(parameters);
    var form = $('<form id="upload"></form>');

    form.attr("method", "post");
    form.attr("action", path);

    $.each(parameters, function(key, value) {
        var field = $('<input></input>');
        field.attr("type", "hidden");
        field.attr("name", key);
        field.attr("value", value);

        form.append(field);
    });

    // The form needs to be a part of the document in
    // order for us to be able to submit it.
    $(document.body).append(form);
    $.post(path, form.serialize(), function(res) {
        //console.log(res);
		if (res === "success") {
			//console.log("It worked");
			deleteMatch(matchTeam);
		} else {
			//console.log("Error");
		}
    });
	//console.log("END");
}
