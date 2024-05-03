/**
 * author: Tadhg Deeney
 * date: 2024-05-02
 * description: 
 * A handy little tool to help remind me of the tasks I'm putting off 
 * to change my approach or break them down into manageable tasks & keep track.
 */

// GLOBAL VARIABLES
var SHARE_URL = 'GOOGLE_SHEET_LINK';
var RECIPIENT_EMAILS = ['EMAIL_ADDRESS@gmail.com'];

/**
 * Function to check the to-domlist & send email notifications
 * if the tasks are overdue.
 */
function check_list() {
  var today_date = new Date();
  var ss = SpreadsheetApp.openByUrl(SHARE_URL);
  var sheet = ss.getSheetByName('To-Do List');
  var sheet_values = sheet.getDataRange().getValues();
  var output = [];
  
  // Loop through each row in the sheet, starting from index 3 to only get tasks added to the list & not the headers.
  sheet_values.slice(3).forEach(function(row) {
    var due_date = new Date(row[0]);
    var time_difference = today_date.getTime() - due_date.getTime();
    var days_overdue = Math.max(0, Math.floor(time_difference / (1000 * 60 * 60 * 24)));
    // If the task is overdue and not marked as complete:
    if (days_overdue > 0 && !row[1]) {
      var date_formatted = Utilities.formatDate(due_date, Session.getScriptTimeZone(), 'yyyy-MM-dd');
      output.push([row[2], date_formatted, days_overdue]);
    }
  });
  // If there are overdue tasks, send the email notifications.
  if (output.length >= 1) {
    send_email(output);
  } else {
    Logger.log('No emails to send today!');
  }
}

/**
 * A Function to send email notifications of the overdue tasks.
 * @param {array} results - a 2D array of all of the overdue tasks
 */
function send_email(results) {
  var date = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
  var subject = 'Keep Track - ' + date;

  var html_body = '<html><body>' +
    '<p>Hi Tadhg,</p>' +
    '<p>See full list <a href="' + SHARE_URL + '">here</a>.</p>' +
    '<table border="1" width="95%" style="border-collapse:collapse;">' +
    '<tr>' +
    '<td align="left"><b>Task</b></td>' +
    '<td align="center"><b>Due Date</b></td>' +
    '<td align="center"><b>Overdue</b></td>' +
    '</tr>';
  // Add each task  details to the table of the email.
  results.forEach(function(row) {
    html_body += '<tr><td align="left">' + row[0] +
      '</td><td align="center">' + row[1] +
      '</td><td align="center">' + row[2] +
      '</td></tr>';
  });

  html_body += '</table>' +
    '<br/><p>Kind Regards,<br/>The Habit Tracker</p></body></html>';
  // Send the email notification to each recipient
  var options = { htmlBody: html_body };
  RECIPIENT_EMAILS.forEach(function(email) {
    MailApp.sendEmail(email, subject, 'Please enable HTML to view this email.', options);
  });
}
