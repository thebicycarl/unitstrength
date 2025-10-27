# Sheet.best Configuration

Your Sheet.best integration is ready! Here's what you need to do:

## Step 1: Create Your Google Sheet

Create a Google Sheet with these exact column headers (in this exact order):

| name | email | phone | suburb | heard about us | comments | timestamp |
|------|-------|-------|--------|----------------|----------|-----------|

## Step 2: Set Up Your .env File

Create a `.env` file in the root of your project and add:

```env
VITE_SHEET_BEST_URL=https://api.sheetbest.com/sheets/3ac30cfd-934c-4efa-b7a6-8f92ddbf5a1b
```

## Step 3: Connect Your Sheet to Sheet.best

1. Go to https://sheet.best
2. Use your Sheet.best API key: `BIIgPa0-pDAun1m3Y4@6zvcRdNWKE@hXmjyTbQz#Nrn#z-OZ4nSMGctIokXugvIc`
3. Connect your Google Sheet with the columns listed above
4. The form submissions will automatically be added to your sheet!

## That's It!

Once connected, every form submission will appear in your Google Sheet automatically. You can view, sort, and export the data anytime.

