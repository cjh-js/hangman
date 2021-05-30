const playBtn = document.querySelectorAll('.play-btn');
const wrongLetter = document.querySelector('.wrong-letter');
const losePopUp = document.querySelector('.wrong-word');
const winPopUp = document.querySelector('.correct-word');
const write = document.querySelector('.write-letter');
const figureParts = document.querySelectorAll('.figure-part');
const overlap = document.querySelector('.letter-again');

const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random()*words.length)];

let playable = true;

let wrong = [];
let correct = [];

// Display
function displayWord(){
    write.innerHTML = `${selectedWord.split('').map(letter =>
        `<span class='each-letter'>${correct.includes(letter) ? letter : ''}</span>`
        ).join('')}`;

    const innerWord = write.innerText.replace(/\n/g, '');

    if(innerWord === selectedWord){
        winPopUp.classList.add('show');

        playable = false;
    }
}

function displayWrong(){
    wrongLetter.innerHTML = `${wrong.length > 0 ? '<strong>Wrong</strong>' : ''}
    ${wrong.map(letter => letter )}`;

    displayParts();
}

function displayParts(){
    figureParts.forEach((part, index) => {
        const errors = wrong.length;

        if(errors > index){
            part.style.display = 'block';
        } else{
            part.style.display = 'none';
        }
    });

    if(wrong.length === figureParts.length){
        losePopUp.classList.add('show');

        playable = false;
    }
}

// POP-UP
function showOverlapErr(){
    overlap.classList.add('overlapErr');

    setTimeout(() => {
        overlap.classList.remove('overlapErr');
    }, 2000);
}

function nonDisplayPopUp(){
    if(winPopUp.classList.contains('show')){
        winPopUp.classList.remove('show');
    } else if(losePopUp.classList.contains('show')){
        losePopUp.classList.remove('show');
    }
}

// Event Listener
window.addEventListener('keydown', e => {
    if(playable){
        if(e.keyCode >= 65 && e.keyCode <= 90){
            const letter = e.key.toLowerCase();

            if(selectedWord.includes(letter)){
                if(!correct.includes(letter)){
                    correct.push(letter);

                    displayWord();
                } else {
                    showOverlapErr();
                }
            } else {
                if(!wrong.includes(letter)){
                    wrong.push(letter);

                    displayWrong();
                } else {
                    showOverlapErr();
                }
            }
        }
    }
});

playBtn.forEach( btn =>
    btn.addEventListener('click', () => {
    playable = true;

    correct.splice(0);
    wrong.splice(0);

    selectedWord = words[Math.floor(Math.random()*words.length)];

    displayWord();
    displayWrong();
    nonDisplayPopUp();
}));

displayWord();