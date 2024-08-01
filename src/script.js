const timeline = anime.timeline({
    autoplay: false, // Ensure the timeline does not autoplay
    easing: 'linear',
    duration: 1500 // Total duration for the animation
});

timeline.add({
    targets: 'body',
    duration: 1,
}).add({ 
    targets: ['#logout', '#socials', '#onezero'],
    opacity: 0,
    duration: 1,
}).add({ 
    // Add animation to the timeline
    targets: '#progress-bar',
    duration: 500, // Duration of the specific animation
    width: '100%',
}).add({ 
    // Add zooming out animation to the timeline
    targets: '#loading',
    opacity: 0,
    scale: 0.5, // Zoom out to 50%
    duration: 500, // Duration of the specific animation
}).add({ 
    // Add animation to the timeline for the welcome screen to appear
    targets: '#welcome',
    opacity: 1,
    duration: 200, // Duration of the specific animation
}).add({
    duration: 500,
}).add({
    // welcome screen fade in
    targets: ' #desktop, #text-animation, #welcome-text',
    duration: 500,
    // delay: 500,
    scale: 2,
    translateY: '5rem',    
    opacity: 0,
}).add({ 
    targets: '#onezero',
    duration: 1,
    opacity: 0,
}).add({
    // ones and zeros fade in
    targets: '#onezero',
    opacity: 1,
    duration: 300,
}).add({
    duration: 2000,
}).add({
    // Move #onezero and #projects upwards by 100vh
    targets: ['#onezero', '#projects'],
    translateY: '-125vh',
    duration: 300,
}).add({
    duration: 500,
}).add({
    targets: '#projects',
    duration: 0.0001,
    translateY: '-125vh',
}).add({
    targets: '#computer',
    duration: 0.0001,
    translateY: '-100vh',
}).add({
    targets: ['#computer', '#projects'],
    translateY: '0vh',
    duration: 300,
}).add({
    duration: 500,
}).add({ 
    targets: '#logout',
    opacity: 1,
    duration: 100,
}).add({ 
    // Add animation to the timeline
    targets: '#progress-bar-2',
    duration: 500, // Duration of the specific animation
    width: '0%',
}).add({ 
    targets: '#socials',
    opacity: 1,
    duration: 100,
});


const words = ["Developer", "Designer", "Student"];
let i = 0;
let run = false;
let timer;

function typingEffect() {
    if (run) {
        return;
    }
    let split_word = words[i].split("");
    var loopTyping = function(word) {
        if (word.length > 0) {
            document.getElementById('word').innerHTML += word.shift();
            timer = setTimeout(() => loopTyping(word), 500);
        } else {
            deletingEffect();
        }
    };
    loopTyping(split_word);
    run = true;
};

function deletingEffect() {
    let word = words[i].split("");
    var loopDeleting = function() {
        if (word.length > 0) {
            word.pop();
            document.getElementById('word').innerHTML = word.join("");
        } else {
            if (words.length > (i + 1)) {
                i++;
            } else {
                i = 0;
            };
            // typingEffect();
            if (i === words.length - 1) {
                i = 0;
            } else {
                i++;
            }
            run = false;
            typingEffect(words[i].split(""))
            return false;
        };
        timer = setTimeout(loopDeleting, 200);
    };
    loopDeleting();
};

function stopTypingEffect() {
    clearTimeout(timer);
    run = false;
    document.getElementById('word').innerHTML = '';
}

const screenWidthDivide = 30;
const screenHeightDivide = 50;

function changeText() {
    const parent = document.getElementById('onezero');

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const textArray = [];
    // Remove all existing children
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }

    for (let i = 1; i <= Math.ceil(screenHeight / screenHeightDivide); i++) {
        const span = document.createElement('span');
        span.id = `span${i}`;
        parent.appendChild(span);
        textArray.push(span);
    }

    for (let i = 0; i < textArray.length; i++) {
        while (textArray[i].firstChild) {
            textArray[i].removeChild(textArray[i].firstChild);
        }
        for (let j=0; j <= Math.ceil(screenWidth / screenWidthDivide); j++) {
            textArray[i].appendChild(document.createElement('span')).innerHTML = Math.random() > 0.5 ? 1 : 0;
        }
    }
}
function scrambleText(input) {
    function scrambleString(str) {
        let array = str.split('');
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array.join('');
    }

    const words = input.split(' ');
    
    const scrambledWords = words.map(word => scrambleString(word));
    
    return scrambledWords.join(' ');
}


let textChangeTrueFalse = false;
function changeShowText() {
    const parent = document.getElementById('onezero');
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const textArray = [];

    // Remove all existing children
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }

    for (let i = 1; i <= Math.ceil(screenHeight / screenHeightDivide); i++) {
        const span = document.createElement('span');
        span.id = `span${i}`;
        parent.appendChild(span);
        textArray.push(span);
    }

    for (let i = 0; i < textArray.length; i++) {
        h = false;

        while (textArray[i].firstChild) {
            textArray[i].removeChild(textArray[i].firstChild);
        }
        for (let j=0; j <= Math.ceil(screenWidth / screenWidthDivide); j++) {
            const newSpan = document.createElement('span');
            newSpan.innerHTML = Math.random() > 0.5 ? 1 : 0;
            
            if (i === 1 && j === Math.floor(screenWidth / (3 * screenWidthDivide))) {
                const specificSpan = document.createElement('span');
                specificSpan.classList.add('text-greene');
                if (textChangeTrueFalse) {
                    specificSpan.innerHTML = 'About Me';
                } else {
                    specificSpan.innerHTML = scrambleText('About Me');
                }
                textArray[i].appendChild(specificSpan);
                h = true;
            }
            if (i === 3 && j === Math.floor(screenWidth / (3 * screenWidthDivide))) {
                const text = "I'm a 15 year old interested in";
                const specificSpan = document.createElement('span');
                specificSpan.classList.add('text-middle-greene');
                if (textChangeTrueFalse) {
                    specificSpan.innerHTML = text.toString();
                } else {
                    specificSpan.innerHTML = scrambleText(text.toString());
                }
                textArray[i].appendChild(specificSpan);
                h = true;
            }
            if (i === 4 && j === Math.floor(screenWidth / (3 * screenWidthDivide))) {
                const text = "coding, design, and AI. I love";
                const specificSpan = document.createElement('span');
                specificSpan.classList.add('text-middle-greene');
                if (textChangeTrueFalse) {
                    specificSpan.innerHTML = text.toString();
                } else {
                    specificSpan.innerHTML = scrambleText(text.toString());
                }
                textArray[i].appendChild(specificSpan);
                h = true;
            }
            if (i === 5 && j === Math.floor(screenWidth / (3 * screenWidthDivide))) {
                const text = "playing sports, coding, and";
                const specificSpan = document.createElement('span');
                specificSpan.classList.add('text-middle-greene');
                if (textChangeTrueFalse) {
                    specificSpan.innerHTML = text.toString();
                } else {
                    specificSpan.innerHTML = scrambleText(text.toString());
                }
                textArray[i].appendChild(specificSpan);
                h = true;
            }
            if (i === 6 && j === Math.floor(screenWidth / (3 * screenWidthDivide))) {
                const text = "getting good grades";
                const specificSpan = document.createElement('span');
                specificSpan.classList.add('text-middle-greene');
                if (textChangeTrueFalse) {
                    specificSpan.innerHTML = text.toString();
                } else {
                    specificSpan.innerHTML = scrambleText(text.toString());
                }
                textArray[i].appendChild(specificSpan);
                h = true;
            }
            if (!h) {
                newSpan.innerHTML += Math.random() > 0.5 ? 1 : 0;
            }
            textArray[i].appendChild(newSpan);
        }
    }
}

// Function to handle mouse wheel events
const handleWheel = (event) => {
    const maxScrollValue = 5000; // max scroll

    // Calculate the scroll based on the wheel
    const scrollAmount = event.deltaY / 20; // the / 80 makes it scroll slower

    // Get the current scroll value from data attribute or initialize it
    let currentScrollValue = parseFloat(document.documentElement.dataset.scrollValue) || 0;

    // Update the scroll value based on the scroll amount
    currentScrollValue = Math.max(0, Math.min(currentScrollValue + scrollAmount, maxScrollValue));

    // Store the updated scroll value
    document.documentElement.dataset.scrollValue = currentScrollValue;

    // Calculate the scroll percentage
    const total = 400;
    const scrollPercentage = total * (((currentScrollValue / maxScrollValue)));

    const loading = document.getElementById('loading');
    const welcome = document.getElementById('welcome');
    const projects = document.getElementById('projects');
    const computer = document.getElementById('computer');
    const logout = document.getElementById('logout');
    const socials = document.getElementById('socials');

    // const onezero = document.getElementById('onezero');
    console.log(scrollPercentage);
    if (scrollPercentage < 20) {
        // initial
        projects.classList.add('hidden');
        projects.classList.remove('flex');
        
        socials.classList.add('hidden');
        socials.classList.remove('flex');
        
        logout.classList.add('hidden');
        logout.classList.remove('flex');

        computer.classList.add('hidden');
        computer.classList.remove('flex');

        welcome.classList.add('hidden');
        welcome.classList.remove('flex');

        loading.classList.remove('hidden');
        loading.classList.add('flex');

        // onezero.classList.add('hidden');
        // onezero.classList.remove('block');
    } else if (scrollPercentage >= 20 && scrollPercentage < 40) {
        // welcome screen
        projects.classList.add('hidden');
        projects.classList.remove('flex');
        
        loading.classList.add('hidden');

        welcome.classList.remove('hidden');
        welcome.classList.add('flex');

        // onezero.classList.add('hidden');
        // onezero.classList.remove('block');
        typingEffect();
    } else if (scrollPercentage >= 40 && scrollPercentage < 54) {
        // onezero.classList.remove('hidden');
        // onezero.classList.add('block');
        projects.classList.add('hidden');
        projects.classList.remove('flex');

        changeText();
        welcome.classList.remove('hidden');
        welcome.classList.add('flex');
    } else if (scrollPercentage >= 54 && scrollPercentage < 60) {
        textChangeTrueFalse = false;
        projects.classList.add('hidden');
        projects.classList.remove('flex');

        stopTypingEffect();
        changeShowText();
    } else if (scrollPercentage >= 60 && scrollPercentage < 75) {
        // projects scrolling down
        textChangeTrueFalse = true;
        changeShowText();
        welcome.classList.remove('hidden');
        welcome.classList.add('flex');
        
        projects.classList.remove('hidden');
        projects.classList.add('flex');

        computer.classList.add('hidden');
        computer.classList.remove('flex');		
    } else if (scrollPercentage >= 77.85 && scrollPercentage < 90) {
        welcome.classList.add('hidden');
        welcome.classList.remove('flex');
        projects.classList.add('hidden');
        projects.classList.remove('flex');

        computer.classList.remove('hidden');
        computer.classList.add('flex');

        socials.classList.add('hidden');
        socials.classList.remove('flex');

        logout.classList.add('hidden');
        logout.classList.remove('flex');
    } else if (scrollPercentage >= 90 && scrollPercentage < 98) {
        welcome.classList.add('hidden');
        welcome.classList.remove('flex');

        logout.classList.add('flex');
        logout.classList.remove('hidden');

        computer.classList.add('hidden');
        computer.classList.remove('flex');

        projects.classList.add('hidden');
        projects.classList.remove('flex');

        socials.classList.add('hidden');
        socials.classList.remove('flex');
    } else if (scrollPercentage >= 98) {
        welcome.classList.add('hidden');
        welcome.classList.remove('flex');
        projects.classList.add('hidden');
        projects.classList.remove('flex');

        logout.classList.add('hidden');
        logout.classList.remove('flex');

        socials.classList.add('flex');
        socials.classList.remove('hidden');   
    }

    timeline.seek((scrollPercentage / 100) * timeline.duration);
};

function goToSection(sectionId) {
    const sectionTimes = {
        loading: 0,
        welcome: 400,
        about: 700,
        projects: 1200,
        skills: 1400,
        socials: 1700
    };

    console.log(sectionTimes[sectionId]);
    const time = sectionTimes[sectionId];
    if (time !== undefined) {
        // Seek the timeline to the specified time
        timeline.seek(time);
        
        // Calculate the scroll percentage based on the time
        const scrollPercentage = (time / timeline.duration) * 100;

        // Calculate the scroll value
        const maxScrollValue = 5000;
        const simulatedScrollValue = (scrollPercentage / 100) * maxScrollValue;

        // Simulate the scroll event
        const simulatedEvent = { deltaY: (simulatedScrollValue - parseFloat(document.documentElement.dataset.scrollValue)) };

        // Update the scroll value
        document.documentElement.dataset.scrollValue = simulatedScrollValue;

        // Trigger the handleWheel function to apply the animations
        handleWheel(simulatedEvent);
    }
}


// Variables to track touch events
let touchStartY = 0;
let touchEndY = 0;

// Touch start event listener
const handleTouchStart = (event) => {
    touchStartY = event.touches[0].clientY;
};

// Touch move event listener
const handleTouchMove = (event) => {
    touchEndY = event.touches[0].clientY;
    const touchDeltaY = touchStartY - touchEndY;
    handleWheel({ deltaY: touchDeltaY });
    touchStartY = touchEndY; // Update start Y to current Y for continuous scrolling
};




// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);

    // Initial call to handleWheel to set the correct animation state on page load
    handleWheel({ deltaY: 0 }); // Call with initial value to set up the state
});
