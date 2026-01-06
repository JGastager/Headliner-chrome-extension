// Default configuration
const DEFAULT_CONFIG = {
    noH1:          'error',    // Missing H1
    multipleH1:    'warning',  // More than one H1
    hierarchy:     'warning',  // e.g. H2 followed by H4
    emptyHeading:  'error',    // e.g. <h2></h2>
    h1NotFirst:    'warning',  // H1 should usually be the top heading
    duplicateText: 'warning',  // Multiple headings with exact same text
    longHeading:   'warning'   // Headings > 120 chars
};

// Load saved settings
function loadSettings() {
    chrome.storage.sync.get('issueConfig', (data) => {
        const config = data.issueConfig || DEFAULT_CONFIG;
        
        // Set each dropdown to its saved value
        Object.keys(config).forEach(key => {
            const select = document.getElementById(key);
            if (select) {
                select.value = config[key];
            }
        });
    });
}

// Save settings
function saveSettings() {
    const config = {};
    
    // Get values from all dropdowns
    Object.keys(DEFAULT_CONFIG).forEach(key => {
        const select = document.getElementById(key);
        if (select) {
            config[key] = select.value;
        }
    });
    
    // Save to Chrome storage
    chrome.storage.sync.set({ issueConfig: config }, () => {
        // Show status message
        const status = document.getElementById('status');
        status.textContent = 'Settings saved!';
        status.classList.add('success', 'show');
        
        setTimeout(() => {
            status.textContent = '';
            status.classList.remove('success', 'show');
        }, 2000);
    });
}

// Reset to defaults
function resetSettings() {
    chrome.storage.sync.set({ issueConfig: DEFAULT_CONFIG }, () => {
        loadSettings();
        
        const status = document.getElementById('status');
        status.textContent = 'Settings reset to defaults!';
        status.classList.add('success', 'show');
        
        setTimeout(() => {
            status.textContent = '';
            status.classList.remove('success', 'show');
        }, 2000);
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', loadSettings);
document.getElementById('save').addEventListener('click', saveSettings);
document.getElementById('reset').addEventListener('click', resetSettings);