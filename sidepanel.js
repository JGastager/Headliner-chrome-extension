import { extractOrderedHeadlines, extractOutline } from './extractors.js';
import { renderHeadlines } from './headings.js';
import { renderOutline } from './outline.js';
import { checkWarnings } from './issues.js';

function updateHeadlines() {
    console.info("Updating headlines and outline in side panel...");
    
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        if(!tab) return;

        // Ensure script is ready
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                return new Promise(resolve => {
                    if (document.readyState === "complete") resolve(true);
                    else window.addEventListener("load", () => resolve(true), { once: true });
                });
            }
        }).then(() => {
            // --- 1. Extract headlines (for Headings Tab & Issues Tab) ---
            return chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: extractOrderedHeadlines,
            });
        }).then(([result]) => {
            const headings = result.result || [];
            
            // Render Headings Tab
            renderHeadlines(headings);
            
            // Run Issues Logic
            checkWarnings(headings);

            // --- 2. Extract structural outline (For Outline Tab) ---
            return chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: extractOutline
            });
        }).then(([outlineResult]) => {
            const outline = outlineResult.result || [];
            renderOutline(outline);
        }).catch((err) => {
            console.error(err);
            const tree = document.querySelector('#headlines .tree');
            if(tree) tree.innerHTML = '<li>Could not read headlines from this tab.</li>';
        });
    });
}

function highlightNavAndShowSection() {
    const navItems = document.querySelectorAll('nav li');
    const sections = document.querySelectorAll('section');
    
    navItems.forEach((li, idx) => {
        li.addEventListener('click', () => {
            navItems.forEach(item => item.classList.remove('active'));
            li.classList.add('active');
            sections.forEach((sec, secIdx) => {
                sec.style.display = secIdx === idx ? 'block' : 'none';
            });
        });
    });
}

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    highlightNavAndShowSection();
    updateHeadlines();
});

// Listener for messages (e.g., from background or popup)
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "refreshHeadlines") {
        updateHeadlines();
    }
});