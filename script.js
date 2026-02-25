// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Simple form submission alert
const contactForm = document.getElementById('contact-form');
if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you, Kevin Kline Fangasan will get back to you soon!');
        contactForm.reset();
    });
}
var player;
var watchedTime = 0;
var timer;

// 2. This function creates the player after the API code downloads
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: 'WVDOg4rycWE', // Your Lysted video ID
        playerVars: {
            'rel': 0,
            'modestbranding': 1,
            'controls': 1 
        },
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

// 3. Monitor video state (Playing, Paused, Ended)
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        // Start the stopwatch every 1 second
        timer = setInterval(function() {
            watchedTime++;
        }, 1000);
    } else {
        // Stop the stopwatch if they pause or the video ends
        clearInterval(timer);
    }

    if (event.data == YT.PlayerState.ENDED) {
        checkCompletion();
    }
}

// 4. Check if they actually watched or just skipped
function checkCompletion() {
    var totalDuration = player.getDuration();
    
    // If they watched at least 95% of the total time
    if (watchedTime >= (totalDuration * 0.95)) {
        unlockModules();
    } else {
        alert("Nice try! Please watch the full video without skipping to unlock the modules.");
        player.seekTo(0); // Optional: Restart video
        watchedTime = 0;   // Reset stopwatch
    }
}

// 5. Remove the locked status from all modules
function unlockModules() {
    const modules = document.querySelectorAll('.module-item');
    modules.forEach(module => {
        module.classList.remove('locked');
        const arrowIcon = module.querySelector('.arrow');
        arrowIcon.innerText = '→'; 
    });
    alert("Congratulations! You've finished the tutorial. Modules are now unlocked.");
}