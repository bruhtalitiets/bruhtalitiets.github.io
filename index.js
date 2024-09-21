//Type of cards
const arrCards = [
	"thumbnails/Mewtwo.png",
	"thumbnails/Groudon.png",
	"thumbnails/Blastoise.png",
	"thumbnails/Charizard.png",
	"thumbnails/Brock.png",
	"thumbnails/Pikachu.png"
]

//Variables with: amount of cards, amount of cards incl duplicate, the div where the cards will be placed in and count how many matches.
let numberOfSingleCards = arrCards.length;
const numberOfCards = (arrCards.length) * 2;
const imageContainer = document.querySelector('.img-container');
let matchCount = 0;

//Shuffle all card with their duplicates and return the shuffled array.
function shuffleDeck() {

	const testArray = [];
	const testArray1 = [];

	for (i = 0; testArray.length < numberOfSingleCards; i++) {

		let randomNums = Math.floor(Math.random() * numberOfSingleCards);

		if (!testArray.includes(randomNums)) {
			testArray.push(randomNums)
		};

	}

	for (i = 0; testArray1.length < numberOfSingleCards; i++) {

		let randomNums1 = Math.floor(Math.random() * numberOfSingleCards);

		if (!testArray1.includes(randomNums1)) {
			testArray1.push(randomNums1)
		};

	}

	const mergedArray = [...testArray, ...testArray1]

	console.log(mergedArray);

	return mergedArray;
}

//returned value of the fucnction that shuffled the deck stored in a variable.
let shuffeldDeck = shuffleDeck();

// Remove Ash starting image.
function removeAsh() {

	const gifAsh = document.querySelector(".ash-ketchum");

	gifAsh.remove();

};

// Remove Pikachu afte win.

function removePikachu() {

	const gifPikachu = document.querySelector(".pikachu-win-img");

	gifPikachu.remove();

};

// Lay cards down
function createShuffledDeck(shuffeldDeck) {

	for (i = 0; i < shuffeldDeck.length; i++) {

		const img = document.createElement('img');

		img.src = arrCards[shuffeldDeck[i]];
		img.classList.add('all-cards');
		img.classList.add('front-side-card');
		imageContainer.appendChild(img);
	}
};

// Flip the deck to back side of the card
function flipAllDeck() {

	const toFlip = document.querySelectorAll(".all-cards");

	for (i = 0; i < numberOfCards; i++) {

		toFlip[i].setAttribute("src", "thumbnails/Pokemoncard.jpg");
		toFlip[i].classList.add('all-cards');

	}
};

// Control the array.
console.log(shuffeldDeck);

function revealRemainingCards() {
	document.querySelectorAll(".all-cards").forEach(card => {
			if (card.style.visibility !== "hidden") {
					const cardIndex = Array.from(document.querySelectorAll(".all-cards")).indexOf(card);
					card.src = arrCards[shuffeldDeck[cardIndex]];  // Flip to front side
			}
	});
}

// Start New Game: shuffle deck, show cards for 1 sec and flip back

	let isFirstGameStarted = false;

	console.log(!isFirstGameStarted);

	document.querySelector(".new-game").addEventListener("click", function () {

    shuffeldDeck = shuffleDeck();
    statusScore = 100;
		matchCount = 0;
    document.querySelector(".score").innerHTML = `SCORE: ${statusScore} POINTS`;
    document.querySelector(".new-game").innerHTML = "New Game";

    const container = document.querySelector('.img-container.container');

    if (!isFirstGameStarted) {
        removeAsh();
        isFirstGameStarted = true;
    };

    const allCards = document.querySelectorAll(".all-cards");

    // Remove Pikachu win image if it exists
    const pikachuImg = document.querySelector('.pikachu-win-img');  // Fix selector
    if (pikachuImg) {
        removePikachu();  // Remove the Pikachu win image if it exists
    }

    if (allCards.length === 0) {
        createShuffledDeck(shuffeldDeck);
        console.log(shuffeldDeck);
        setTimeout(flipAllDeck, 1500);
        console.log('No cards found. Creating deck.');
    } else {
        allCards.forEach(card => card.remove());
        console.log('Removed cards:', allCards);

        createShuffledDeck(shuffeldDeck);
        console.log(shuffeldDeck);

        setTimeout(flipAllDeck, 1500);
    }

    console.log(shuffeldDeck);
});


// Select all audio elements with the class 'background-music'

document.querySelector(".toggle-music").addEventListener('click', function () {

	const audios = document.querySelectorAll('.background-music');

	let allPaused = true;

	audios.forEach(audio => {
		if (!audio.paused) {
			allPaused = false;
		}
	});

	audios.forEach(audio => {
		if (allPaused) {
			audio.play();
		} else {
			audio.pause();
		}
	});

	// Update button text based on audio playback status
	if (allPaused) {
		this.textContent = 'Pause Music';
	} else {
		this.textContent = 'Play Music';
	}
});


// Rotate card

// console.log(document.querySelectorAll(".all-cards"))

// document.querySelector(".all-cards").addEventListener("click", function () {

// 	let originalImg = this.src;

// 	if (this.classList.contains("show")) {

// 		this.classList.remove("show");
// 		this.setAttribute("src", originalImg);
// 	}

// 	this.classList.add("show");
// 	this.setAttribute("src", "thumbnails/Pokemoncard.jpg");
// 	console.log(this);

// });

// Play Game

let firstCard = null;
let secondCard = null;
let lockBoard = false;  // To prevent clicking while cards are being checked
let matchFound = false;
let statusScore = 100;

document.querySelector(".img-container").addEventListener("click", function(event) {
    if (lockBoard || statusScore <= 0) return;  // Prevent interaction while checking cards or  if the score hits 0
    
    if (event.target.classList.contains("all-cards")) {
        const imgToFlip = event.target;
        const urlBackSideCard = "thumbnails/Pokemoncard.jpg";

        // If the card is already flipped, ignore further clicks on it
        if (!imgToFlip.src.includes(urlBackSideCard)) return;

        // Flip the card to show the front-side image
        if (imgToFlip.src.includes(urlBackSideCard)) {
            let arrCards = [
                "thumbnails/Mewtwo.png",
                "thumbnails/Groudon.png",
                "thumbnails/Blastoise.png",
                "thumbnails/Charizard.png",
                "thumbnails/Brock.png",
                "thumbnails/Pikachu.png"
            ];
						
            const cardIndex = Array.from(document.querySelectorAll(".all-cards")).indexOf(imgToFlip);
            imgToFlip.src = arrCards[shuffeldDeck[cardIndex]];  // Flip to corresponding front-side image

					

            // Handle the logic for first and second card flip
            if (firstCard === null) {
                // First card flipped
                firstCard = imgToFlip;
            } else if (secondCard === null) {
                // Second card flipped
                secondCard = imgToFlip;
                lockBoard = true;  // Lock the board until we check if they match

                // Check if both flipped cards are identical
                setTimeout(checkForMatch, 1000);  // Add delay so the cards are visible before checking
            }
        }
    }
});




function checkForMatch() {
    // Check if the two cards have the same image
    if (firstCard.src === secondCard.src) {
        // If they are identical, hide them
        firstCard.style.visibility = "hidden";
        secondCard.style.visibility = "hidden";
        matchFound = true;
				lockBoard = false;
				matchCount++;
				console.log(matchCount);

    } else {
        // If not identical, flip them back to the back-side image
				firstCard.src = "thumbnails/Pokemoncard.jpg";
				secondCard.src = "thumbnails/Pokemoncard.jpg";

				let mismatchPoints = 10;
				statusScore -= mismatchPoints;
				document.querySelector(".score").innerHTML = `SCORE: ${statusScore} POINTS`;
				console.log(statusScore);}

			if (matchCount === numberOfSingleCards){

				const winGameSound = document.querySelector(".pikachu-win-sound");

				winGameSound.currentTime = 0;
				winGameSound.play();

				let allCards = document.querySelectorAll(".all-cards");

				allCards.forEach(card => card.remove());
				
				const img = document.createElement('img');

				img.src = "thumbnails/Pikachu-win.gif";
				img.classList.add('pikachu-win-img');
				imageContainer.appendChild(img);

				document.querySelector(".score").innerHTML = `YOU GOT ALL ${matchCount} MATCHES RIGHT!`;
				document.querySelector(".new-game").innerHTML = "Play Again!";


			}

			if(statusScore === 0){

				const loseGameSound = document.querySelector(".pikachu-lose-sound");

				loseGameSound.currentTime = 0;
				loseGameSound.play();
				document.querySelector(".score").innerHTML = `YOU HAVE 0 POINTS. YOU DID NOT CATCH'M ALL. TRY AGAIN!`;
				console.log(statusScore);
				lockBoard = true;
				revealRemainingCards();
				document.querySelector(".new-game").innerHTML = "Try Again"
    };

    // Reset firstCard and secondCard for the next round
    firstCard = null;
    secondCard = null;
    lockBoard = false;  // Unlock the board so the user can click again
};

// New Game button sound

const newGAmeButton = document.querySelector(".new-game");
const neWGameSound = document.querySelector(".new-game-sound");

newGAmeButton.addEventListener('click', ()=>{
	neWGameSound.currentTime = 0;
	neWGameSound.play();
});

// Hover over button sound
const toggleMusicButton = document.querySelector(".toggle-music");
const hoverButtonSound = document.querySelector(".hover-menu-sound");

toggleMusicButton.addEventListener('mouseover', ()=>{
	hoverButtonSound.currentTime = 0;
	hoverButtonSound.play();
});

newGAmeButton.addEventListener('mouseover', ()=>{
	hoverButtonSound.currentTime = 0;
	hoverButtonSound.play();
});





