/*function getlist(){
    const  objectid =-1;
    fetch('api/getlist/${objectid}/')
    .then(response=>response.json())
    .then(data =>{
        if(data.success){
            console.log(data.playlist)
            data.songs.forEach(e=> {
              
            });

        }
        else{
            console.log(data.msg)
        }
    })
} */


    fetch('/api/getlist/1/')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => console.log("Fetched data:", data))
    .catch(error => console.error("Error fetching playlist:", error));


    fetch('/api/get_all_playlists/')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            console.log("All playlists and songs:", data.playlists);
            data.playlists.forEach(e => {
                console.log(e.playlist)
                e.songs.forEach(e=>{
                    console.log(e.song)
                    console.log(e.name)
                    console.log(e.Artist)
                })
                
            });
            displayPlaylists(data.playlists); 
        } else {
            console.error("Failed to fetch playlists:", data.msg);
        }
    })
    .catch(error => console.error("Error fetching playlists:", error));


    function displayPlaylists(playlistf){
        let listcontainer = document.getElementById("playlistcontainer")
        listcontainer.innerHTML = ``
        console.log(listcontainer)
        playlistf.forEach((e,index) => {
            let div = document.createElement("div")
            div.setAttribute("class","playlistlist")

            div.innerHTML = `<h3>${e.playlist}</h3>`
            const songListId = `songcontent-${index + 1}`;

            let viewbutton = document.createElement("button")
            viewbutton.textContent = "view"
            viewbutton.setAttribute("onclick",`getcontent('${songListId}')`)
            div.appendChild(viewbutton)

            const songListContainer = document.createElement('div');
            songListContainer.className = 'songlist';
            songListContainer.id = songListId;
            songListContainer.style.display = 'none';

            const ul = document.createElement('ul');

            e.songs.forEach((song,index) =>{
                const li = document.createElement('li');
                li.innerHTML = `
                    <div class="songscontainer">
                        <img class="invert" src="/static/logos/music.svg/" alt="">
                        <div class="info">
                            <div class="name">${song.name}</div>
                            <div class="art">${song.Artist}</div>
                        </div>
                        <button class = "songplaybutton" style="display:block; type="button" id="${song.id}+${index}"><img class="invert" src="/static/logos/playbutton.svg/" alt=""></button>
                        <button class="songpausebutton"  style="display:none;" type="button" id="${song.id}-pause+${index}"><img class="invert" src="/static/logos/pause.svg/" alt=""></buttons>
                
                    </div>
    
                `;
                ul.appendChild(li);
            })
            songListContainer.appendChild(ul);
            div.appendChild(songListContainer);
            listcontainer.appendChild(div)
            
        });
        
        
        console.log("hello")
        let currentsong = null
        let currentsongid = null
        let a = document.getElementsByClassName("songplaybutton")
        console.log(a)
        Array.from(a).forEach(e =>{
            e.addEventListener("click",()=>{
                let l = e.id.length;
                let a = e.id.indexOf('+')
                let b = e.id.substring(0,a);
                let c = e.id.substring(a,l)
                console.log("songid",a,"listindex",c)
                let another = b + "-pause" + c
                let pausebtn = document.getElementById(another)
                if(e.style.display == "none"){
                    e.style.display = "block";
                    pausebtn.style.display = "none";

                }
                else{
                    pausebtn.style.display = "block";
                    e.style.display = "none";
                }               
                
                //getcontent(d + "-pause")

                playsong(b)
                
            })
        })
        let b = document.getElementsByClassName("songpausebutton")
        console.log(b)
        Array.from(b).forEach(e =>{
            e.addEventListener("click",()=>{
                let l = e.id.length;
                let a = e.id.indexOf('-')
                let a1 = e.id.indexOf('+')
                let b = e.id.substring(0,a);
                let c = e.id.substring(a1,l)
                console.log("songid",a,"listindex",c)
                let another = b  + c
                let playbtn = document.getElementById(another)
                if(e.style.display == "none"){
                    e.style.display = "block";
                    playbtn.style.display = "none";

                }
                else{
                    playbtn.style.display = "block";
                    e.style.display = "none";
                }               
                pausesong();
            })
        })
        function playsong(song_id){
           if(song_id !== currentsongid){
            if(currentsong){
                currentsong.pause()
            }
            currentsong = null
            currentsongid = null
           }

           let s = findsongpyid(song_id)
           if(s){
                if(currentsong !== s || currentsongid != song_id){
                    currentsong = new Audio(s.songurl);
                    currentsong.play();
                    currentsongid = song_id;
                }
                else{
                    currentsong.play();
                }
           }
        } 


        function findsongpyid(song_id){
            for (let playlist of playlistf) {
                for (let song of playlist.songs) {
                    if (song.id == song_id) {
                        return song;
                    }
                }
            }
            return null;
        }

        function pausesong(){
            if (currentsong) {
                currentsong.pause();
            }
        }

       

        
    }

getlist() 
function getcontent(id){
    var t = document.getElementById(id)
    if(t.style.display == "none"){
        t.style.display = "block";
    }
    else{
        t.style.display = "none";
    }
    
}





