/**

 * @author Sharanya Haridas

 */


var stemURL = "https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+*+FROM+1Kg4n_bZlh1j5xK_KG8KxJWFjRz4Ia4r-HS8-iCUZ+WHERE+DATE%3E%20";
var thekey = "&key=AIzaSyDo19_AYa5DRvvwPl9RmRIlsSxnmlbklqg";



function displayNewData(e) {

var mID = e.target.id;
console.log(mID);



var mNameArray = mID.split("_");
console.log(mNameArray);

var mYear = mNameArray[1];


$.get(stemURL+"'"+mYear+"-12-01'"+thekey, dataLoaded, "json");


	History.pushState({
		year : mYear
	}, "Unemployment from- " + mYear, "?year=" + mYear);
	
}


function dataLoaded(UNEMP) {
console.log(UNEMP);



var gTable = new google.visualization.DataTable();



gTable.addColumn('string', UNEMP.columns[0]);
gTable.addColumn('number', UNEMP.columns[1]);


gTable.addRows(UNEMP.rows);



var mOptions = {
title : "Unemployment Data"
};



var gChart = new google.visualization.LineChart(document.getElementById("mChartDiv"));



gChart.draw(gTable, mOptions);

}



function gVizloaded() {

console.log("google visualization is loaded!");


	var mURL = History.getState().cleanUrl;
	var mqueryArray = mURL.split("?");


	var mdefaultYear = "1990";

	if (mqueryArray.length > 1) {

		mdefaultYear = mqueryArray[1].split("=")[1];
	}

$(".btn-success").on("click", displayNewData);



$("#year_"+mdefaultYear).click();


}


function gDone() {
console.log("page done!");


google.load("visualization", "1", {
packages : ["corechart"],
"callback" : gVizloaded
});
}


$(document).ready(gDone);

 