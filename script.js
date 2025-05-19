document.addEventListener("DOMContentLoaded", () => {
    const playerDiv = document.querySelector('.player-span');
    const playBtn = document.getElementById("playBtn");
    const pauseBtn = document.getElementById("pauseBtn");
    const audioPlayer = document.getElementById("audioPlayer");
    const statusText = document.getElementById("statusText");
    // Detect if the user is on Safari or iPhone
    function isSafariOrIphone() {
        const ua = navigator.userAgent;
        const isIphone = /iPhone/.test(ua);
        // Safari detection: look for "Safari" but exclude Chrome or Chromium browsers
        const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
        return isIphone || isSafari;
    }


    playBtn.addEventListener("click", () => {
        audioPlayer.play();
        highlightButton(playBtn);
    });

    pauseBtn.addEventListener("click", () => {
        audioPlayer.pause();
        highlightButton(pauseBtn);
    });

    function highlightButton(btn) {
        playBtn.classList.remove('active-btn');
        pauseBtn.classList.remove('active-btn');
        btn.classList.add('active-btn');
    }

    // Initially show pause button as active
    pauseBtn.classList.add('active-btn');

    async function checkStreamStatus() {
        try {
            const response = await fetch(audioPlayer.src);
            if (response.ok) {
                statusText.textContent = "Status: online";
                statusText.classList.remove('offline-stream');
                statusText.classList.add('online-stream');
            } else {
                throw new Error('Stream unreachable');
            }
        } catch (error) {
            statusText.textContent = "Status: offline";
            statusText.classList.remove('online-stream');
            statusText.classList.add('offline-stream');
        }
    }

    checkStreamStatus();
    setInterval(checkStreamStatus, 60000);
    
    // Starfield Background
    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');

    let stars = [];
    const numStars = 200;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function initStars() {
        stars = [];
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width - canvas.width / 2,
                y: Math.random() * canvas.height - canvas.height / 2,
                z: Math.random() * canvas.width
            });
        }
    }

    function drawStars() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        for (let star of stars) {
            star.z -= Math.random() * 1.5 + 0.5;
            if (star.z <= 0) {
                star.z = canvas.width;
            }

            const k = 128.0 / star.z;
            const x = star.x * k + centerX;
            const y = star.y * k + centerY;

            if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
                const size = (1 - star.z / canvas.width) * 1.5;
                const alpha = 1 - star.z / canvas.width;
                ctx.beginPath();
                ctx.fillStyle = `rgba(127, 255, 0, ${alpha})`;
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    function animate() {
        drawStars();
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    initStars();
    animate();

    if (isSafariOrIphone()) {
        playerDiv.innerHTML = '<p style="color:#0049FF; font-size:8px; padding:0px 4px;">Stream Incompatible. So sad :,/</p>';
    }
});
  

