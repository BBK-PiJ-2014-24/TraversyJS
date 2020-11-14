// DOM ELEMENTS
// ============
const draggable_list = document.getElementById('draggable-list');
const checkBtn = document.getElementById('check-btn');

// GLOBAL VARIABLES
// ================
const richestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
  ];
  
  const listItems = [];

  let dragStartIndex;

// FUNCTIONS
// =========
// createList() 
// ------------
// N.b. [...richPeope] is a copy
// map() - creates an object for each person with keys 'value' and 'sort' 
// sort() - sort random array
// map() - map back to simple array 
function createList(){
    [...richestPeople]
    .map(a => ({value: a, sort: Math.random()}))  
    .sort((a,b)=>(a.sort - b.sort))
    .map(a => a.value)
    .forEach((person, index)=>{
        const listItem = document.createElement('li');
        listItem.setAttribute('data-index', index);
        listItem.innerHTML =`
            <span class='number'>${index+1}</span>
            <div class='draggable' draggable='true'>
                    <p class='person-name'>${person}</p>
                    <i class='fas fa-grip-lines'></i>
            </div>
            `;
        listItems.push(listItem);    
        draggable_list.appendChild(listItem);
        });
        addDragEventListeners();
}
createList();

// addDragEventListeners() - add eventlisteners to array elements so that they have drag n drop functionality
// -----------------------
function addDragEventListeners(){
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach((draggable)=>{
        draggable.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach((item)=>{
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragover', dragOver);
        item.addEventListener('dragleave', dragLeave);
        item.addEventListener('drop', dragDrop);
    });
}

// DRAG n DROP FUNCTIONALITY
// -------------------------
// Records the index of selected li element 
function dragStart(){
    dragStartIndex = +this.closest('li').getAttribute('data-index');
    console.log(dragStartIndex);
}
// change color of element that is about to be dragged over
function dragEnter(){
    this.classList.add('over');
}

// remove color of element that is no longer being dragged over
function dragLeave(){
    this.classList.remove('over');
}

// do nothing during the dragover
function dragOver(e){
    e.preventDefault();// prevents the default behaviour which we dont use in this project
}

// determine the drop index point and swaps the li elements around
function dragDrop(){
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);
    this.classList.remove('over');
}

// swapItems() - swaps <li> elements in the list
// -----------
function swapItems(fromIndex, toIndex){
    const itemOne = listItems[fromIndex].querySelector('.draggable');

    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

// checkOrder() - Color codes the correct and incorrect order of rich people 
// ------------
function checkOrder(){
    listItems.forEach((listItem, index)=>{
        const personName = listItem.querySelector('.draggable').innerText.trim();
        if(personName !== richestPeople[index]){
            listItem.classList.add('wrong');
        } else {
            
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
        
    });
}
// EVENT LISTENERS 
// ===============
checkBtn.addEventListener('click', checkOrder);