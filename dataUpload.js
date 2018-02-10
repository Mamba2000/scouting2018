var matchData;
var path = "http://ubuntu@ec2-52-35-34-216.us-west-2.compute.amazonaws.com:3000"; //TODO: Put in AWS info

window.addEventListener('load', function() {
    table = document.getElementById("matchData");

    matchData = [];
    for (var key in localStorage) {
        try {
            key = JSON.parse(localStorage.getItem(key));
            isTele = key.isTele;
            if(!key.isTele) {
                //console.log("Not a Match");
                continue;
            }
            //console.log("Pushing match");
            matchData.push(key);
        } catch(err) {
            //console.log("Not a Match");
            continue;
        }
    }

    //console.log(matchData);

    matchData.sort(function(a, b) {
        return parseInt(a.match) - parseInt(b.match);
    });

    matchData.forEach(function(oneMatch) {
        //console.log("Good Match");
        row = table.insertRow(-1);
        name = oneMatch.match;
        row.id = "row-" + name.toString();
		//console.log(document.getElementById(row.id));
		check = row.insertCell(-1);
		match = row.insertCell(-1);
        team = row.insertCell(-1);
        // submit = row.insertCell(-1);
		//console.log(row.id);
		//console.log(name + "Box");

		check.innerHTML = "<input type=\"checkbox\" id=\"" + name + "Box\" class=\"checkbox\" value=false>";
        match.innerHTML = oneMatch.match;
        team.innerHTML = oneMatch.teamNo;
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

function sendAll() {
    checkboxes = document.getElementsByClassName("checkbox");
    console.log(checkboxes);
    Array.from(checkboxes).forEach(function(checkbox, i) {
        if(checkbox.checked) {
            console.log(checkbox.id[0]);
            sendData(parseInt(checkbox.id[0]));
        }
    });
}

function sendData(match) {
    for (var i = 0; i < matchData.length; i++) {
        if(matchData[i].match === match) {
			console.log(matchData[i]);
            post(matchData[i]);

        	table = document.getElementById("send_messages");
            row = table.insertRow(-1);
        	//console.log("row-" + match.toString());
            toDelete = document.getElementById("row-" + match.toString());
        	//console.log(toDelete);
        	row.innerHTML = "<p>Data sent for match " + match + ".</p>";
            toDelete.parentNode.removeChild(toDelete);
        }
	}
};

    //TODO: Don't assume that the server actually got it.

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


function post(parameters) {
	console.log(parameters);
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
    $.post(path, $('#upload').serialize(), function(res) {
        console.log(res);
    });
}
