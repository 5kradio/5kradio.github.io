
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const audio = document.getElementById('audioPlayer');

    playBtn.addEventListener('click', () => {
        audio.play();
        highlightButton(playBtn);
    });

    pauseBtn.addEventListener('click', () => {
        audio.pause();
        highlightButton(pauseBtn);
    });

    function highlightButton(btn) {
        playBtn.classList.remove('active-btn');
        pauseBtn.classList.remove('active-btn');
        btn.classList.add('active-btn');
    }

    pauseBtn.classList.add('active-btn');


    document.addEventListener("DOMContentLoaded", () => {
        const playBtn = document.getElementById("playBtn");
        const pauseBtn = document.getElementById("pauseBtn");
        const audioPlayer = document.getElementById("audioPlayer");

        playBtn.addEventListener("click", () => {
            audioPlayer.play();
        });
    
        pauseBtn.addEventListener("click", () => {
            audioPlayer.pause();
        });
    
        checkStreamStatus();
        setInterval(checkStreamStatus, 60000);
    });
    

async function checkStreamStatus() {
   try {
       const response = await fetch(audioPlayer.src);
       statusText.textContent = "Status: online";
       statusText.classList.add('online-stream')
   } catch (error) {
       statusText.textContent = "Status: offline";
       statusText.classList.add('offline-stream')
   }
}

checkStreamStatus();


const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 200;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

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

initStars();
animate();
