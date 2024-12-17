/*const container = document.getElementById("container");
const registerbtn = document.getElementById("register");
const loginbtn = document.getElementById("login");

document.addEventListener("DOMContentLoaded", () => {

  fetch('api/signup/')
  .then(response =>response.json())
  .then(l=>{
    document.getElementById("signup").innerHTML = l.form1
    document.getElementById("login").innerHTML = l.form2
    /*div.setAttribute("class","sign-up")
    div.innerHTML = `<form>
                        <h1>Create Account</h1>
                        <div class="icons">
                            <a href="#" class="icon"><i class="fa-brands fa-facebook"></i></a>
                            <a href="#" class="icon"><i class="fa-brands fa-instagram"></i></a>
                            <a href="#" class="icon"><i class="fa-brands fa-google"></i></a>
                            <a href="#" class="icon"><i class="fa-brands fa-github"></i></a>
                        </div>
                        <span>or use email for registeration</span>
                        ${l.form1} 
                        <button>Sign Up</button>
                     </form>`
    con.appendChild(div) 
    
  })
  .catch(error => console.error("Error fetching forms:", error));
});

registerbtn.addEventListener("click",()=>{
    container.classList.add("active")
})
 

loginbtn.addEventListener("click", () => {
  container.classList.remove("active");
});
*/
/*document.addEventListener("DOMContentLoaded",()=>{
    const fetchForm=()=>{
        fetch('api/signup/')
        .then(response => response.json())
        .then(data =>{
            document.getElementById("signup").innerHTML = data.form1;
            document.getElementById("login").innerHTML = data.form2;    
            inittogglebuttons();
        })
        .catch(error => console.error("Error fetching forms:", error));
    };

    const inittogglebuttons=()=>{
        const container = document.getElementById("container");
        const registerbtn = document.getElementById("register");
        const loginbtn = document.getElementById("login");
    
        if(loginbtn){
            loginbtn.addEventListener("clicl",()=>{
                container.classList.add("active")
            });
        }
    
        if(registerbtn){
            registerbtn.addEventListener("click",()=>{
                container.classList.remove("active")
            });
        }
        
    };
    fetchForm();
}); */

async function getsongs(){
    let s = []
    const card_items = document.querySelector(".cardcontainer")
    fetch('/api/song/')
    .then(response =>response.json())
    .then(d=>{
        d.forEach(song1=>{
            s.push(song1.sog)
            console.log(song1.nam)
            let div = document.createElement("div")
            div.setAttribute("class","card")
            div.innerHTML = `<img src="${song1.poster}" alt="">
                             <audio style = " backgroundColor:grey; height : 20px; width: 150px;padding-top:5px;" controls><source src="${song1.sog}" type="audio/mpeg"></audio>
                             <h2>${song1.nam}</h2>
                             <p>${song1.artist}</p> `
            card_items.appendChild(div)
        })
    
    }).catch(error => console.error('Error fetching songs:', error));

    return s

}
getsongs()

async function main(){
    let songs = await getsongs()
    console.log(songs)

    var audio = new Audio(songs[0])
   
    audio.addEventListener("loadeddata",()=>{
        let dur = audio.duration;
        console.log(dur)
    })
   
    //audio.play();
}
main()


const x = document.getElementById("search-input")
x.addEventListener('input',()=>{
    const query = x.value
    const suggestion = document.getElementById("search_suggestions")
    if(query.length>0){
        fetch(`/seach-song/api/?q=${query}`)
        .then(response=> response.json())
        .then(data =>{
            console.log(data.result)
            suggestion.innerHTML = ``
            data.result.forEach(e =>{
            let l = document.getElementById(e.id);
            if(l){
                l.parentNode.removeChild(l)
            }
            else{
                l = document.createElement('li')
                l.setAttribute('id',e.id);
                l.innerHTML = `<p>${e.name} ~${e.artist}`
                l.classList.add('search_suggestions')

            }
            suggestion.append(l)
           })

        })
        .catch(error => console.log('error fetching',error));


    }
    else{
         suggestion.innerHTML = ``

    }
    

})
