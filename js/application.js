document.querySelector(".search_submit").addEventListener("click", searchSong);
document.querySelector(".search_input").addEventListener("keydown",function(e){
    if(e.keyCode == 13)
        searchSong();    
});
document.querySelector("#songs-list").addEventListener("click",    setSongInPlayer);
document.querySelector(".btn-play").addEventListener("click", controlAudio);

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

    var node, song_artist, song_name, song_id, song_preview;
    var list = document.querySelector("#songs-list");
    list.innerHTML = "";

    for(var i = 0; i < response.length; i++){
        song_artist = response[i].artists[0].name;
        song_preview = response[i].preview_url;
        song_name = response[i].name;
        song_id = response[i].id;
        song_image = response[i].album.images[0].url;

        node = '<li class="song"><span class="song-artist">'+song_artist+'</span><br><span class="song-name">'+song_name+'</span><span class="song-id">'+song_id+'</span><span class="song-image">'+song_image+'</span><span class="song_sound">'+song_preview+'</span><span class="icon-headphones song-preview"></span></li><hr>';
        list.innerHTML = list.innerHTML + node;
    }
    document.querySelector(".list-of-songs").className = "list-of-songs js-list-of-songs"
}

function setSongInPlayer(e){
    var li = e.target.className != "song"? e.target.parentNode : e.target;
    document.querySelector(".title").innerHTML = li.querySelector(".song-artist").innerHTML;
    document.querySelector(".author").innerHTML = li.querySelector(".song-name").innerHTML;
    document.querySelector(".song-bg").src = li.querySelector(".song-image").innerHTML;
    document.querySelector("#audio").src = li.querySelector(".song_sound").innerHTML;

    document.querySelector(".btn-play").className = "btn-play";

    document.querySelector("#audio").ontimeupdate = function() {
        document.querySelector(".progress-bar").value = document.querySelector("#audio").currentTime;
    };
    changeBtnStyle();
}

function controlAudio(){
    var audio = document.querySelector("#audio");
    audio.paused? audio.play() : audio.pause();
    if(audio.src != ""){
      changeBtnStyle();  
    }
}

function changeBtnStyle(){
    document.querySelector(".btn-play").classList.toggle('active');
}