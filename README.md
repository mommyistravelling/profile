# Audrey Francesca | AI Traveler Website Portfolio

This is a modern, minimalist HTML/CSS/JS website. 

## Folder Structure
- `index.html` - The main structure of the website.
- `css/style.css` - Custom styling and responsive design.
- `js/script.js` - Logic for animations and form handling.
- `images/` - Folder where you place your assets.

## Required Images & Specifications
To make the website look exactly as designed, please place the following images into the `images/` folder and update the code if you change the filenames:

1.  **Book Cover (Provided):**
    *   File: `images/SmartTraveler1_coverbook.jpg`
    *   *This is already linked in the HTML code.*

2.  **Hero Image (Main profile picture):**
    *   Resolution: ~ 1080x1350px (Portrait orientation looks best)
    *   Location in HTML: Replace the `<div class="image-placeholder hero-img">...</div>` with `<img src="images/your-hero-image.jpg" class="hero-img" alt="Audrey Francesca">`

3.  **Portfolio Image 1 (Tall):**
    *   Resolution: ~ 800x1200px (Vertical)
    *   Location in HTML: Inside `<div class="portfolio-item img-tall">`

4.  **Portfolio Image 2 & 3 (Square):**
    *   Resolution: ~ 800x800px (Square)
    *   Location in HTML: Inside the remaining `<div class="portfolio-item">` divs.

## Connecting to Google Spreadsheet
To make the form save data to a Google Sheet without a backend server, follow these steps:

**Method: Make.com (Easiest)**
1. Go to Make.com and create a free account.
2. Create a new Scenario: `Webhooks (Custom Webhook) -> Google Sheets (Add a Row)`.
3. Make.com will give you a Webhook URL (e.g., `https://hook.eu1.make.com/xxxxxx`).
4. Open `js/script.js` and paste that URL where it says `YOUR_GOOGLE_APPS_SCRIPT_OR_MAKE_WEBHOOK_URL_HERE`.
5. Uncomment the `fetch(...)` block in `js/script.js` so it actively sends the data.
6. Open `js/script.js` and replace `https://discord.gg/YOUR_INVITE_CODE` with your real Discord invite link.

Enjoy your new website!
