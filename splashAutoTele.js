//Global constants
RED = "#BE1E2D";
BLUE = "#1E2BBE";
BlueAllianceURL = "https://www.thebluealliance.com/api/v2/event/";
xbtAPP_ID = "?X-TBA-App-Id=FRC1983:Scouting:v2";
//Global variables
var robot;
var alliance;
var jStr;
var jObj;
var LSName

//initialize the splash sheet
function initialize() {
	jStr = '{"isTele":true,"scoutName":"default","eventName":"default","teamNo":0,"match":0,"alliance":"OOOO","auto":{"StartPos":"default","CrossLine":false,"Scale":0,"Switch":0,"noShow":false},"tele":{"Scale":0,"Switch":0,"Exchange":0},"deadBot":false,"Climb":false,"AssistedClimb":0,"ReceivedClimb":false,"Park":false}';
    jObj = JSON.parse(jStr);
	var str = window.location.search;
 	var tabletID = str.split("=");
	matchTablet(tabletID[1]);
	
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
			title = document.getElementById("autoHeader");
			sub = document.getElementById("autoSubmit");
	//			console.log("Match: ".concat(match));							// Test

			if (alliance === "RED") {
				teamNo = matches[match - 1].red[robot - 1];
				/*elem.innerHTML = teamNo;
				elem.style.color = RED;
				title.style.color = RED;
				sub.style.color = RED;
				sub.style.borderColor = RED;*/
			} else {
				teamNo = matches[match - 1].blue[robot - 1];
				/*elem.innerHTML = teamNo;
				elem.style.color = BLUE;
				title.style.color = BLUE;
				sub.style.color = BLUE;
				sub.style.borderColor = BLUE;*/
			}

			elem = document.getElementById("teamNoTele");
			title = document.getElementById("teleHeader");
			sub = document.getElementById("teleSubmit");

			if (alliance === "RED") {
				teamNo = matches[match - 1].red[robot - 1];
				/*elem.innerHTML = teamNo;
				elem.style.color = RED;
				title.style.color = RED;
				sub.style.color = RED;
				sub.style.borderColor = RED;*/
			} else {
				teamNo = matches[match - 1].blue[robot - 1];
				/*elem.innerHTML = teamNo;
				elem.style.color = BLUE;
				title.style.color = BLUE;
				sub.style.color = BLUE;
				sub.style.borderColor = BLUE;*/
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

function fakeRadioButtons(set, choice){
	var optionSet = $(set);
	console.log(optionSet);

}

function changeCounter(field, condition){
	var counter = document.getElementById(field);
	if(Number(counter.value) + condition > -1){
		counter.value =String(Number(counter.value) + condition);
	} else {
		counter.value = "0";
	}
}

function switchPage(currentPage, direction){
	var pages = ['splashPage', 'autoPage', 'telePage'];
	var currentPos = pages.indexOf(currentPage);
	if(currentPos == 0){
		autoInitialize();
	}
	if(direction === 'forward'){
		document.getElementById(pages[currentPos]).hidden = true;
		document.getElementById(pages[currentPos+1]).hidden = false;
	} else {
		document.getElementById(pages[currentPos]).hidden = true;
		document.getElementById(pages[currentPos-1]).hidden = false;
	}
}


//takes all the data from the three pages and puts them into one jObj, then puts that in local storage
function submitTele() {
    jObj.scoutName = document.getElementById("scoutSelect").value;
	jObj.eventName = document.getElementById("eventSelect").value;
	jObj.teamNumber = parseInt(document.getElementById(""));
	jObj.match = parseInt(document.getElementById("matchNumber")).value;
	jObj.alliance = alliance;
	if(document.getElementById("outsideStart").checked)	{
		jObj.auto.StartPos = "outside";
	} else {
		jObj.autoStartPos = "center";
	}
	jObj.auto.CrossLine = document.getElementById("crossedLine").checked;
	jObj.auto.Scale = parseInt(document.getElementById("autoScale").value, 10);
	jObj.auto.Switch = parseInt(document.getElementById("autoSwitch").value, 10);
	jObj.auto.noShow = document.getElementById("noShow").checked;
	jObj.tele.Scale = parseInt(document.getElementById("teleScale").value, 10);
	jObj.tele.Switch = parseInt(document.getElementById("teleSwitch").value, 10);
	jObj.tele.Exchange = parseInt(document.getElementById("teleExchange").value, 10);
	if (document.getElementById("autoDeadBot").checked || document.getElementById("teleDeadBot").checked){
		jObj.deadBot = true;
	} else {
		jObj.deadBot = false;
	}
	jObj.Climb = document.getElementById("climb").checked;
	jObj.AssistedClimb = parseInt(document.getElementById("AssistOthersClimb").value, 10);
	jObj.ReceivedClimb = document.getElementById("helpedClimb").checked;

	LSName = "name";

	localStorage.setItem(LSName, JSON.stringify(jObj));

	console.log(JSON.stringify(jObj));
}
