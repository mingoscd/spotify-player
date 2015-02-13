document.querySelector(".search_submit").addEventListener("click", searchSong);
document.querySelector(".search_input").addEventListener("keydown",function(e){
    if(e.keyCode == 13)
        searchSong();    
});

function searchSong(){
    var query = document.querySelector(".search_input").value;
    var type = 'track';
    var request = 'https://api.spotify.com/v1/search?q='+query+'&type='+type;

    ajaxSongs(request);
};


function ajaxSongs(request){
     var ajax = new XMLHttpRequest();
 
     ajax.open("GET", request, true);
     ajax.send();
     
     ajax.onreadystatechange = function() {
       if (ajax.readyState == 4 ) {
              if(ajax.status == 200){
                  var response = JSON.parse(ajax.responseText).tracks.items;
                setSongsInPage(response);                 
             }
       }
     }
}

function setSongsInPage(response){
    var node,song_artist,song_preview;
    var list = document.querySelector("#songs-list");
    list.innerHTML = "";

    for(var i = 0; i < response.length; i++){
        song_artist = response[i].artists[0].name;
        song_preview = response[i].preview_url;

        node = '<li class="song"><span class="song-artist">'+song_artist+'</span><a href="'+song_preview+'" class="song-preview">Preview</a></li><hr>';
        


        list.innerHTML = list.innerHTML + node;
    }
    document.querySelector(".song").addEventListener("click", setSongInPlayer);
    document.querySelector(".list-of-songs").className = "list-of-songs js-list-of-songs";
}

function setSongInPlayer(){
    console.log("preview song");
}