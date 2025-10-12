# BookTrack - Landing Page

A beautiful, modern landing page for a social reading app. Share books with friends, see what they're reading, and discover your next great read through trusted recommendations.

## Features

- 👥 Social reading focus - connect with friends and share books
- 📧 Email sign-up form with validation
- 🎨 Unique beige-brown and pastel color scheme
- 📱 Fully responsive design
- 📊 Direct integration with Google Sheets
- ✨ Modern UX with smooth animations and custom SVG icons

## Setup Instructions

### 1. Set Up Google Sheets

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Name it something like "BookTrack Signups"
3. In the first row, add these headers:
   - Column A: `Name`
   - Column B: `Email`
   - Column C: `Timestamp`

### 2. Deploy Google Apps Script

1. In your Google Sheet, click on **Extensions** > **Apps Script**
2. Delete any existing code in the script editor
3. Copy and paste the code from the `google-apps-script.js` file in this repository
4. Click the **Save** icon (💾) and name your project (e.g., "BookTrack Form Handler")

### 3. Deploy as Web App

1. In the Apps Script editor, click **Deploy** > **New deployment**
2. Click the gear icon (⚙️) next to "Select type" and choose **Web app**
3. Fill in the deployment settings:
   - **Description**: "BookTrack signup form handler"
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
4. Click **Deploy**
5. Click **Authorize access** and grant the necessary permissions
6. Copy the **Web app URL** that appears (it will look like: `https://script.google.com/macros/s/...`)

### 4. Update the Landing Page

1. Open the `script.js` file in your project
2. Find the line:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
   ```
3. Replace `'YOUR_GOOGLE_SCRIPT_URL_HERE'` with your Web app URL from step 3

### 5. Test Your Form

1. Open `index.html` in your web browser
2. Fill out the sign-up form with test data
3. Submit the form
4. Check your Google Sheet - you should see a new row with the submitted data!

## File Structure

```
book-web/
├── index.html              # Main HTML file
├── styles.css              # Stylesheet with beige-brown theme
├── script.js               # Form handling JavaScript
├── google-apps-script.js   # Google Apps Script code
└── README.md              # This file
```

## Color Scheme

The design uses a warm, inviting color palette:

- **Primary Colors**: Beige and brown tones (#F5E6D3, #A0826D, #6B5D54)
- **Accent Colors**: Soft pastels (pink, blue, green, peach, lavender)
- **Text Colors**: Dark brown for headings, medium brown for body text

## Customization

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-beige: #F5E6D3;
    --warm-brown: #A0826D;
    /* ... and more */
}
```

### Updating Content

Edit the text content in `index.html` to match your needs:
- Hero section
- Feature descriptions
- Form labels
- Footer information

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Form Not Submitting

1. Check that you've replaced `YOUR_GOOGLE_SCRIPT_URL_HERE` in `script.js`
2. Verify that your Google Apps Script is deployed as a web app
3. Make sure you've authorized the script with the correct permissions

### Data Not Appearing in Google Sheets

1. Check that your sheet has the correct headers (Name, Email, Timestamp)
2. Verify the sheet name in `google-apps-script.js` matches your actual sheet name
3. Look at the Apps Script execution logs (View > Executions) for errors

### CORS Errors

This is normal! The form uses `no-cors` mode, which means you won't see the response but the data will still be sent to Google Sheets.

## License

Free to use for personal and commercial projects.

## Support

For issues or questions, please check the troubleshooting section above or review your Google Apps Script execution logs.

