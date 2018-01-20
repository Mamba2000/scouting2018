RED = "#BE1E2D";
BLUE = "#1E2BBE";
var jObj;
var matches;						//hi im evan and im not cool
var robot;
var alliance;
var teamNo;

function initialize() {
	robot = eval(localStorage.getItem("splash_robot"));
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
				elem.innerHTML = teamNo;
				elem.style.color = RED;
				title.style.color = RED;
				sub.style.color = RED;
				sub.style.borderColor = RED;
			} else {
				//console.log(alliance);
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
			// localStorage.setItem("TeamNo", teamNo);
			//console.log(teamNo);
		}
	}
	var jStr = '{"isTele":"true","scoutName":"Notdefined","eventName":"","teamNo":0,"match":0,"robot":0,"alliance":"OOO","auto":{"gearScores":"none","passLine":false,"highScores":0,"lowScores":0,"noShow":false,"deadBot":false,"startLocation":"default"},';
	jStr = jStr.concat('"tele":{"gearScores":0,"gearDrops":0,"highScores":0,"lowScores":0,"playDefense":false,"deadBot":false,"yellowCard":false,"redCard":false,"climbSuccess":false,"climbFail":false,"climbNone":true,"climbTime":"00.00","foulPoints":0}}');
	jObj = JSON.parse(jStr);
	jObj.robot = robot;
	jObj.alliance = alliance;
	jObj.scoutName = localStorage.getItem("splash_scoutName");
	jObj.teamNo = teamNo
	jObj.eventName = localStorage.getItem("splash_eventName");
	var chrs = localStorage.getItem(jObj.eventName.concat("Matches"));
	matches = JSON.parse(chrs);
	jObj.match = localStorage.getItem("splash_match");
	var chr = jObj.eventName + jObj.teamNo + jObj.match;
	chr = chr.concat("Object");
	var obj = localStorage.getItem(chr);
	parsed = JSON.parse(obj);

	var seconds = 00;
	var tens = 00;
	var appendTens = document.getElementById("tens");
	var appendSeconds = document.getElementById("seconds");
	var buttonStart = document.getElementById('button-start');
	var buttonStop = document.getElementById('button-stop');
	var buttonReset = document.getElementById('button-reset');
	var Interval ;
	//console.log("This happened");
	buttonStart.onclick = function() {
		clearInterval(Interval);
		Interval = setInterval(startTimer, 10);
	}
	  buttonStop.onclick = function() {
		clearInterval(Interval);
	}
	buttonReset.onclick = function() {
		clearInterval(Interval);
		tens = "00";
		seconds = "00";
		appendTens.innerHTML = tens;
		appendSeconds.innerHTML = seconds;
	}
}
function startTimer() {
	tens++;
	if(tens < 9) {
		appendTens.innerHTML = "0" + tens;
	}
	if (tens > 9) {
		appendTens.innerHTML = tens;
	}
	if (tens > 99) {
		//console.log("seconds");
		seconds++;
		appendSeconds.innerHTML = "0" + seconds;
		tens = 0;
		appendTens.innerHTML = "0" + 0;
	}
	if (seconds > 9) {
		appendSeconds.innerHTML = seconds;
	}
}

function buttonCheck(type, option){
	var boxes = null;
	switch(type){
		case "startCheck":
			var boxes = [document.getElementById("boilerStart"), document.getElementById("centerStart"), document.getElementById("feederStart")];
			break;
		case "gearCheck":
			boxes = [document.getElementById("autoGearSuccess"), document.getElementById("autoGearMissed"), document.getElementById("autoGearDropped"), document.getElementById("autoGearNone")];
			break;
		case "autoMiscCheck":
			boxes = [document.getElementById("passLine"), document.getElementById("noShow"), document.getElementById("autoDeadBot")];
			break;
		case "card":
			boxes = [document.getElementById("yellowCard"), document.getElementById("redCard")];
			break;
		case "climb":
			boxes = [document.getElementById("climbSuccess"), document.getElementById("climbFailed"), document.getElementById("climbNone")];
			break;
		}
		for(var i = 0; i<boxes.length; i++) {
			if(i != option) {
				boxes[i].checked = false;
			}
		}
	}

function upFifths(elemID) {
	var elem = document.getElementById(elemID);
	elem.value = String(Number(elem.value) + 5);
}

function upTenths(elemID) {
	var elem = document.getElementById(elemID);
	elem.value = String(Number(elem.value) + 10);
}

function upUnits(elemID) {
	var elem = document.getElementById(elemID);
	elem.value = String(Number(elem.value) + 1);
}

function downFifths(elemID) {
	var elem = document.getElementById(elemID);
	elem.value = String(Math.max(Number(elem.value) - 5,0));
}

function downUnits(elemID) {
	var elem = document.getElementById(elemID);
	elem.value = String(Math.max(Number(elem.value) - 1,0));
}

function up25ths(elemID) {
	var elem = document.getElementById(elemID);
	elem.value = String(Number(elem.value) + 25);
 }

function down25ths(elemID) {
	var elem = document.getElementById(elemID);
	elem.value = String(Math.max(Number(elem.value) - 25,0));
}

function back(q) {
	if (q === 'auto') {
		window.history.back();
	} else if (q === 'tele') {
		document.getElementById("autonomousHalf").hidden = false;
		document.getElementById("teleopHalf").hidden = true;
	}
}

function submit(q) {
	if (q === 'auto') {
		document.getElementById("autonomousHalf").hidden = true;
		document.getElementById("teleopHalf").hidden = false;
	} else if (q === 'tele') {
		// auto first
		if(document.getElementById("autoGearSuccess").checked) {
			jObj.auto.gearScores = "success";
		}
		if (document.getElementById("autoGearMissed").checked) {
			jObj.auto.gearScores = "missed";
		}
		if (document.getElementById("autoGearDropped").checked) {
			jObj.auto.gearScores = "dropped";
		}
		if (document.getElementById("autoGearNone").checked) {
			jObj.auto.gearScores = "none";
		}
		jObj.auto.passLine = document.getElementById("passLine").checked;
		jObj.auto.highScores = parseInt(document.getElementById("autoHighScores").value);
		jObj.auto.lowScores = parseInt(document.getElementById("autoLowScores").value);
		jObj.auto.noShow = document.getElementById("noShow").checked;
		jObj.auto.deadBot = document.getElementById("autoDeadBot").checked;
		if (document.getElementById("boilerStart").checked) {
			jObj.auto.startLocation = "boiler";
		}
		if (document.getElementById("centerStart").checked) {
			jObj.auto.startLocation = "center";
		}
		if (document.getElementById("feederStart").checked) {
			jObj.auto.startLocation = "feeder";
		}
		// now tele
		jObj.tele.gearScores = parseInt(document.getElementById("teleGears").value);
		jObj.tele.highScores = parseInt(document.getElementById("teleHighScores").value);
		jObj.tele.lowScores = parseInt(document.getElementById("teleLowScores").value);
		jObj.tele.playDefense = document.getElementById("defense").checked;
		jObj.tele.deadBot = document.getElementById("teleDead").checked;
		jObj.tele.yellowCard = document.getElementById("yellowCard").checked;
		jObj.tele.redCard = document.getElementById("redCard").checked;
		jObj.tele.climbSuccess = document.getElementById("climbSuccess").checked;
		jObj.tele.climbFail = document.getElementById("climbFailed").checked;
		jObj.tele.climbNone = document.getElementById("climbNone").checked;
		milliseconds = document.getElementById("tens").innerHTML;
		secs = document.getElementById("seconds").innerHTML;
		milliseconds = parseInt(milliseconds);
		secs = parseInt(secs);
		timing = secs;
		timing = timing + (milliseconds * 0.01);
		jObj.tele.climbTime = timing;
		abc = document.getElementById("autoFoul").value;
		abc = parseInt(abc);
		xyz = document.getElementById("teleFoul").value;
		xyz = parseInt(xyz);
		jObj.tele.foulPoints = abc + xyz;
		// now local store jObj
		var LSName = jObj.eventName.concat("_");
		LSName = LSName.concat(jObj.teamNo);
		LSName = LSName.concat("_");
		LSName = LSName.concat(jObj.match);
		LSName = LSName.concat("_");
		LSName = LSName.concat("Object");
		localStorage.setItem(LSName, JSON.stringify(jObj));
		console.log(LSName);
		console.log(JSON.stringify(jObj));
		// now go back to the start
		if (jObj.alliance === "RED") {
			if (jObj.robot === 1) {
				window.location.href = "SplashSheet.html?robot=RED1";
			} else if (jObj.robot === 2) {
				window.location.href = "SplashSheet.html?robot=RED2";
			} else if (jObj.robot === 3) {
				window.location.href = "SplashSheet.html?robot=RED3";
			}
		} else if (jObj.alliance === "BLUE") {
			if (jObj.robot === 1) {
				window.location.href = "SplashSheet.html?robot=BLUE1";
			} else if (jObj.robot === 2) {
				window.location.href = "SplashSheet.html?robot=BLUE2";
			} else if (jObj.robot === 3) {
				window.location.href = "SplashSheet.html?robot=BLUE3";
			}
		} else {
			window.location.href = "SplashSheet.html";
		}
//		console.log(timing);
//		console.log(jObj);
	}
}
