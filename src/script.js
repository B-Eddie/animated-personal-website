const timeline = anime.timeline({
    autoplay: false, // Ensure the timeline does not autoplay
    easing: 'linear',
    duration: 1500 // Total duration for the animation
});

timeline.add({
    targets: 'body',
    duration: 1,
    begin: function(anim) {
        anim.animatables[0].target.classList.add('overflow-hidden');
    }
}).add({ 
    // Add initial state for the welcome screen to be hidden
    targets: '#welcome',
    duration: 1,
    begin: function(anim) {
        anim.animatables[0].target.classList.remove('block');
        anim.animatables[0].target.classList.add('hidden');
    }
}).add({ 
    // Add animation to the timeline
    targets: '#progress-bar',
    duration: 500, // Duration of the specific animation
    width: '100%',
}).add({ 
    // Add zooming out animation to the timeline
    
    targets: '#loading',
    opacity: [1, 0],
    scale: [1, 0.5], // Zoom out to 50%
    duration: 500, // Duration of the specific animation
    begin: function(anim) {
        console.log("HI")
    },
    complete: function(anim) {
        console.log("check")
        if (anim.animatables[0].target.classList.contains('flex')) {
            console.log('removing flex');
            anim.animatables[0].target.classList.remove('flex');
            anim.animatables[0].target.classList.add('hidden');
        } else {
            console.log('removing hidden');
            anim.animatables[0].target.classList.remove('hidden')
            anim.animatables[0].target.classList.add('flex');
        }
    }
}).add({ 
    // Add animation to the timeline for the welcome screen to appear
    targets: '#welcome',
    opacity: [0, 1],
    duration: 500, // Duration of the specific animation
    begin: function(anim) {
        anim.animatables[0].target.classList.remove('hidden');
        anim.animatables[0].target.classList.add('block');
    }
})

// Function to handle mouse wheel events
const handleWheel = (event) => {
    const maxScrollValue = 2000; // max scroll

    // Calculate the scroll based on the wheel
    const scrollAmount = event.deltaY;

    // Get the current scroll value from data attribute or initialize it
    let currentScrollValue = parseFloat(document.documentElement.dataset.scrollValue) || 0;

    // Update the scroll value based on the scroll amount
    currentScrollValue = Math.max(0, Math.min(currentScrollValue + scrollAmount, maxScrollValue));

    // Store the updated scroll value
    document.documentElement.dataset.scrollValue = currentScrollValue;

    // Calculate the scroll percentage
    const scrollPercentage = Math.min(currentScrollValue / maxScrollValue, 1);

    // Calculate the timeline progress based on scroll percentage
    const timelineProgress = scrollPercentage * timeline.duration;

    // Seek the timeline based on the calculated progress
    timeline.seek(timelineProgress);
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
