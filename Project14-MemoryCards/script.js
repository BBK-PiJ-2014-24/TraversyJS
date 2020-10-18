const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current-card-number');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');


// GLOBAL VARIABLES
// ================
let currentActiveCard =  0;
const cardsData = getCardsData();  // The Card Data in local storage
const cardsArray =[];  // Array Holding the Cards to be used for export to local storage. And Counting Number of Cards

// DUMMY DATA
// ==========
// const cardsData = [
//   {
//     question: 'What must a variable begin with?',
//     answer: 'A letter, $ or _'
//   },
//   {
//     question: 'What is a variable?',
//     answer: 'Container for a piece of data'
//   },
//   {
//     question: 'Example of Case Sensitive Variable',
//     answer: 'thisIsAVariable'
//   }
// ];

// FUNCTIONS
// =========


// createCards() - iterates through the card data Array to create a card in the DOM
// =============
function createCards(){
    cardsData.forEach((data, index)=>createCard(data, index));
}
createCards(); // Automatic load of cards. 

// createCard() 
// ============
// 1. Create div element
// 2. Add Classes
// 3. Add Html
// 4. Add an EventListener to swith the card over
// 5. Append card to parent div in the DOM
// 6. Push onto Cards array. 
function createCard(data , index){

    const card = document.createElement('div');
    card.classList.add('card');

    if(index === 0) {
        card.classList.add('active');
    } 

    card.innerHTML = `
        <div class="inner-card">
          <div class="inner-card-front">
            <p>${data.question}</p>
          </div>
          <div class="inner-card-back">
            <p>${data.answer}</p>
          </div>
        </div>
`;


    card.addEventListener('click', ()=> {card.classList.toggle('show-answer')});
    cardsContainer.appendChild(card);
    cardsArray.push(card);  

    updateCardNumber();

}

// updateCardNumber() - Update the Card's order Number shown in the DOM
// =================
function updateCardNumber(){
    currentEl.innerText = `
        ${currentActiveCard+1}/${cardsArray.length}
        `;
}


// getCardsData() - get Data from Local Storage
// ==============
function getCardsData(){
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

// setCardsData() - Put data into local storage
// ==============
function setCardsData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();
}

// EVENT LISTENERS
// ===============

showBtn.addEventListener('click',()=>{
    addContainer.classList.add('show');
});

hideBtn.addEventListener('click', ()=>{
    addContainer.classList.remove('show');
});

// Opens up input form for user to create a Card
addCardBtn.addEventListener('click',() =>{
    const question = questionEl.value;
    const answer = answerEl.value;

    if(question.trim() && answer.trim()){
        const newCard = {question, answer}
        
        createCard(newCard);
        
        questionEl.value ='';
        answerEl.value = '';
        
        addContainer.classList.remove('show'); // close form using CSS
        
        cardsData.push(newCard); // Add to card Data Array
        
        setCardsData(cardsData); // Update local storage
    }
});

// Next Card Btn
nextBtn.addEventListener('click',()=> {
    cardsArray[currentActiveCard].className = 'card left';

    currentActiveCard++;

    if(currentActiveCard > cardsArray.length -1 ){
        currentActiveCard = cardsArray.length -1;
    }

    cardsArray[currentActiveCard].className = 'card active';
    updateCardNumber();

});

// Prev Card Btn
prevBtn.addEventListener('click',()=> {
    cardsArray[currentActiveCard].className = 'card right';

    currentActiveCard--;

    if(currentActiveCard < 0 ){
        currentActiveCard = 0;
    }

    cardsArray[currentActiveCard].className = 'card active';
    updateCardNumber();

});

// Wipes All Cards in DOM and local storage
clearBtn.addEventListener('click', ()=>{
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.location.reload();
});