BlueAllianceURL = "https://www.thebluealliance.com/event/";
xbtAPP_ID = "?X-TBA-App-Id=FRC1983:Scouting:v2";
DatabaseURL = "http://ec2-52-42-95-150.us-west-2.compute.amazonaws.com:8080";
// Global Variables //
var matches;


window.onload = function() {
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
      matches.push(key);
    } catch(err) {
      console.log("Not a Match");
      continue;
    }
  }

  matches.sort(function(a, b) {
    return parseInt(a.match) - parseInt(b.match);
  });
  matches.forEach(function(thing) {
    console.log("Good Match");
    row = table.insertRow(-1);
    name = thing.match;
    row.id = "row-" + name.toString();

    match = row.insertCell(-1);
    team = row.insertCell(-1);
    sent = row.insertCell(-1);
    submit = row.insertCell(-1);

    match.innerHTML = thing.match;
    team.innerHTML = thing.teamNo
    sent.innerHTML = "No";
    submit.innerHTML = "<button id=\"" + name + "\" onclick=\"sendData(" + name + ");\">Submit Data</button>";
  });
};

function sendData(name) {
  table = document.getElementById("send_messages");
  row = table.insertRow(-1);

  row.innerHTML = "<p>Data sent for match " + name.toString() + ".</p>";
  row.parentNode.removeChild(row);
};

function download() {
  eventName = document.getElementById("eventSelect").value;
	isThere = false;
	for (i=0; i<localStorage.length; i++)
	{
		var key = localStorage.key(i);
    //console.log(key);															// Test
    	if (eventName.concat("Matches") == key)
    	{
    		isThere = true;
    		break;
    	}
	}
	if (!isThere)
	{
		chrs = BlueAllianceURL.concat(eventName);
		chrs = chrs.concat("/matches");
    //console.log(chrs.concat(xbtAPP_ID));							// Test
		issueRequestHTTP("GET", chrs.concat(xbtAPP_ID), function(result)
		{
			matchesHaveBeenDownloaded(result);
		});
	}
	console.log("data downloaded");
}

function matchesHaveBeenDownloaded(contents) {
  var alliances;
	var i, j;
	var red, blue;
	var sched;																// Our schedule (in JSON)
	matches = new Array();											// Match schedule
	var parsed = JSON.parse(contents);
	j = 0;
	for (i=0; i<parsed.length; i++)
	{
		if (parsed[i].comp_level == "qm")
		{
			red = parsed[i].alliances.red;
			blue = parsed[i].alliances.blue;
			matches[j] = [Number(parsed[i].match_number), Number(red.teams[0].substring(3,red.teams[0].length)), Number(red.teams[1].substring(3,red.teams[1].length)), Number(red.teams[2].substring(3,red.teams[2].length)),Number(blue.teams[0].substring(3,blue.teams[0].length)),  Number(blue.teams[1].substring(3,blue.teams[1].length)),  Number(blue.teams[2].substring(3,blue.teams[2].length))];
			j++;
		}
	}
	sortMatches(matches);
	generateJSON(matches);
}

function sortMatches(sched) {
  var i, j, k; var swapped;
	var temp;
	swapped = true;
	j = 0;
	while (swapped)
	{
		swapped = false;
		j++;
		for (i = 0; i < sched.length - j; i++)
		{
			k = i + 1;
			if (sched[k][0] < sched[i][0])
			{
				swapped = true;
				temp = [sched[k][0],sched[k][1],sched[k][2],sched[k][3],sched[k][4],sched[k][5],sched[k][6]];
				sched[k] = sched[i];
				sched[i] = temp;
			}
		}
	}
}

function generateJSON(matrix) {
  var i;
  var row = newMatch(matrix[0][0], matrix[0][1], matrix[0][2], matrix[0][3], matrix[0][4], matrix[0][5], matrix[0][6]);
  //console.log(row);													// Test
  var parsed = new Array(row);
  for (i=1; i<matrix.length; i++)
  {
    parsed[i] = newMatch(matrix[i][0], matrix[i][1], matrix[i][2], matrix[i][3], matrix[i][4], matrix[i][5], matrix[i][6]);
  }
  var lsName = eventName.concat("Matches");
  localStorage.setItem(lsName, JSON.stringify(parsed));
}
function issueRequestHTTP(reqType, URL, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onload = function (e)
	{
		if (xhr.readyState == 4)
		{
			if (xhr.status == 200)
			{
				if (xhr.responseText == "Not found")
				{
					issueError(' Not found.', false);
				} else {
					callback(xhr.responseText);
				}
			} else {
				issueError(' HTTP returns ' + xhr.status, false);
			}
		} else issueError(String(' ').concat(xhr.readyState), false);										// Test
	};
	xhr.open(reqType, URL, true);
	xhr.send(null);
	xhr.onerror = function (e)
	{
		issueError(xhr.statusText, false);
		console.log(xhr.statusText);																						// Test
	}
}
function issueHTTPForm(formObj, URL, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onload = function (e)
	{
		if (xhr.readyState == 4)
		{
			if (xhr.status == 200)
			{
				if (xhr.responseText == "Not found")
				{
					issueError(' Not found.', false);
				} else {
					callback(xhr.responseText);
				}
			} else {
				issueError(' HTTP returns ' + xhr.status, false);
			}
		} else issueError(String(' ').concat(xhr.readyState), false);										// Test
	};
	xhr.open("POST", URL, true);
	var fData = new FormData();
	fData.set("query",formObj);
	xhr.send(fData);
	xhr.onerror = function (e)
	{
		issueError(xhr.statusText, false);
		console.log(xhr.statusText);																						// Test
	}
}
function newMatch(matchNo, red1, red2, red3, blue1, blue2, blue3) {
//	console.log('{"matchNo":' + matchNo + ',"red":[', red1 + ',' + red2 + ',' + red3 + '], "blue":[' + blue1 + ',' + blue2 + ',' + blue3 + ']}');
	return JSON.parse('{"matchNo":' + matchNo + ',"red":[' + red1 + ',' + red2 + ',' + red3 + '],"blue":[' + blue1 + ',' + blue2 + ',' + blue3 + ']}');
}

function checkForMatches(){

}
