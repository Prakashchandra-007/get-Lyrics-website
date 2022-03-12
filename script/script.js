window.onload =init;
function init(){
    searchbtn = document.getElementById('search-btn');
    searchbtn.addEventListener('click',()=>{
        getapi();
    })
}

function getapi(){
    fetch('http://example.com/movies.json')
    .then(response => response.json())
    .then(data => console.log(data));
  
}