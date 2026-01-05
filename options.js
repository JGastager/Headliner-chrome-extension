// Default configuration
const DEFAULT_CONFIG = {
    noH1: 'error',
    multipleH1: 'warning',
    hierarchy: 'warning',
    emptyHeading: 'error',
    h1NotFirst: 'warning',
    duplicateText: 'warning',
    longHeading: 'warning'
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
        status.style.color = '#4CAF50';
        
        // Clear message after 2 seconds
        setTimeout(() => {
            status.textContent = '';
        }, 2000);
    });
}

// Reset to defaults
function resetSettings() {
    chrome.storage.sync.set({ issueConfig: DEFAULT_CONFIG }, () => {
        loadSettings();
        
        const status = document.getElementById('status');
        status.textContent = 'Settings reset to defaults!';
        status.style.color = '#2196F3';
        
        setTimeout(() => {
            status.textContent = '';
        }, 2000);
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', loadSettings);
document.getElementById('save').addEventListener('click', saveSettings);
document.getElementById('reset').addEventListener('click', resetSettings);