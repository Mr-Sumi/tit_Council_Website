document.addEventListener("DOMContentLoaded", function() {
    const preloader = document.getElementById("preloader");
    const loadingStatus = document.querySelector(".loading-status");
    const progressBar = document.querySelector(".progress-bar");
    
    // Array of loading messages
    const loadingMessages = [
        "Initializing...",
        "Loading content...",
        "Almost there...",
        "Preparing interface..."
    ];
    
    let messageIndex = 0;
    
    // Update loading message
    const updateMessage = setInterval(() => {
        if (messageIndex < loadingMessages.length) {
            loadingStatus.textContent = loadingMessages[messageIndex];
            messageIndex++;
        }
    }, 500);
    
    // Simulate loading progress
    setTimeout(() => {
        clearInterval(updateMessage);
        loadingStatus.textContent = "Welcome!";
        
        setTimeout(() => {
            preloader.classList.add("fade-out");
            
            setTimeout(() => {
                preloader.style.display = "none";
                document.body.style.overflow = "visible";
            }, 500);
        }, 300);
    }, 2000);
});

// Prevent page scroll while preloader is visible
document.body.style.overflow = "hidden"; 