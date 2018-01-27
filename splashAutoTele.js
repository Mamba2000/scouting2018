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
var LSName;											    	// List of teams
var matches;
var eventName;
var teamNo;

//initialize the splash sheet
function initialize() {
	jStr = '{"isTele":true,"scoutName":"default","eventName":"default","teamNo":0,"match":0,"alliance":"OOOO","autoStartPos":"default","autoCrossLine":false,"autoScale":0,"autoSwitch":0,"noShow":false,"teleScale":0,"teleSwitch":0,"teleExchange":0,"deadBot":false,"Climb":false,"AssistedClimb":0,"ReceivedClimb":false,"Park":false}';
    jObj = JSON.parse(jStr);
	var str = window.location.search;
 	matchTablet(str);
}

//Determine which tablet is doing the scouting from splashPage input
function matchTablet(argument){
	switch(argument){
		case "?RED1":
			alliance = "RED";
			robot = 1;
			break;
		case "?RED2":
			alliance = "RED";
			robot = 2;
			break;
		case "?RED3":
			alliance = "RED";
			robot = 3;
			break;
		case "?BLUE1":
			alliance = "BLUE";
			robot = 1;
			break;
		case "?BLUE2":
			alliance = "BLUE";
			robot = 2;
			break;
		case "?BLUE3":
			alliance = "BLUE";
			robot = 3;
			break;
		default:
			alliance = "ANY";
			robot = 0;
			break;
	}
	document.getElementById("splashSheetHeader").innerHTML = (alliance + " " + robot);
	console.log(alliance);
	if(alliance === "RED"){
		document.getElementById("splashSheetHeader").style.color = RED;
	} else if (alliance === "BLUE") {
		document.getElementById("splashSheetHeader").style.color = BLUE;
	}
}

//initialize the auto and tele part of the app
function autoInitialize(){
	eventName = "2016wagg";
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
		matches = JSON.parse(jList);
//		console.log("matches: " + matches.length);									// Test
		var match = parseInt(document.getElementById("matchNumber").value);
		if (alliance === "RED") {
			teamNo = matches[match - 1].red[robot - 1];
		} else {
			teamNo = matches[match - 1].blue[robot - 1];
		}
		document.getElementById("autoTeamNum").innerHTML = teamNo;
		document.getElementById("teleTeamNum").innerHTML = teamNo;
	}
	console.log(teamNo);
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
	jObj.teamNumber = teamNo;
	jObj.match = parseInt(document.getElementById("matchNumber")).value;
	jObj.alliance = alliance;
	if(document.getElementById("outsideStart").checked)	{
		jObj.autoStartPos = "outside";
	} else {
		jObj.autoStartPos = "center";
	}
	jObj.autoCrossLine = document.getElementById("crossedLine").checked;
	jObj.autoScale = parseInt(document.getElementById("autoScale").value, 10);
	jObj.autoSwitch = parseInt(document.getElementById("autoSwitch").value, 10);
	jObj.noShow = document.getElementById("noShow").checked;
	jObj.teleScale = parseInt(document.getElementById("teleScale").value, 10);
	jObj.teleSwitch = parseInt(document.getElementById("teleSwitch").value, 10);
	jObj.teleExchange = parseInt(document.getElementById("teleExchange").value, 10);
	if (document.getElementById("autoDeadBot").checked || document.getElementById("teleDeadBot").checked){
		jObj.deadBot = true;
	} else {
		jObj.deadBot = false;
	}
	jObj.Climb = document.getElementById("climb").checked;
	jObj.AssistedClimb = parseInt(document.getElementById("AssistOthersClimb").value, 10);
	jObj.ReceivedClimb = document.getElementById("helpedClimb").checked;

	LSName = jObj.eventName.concat("_");
	LSName = LSName.concat(jObj.teamNumber);
	LSName = LSName.concat("_");
	LSName = LSName.concat(jObj.match);
	LSName = LSName.concat("_");
	LSName = LSName.concat("Object");

	localStorage.setItem(LSName, JSON.stringify(jObj));

	console.log(JSON.stringify(jObj));
}
