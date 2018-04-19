BlueAllianceURL = "https://www.thebluealliance.com/api/v2/event/";
xbtAPP_ID = "?X-TBA-App-Id=FRC1983:Scouting:v2";
//xbtAPP_ID = "?X-TBA-Auth-Key=d4V33bAbuXiKfuLW1pc4BaLbr56BgiORtyM5hwmRLU5qNf6Rxh83noDdI0mPJJ3R"
//TODO UNCOMMENT THE NEW API KEY ON LINE 3

// Global Variables //
var matches;
var counter = 0;

window.addEventListener('load', function() {

	events = ["2016wagg","2018week0","2018waahs","2018wasno","2018idbo","2018pncmp", "2018wamou", "2018roe"];
	for (var j=0; j<events.length; j++) {
    	eventName = events[j];
    	for (var i=0; i<localStorage.length; i++)    {
    		var key = localStorage.key(i);
    		////console.log(key);                                                            // Test
        	if (eventName.concat("Matches") == key) {
        		isThere = true;
          		checkForMatches(true);
            	break;
			}
    	}
	}
});



function download() {
  eventName = document.getElementById("eventSelect").value;
    isThere = false;
    for (i=0; i<localStorage.length; i++)
    {
        var key = localStorage.key(i);
    ////console.log(key);                                                            // Test
        if (eventName.concat("Matches") == key)
        {
            isThere = true;
        checkForMatches(true);
            break;
        }
    }
    if (!isThere)
    {
        chrs = BlueAllianceURL.concat(eventName);
        chrs = chrs.concat("/matches");
    ////console.log(chrs.concat(xbtAPP_ID));                            // Test
        issueRequestHTTP("GET", chrs.concat(xbtAPP_ID), function(result)
        {
            matchesHaveBeenDownloaded(result);
        });
    }
    //console.log("data downloaded");
}

function matchesHaveBeenDownloaded(contents) {
  //console.log("Hi");
  var alliances;
    var i, j;
    var red, blue;
    var sched;                                                                // Our schedule (in JSON)
    matches = new Array();                                            // Match schedule
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
  //console.log("hi");
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
  //console.log("Hi");
  var i;
  var row = newMatch(matrix[0][0], matrix[0][1], matrix[0][2], matrix[0][3], matrix[0][4], matrix[0][5], matrix[0][6]);
  ////console.log(row);                                                    // Test
  var parsed = new Array(row);
  for (i=1; i<matrix.length; i++)
  {
    parsed[i] = newMatch(matrix[i][0], matrix[i][1], matrix[i][2], matrix[i][3], matrix[i][4], matrix[i][5], matrix[i][6]);
  }
  //console.log(counter);
  localStorage.setItem("maxMatches", counter);
  var lsName = eventName.concat("Matches");
  localStorage.setItem(lsName, JSON.stringify(parsed));
}
function issueRequestHTTP(reqType, URL, callback) {
  //console.log("Hi");
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
        } else issueError(String(' ').concat(xhr.readyState), false);                                        // Test
    };
    xhr.open(reqType, URL, true);
    xhr.send(null);
    xhr.onerror = function (e)
    {
        issueError(xhr.statusText, false);
        //console.log(xhr.statusText);                                                                                        // Test
    }
  //console.log("hi");
}
function issueHTTPForm(formObj, URL, callback) {
  //console.log("Hi");
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
        } else issueError(String(' ').concat(xhr.readyState), false);                                        // Test
    };
    xhr.open("POST", URL, true);
    var fData = new FormData();
    fData.set("query",formObj);
    xhr.send(fData);
    xhr.onerror = function (e)
    {
        issueError(xhr.statusText, false);
        //console.log(xhr.statusText);                                                                                        // Test
    }
}
function newMatch(matchNo, red1, red2, red3, blue1, blue2, blue3) {
  //console.log("Hi")
  counter = counter + 1;
  //console.log(counter);
  checkForMatches(true);
//    //console.log('{"matchNo":' + matchNo + ',"red":[', red1 + ',' + red2 + ',' + red3 + '], "blue":[' + blue1 + ',' + blue2 + ',' + blue3 + ']}');
  return JSON.parse('{"matchNo":' + matchNo + ',"red":[' + red1 + ',' + red2 + ',' + red3 + '],"blue":[' + blue1 + ',' + blue2 + ',' + blue3 + ']}');
}

function issueError(msg, writeOver) {
    //console.log(msg);
}

function checkForMatches(statement){
  elem = document.getElementById("matchesImage");
  if (statement === true) {
    elem.src = "images/greenCheck.png";
  } else {
    elem.src = "images/redX.png";
  }
}
