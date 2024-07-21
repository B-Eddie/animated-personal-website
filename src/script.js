// Initialize Anime.js timeline
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

// Function to handle mouse wheel events
const handleWheel = (event) => {
    // event.preventDefault();

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
    const scrollPercentage = Math.min(currentScrollValue / maxScrollValue, 1);

    // Calculate the timeline progress based on scroll percentage
    const timelineProgress = scrollPercentage * timeline.duration;

    // Seek the timeline based on the calculated progress
    timeline.seek(timelineProgress);
};

// Add mouse wheel event listener
document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('wheel', handleWheel);

    // Initial call to handleWheel to set the correct animation state on page load
    handleWheel({ deltaY: 0 }); // Call with initial value to set up the state
});
