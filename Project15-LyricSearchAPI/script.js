// DOM ELEMENTS
// ============
const form = document.getElementById('form');  
const searchBtn = document.getElementById('search-btn');
const search = document.getElementById('search'); // search input
const result = document.getElementById('result'); // result display area
const more = document.getElementById('more'); // prev&next button area

// GLOBAL VARIABLES
// ================
const apiURL = 'https://api.lyrics.ovh';

// EVENT-LISTENERS
// ===============
// search button activation 
// (Note that an alternative approach is to target the search button itself searchBtn.addEventListener('click', ...)

form.addEventListener('submit', (e)=>{
    e.preventDefault(); // Prevent submit to a file
    const searchTerm = search.value.trim();
    if(!searchTerm) {
        alert('Input Lyrics');
    } else {
        searchSongs(searchTerm);
    }
});
// select for lyrics
result.addEventListener('click', (e)=>{
   const clickedEl = e.target;
   if(clickedEl.tagName === 'BUTTON'){
       const artist = clickedEl.getAttribute('data-artist');
       const songTitle = clickedEl.getAttribute('data-songtitle'); 
       getLyrics(artist, songTitle);
   }
});

// FUNCTIONS
// =========

// searchSongs() - fetches the data from the API
// -------------
async function searchSongs(term){
    const res = await fetch(`${apiURL}/suggest/${term}`);
    const data  = await res.json();
    showData(data);
}

// showData()
// ----------
// 1. Maps the API data to a <ul> via innerHTML 
// 2. Create Prev or Next buttons
function showData(data){
    
    // ALT METHOD
    // ----------
    // a. Create array, output
    // b. Loop through data and create <li> for each item
    // c. Put this array <li> into an innerHTML with <ul>
    // let output = [];
    // data.data.forEach(song => {
    //     output += `
    //    <li>
    //         <span><strong>${song.artist.name}</strong> - ${song.title}</span>
    //         <button class='btn' data-artist='${song.artist.name}' data-songtitle='${song.title}'> - Get Lyrics</button>
    //    </li> 
    //     `
    // });

    // result.innerHTML = `
    //     <ul class='songs'>
    //         ${output}
    //     </ul>
    // `;

    result.innerHTML = `
        <ul class='songs'>
            ${data.data.map(song =>`
               <li>
                   <span><strong>${song.artist.name}</strong> - ${song.title}</span>
                   <button class='btn' data-artist='${song.artist.name}' data-songtitle='${song.title}'> - Get Lyrics</button>
               </li>
               `).join('')}
        </ul>
    `
    if (data.prev || data.next){
        more.innerHTML = `
            ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>` : ``}
            ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>` : ``}
        `;
    }else{
        more.innerHTML='';
    }
}

// getMoreSongs()
// --------------
// 1. Fetch another page of songs from API
// 2. Push data to the DOM
 async function getMoreSongs(url){
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();
    showData(data);
}

// getLyrics()
// -----------
// 1. Fetch Lyrics from API
// 2. Attach to Result <div> with innerHTML
async function getLyrics(artist, songTitle){
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>'); // regex to clear line breaks.

    result.innerHTML=`
        <h2><strong>${artist}</strong> - ${songTitle}</h2>
        <span>${lyrics}</span>
    `;
    more.innerHTML = '';
} 