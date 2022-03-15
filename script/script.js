window.onload =init;
function init(){
    const searchData = document.getElementById("search-input");
    const searchBtn = document.getElementById('search-btn');
    
    loading_item = document.getElementById('loadtime');
    searchBtn.addEventListener('click',()=>{
        if(searchData.value==''){
            alert('Please type in a search term');
        }
        else{
            
            getapi(searchData.value)
            
            
        }
        
    })
}
//function get list of search items
const url='https://api.lyrics.ovh';  // api endpoint
const item_div = document.getElementById('items-containers');
let song_list ;
function getapi(search_term){
    
    fetch(`${url}/suggest/${search_term}`)
    
    .then(response => response.json())
    .then(data =>{populate(data)
     console.log(data.data)
        song_list = data.data}
     )

    
    .catch(console.log('error'));
  
}

//function for papulate list of items by song.
function populate(data) {
    
    console.log('populating data');
    let arr_len =data.data.length;
    
    console.log('artist name: ' + data.data[0].artist.name);
    
    console.log('populating data');
    for(let i = 0; i < arr_len; i++){
        item_div.innerHTML+=(`<div class="items">
        <p id="item_detail_list"><strong> ${data.data[i].artist.name}</strong>
        - ${data.data[i].title} </p>
        <button data-songId="${data.data[i].id}" onClick='getLyrics(this)' class="getLink">Get Lyrics</button>
    </div>`);
    }
}

//function for get lyric of perticular song.
function getLyrics(elem){
    console.log(elem.getAttribute('data-songId'));
    let id_song = elem.getAttribute('data-songId')
    
    
    let i=0;
    //loop for find peticular song object by id
    for(; i<15 ; i++){
        if(song_list[i].id==id_song){
            break;
        }
    }
    let title = song_list[i].title; //store song titile
    let artist_name =song_list[i].artist.name; //store artist name
    console.log(title+">>>" +artist_name);
    lyricApi(artist_name,title)
   
}

function lyricApi(artist_name,title){
    let result;
    fetch(`https://api.lyrics.ovh/v1/${artist_name}/${title}`)
    .then(resp => resp.json())
    .then(data=>{console.log(data.lyrics)
        let lyric =data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
        
        item_div.innerHTML =`<h2><span id="header_artist">${artist_name}</span>-${title}</h2>  <p>${lyric}</p>`
        //  console.log(data.lyrics)
        });
    
}