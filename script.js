const unlockDate =
new Date("2026-06-23T00:00:00");

const countdown =
document.getElementById("countdown");

const giftBox =
document.getElementById("giftBox");

const countdownPage =
document.getElementById("countdownPage");

const birthdayPage =
document.getElementById("birthdayPage");

const typingText =
document.getElementById("typingText");

const photo =
document.getElementById("memoryPhoto");

const birthdayMessage =
`Chúc mừng sinh nhật 🥳
Mong rằng tuổi mới sẽ mang đến cho anh thật nhiều niềm vui, sức khỏe, thành công và những điều tuyệt vời nhất!!!!!
Cảm ơn vì đã chơi Play Together nhé ! Để chúng ta có thể gặp nhau.
Hy vọng món quà nhỏ này sẽ khiến anh mỉm cười 🎂✨ ~ Have a nice day ~ `;

function updateCountdown(){

    const now = new Date();

    const distance = unlockDate - now;

    if(distance <= 0){

        unlockBirthday();

        return;
    }

    const days =
    Math.floor(distance/(1000*60*60*24));

    const hours =
    Math.floor(
        (distance%(1000*60*60*24))
        /(1000*60*60)
    );

    const minutes =
    Math.floor(
        (distance%(1000*60*60))
        /(1000*60)
    );

    const seconds =
    Math.floor(
        (distance%(1000*60))
        /1000
    );

    countdown.innerHTML =
    `${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`;
}

let unlocked = false;

function unlockBirthday(){

    if(unlocked) return;

    unlocked = true;

    const music =
    document.getElementById("birthdayMusic");

    music.play().catch(()=>{});

    giftBox.classList.add("shake");

    setTimeout(()=>{

        giftBox.classList.remove("shake");

        giftBox.classList.add("openGift");

        startConfetti();

        setTimeout(()=>{

        countdownPage.classList.add("hidden");

        birthdayPage.classList.remove("hidden");

        const music =
        document.getElementById("birthdayMusic");

        music.play().catch(() => {

            console.log(
            "Trình duyệt chặn autoplay");
        });

        startTyping();

    },1200);

    },2000);
}

function startTyping(){

    let i = 0;

    const speed = 40;

    const interval = setInterval(()=>{

        typingText.innerHTML += birthdayMessage[i];

        i++;

        if(i >= birthdayMessage.length){

            clearInterval(interval);

            photo.classList.add("show");

        }

    },speed);
}

function startConfetti(){

    const duration = 8000;

    const end = Date.now() + duration;

    const timer = setInterval(()=>{

        confetti({
            particleCount:8,
            spread:120,
            startVelocity:25,
            origin:{
                x:Math.random(),
                y:0
            }
        });

        if(Date.now() > end){

            clearInterval(timer);
        }

    },150);
}

giftBox.addEventListener("click",()=>{

    if(new Date() < unlockDate){

        alert("🎁 Chưa đến lúc đâu nha");
    }
});

updateCountdown();

setInterval(updateCountdown,1000);