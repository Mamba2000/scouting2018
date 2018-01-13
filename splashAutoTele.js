//Global constants
RED = "#BE1E2D";
BLUE = "#1E2BBE";

//Global variables
var robot = 0;

//initialize the splash sheet
function initialize() {
	var str = window.location.search;
 	var tabletID = str.split("=");
	matchTablet(tabletID[1]);
	scout = localStorage.getItem("ScoutName");
	if (scout != null) {
		document.getElementById('scoutselect').value = scout;
	}
	evnt = localStorage.getItem("Event");
	if (evnt != null) {
		document.getElementById('eventselect').value = evnt;
	}
}

//Determine which tablet is doing the scouting from splashPage input
function matchTablet(argument){
	switch(argument){
		case "RED1":
			alliance = "RED";
			robot = 1;
			break;
		case "RED2":
			alliance = "RED";
			robot = 2;
			break;
		case "RED3":
			alliance = "RED";
			robot = 3;
			break;
		case "BLUE1":
			alliance = "BLUE";
			robot = 1;
			break;
		case "BLUE2":
			alliance = "BLUE";
			robot = 2;
			break;
		case "BLUE3":
			alliance = "BLUE";
			robot = 3;
			break;
		default:
			alliance = "ANY";
			robot = 0;
			break;
	}
	document.getElementById("splashSheetHeader").innerHTML = alliance + " " + robot;
	if (alliance === "BLUE") {
		document.getElementById("splashSheetHeader").style.color = "blue";
	}
	else if (alliance === "RED") {
		document.getElementById("splashSheetHeader").style.color = "red";
	}
}

//initialize the auto and tele part of the app
function autoInitialize(){
	alliance = localStorage.getItem("splash_alliance");
	eventName = localStorage.getItem("splash_eventName");

	if ((eventName == "test") || (eventName == null)) {
		eventName = "2016wagg";		// Test
	}
	for (i=0; i<localStorage.length; i++) {
		var key = localStorage.key(i);
		//console.log(key);															// Test
		if (eventName.concat("Matches") == key) {
			isThere = true;
		}
	}

	if (isThere) {
		var jList = localStorage.getItem(eventName.concat("Matches"));
		//console.log(jList);
		matches = new Array();
		var matches = JSON.parse(jList);
	//		console.log("matches: " + matches.length);									// Test
		var match = Number(localStorage.getItem("splash_match"));
		if (match != null) {
			elem = document.getElementById("teamNo");
			heading = document.getElementById("autoHeader");
			sub = document.getElementById("autoSubmit");
	//			console.log("Match: ".concat(match));							// Test

			if (alliance === "RED") {
				teamNo = matches[match - 1].red[robot - 1];
				elem.innerHTML = teamNo;
				elem.style.color = RED;
				title.style.color = RED;
				sub.style.color = RED;
				sub.style.borderColor = RED;
			} else {
				teamNo = matches[match - 1].blue[robot - 1];
				elem.innerHTML = teamNo;
				elem.style.color = BLUE;
				title.style.color = BLUE;
				sub.style.color = BLUE;
				sub.style.borderColor = BLUE;
			}

			elem = document.getElementById("teamNoTele");
			title = document.getElementById("teleHeader");
			sub = document.getElementById("teleSubmit");

			if (alliance === "RED") {
				teamNo = matches[match - 1].red[robot - 1];
				elem.innerHTML = teamNo;
				elem.style.color = RED;
				title.style.color = RED;
				sub.style.color = RED;
				sub.style.borderColor = RED;
			} else {
				teamNo = matches[match - 1].blue[robot - 1];
				elem.innerHTML = teamNo;
				elem.style.color = BLUE;
				title.style.color = BLUE;
				sub.style.color = BLUE;
				sub.style.borderColor = BLUE;
			}
		}
	}
}
function validateInp(elem) {
	var validChars = /[0-9]/;
	var strIn = elem.value;
	var strOut = '';
    for (var i=0; i < strIn.length; i++) strOut += (validChars.test(strIn.charAt(i)))? strIn.charAt(i) : '';
    elem.value = strOut;
}

function fakeRadioButtons(){

}

function switchPage(currentPage, direction){
	if(currentPage == 'splash' && direction == 'forward'){
		autoInitialize();
		document.getElementById('splashPage').hidden = true;
		document.getElementById("autoPage").hidden = false;
	} else if(currentPage == 'auto' && direction == 'forward'){
		document.getElementById("autoPage").hidden = true;
		document.getElementById("telePage").hidden = false;
	} else if(currentPage == 'tele' && direction == 'backward'){
		document.getElementById("autoPage").hidden = false;
		document.getElementById("telePage").hidden = true;
	} else if(currentPage == 'auto' && direction == 'backward'){
		document.getElementById('splashPage').hidden = false;
		document.getElementById("autoPage").hidden = true;
	}
}
