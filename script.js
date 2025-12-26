// console.log("lets write  javascript")

let currentsong = new Audio;

function secondsToMinutes(seconds) {
    if (isNaN(seconds)) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return String(minutes).padStart(2, '0') + ':' +
        String(remainingSeconds).padStart(2, '0');
}


async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/")

    let response = await a.text()

    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/").pop().replaceAll(".mp3", " "))
        }

    }

    return songs
}

const playMusic = (track, pause = false) => {
    //   let audio= new Audio("/songs/"+ track.trim()+".mp3")
    // //   audio.play()

    currentsong.src = "/songs/" + track.trim() + ".mp3"
    console.log(currentsong.src)
    if (!pause) {

        currentsong.play()
        play.src = "pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00/00:00"
}


async function main() {

    // get the list of songs
    let songs = await getSongs()
    playMusic(songs[0], true)
    // console.log(songs)
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML +


            `<li>
                            <img class="invert" src="music.svg" alt="">
                            <div class="info">
                                <div>${song.replaceAll("%20", "")}</div>
                                <div>KaranAujla</div>
                            </div>
                            <span>PlayNow</span>
                            <img class="invert" src="play.svg" alt="">
                        </li>`;





                        
    }

    // attch an event listner to each song

    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {

            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML)

        })




    });


    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play();
            play.src = "pause.svg"




        }
        else {
            currentsong.pause();
            play.src = "play.svg"
        }

    })
    //listen for time update event
    currentsong.addEventListener("timeupdate", () => {
        
        document.querySelector(".songtime").innerHTML = `${secondsToMinutes(currentsong.currentTime)}/${secondsToMinutes(currentsong.duration)}`
        document.querySelector(".circle").style.left=(currentsong.currentTime/currentsong.duration)*100 +'%'
    })

    //   listen to seek baar
    document.querySelector(".seekbaar").addEventListener("click", e=>{
        let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100
            document.querySelector(".circle").style.left= percent+'%';
            currentsong.currentTime=((currentsong.duration)* percent)/100   
    })  



}
main()

