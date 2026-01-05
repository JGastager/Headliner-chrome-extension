# Headliner – Chrome Extension for Heading Analysis

A Chrome extension that analyzes and visualizes the heading structure of any webpage. Perfect for content creators, developers, and accessibility auditors.

## Features

✨ **Heading Analysis**
- Extracts all headings (H1–H6) from the current page
- Displays them in a clean, hierarchical tree view
- Shows summary statistics of heading distribution

📊 **Document Outline**
- Visualizes the semantic structure of the page
- Maps HTML5 sectioning elements (article, section, aside, nav, etc.)
- Shows how headings relate to page sections

🔍 **Issue Detection**
- **Errors:**
  - Missing H1 tag
  - Empty headings (accessibility issue)
- **Warnings:**
  - Multiple H1 tags (only one should exist)
  - Broken heading hierarchy (e.g., H2 → H4)
  - H1 not positioned as the first heading
  - Duplicate heading text (confusing for navigation)
  - Excessively long headings (>120 characters)

🎯 **Interactive Navigation**
- Click any heading to scroll to it on the page with highlight animation
- Three-tab interface: Headings, Outline, and Issues

## Installation

### From Source (Development)
1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer Mode** (toggle in top right)
4. Click **Load unpacked**
5. Select the extension folder

### From Chrome Web Store (When Published)
- Search for "Headliner" in the [Chrome Web Store](https://chrome.google.com/webstore)
- Click **Add to Chrome**

## How to Use

1. **Open the Extension:**
   - Click the Headliner icon in your Chrome toolbar
   - The side panel opens on the right side of your browser

2. **View Headings:**
   - Navigate to the **Headings** tab
   - See all headings extracted from the current page in hierarchical order
   - View the summary showing counts for each heading level

3. **Check Document Structure:**
   - Go to the **Outline** tab
   - See how headings fit within the page's semantic structure
   - Understand the relationship between sections and headings

4. **Review Issues:**
   - Visit the **Issues** tab
   - Read error and warning messages about heading problems
   - Use these insights to improve page accessibility and SEO

5. **Navigate to a Heading:**
   - Click any heading in the Headings tab
   - The page scrolls smoothly to that heading
   - The heading is highlighted with an animation for 2 seconds

## File Structure

```
headliner-chrome-extension/
├── manifest.json           # Extension configuration & metadata
├── background.js           # Service worker (background logic)
├── content.js             # Content script (runs on web pages)
├── content.css            # Content script styles (for highlighting)
├── sidepanel.html         # Side panel UI layout
├── sidepanel.js           # Side panel logic (module)
├── sidepanel.css          # Side panel styling
├── extractors.js          # Functions to extract headings & outline
├── headings.js            # Rendering logic for headings tab
├── outline.js             # Rendering logic for outline tab
├── issues.js              # Heading validation & issue detection
├── options.html           # Settings page (for future use)
├── options.js             # Settings logic (for future use)
├── options.css            # Settings styles (for future use)
├── README.md              # This file
└── PERMISSIONS_JUSTIFICATION.md  # Detailed permission explanations
```

## How It Works

### 1. Heading Extraction (`extractors.js`)
- **`extractOrderedHeadlines()`** – Finds all H1–H6 tags and returns them in order with their text content
- **`extractOutline()`** – Maps the document's semantic structure by analyzing HTML5 sectioning elements and building a tree of sections and headings

### 2. Side Panel Interaction (`sidepanel.js`)
- Queries the active tab using `chrome.tabs.query()`
- Executes extraction scripts on the page using `chrome.scripting.executeScript()`
- Renders results using dedicated rendering functions
- Listens for refresh messages when page content changes

### 3. Content Script (`content.js`)
- Monitors DOM changes with a `MutationObserver`
- Throttles updates to prevent excessive API calls
- Handles "scroll to heading" messages from the side panel
- Applies highlight animations with CSS transitions

### 4. Issue Detection (`issues.js`)
- Runs configurable validation rules on headings
- Categorizes issues as errors, warnings, or success
- Updates UI badges to show issue counts
- Rules can be toggled on/off via `ISSUE_CONFIG`

## Permissions

This extension requires specific permissions to function. For detailed explanations, see [PERMISSIONS_JUSTIFICATION.md](PERMISSIONS_JUSTIFICATION.md):

- **`activeTab`** – Access the currently active tab
- **`scripting`** – Execute analysis scripts on web pages
- **`sidePanel`** – Display the side panel UI
- **`tabs`** – Query and communicate with tabs
- **`storage`** – Save user preferences (for future use)
- **`<all_urls>`** – Analyze headings on any website

## Privacy & Security

✅ **No data collection** – All analysis happens locally in your browser  
✅ **No external requests** – The extension works completely offline  
✅ **No tracking** – Your browsing data is never transmitted or stored  
✅ **Open source** – Code is transparent and auditable  

## Development

### Requirements
- Chrome 108+ (for side panel API support)
- No external dependencies (vanilla JavaScript)

### Building & Testing
1. Make changes to the source files
2. Go to `chrome://extensions/`
3. Click **Refresh** on the Headliner extension card
4. Test on any webpage

### Modifying Issue Rules
Edit the `ISSUE_CONFIG` object in [issues.js](issues.js#L2) to enable/disable or change severity levels:
```javascript
const ISSUE_CONFIG = {
    noH1:          'error',    // or 'warning' / 'off'
    multipleH1:    'warning',
    // ... etc
};
```

## Future Enhancements

- 📥 Export heading structure as JSON or HTML
- ⚙️ Customizable issue rules via options page
- 🔗 Copy heading links to clipboard
- 📝 Heading text search/filter

## License

This project is available under the MIT License.

## Support

For issues, feature requests, or feedback:
- Check existing issues in the repository
- Review the [PERMISSIONS_JUSTIFICATION.md](PERMISSIONS_JUSTIFICATION.md) for permission details
- Test on different websites to ensure compatibility

---

**Made with ❤️ for better web accessibility and SEO**
