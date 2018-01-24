var matches;
const DEBUG = false;

if(DEBUG) {
    var path = "http://localhost:3000";
} else {
    var path = "http://ubuntu@ec2-52-35-34-216.us-west-2.compute.amazonaws.com:3000"; //TODO: Put in AWS info
}

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

        match = row.insertCell(-1);
        team = row.insertCell(-1);
        submit = row.insertCell(-1);

        match.innerHTML = oneMatch.match;
        team.innerHTML = oneMatch.teamNo;
        submit.innerHTML = "<button id=\"" + name + "\" class=\"submitButtons\" onclick=\"sendData(" + name + ");\">Submit Data</button>";
    });
});

function sendData(match) {
    console.log("Data sending for match" + match + "...");

    toDelete = document.getElementById("row-" + match.toString());

    matches.forEach(function(oneMatch) {
        if(oneMatch.match == match) {
            console.log("Ping pong");
            post(oneMatch, match, toDelete);
        }
    });

    //TODO: put this code inside the success condition for post()
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
};

function post(parameters, match, toDelete) {
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

    table = document.getElementById("send_messages");
    row = table.insertRow(-1);

    //TODO: Check if connection to server is a-ok
    $.post(path, $('#upload').serialize(), function(data) {
        if(data !== "success") {
            row.innerHTML = "<p>Upload failed: " + data + "</p>";
        } else {
            row.innerHTML = "<p>Data sent for match " + match + ".</p>";
            toDelete.parentNode.removeChild(toDelete);
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        row.innerHTML = "<p>Upload failed: Server not found</p>";
    });
}
