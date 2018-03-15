//Global constants
RED = "#BE1E2D";
BLUE = "#1E2BBE";
ORANGE = "#ffaf00";
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
var memeNum;
var eStop = false;
var eStop2 = false;
var isThere = false;

//initialize the splash sheet
function initialize() {
	loadMatch = localStorage.getItem("previousMatch");
	//console.log(loadMatch);
	//console.log(isNaN(loadMatch));
	//console.log(isNaN(1));
	if (loadMatch === null) {
	} else {
		loadMatch = parseInt(loadMatch) + 1;
		loadScout = localStorage.getItem("previousScout");
		//console.log(loadMatch + ", " + loadScout);
		document.getElementById("matchNumber").value = loadMatch.toString();
		document.getElementById("scoutSelect").value = loadScout.toString();
	}
	jStr = '{"isTele":true,"scoutName":"default","eventName":"default","teamNo":0,"match":0,"alliance":"OOOO","autoStartPos":"default","autoCrossLine":false,"autoScale":0,"autoSwitch":0,"NoShow":false,"teleScale":0,"teleSwitch":0,"teleExchange":0,"deadBot":false,"Climb":false,"AssistedClimb":0,"ReceivedClimb":false,"Park":false,"autoDroppedCubes":0,"teleDroppedCubes":0}';
    jObj = JSON.parse(jStr);
	var str = window.location.search;
 	matchTablet(str);
	eventList = ["2016wagg","2018week0","2018waahs","2018wasno","2018idbo","2018pncmp", "2018wamou"];
	if (localStorage.length !== 0) {
	loop1:
	    for (var j=0; j<eventList.length; j++) {
	    	eventNombre = eventList[j];
	    	for (var i=0; i<localStorage.length; i++) {
	        	var key = localStorage.key(i);
	    		//console.log(key);                                                            // Test
	            if (eventNombre.concat("Matches") == key) {
	                isThere = true;
					eventName = eventNombre.toString();
					//console.log(eventName);
					document.getElementById("matchesDownloadText").classList.remove("flash");
	            	checkForMatches();
					break loop1;
				} else {
					document.getElementById("matchesDownloadText").innerHTML = "Matches Downloaded: Error--None";
					document.getElementById("matchesDownloadText").className = "flash";
				}
	        }
	    }
	} else {
		document.getElementById("matchesDownloadText").innerHTML = "Matches Downloaded: Error--None";
		document.getElementById("matchesDownloadText").className = "flash";
		eStop2 = true;
	}
	memeNum = Math.floor(Math.random() * 32);
	document.getElementById("theOneAndOnly").src = "images/memes/" + memeNum + ".png";
}

function checkForMatches(){
	elem = document.getElementById("matchesDownloadText");
	switch(eventName) {
		case "2016wagg":
			eventReadable = "Girls Gen '16";
			break;
		case "2018waahs":
			eventReadable = "Auburn '18";
			break;
		case "2018wasno":
			eventReadable = "Glacier Peak '18";
			break;
		case "2018idbo":
			eventReadable = "Boise '18"
			break;
		case "2018week0":
			eventReadable = "Week 0 Bedford";
			break;
		case "2018pncmp":
			eventReadable = "District Champs '18";
			break;
		case "2018wamou":
			eventReadable = "Mount Vernon '18";
			break;
	}
	elem.innerHTML = "Matches Downloaded: " + eventReadable;
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
	if(alliance === "RED"){
		document.getElementById("splashSheetHeader").style.color = RED;
		document.getElementById("splashSubmit").style.color = RED;
		document.getElementById("autoTitle").style.color = RED;
		document.getElementById("teleTitle").style.color = RED;
		document.getElementById("autoTeamNum").style.color = RED;
		document.getElementById("autoTeamNum").style.borderColor = RED;
		document.getElementById("deadBotTeamNum").style.color = RED;
		document.getElementById("deadBotTeamNum").style.borderColor = RED;
		document.getElementById("teleTeamNum").style.color = RED;
		document.getElementById("teleTeamNum").style.borderColor = RED;
	} else if (alliance === "BLUE") {
		document.getElementById("splashSheetHeader").style.color = BLUE;
		document.getElementById("splashSubmit").style.color = BLUE;
		document.getElementById("autoTitle").style.color = BLUE;
		document.getElementById("teleTitle").style.color = BLUE;
		document.getElementById("autoTeamNum").style.color = BLUE;
		document.getElementById("autoTeamNum").style.borderColor = BLUE;
		document.getElementById("deadBotTeamNum").style.color = BLUE;
		document.getElementById("deadBotTeamNum").style.borderColor = BLUE;
		document.getElementById("teleTeamNum").style.color = BLUE;
		document.getElementById("teleTeamNum").style.borderColor = BLUE;
	}
}

function validateInputs(){
	estop = false;
	if(document.getElementById("matchNumber").value === "" || parseInt(document.getElementById("matchNumber").value) > parseInt(localStorage.getItem("maxMatches")) + 1){
		estop = true;
		document.getElementById("matchNumber").style.borderWidth = "thick";
		document.getElementById("matchNumber").style.borderColor = ORANGE;
		document.getElementById("matchNumText").className = "flash";
	} else {
		document.getElementById("matchNumber").style.borderWidth = "medium";
		document.getElementById("matchNumber").style.borderColor = "black";
		document.getElementById("matchNumText").classList.remove("flash");
	}
	if(document.getElementById("scoutSelect").value === "Default"){
		estop = true;
		document.getElementById("scoutNameText").style.borderWidth = "thick";
		document.getElementById("scoutNameText").className = "flash";
	} else {
		document.getElementById("scoutNameText").style.borderWidth = "medium";
		document.getElementById("scoutNameText").classList.remove = "flash";
	}
	//console.log(estop);
	setTimeout(autoInitialize(), 100);
}

//initialize the auto and tele part of the app
function autoInitialize(){
	//console.log(localStorage.getItem("maxMatches"));
	//console.log(parseInt(document.getElementById("matchNumber").value))
	//console.log(document.getElementById("scoutSelect").value);
	if(document.getElementById("matchNumber").value !== "666"){
		if(!estop){
			for (i=0; i<localStorage.length; i++) {
					var key = localStorage.key(i);
					////console.log(key);															// Test
		  		if (eventName.concat("Matches") == key) {
		  			isThere = true;
				}
			}
			if (isThere) {
				var jList = localStorage.getItem(eventName.concat("Matches"));
				////console.log(jList);
				matches = new Array();
				matches = JSON.parse(jList);
		//		//console.log("matches: " + matches.length);
				var match = parseInt(document.getElementById("matchNumber").value);
				if (alliance === "RED") {
					teamNo = matches[match - 1].red[robot - 1];
				} else {
					teamNo = matches[match - 1].blue[robot - 1];
				}
				document.getElementById("autoTeamNum").innerHTML = teamNo;
				document.getElementById("teleTeamNum").innerHTML = teamNo;
				document.getElementById("deadBotTeamNum").innerHTML = teamNo;
			}
			//console.log(teamNo);
			document.getElementById("matchNumber").style.borderWidth = "medium";
			document.getElementById("matchNumber").style.borderColor = "#000000";
			document.getElementById("matchNumText").classList.remove("flash");
			switchPage(true, 'autoPage');
		}
	} else {
		window.location.href = "https://www.reddit.com/r/CrappyDesign";
	}
}

function changeCounter(field, condition, max){
	var counter = document.getElementById(field);
	if(Number(counter.value) + condition > -1 && (parseInt(counter.value) < max || condition < 0)){
		counter.value = String(Number(counter.value) + condition);
	}
}

function fakeRadioButtons(unclicked) {
	for (var i = 0; i <= unclicked.length - 1; i++) {
		document.getElementById(unclicked[i]).checked = false;
	}
}

function validateInp(elem) {
	var validChars = /[0-9]/;
	var strIn = elem.value;
	var strOut = '';
    for (var i=0; i < strIn.length; i++) strOut += (validChars.test(strIn.charAt(i)))? strIn.charAt(i) : '';
    elem.value = strOut;
}

function switchPage(ifSplash, newPage){
	var pages = ['splashPage', 'autoPage', 'telePage', 'noShowPage'];
	if(document.getElementById("noShow").checked){
		newPage = "noShowPage";
	}
	if(!eStop && newPage != "mainPage"){
		if(newPage !== "splashPage"){
			for(var i = 0; i < pages.length; i++){
				document.getElementById(pages[i]).hidden = true;
			}
			if(pages.indexOf(newPage) > -1){
				document.getElementById(newPage).hidden = false;
			}
		} else {
			location.reload();
		}
	} else if(newPage === "mainPage") {
		window.location.href = newPage + ".html";
	}
}


//takes all the data from the three pages and puts them into one jObj, then puts that in local storage
function submitTele() {
	//console.log(eventName);
  	jObj.scoutName = document.getElementById("scoutSelect").value;
	jObj.eventName = eventName;
	jObj.teamNo = teamNo;
	jObj.match = parseInt(document.getElementById("matchNumber").value);
	jObj.alliance = alliance;
	jObj.NoShow = document.getElementById("noShow").checked;
	if(!document.getElementById("noShow").checked){
		if(document.getElementById("outsideStart").checked)	{
			jObj.autoStartPos = "outside";
		} else {
			jObj.autoStartPos = "center";
		}
		if(parseInt(document.getElementById("autoScale").value) > 0 || parseInt(document.getElementById("autoSwitch").value) > 0){
			jObj.autoCrossLine = true;
		} else {
			jObj.autoCrossLine = document.getElementById("crossedLine").checked;
		}
		jObj.autoScale = parseInt(document.getElementById("autoScale").value, 10);
		jObj.autoSwitch = parseInt(document.getElementById("autoSwitch").value, 10);
		jObj.autoSwitch = parseInt(document.getElementById("autoDroppedCubes").value, 10);
		jObj.teleScale = parseInt(document.getElementById("teleScale").value, 10);
		jObj.teleSwitch = parseInt(document.getElementById("teleSwitch").value, 10);
		jObj.teleExchange = parseInt(document.getElementById("teleExchange").value, 10);
		jObj.teleDroppedCubes = parseInt(document.getElementById("teleDroppedCubes").value, 10);
		if (document.getElementById("teleDeadBot").checked || document.getElementById("autoDeadBot")){
			jObj.deadBot = true;
		} else {
			jObj.deadBot = false;
		}
		jObj.Climb = document.getElementById("climb").checked;
		jObj.AssistedClimb = parseInt(document.getElementById("AssistOthersClimb").value);
		jObj.ReceivedClimb = document.getElementById("helpedClimb").checked;
		jObj.Park = document.getElementById("park").checked;
	}
	LSName = jObj.eventName.concat("_");
	LSName = LSName.concat(jObj.teamNo);
	LSName = LSName.concat("_");
	LSName = LSName.concat(jObj.match);
	LSName = LSName.concat("_");
	LSName = LSName.concat("Object");
	LSName = LSName.toString();

	localStorage.setItem(LSName, JSON.stringify(jObj));
	localStorage.setItem("previousMatch", jObj.match);
	localStorage.setItem("previousScout", jObj.scoutName);
	location.reload();
}
