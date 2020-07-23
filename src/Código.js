function getJSONData_() {
    const url = "https://www.dph.illinois.gov/sitefiles/COVIDHistoricalTestResults.json?nocache=1";
    
    const urlSpreadSheet = "https://docs.google.com/spreadsheets/d/1geUH-utdfWpw-l08J853bnRcBuFZpr02IwjPZKcz6gk/edit#gid=0";
    var ss = SpreadsheetApp.openByUrl(urlSpreadSheet);
    var ws = ss.getSheetByName("COVID");
    const response = UrlFetchApp.fetch(url).getContentText();
    const responseJson = JSON.parse(response);
    const data = responseJson.state_testing_results.values;
        const ssData = data.map(r => [r.testDate,r.total_tested,r.confirmed_cases,r.deaths]);
    
    //console.log(ssData);
    ws.getRange(2,1,ssData.length,4).setValues(ssData);

    //SpreadsheetApp.getActiveSpreadsheet().getActiveSheet.getRange(2,1,ssData.length,4).setValues(ssData);
}


function getCovidData(){
    const urlSpreadSheet = "https://docs.google.com/spreadsheets/d/1geUH-utdfWpw-l08J853bnRcBuFZpr02IwjPZKcz6gk/edit#gid=0";
    var ss = SpreadsheetApp.openByUrl(urlSpreadSheet);
    var ws = ss.getSheetByName("COVID");
    const textData = ws.getRange(2,5,ws.getLastRow()-1,4).getDisplayValues();
    return textData.map(r => [r[0],parseInt(r[1]),parseInt(r[2]),parseInt(r[3])]);
    
}