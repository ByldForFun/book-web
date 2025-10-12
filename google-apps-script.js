/**
 * Google Apps Script for BookTrack Signup Form
 * 
 * This script receives form submissions from the landing page
 * and saves them to a Google Sheet.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Copy and paste this entire code
 * 4. Save the project
 * 5. Deploy as Web App (Deploy > New deployment > Web app)
 * 6. Set "Execute as" to "Me" and "Who has access" to "Anyone"
 * 7. Copy the Web App URL and paste it in script.js
 */

// Configuration
const SHEET_NAME = 'Sheet1'; // Change this if your sheet has a different name

/**
 * Handles POST requests from the signup form
 */
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet and sheet
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // If sheet doesn't exist, create it
    if (!sheet) {
      sheet = spreadsheet.getSheets()[0];
    }
    
    // Check if headers exist, if not, add them
    const lastRow = sheet.getLastRow();
    if (lastRow === 0) {
      sheet.appendRow(['Name', 'Email', 'Timestamp']);
    }
    
    // Add the new signup data
    sheet.appendRow([
      data.name,
      data.email,
      new Date(data.timestamp)
    ]);
    
    // Format the timestamp column
    const newRow = sheet.getLastRow();
    sheet.getRange(newRow, 3).setNumberFormat('yyyy-mm-dd hh:mm:ss');
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Signup saved successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log the error
    console.error('Error:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handles GET requests (optional - for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'BookTrack signup form handler is running!'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function to verify the script works
 * Run this function from the Apps Script editor to test
 */
function testScript() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        timestamp: new Date().toISOString()
      })
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}

