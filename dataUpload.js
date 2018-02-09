var matches;
var path = "http://ubuntu@ec2-52-35-34-216.us-west-2.compute.amazonaws.com:3000"; //TODO: Put in AWS info

window.addEventListener('load', function() {
    table = document.getElementById("matchData");

    matches = [];
    for (var key in localStorage) {
        try {
            key = JSON.parse(localStorage.getItem(key));
            isTele = key.isTele;
            if(!key.isTele) {
                console.log("Not a Match");
                continue;
            }
            console.log("Pushing match");
            matches.push(key);
        } catch(err) {
            console.log("Not a Match");
            continue;
        }
    }

    console.log(matches);

    matches.sort(function(a, b) {
        return parseInt(a.match) - parseInt(b.match);
    });

    matches.forEach(function(oneMatch) {
        console.log("Good Match");
        row = table.insertRow(-1);
        name = oneMatch.match;
        row.id = "row-" + name.toString();
		console.log(document.getElementById(row.id));
		check = row.insertCell(-1);
		match = row.insertCell(-1);
        team = row.insertCell(-1);
        // submit = row.insertCell(-1);
		console.log(row.id);
		console.log(name + "Box");

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

function sendData() {
	console.log(matches);
	elems = document.getElementsByClassName("checkbox");
	console.log(elems.length);
	var elemArray = [];
	for (var j = 1; j <= elems.length; j++) {
		console.log(document.getElementById(j + "Box"));
		if (document.getElementById(j + "Box") == null) {
			console.log(j + "Doesn't exist!");
		} else {
			elemArray.push(j.toString() + "Box");
		}
	}
	console.log(elemArray);
    for (var i = 1; i <= matches.length; i++) {
		console.log(document.getElementById(elemArray[i-1]).checked);
		if (document.getElementById(elemArray[i-1]).checked) {
			oneMatch = matches[i-1];
			console.log(oneMatch)
		    post(oneMatch);

			table = document.getElementById("send_messages");
		    row = table.insertRow(-1);
			console.log("row-" + i.toString());
		    toDelete = document.getElementById("row-" + i.toString());
			console.log(toDelete);
			row.innerHTML = "<p>Data sent for match " + i + ".</p>";
		    toDelete.parentNode.removeChild(toDelete);
		} else {
			console.log("False for " + parseInt(i));
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
    $.post(path, $('#upload').serialize())
}
