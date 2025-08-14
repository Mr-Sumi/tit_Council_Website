document.addEventListener("DOMContentLoaded", function() {
    const preloader = document.getElementById("preloader");
    const loadingStatus = document.querySelector(".loading-status");
    const progressBar = document.querySelector(".progress-bar");

    // If there is no preloader in DOM, ensure scrolling is enabled and bail out safely
    if (!preloader) {
        document.body.style.overflow = "";
        return;
    }

    // Lock scroll only while preloader is visible
    const lockScroll = () => { document.body.style.overflow = "hidden"; };
    const unlockScroll = () => { document.body.style.overflow = ""; };
    lockScroll();

    // Loading messages to cycle through while waiting
    const loadingMessages = [
        "Initializing...",
        "Loading content...",
        "Almost there...",
        "Preparing interface..."
    ];

    let messageIndex = 0;
    let messageTimerId = null;
    let progressAnimationId = null;
    let progressValue = 0; // 0 to 100
    const maxPreloadMs = 10000; // safety fallback in case window 'load' never fires
    let preloaderFinished = false;

    // Sequentially reveal each letter in loader text
    try {
        const letterSpans = preloader.querySelectorAll('.loader-text span');
        if (letterSpans && letterSpans.length) {
            const baseDelaySeconds = 0.08; // 80ms per letter
            letterSpans.forEach((span, index) => {
                // Ensure the animation exists and apply staggered delay
                span.style.animationName = span.style.animationName || 'revealText';
                span.style.animationDuration = span.style.animationDuration || '0.5s';
                span.style.animationTimingFunction = span.style.animationTimingFunction || 'ease';
                span.style.animationFillMode = span.style.animationFillMode || 'forwards';
                span.style.animationDelay = (baseDelaySeconds * index) + 's';
                span.style.willChange = 'opacity, transform';
            });
        }
    } catch(e) {
        // Non-fatal: if structure changes, skip letter animation
    }

    // Cycle status messages
    const startMessageCycle = () => {
        if (!loadingStatus) return;
        loadingStatus.textContent = loadingMessages[0];
        messageTimerId = setInterval(() => {
            messageIndex = (messageIndex + 1) % loadingMessages.length;
            loadingStatus.textContent = loadingMessages[messageIndex];
        }, 800);
    };

    // Animate the progress bar towards a target value
    const setProgress = (target) => {
        if (!progressBar) return;
        const step = () => {
            if (preloaderFinished) return;
            // Ease progress towards target
            const delta = (target - progressValue) * 0.08;
            progressValue += Math.max(delta, 0.2);
            if (progressValue > target) progressValue = target;
            progressBar.style.width = progressValue + "%";
            if (Math.abs(target - progressValue) > 0.5) {
                progressAnimationId = requestAnimationFrame(step);
            }
        };
        cancelAnimationFrame(progressAnimationId);
        progressAnimationId = requestAnimationFrame(step);
    };

    // Start with progress moving to 90% while waiting for real load
    startMessageCycle();
    setProgress(90);

    const completeAndHide = () => {
        if (preloaderFinished) return;
        preloaderFinished = true;
        try { clearInterval(messageTimerId); } catch (e) {}
        try { cancelAnimationFrame(progressAnimationId); } catch (e) {}

        if (loadingStatus) loadingStatus.textContent = "Welcome!";
        if (progressBar) progressBar.style.width = "100%";

        // Give a brief moment to show 100%, then fade out
        setTimeout(() => {
            preloader.classList.add("fade-out");
            setTimeout(() => {
                preloader.style.display = "none";
                unlockScroll();
            }, 500);
        }, 300);
    };

    // Complete preloader once the entire page (including images) has loaded
    window.addEventListener("load", () => {
        setProgress(100);
        completeAndHide();
    }, { once: true });

    // Safety fallback to ensure preloader is cleared even if 'load' never fires
    setTimeout(() => {
        setProgress(100);
        completeAndHide();
    }, maxPreloadMs);
});

// Do not lock scroll globally here. Scroll locking is handled only
// when the preloader element actually exists and is visible.