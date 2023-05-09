let audio = document.getElementById("audio-tag");
let art = document.getElementById("album-art");
let source = document.getElementById('audio-source');

function mainEventAdd() {
    audio.onplay = function () {
        console.log("is playing");
        art.classList.add("rotate");
    }

    audio.addEventListener("pause", function () {
        console.log("is paused")
        art.classList.remove("rotate");
    })

    audio.onpause = currentTimeSave;

    checkCookieForAudioOnLoad();
}
function checkCookieForAudioOnLoad() {
    let songURL = getCookie("song_url");
    if (songURL !== "") {
        source.src = songURL;
        // audio.load();
        if (getCookie("currentTime") !== "") {
            audio.currentTime = parseInt(getCookie("currentTime"));
        }
        audio.play();
    }
}

function setCookieCurrentSong() {
    setCookie("song_url", source.src, 365);
    setCookie("currentTime", audio.currentTime, 365);
}


function playSong(songObj) {
    console.log("next song to play:", songObj, source)
    source.src = songObj.songURL;
    audio.currentTime = 0;
    audio.load();
    audio.play();
    setCookieCurrentSong();
}

function playThisSongOnly(songID) {
    fetch(`${BE_SERVER_PORT}/songs/${songID}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setCookie("songID", songID, 365);
            setCookie("isPlaylistPlaying", false, 365);
            playSong(data)
        })
        .catch(console.error);
}

function playThisSongID(songID) {
    fetch(`${BE_SERVER_PORT}/songs/${songID}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setCookie("songID", songID, 365);
            playSong(data)
        })
        .catch(console.error);
}

function currentTimeSave() {
    console.log(audio.currentTime, audio.duration)
    if (audio.currentTime === audio.duration) {
        if (getCookie("isPlaylistPlaying") === "true") {
            let songIDsArr = JSON.parse(getCookie("songIDsList"));
            let currentPlaylistPos = songIDsArr.indexOf(parseInt(getCookie("songID")));
            let nextPos = currentPlaylistPos + 1;
            nextPos = nextPos % songIDsArr.length;
            let songID = songIDsArr[nextPos];
            console.log(songID);
            playThisSongID(songID);
        }
    }
}

function playThisPlaylist(event, playlistID) {
    console.log(event);
    event.stopPropagation();
    const getSongIDsInPlaylist = new Request(`${BE_SERVER_PORT}/playlists/${playlistID}/play`);
    fetch(getSongIDsInPlaylist)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.success === false) {
                return false
            } else {
                data = data.map(item => item.song.id);
                console.log(data)
                setCookie("songIDsList", JSON.stringify(data), 1);
                setCookie("isPlaylistPlaying", true, 1);
                playThisSongID(data[0]);
            }

        })
        .catch(console.error);
}