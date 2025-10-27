# Sheet.best Setup Instructions for Expression of Interest Form

## Quick Setup

### 1. Create Your Google Sheet

Create a new Google Sheet with the following columns (in this order):
- `name`
- `email`
- `phone`
- `suburb`
- `heard about us`
- `comments`
- `timestamp`

### 2. Connect to Sheet.best

1. Go to [https://sheet.best](https://sheet.best)
2. Click "Connect Google Sheet"
3. Select the sheet you created
4. Allow the necessary permissions
5. You'll receive an API endpoint URL (looks like: `https://sheet.best/api/v1/sheets/YOUR_SHEET_ID`)

### 3. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp env.example .env
   ```

2. Edit `.env` and add your Sheet.best URL:
   ```
   VITE_SHEET_BEST_URL=https://sheet.best/api/v1/sheets/YOUR_SHEET_ID
   ```

3. Restart your development server:
   ```bash
   npm run dev
   ```

### 4. Test the Form

Submit a test expression of interest form and verify the data appears in your Google Sheet.

## What Happens Next?

- All form submissions are automatically added to your Google Sheet
- You can view, sort, and filter submissions in real-time
- You can export the data to CSV or integrate with other tools
- Data is stored securely in your Google Drive

## Temporary (Dev Mode)

If you haven't set up Sheet.best yet, the form will still work in development mode - it will show a console warning and display a success message. Set up the Sheet.best integration to capture real submissions.

