const timeline = anime.timeline({
    autoplay: false, // Ensure the timeline does not autoplay
    easing: 'linear',
    duration: 1500 // Total duration for the animation
});

timeline.add({
    targets: 'body',
    duration: 1,
}).add({ 
    // Add initial state for the welcome screen to be hidden
    targets: '#welcome',
    duration: 1,
}).add({ 
    targets: '#onezero',
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
    targets: ' #desktop, #text-animation, #onezero, #welcome-text',
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
    // offset: -500,
    opacity: 1,
    duration: 300,
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

// Call stopTypingEffect() to stop the typing animation
// stopTypingEffect();


// Function to handle mouse wheel events
const handleWheel = (event) => {
    const maxScrollValue = 5000; // max scroll

    // Calculate the scroll based on the wheel
    const scrollAmount = event.deltaY;

    // Get the current scroll value from data attribute or initialize it
    let currentScrollValue = parseFloat(document.documentElement.dataset.scrollValue) || 0;

    // Update the scroll value based on the scroll amount
    currentScrollValue = Math.max(0, Math.min(currentScrollValue + scrollAmount, maxScrollValue));

    // Store the updated scroll value
    document.documentElement.dataset.scrollValue = currentScrollValue;

    // Calculate the scroll percentage
    const total = 200;
    const scrollPercentage = total * (((currentScrollValue / maxScrollValue)));

    const loading = document.getElementById('loading');
    const welcome = document.getElementById('welcome');
    
    // const onezero = document.getElementById('onezero');
    console.log(scrollPercentage);
    if (scrollPercentage < 40) {
        // initial
        welcome.classList.add('hidden');
        welcome.classList.remove('flex');

        loading.classList.remove('hidden');
        loading.classList.add('flex');

        // onezero.classList.add('hidden');
        // onezero.classList.remove('block');
    } else if (scrollPercentage >= 0 && scrollPercentage < 120) {
        // welcome screen
        loading.classList.add('hidden');

        welcome.classList.remove('hidden');
        welcome.classList.add('flex');

        // onezero.classList.add('hidden');
        // onezero.classList.remove('block');
        typingEffect();
    } else if (scrollPercentage >= 120 && scrollPercentage < 200) {
        // onezero.classList.remove('hidden');
        // onezero.classList.add('block');
        stopTypingEffect();
    }

    timeline.seek((scrollPercentage / 100) * timeline.duration);
};

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
