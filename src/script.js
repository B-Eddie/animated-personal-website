const timeline = anime.timeline({
    autoplay: false, // Ensure the timeline does not autoplay
    easing: 'linear',
    duration: 500 // Total duration for the animation
});

// Add animation to the timeline
timeline.add({
    targets: '#progress-bar',
    width: '100%',
    duration: 500 // Duration of the specific animation
})
// Add animation to the timeline
timeline.add({
    targets: '#loading',
    opacity: 0,
    scale: [1, 0.5], // Zoom out to 50%
})
timeline.add({
    targets: '#welcome',
    display: 'block',
    opacity: 1,
})

// Function to handle scroll events
const handleScroll = (scrollAmount) => {
    const maxScrollValue = 5000; // max scroll

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

// Mouse wheel event listener
const handleWheel = (event) => {
    handleScroll(event.deltaY);
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
    handleScroll(touchDeltaY);
    touchStartY = touchEndY; // Update start Y to current Y for continuous scrolling
};

// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);

    // Initial call to handleScroll to set the correct animation state on page load
    handleScroll(0); // Call with initial value to set up the state
});