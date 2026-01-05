export function renderHeadlines(headings) {
    const list = document.querySelector('#headlines .tree');
    list.innerHTML = '';
    
    if (headings.length === 0) {
        list.innerHTML = '<li>No headings found.</li>';
        return;
    }

    // 1. Render Summary stats
    const levelCounts = {};
    headings.forEach(h => {
        const level = parseInt(h.tag[1]);
        levelCounts[level] = (levelCounts[level] || 0) + 1;
    });

    const totalHeadings = document.querySelector('#headlines .summary');
    if (totalHeadings) {
        totalHeadings.innerHTML = '';
        Object.keys(levelCounts).sort((a, b) => a - b).forEach(level => {
            const div = document.createElement('div');
            div.textContent = levelCounts[level];
            div.classList.add(`total-h${level}`);
            totalHeadings.appendChild(div);
        });
        const totalDiv = document.createElement('div');
        totalDiv.textContent = headings.length;
        totalHeadings.appendChild(totalDiv);
    }

    // 2. Render Tree
    let currentLevel = 1;
    let parents = [list];

    headings.forEach((h, index) => {
        const level = parseInt(h.tag[1]);
        
        // Adjust nesting
        while (level > currentLevel) {
            const ul = document.createElement('ul');
            parents[parents.length - 1].appendChild(ul);
            parents.push(ul);
            currentLevel++;
        }
        while (level < currentLevel) {
            parents.pop();
            currentLevel--;
        }

        const li = document.createElement('li');
        li.textContent = h.text ? h.text : `untitled`;
        li.classList.add(h.tag.toLowerCase());
        if (!h.text) li.classList.add('empty');

        // Click to scroll
        li.addEventListener('click', () => {
            chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
                chrome.tabs.sendMessage(tab.id, {
                    action: "goToHeading",
                    index
                });
            });
        });

        parents[parents.length - 1].appendChild(li);
    });
}