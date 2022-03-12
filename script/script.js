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

function getapi(search_term){
    fetch(`https://api.lyrics.ovh/suggest/${search_term}`)
    
    .then(response => response.json())
    .then(data =>{populate(data)
     console.log(data.data)} )
    
    .catch(console.log('error'));
  
}
function populate(data) {
    console.log('populating data');
    let arr_len =data.data.length;
    const item_div = document.getElementById('items-containers');
    console.log('artist name: ' + data.data[0].artist.name);
    for(let i = 0; i < arr_len; i++){
        item_div.innerHTML+=`<div class="items">
        <h2> ${data.data[i].artist.name} </h2>
        <h3>- ${data.data[i].album.title}</h3>
        <button class="getLink">Get Lyrics</button>
    </div>`;
    }
}

