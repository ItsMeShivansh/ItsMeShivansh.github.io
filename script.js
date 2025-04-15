var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for(tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for(tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

var sideMenu = document.getElementById("sidemenu");

function openmenu(){
    sideMenu.style.right = "0";
}

function closemenu(){
    sideMenu.style.right = "-200px ";
}

// -------------------------------------------Q2----------------------------------------------

// Event tracking function
document.addEventListener('DOMContentLoaded', function() {
    // Track page view on load
    const pageViewTimestamp = new Date().toISOString();
    console.log(`${pageViewTimestamp}, view, page_load`);
    
    // Function to get element description
    function getElementDescription(element) {
        // Check for common elements
        if (element.tagName === 'IMG') return 'image';
        if (element.tagName === 'A') return 'link';
        if (element.tagName === 'BUTTON') return 'button';
        if (element.tagName === 'INPUT') return `input_${element.type}`;
        if (element.tagName === 'SELECT') return 'dropdown';
        if (element.tagName === 'TEXTAREA') return 'textarea';
        
        // Check for specific sections (updated to match current HTML)
        if (element.closest('#header')) return 'header_section';
        if (element.closest('#about')) return 'about_section';
        if (element.closest('#hometown')) return 'hometown_section';
        if (element.closest('#myskills')) return 'skills_section';
        if (element.closest('#myeducation')) return 'education_section';
        if (element.closest('#textanalysis')) return 'textanalysis_section';
        if (element.closest('#contact')) return 'contact_section';
        
        // Check for classes
        if (element.classList.contains('tab-links')) return 'tab_link';
        if (element.classList.contains('work')) return 'portfolio_item';
        if (element.classList.contains('social-icons')) return 'social_icon';
        
        // Default to element tag name
        return element.tagName.toLowerCase();
    }
    
    // Track all clicks on the document
    document.addEventListener('click', function(event) {
        const timestamp = new Date().toISOString();
        const targetElement = event.target;
        const elementType = getElementDescription(targetElement);
        
        // Log click event with timestamp, event type, and object clicked
        console.log(`${timestamp}, click, ${elementType}`);
    });
    
    // Track scroll events (as views) with debouncing
    let lastScrollTime = 0;
    const scrollDebounceTime = 500; // ms
    
    window.addEventListener('scroll', function() {
        const now = new Date().getTime();
        
        if (now - lastScrollTime > scrollDebounceTime) {
            lastScrollTime = now;
            
            // Determine which section is currently visible (updated section IDs)
            const sections = ['header', 'about', 'hometown', 'myskills', 'myeducation', 'textanalysis', 'contact'];
            let currentSection = '';
            
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Check if section is in viewport
                    if (rect.top <= window.innerHeight/2 && rect.bottom >= window.innerHeight/2) {
                        currentSection = section;
                        break;
                    }
                }
            }
            
            if (currentSection) {
                const timestamp = new Date().toISOString();
                console.log(`${timestamp}, view, section_${currentSection}`);
            }
        }
    });
    
    // Track form interactions
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(event) {
            const timestamp = new Date().toISOString();
            console.log(`${timestamp}, submit, form`);
        });
    }
    
    // Track CV download
    const cvLink = document.querySelector('a[href$="CV.pdf"]');
    if (cvLink) {
        cvLink.addEventListener('click', function() {
            const timestamp = new Date().toISOString();
            console.log(`${timestamp}, click, cv_download`);
        });
    }
});

// ----------------------------------------------------Q3---------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    // Initialize event listeners
    document.getElementById('analyze-btn').addEventListener('click', analyzeText);
    document.getElementById('clear-btn').addEventListener('click', clearText);

    // Main analysis function
    function analyzeText() {
        const text = document.getElementById('text-input').value.trim();
        
        if (!text) {
            alert('Please enter text to analyze.');
            return;
        }
        
        // Process all analyses
        const stats = getBasicStats(text);
        displayBasicStats(stats);
        
        const pronouns = countPronouns(text);
        displayPronouns(pronouns);
        
        const prepositions = countPrepositions(text);
        displayPrepositions(prepositions);
        
        const articles = countIndefiniteArticles(text);
        displayArticles(articles);
    }
    
    // Clear all fields
    function clearText() {
        document.getElementById('text-input').value = '';
        document.getElementById('basic-stats').innerHTML = '';
        document.getElementById('pronouns-stats').innerHTML = '';
        document.getElementById('prepositions-stats').innerHTML = '';
        document.getElementById('articles-stats').innerHTML = '';
    }
    
    // --- Analysis Functions ---
    
    function getBasicStats(text) {
        const letterCount = (text.match(/[a-z]/gi) || []).length;
        const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
        const spaceCount = (text.match(/\s/g) || []).length;
        const newlineCount = (text.match(/\n/g) || []).length;
        const specialSymbolCount = (text.match(/[^a-z\s]/gi) || []).length;
        
        return { 
            letters: letterCount, 
            words: wordCount, 
            spaces: spaceCount, 
            newlines: newlineCount, 
            specialSymbols: specialSymbolCount 
        };
    }
    
    function countPronouns(text) {
        const pronounsList = [
            'i', 'me', 'my', 'mine', 'myself', 'you', 'your', 'yours', 'yourself', 'yourselves',
            'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself',
            'we', 'us', 'our', 'ours', 'ourselves', 'they', 'them', 'their', 'theirs', 'themselves',
            'who', 'whom', 'whose', 'which', 'that', 'this', 'these', 'those', 'what', 'anyone',
            'anybody', 'anything', 'everyone', 'everybody', 'everything', 'someone', 'somebody', 'something'
        ];
        
        const pronounRegex = new RegExp(`\\b(${pronounsList.join('|')})\\b`, 'gi');
        const matches = text.toLowerCase().match(pronounRegex) || [];
        
        const counts = {};
        matches.forEach(word => {
            counts[word] = (counts[word] || 0) + 1;
        });
        
        return counts;
    }
    
    function countPrepositions(text) {
        const prepositionsList = [
            'about', 'above', 'across', 'after', 'against', 'along', 'amid', 'among', 'around', 'at',
            'before', 'behind', 'below', 'beneath', 'beside', 'between', 'beyond', 'by', 'concerning',
            'despite', 'down', 'during', 'except', 'for', 'from', 'in', 'inside', 'into', 'like', 'near',
            'of', 'off', 'on', 'onto', 'out', 'outside', 'over', 'past', 'regarding', 'since', 'through',
            'to', 'toward', 'under', 'until', 'up', 'upon', 'with', 'within', 'without'
        ];
        
        const prepSet = new Set(prepositionsList);
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        
        const counts = {};
        words.forEach(word => {
            if (prepSet.has(word)) {
                counts[word] = (counts[word] || 0) + 1;
            }
        });
        
        return counts;
    }
    
    function countIndefiniteArticles(text) {
        const articlesList = ['a', 'an', 'some', 'any'];
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        
        const counts = { 'a': 0, 'some': 0, 'any': 0, 'an' : 0 };
        words.forEach(word => {
            if (word === 'a') counts['a']++;
            else if (word === 'an') counts['a']++;
            else if (word === 'some') counts.some++;
            else if (word === 'any') counts.any++;
        });
        
        return counts;
    }
    
    // --- Display Functions ---
    
    function displayBasicStats(stats) {
        document.getElementById('basic-stats').innerHTML = `
            <ul>
                <li>Letters: ${stats.letters}</li>
                <li>Words: ${stats.words}</li>
                <li>Spaces: ${stats.spaces}</li>
                <li>Newlines: ${stats.newlines}</li>
                <li>Special Symbols: ${stats.specialSymbols}</li>
            </ul>
        `;
    }
    
    function displayPronouns(pronouns) {
        const div = document.getElementById('pronouns-stats');
        div.innerHTML = Object.keys(pronouns).length ? 
            `<ul>${Object.entries(pronouns).map(([word, count]) => `<li>${word}: ${count}</li>`).join('')}</ul>` : 
            '<p>No pronouns found.</p>';
    }
    
    function displayPrepositions(prepositions) {
        const div = document.getElementById('prepositions-stats');
        div.innerHTML = Object.keys(prepositions).length ? 
            `<ul>${Object.entries(prepositions).map(([word, count]) => `<li>${word}: ${count}</li>`).join('')}</ul>` : 
            '<p>No prepositions found.</p>';
    }
    
    function displayArticles(articles) {
        document.getElementById('articles-stats').innerHTML = `
            <ul>
                <li>a: ${articles.a}</li>
                <li>an: ${articles.an}</li>
                <li>some: ${articles.some}</li>
                <li>any: ${articles.any}</li>
            </ul>
        `;
    }
});

