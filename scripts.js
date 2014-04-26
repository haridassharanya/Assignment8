/**

 * @author Sharanya Haridas

 */
/*Outline:
 
    This program aims to use an API to a google fusion table as a means 
	 to get the data into a chart to be displayed on our webpage.
	 The data is from the FRED database and is on Civilian Unemployment  rate over the years.
	 We only want to display the data from a specified time post 2000 in a Line chart
 * Initial steps:
 /*1)FRED data on Civilian Unemployment is saved as a csv file to our local folder
 * 2)Index.html and scripts.js from previous assignment for are saved to the same folder to be modified 
 * e.g. by converting unneccessary to code to comment to do a way with it and then changing the code
 * 3)A copy of the data is saved as a fusion table on the Google Drive
 * The link for this is: https://www.google.com/fusiontables/DataSource?docid=1Kg4n_bZlh1j5xK_KG8KxJWFjRz4Ia4r-HS8-iCUZ#rows:id=1
 * A json array of array style format of the data is generated online as a link using google fusion table id and the sql api key
 */



//var thestemURL refers to the google fusion table api- says to select from the specified date
//var thekey is the api key

var thestemURL = "https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+*+FROM+1Kg4n_bZlh1j5xK_KG8KxJWFjRz4Ia4r-HS8-iCUZ+WHERE+DATE%3E%20";
var thekey = "&key=AIzaSyDo19_AYa5DRvvwPl9RmRIlsSxnmlbklqg";


//e refers to an event. In this case, the event is the specified year
//this function displayNewData activates an event e
function displayNewData(e) {

//target is a property of e
//id is the year, in index.html, it grabs the specified year in button from index

var mID = e.target.id;
console.log(mID);

//this splits the table into an array. year will be the second element, appearing after the underscore.

var mNameArray = mID.split("_");
console.log(mNameArray);

//this grabs the year, which is the second portion of the array

var mYear = mNameArray[1];


// this is a get request
	//the first parameter is the location of the file you want to open. 
   //the link in the first parameter essentially says, SELECT everything(*) FROM the given fusion table id where 
	//the DATE property is as explained and  the SQL API key is as given after the &key=
	//the second parameter activates the function dataLoaded
	// the third paramenter explains that it is a json format online
	
	
$.get(thestemURL+"'"+mYear+"-12-01'"+thekey, dataLoaded, "json");


//jquery.history.js helps us share a customized view of the page
//the below updates when something loads on the page
//the url in the browser changes to reflect the changing data on the page, based on the year button clicked

	History.pushState({
		year : mYear
	}, "Unemployment from- " + mYear, "?year=" + mYear);
	
}

//this is a callback function that loads data in json format into UNEMP

function dataLoaded(UNEMP) {
console.log(UNEMP);

	//the following variable calls for a table gTable with two columns and multiple rows
	

var gTable = new google.visualization.DataTable();
//when I add columns, the first parameter is the data type in that column and 
//the second parameter is the name of that column
//UNEMP has property columns or rows referred to after the period "."
//here, i ask to add  two columns : 0 is the first column which is string type
//1 refers to the second column of number type


gTable.addColumn('string', UNEMP.columns[0]);
gTable.addColumn('number', UNEMP.columns[1]);

//once columns have been added, the data flows into them once rows are added.

gTable.addRows(UNEMP.rows);


//The below code says to to create a line chart of all the data in UNEMP


var mOptions = {
title : "Unemployment Data"
};

//document.getelementbyid is the equivalent of jquery's $ sign with div name
//this variable gChart is referenced by the index.html file in creating a div for the page heading
	//it loads it in the specified div, namely, mChartDiv mentioned in html

var gChart = new google.visualization.LineChart(document.getElementById("mChartDiv"));

//draw has two parameters- the data table and the title

gChart.draw(gTable, mOptions);

}

//This function asks to load the google visualization table

function gVizloaded() {

console.log("google visualization is loaded!");


//the url is split on the question mark "?"
//if there's a question mark and something on the other side, its a 2 item array
//if the length is greater than 1 there's something in the url
//if its 1 or less than 1, then there's nothing in the url and default year is added


	var mURL = History.getState().cleanUrl;
	var mqueryArray = mURL.split("?");

//default year is 1990 but if the length of the queryarray exceeds 1, 
//default year becomes the queryarray split, and the second half is taken

	var mdefaultYear = "1990";

	if (mqueryArray.length > 1) {

		mdefaultYear = mqueryArray[1].split("=")[1];
	}



//$ is a jquery function, refers back to index page, when the button is clicked, new data is shown
//as it starts with a "."" grab by class name


$(".btn-success").on("click", displayNewData);

//here, the hash # says to grab by id, ie the year
//the round parenthesis  () indicates that click is a function and not a property (as it might be since it comes after a ".")

$("#year_"+mdefaultYear).click();


}


//the function below loads the page. this happens after documentready
function gDone() {
console.log("page done!");

//The below loads google charting package and calls back gvizloaded

google.load("visualization", "1", {
packages : ["corechart"],
"callback" : gVizloaded
});
}

//This is a documentready function. as soon as the document is ready to be manipulated,
// it asks to fire the gDone function

$(document).ready(gDone);

 