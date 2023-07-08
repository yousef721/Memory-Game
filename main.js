let startButton = document.querySelector(".control-buttons span");
let controlButtons = document.querySelector(".control-buttons");
let helloName = document.querySelector(".info-container .name span");
let memoryGameBlocks = document.querySelector(".memory-game-blocks");

// Start Game
startButton.addEventListener("click", () => {
    controlButtons.style.display = "none"
    // Prompt Window To Ask Your Name
    let yourName = prompt("Whats Your Name?")
    if (yourName == null || yourName == "") {
        yourName = "Unknown"
    }
    helloName.innerHTML = yourName;
    // Start Music Game
    document.getElementById("go-game").play()
})

// Effect Duration
let duration = 1000;
// Select Game Blocks
let blocksContainer = document.querySelector(".memory-game-blocks")
// Create Array From Game Block
let blocks = Array.from(blocksContainer.children)
// Create Range Of Key
let orderRange = [...Array(blocks.length).keys()]
/*
// Shuffle Array ES[6]
orderRange.sort(() => Math.random() - 0.5) // (NOT RECOMMENDED)
*/
shuffle(orderRange);

// Add Order Css Propeprty To Game Blocks
blocks.forEach((block, index) => {
    // Add Order Css Propeprty
    block.style.order = orderRange[index];
    // Add Click Event
    block.addEventListener("click", () => {
        // Trigger Flipped Function
        flipped(block)
        // collect All Flipp Blocks
        let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains("is-flipped"))
        if (allFlippedBlocks.length == 2) {
            // Stop Clicking
            stopClicking()
            // Trigger hasFlipped Function
            hasFilpped(allFlippedBlocks[0], allFlippedBlocks[1])
        }
    })
})

// Shuffle Array
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

// Flipped Function
function flipped(blockGame) {
    blockGame.classList.add("is-flipped");
};

function hasFilpped(fristBlock, secondBlock) {
    // If Two Flipped Blocks Add Class has-match
    if (fristBlock.dataset.technology === secondBlock.dataset.technology) {
        // Add Class has-match
        fristBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");
        // remove Class is-flipped
        fristBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");
        if (volumeEffect.muted === false) {
            document.getElementById("success").play()
        }
    } else {
        let wrongTries = document.querySelector(".tries span");
        setTimeout(() => {
            // Increase Wrong Tries
            wrongTries.innerHTML++
            // Remove Class is-flipped
            fristBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
        }, duration)
        if (volumeEffect.muted === false) {
            document.getElementById("fail").play()
        }
    }
}
function stopClicking() {
    // No Clicking After Two Selected
    memoryGameBlocks.classList.add("no-clicking");
    // After Duration Remove Class No-Clicking
    setTimeout(() => {
        memoryGameBlocks.classList.remove("no-clicking");
    }, duration)
}

// Audio
let volumeEffect = document.querySelector(".volume-effect");
let volume = document.querySelector(".volume");
let musicEffect = document.querySelector(".music-effect");
let music = document.querySelector(".music");

music.addEventListener("click", element => toggleMuted(musicEffect, element.target));
volume.addEventListener("click", element => toggleMuted(volumeEffect, element.target));

function toggleMuted(audio, element) {
    // If Muted Attribute True Switch To False And So On
    audio.muted = !audio.muted;
    // Mute Shape
    element.classList.toggle("mute");
}

