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
        
        // Check for specific sections
        if (element.closest('#about')) return 'about_section';
        if (element.closest('#hometown')) return 'hometown_section';
        if (element.closest('#skills')) return 'skills_section';
        if (element.closest('#education')) return 'education_section';
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
            
            // Determine which section is currently visible
            const sections = ['header', 'about', 'hometown', 'skills', 'education', 'contact'];
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
    // Check if analysis section exists, if not, create it
    let analysisSection = document.getElementById('text-analysis');
    
    if (!analysisSection) {
        // Create analysis section
        analysisSection = document.createElement('div');
        analysisSection.id = 'text-analysis';
        const contact = document.getElementById('contact');
        document.body.insertBefore(analysisSection, contact);
        
        // Add section content
        analysisSection.innerHTML = `
            
        `;
        
        // Add event listeners
        document.getElementById('analyze-btn').addEventListener('click', analyzeText);
        document.getElementById('clear-btn').addEventListener('click', clearText);
    }
    
    // Text analysis function
    function analyzeText() {
        const text = document.getElementById('text-input').value;
        
        if (text.trim() === '') {
            alert('Please enter text to analyze.');
            return;
        }
        
        // Calculate basic statistics
        const stats = getBasicStats(text);
        displayBasicStats(stats);
        
        // Analyze pronouns
        const pronouns = countPronouns(text);
        displayPronouns(pronouns);
        
        // Analyze prepositions
        const prepositions = countPrepositions(text);
        displayPrepositions(prepositions);
        
        // Analyze indefinite articles
        const articles = countIndefiniteArticles(text);
        displayArticles(articles);
    }
    
    // Clear function
    function clearText() {
        document.getElementById('text-input').value = '';
        document.getElementById('basic-stats').innerHTML = '';
        document.getElementById('pronouns-stats').innerHTML = '';
        document.getElementById('prepositions-stats').innerHTML = '';
        document.getElementById('articles-stats').innerHTML = '';
    }
    
    // Calculate basic statistics
    function getBasicStats(text) {
        const letterCount = (text.match(/[a-zA-Z]/g) || []).length;
        const wordCount = text.trim().split(/\s+/).length;
        const spaceCount = (text.match(/\s/g) || []).length;
        const newlineCount = (text.match(/\n/g) || []).length;
        // Special symbols: anything that isn't a letter, number, space, or newline
        const specialSymbolCount = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;
        
        return {
            letters: letterCount,
            words: wordCount,
            spaces: spaceCount,
            newlines: newlineCount,
            specialSymbols: specialSymbolCount
        };
    }
    
    // Display basic statistics
    function displayBasicStats(stats) {
        const basicStatsDiv = document.getElementById('basic-stats');
        basicStatsDiv.innerHTML = `
            <ul>
                <li>Letters: ${stats.letters}</li>
                <li>Words: ${stats.words}</li>
                <li>Spaces: ${stats.spaces}</li>
                <li>Newlines: ${stats.newlines}</li>
                <li>Special Symbols: ${stats.specialSymbols}</li>
            </ul>
        `;
    }
    
    // Count pronouns
    function countPronouns(text) {
        // List of common pronouns
        const pronounsList = [
            // Personal pronouns
            'i', 'me', 'my', 'mine', 'myself',
            'you', 'your', 'yours', 'yourself', 'yourselves',
            'he', 'him', 'his', 'himself',
            'she', 'her', 'hers', 'herself',
            'it', 'its', 'itself',
            'we', 'us', 'our', 'ours', 'ourselves',
            'they', 'them', 'their', 'theirs', 'themselves',
            
            // Relative pronouns
            'who', 'whom', 'whose', 'which', 'that',
            
            // Demonstrative pronouns
            'this', 'that', 'these', 'those',
            
            // Interrogative pronouns
            'what', 'which', 'who', 'whom', 'whose',
            
            // Indefinite pronouns
            'anyone', 'anybody', 'anything', 
            'everyone', 'everybody', 'everything',
            'someone', 'somebody', 'something',
            'no one', 'nobody', 'nothing',
            'all', 'another', 'any', 'both', 'each', 'either', 
            'few', 'many', 'neither', 'none', 'one', 'several', 'some'
        ];
        
        // Tokenize and clean the text
        const words = text.toLowerCase()
            .replace(/[^\w\s]|_/g, " ")
            .replace(/\s+/g, " ")
            .trim()
            .split(' ');
        
        // Count pronouns
        const pronounCounts = {};
        
        for (const pronoun of pronounsList) {
            pronounCounts[pronoun] = 0;
        }
        
        for (const word of words) {
            if (pronounsList.includes(word)) {
                pronounCounts[word]++;
            }
        }
        
        // Filter out pronouns with zero count
        const filteredPronouns = {};
        for (const pronoun in pronounCounts) {
            if (pronounCounts[pronoun] > 0) {
                filteredPronouns[pronoun] = pronounCounts[pronoun];
            }
        }
        
        return filteredPronouns;
    }
    
    // Display pronouns
    function displayPronouns(pronouns) {
        const pronounsDiv = document.getElementById('pronouns-stats');
        
        if (Object.keys(pronouns).length === 0) {
            pronounsDiv.innerHTML = '<p>No pronouns found in the text.</p>';
            return;
        }
        
        let html = '<ul>';
        for (const pronoun in pronouns) {
            html += `<li>${pronoun}: ${pronouns[pronoun]}</li>`;
        }
        html += '</ul>';
        
        pronounsDiv.innerHTML = html;
    }
    
    // Count prepositions
    function countPrepositions(text) {
        // List of common prepositions
        const prepositionsList = [
            'about', 'above', 'across', 'after', 'against', 'along', 'amid', 'among',
            'around', 'at', 'before', 'behind', 'below', 'beneath', 'beside', 'between',
            'beyond', 'by', 'concerning', 'considering', 'despite', 'down', 'during',
            'except', 'for', 'from', 'in', 'inside', 'into', 'like', 'near', 'of',
            'off', 'on', 'onto', 'out', 'outside', 'over', 'past', 'regarding',
            'round', 'since', 'through', 'throughout', 'to', 'toward', 'towards',
            'under', 'underneath', 'until', 'unto', 'up', 'upon', 'with', 'within', 'without'
        ];
        
        // Tokenize and clean the text
        const words = text.toLowerCase()
            .replace(/[^\w\s]|_/g, " ")
            .replace(/\s+/g, " ")
            .trim()
            .split(' ');
        
        // Count prepositions
        const prepositionCounts = {};
        
        for (const preposition of prepositionsList) {
            prepositionCounts[preposition] = 0;
        }
        
        for (const word of words) {
            if (prepositionsList.includes(word)) {
                prepositionCounts[word]++;
            }
        }
        
        // Filter out prepositions with zero count
        const filteredPrepositions = {};
        for (const preposition in prepositionCounts) {
            if (prepositionCounts[preposition] > 0) {
                filteredPrepositions[preposition] = prepositionCounts[preposition];
            }
        }
        
        return filteredPrepositions;
    }
    
    // Display prepositions
    function displayPrepositions(prepositions) {
        const prepositionsDiv = document.getElementById('prepositions-stats');
        
        if (Object.keys(prepositions).length === 0) {
            prepositionsDiv.innerHTML = '<p>No prepositions found in the text.</p>';
            return;
        }
        
        let html = '<ul>';
        for (const preposition in prepositions) {
            html += `<li>${preposition}: ${prepositions[preposition]}</li>`;
        }
        html += '</ul>';
        
        prepositionsDiv.innerHTML = html;
    }
    
    // Count indefinite articles
    function countIndefiniteArticles(text) {
        // List of indefinite articles
        const articlesList = ['a', 'an', 'some', 'any'];
        
        // Tokenize and clean the text
        const words = text.toLowerCase()
            .replace(/[^\w\s]|_/g, " ")
            .replace(/\s+/g, " ")
            .trim()
            .split(' ');
        
        // Count articles
        const articleCounts = {};
        
        for (const article of articlesList) {
            articleCounts[article] = 0;
        }
        
        for (const word of words) {
            if (articlesList.includes(word)) {
                articleCounts[word]++;
            }
        }
        
        return articleCounts;
    }
    
    // Display articles
    function displayArticles(articles) {
        const articlesDiv = document.getElementById('articles-stats');
        
        let html = '<ul>';
        for (const article in articles) {
            html += `<li>${article}: ${articles[article]}</li>`;
        }
        html += '</ul>';
        
        articlesDiv.innerHTML = html;
    }
});
