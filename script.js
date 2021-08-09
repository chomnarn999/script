var ss = SpreadsheetApp.openById("url_spreadsheets");
var sheet = ss.getSheetByName("name_sheets");

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var messange = data.queryResult.queryText;
  var values = sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn()).getValues();
  for (var i = 0; i < values.length; i++) {

    if (values[i][0] == messange) {
      i = i + 2;
      var Data = sheet.getRange(i, 2).getValue();

      var result = {
        "fulfillmentMessages": [{
        "platform": "FACEBOOK",
        "payload": {
          "facebook": {
            "text": Data
          }
        }
      }]
      }

      var replyJSON = ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
      return replyJSON;
    }
  }
}
