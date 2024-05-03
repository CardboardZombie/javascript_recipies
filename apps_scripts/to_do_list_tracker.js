var SHARE_URL = 'https://docs.google.com/spreadsheets/d/1HABCawhwKAwj6rm1sWmwIqlnndifa4Z20hpPO8eeeFQ/edit?usp=sharing';
var RECIPIENT_EMAILS = ['tdeeney19@gmail.com']

function check_list() {
  var today_date = new Date();
  var ss = SpreadsheetApp.openByUrl(SHARE_URL);
  var sheet = ss.getSheetByName('To-Do List');
  var sheet_value = sheet.getDataRange().getValues();
  var output = [];
  for(var i = 3; i < sheet_value.length; i++){
    var due_date = new Date(sheet_value[i][0]);
    var time_difference = today_date.getTime() - due_date.getTime();  
    var days_overdue = parseInt(time_difference / (1000 * 60 * 60 * 24));  
    Logger.log("%s - %s = %s", due_date, today_date, days_overdue);
    if(days_overdue > 0 && sheet_value[i][1] != true){
      var date_formatted = Utilities.formatDate(due_date, 'Dublin/Europe', "YYYY-MM-dd");
      output.push([sheet_value[i][2], date_formatted, days_overdue]);
    }
  }
  Logger.log("%s - %s", output, output.length);
  if (output.length >= 1){
    send_email(output);
  }
  else{
    Logger.log("No emails to send today!");
  }
}


function send_email(results) {
    var date = new Date();
    date = Utilities.formatDate(date, 'Dublin/Europe', "YYYY-MM-dd");
    var subject = 'Keep Track - ' +date;
    var html_body = '<html><body>' +
        '<p>Hi Tadhg,</p>' +
        '<p>' +
        'See full list <a href="'+SHARE_URL+'">here</a>.<br/>';
        html_body += '<table border="1" width="95%" style="border-collapse:collapse;">';
        html_body += '<tr>';
        html_body += '<td align="left"><b>Task</b></td>';
        html_body += '<td align="center"><b>Due Date</b></td>';
        html_body += '<td align="center"><b>Overdue</b></td>';
        html_body += '</tr>';
        
        for (var i in results) {
            var row = results[i];
            Logger.log(row);
            html_body += '<tr><td align="left">' + row[0] +
            '</td><td align="center">' + row[1] +  
            '</td><td align="center">' + row[2] +
            '</td></tr>';
        }
        html_body += '</table>';
        html_body += '<br/><p>Kind Regards, <br/>The Habit Tracker</p></body></html>';
    var body = 'Please enable HTML to view this email.';
    var options = {htmlBody: html_body};
    for(var j in RECIPIENT_EMAILS){
      MailApp.sendEmail(RECIPIENT_EMAILS[j], subject, body, options);
    }
}
