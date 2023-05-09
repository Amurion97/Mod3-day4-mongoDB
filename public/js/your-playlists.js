function onloadYourPlaylist() {
    addHTMLYourPlaylist();
    elementBindingYourPlpaylist();
    addEventYourPlaylist();

    let left_scroll = document.getElementById('left_scroll');
    let right_scroll = document.getElementById('right_scroll');
    let pop_song = document.getElementsByClassName('pop_song')[0];

    left_scroll.addEventListener('click', () => {
        pop_song.scrollLeft -= 420;
    })
    right_scroll.addEventListener('click', () => {
        pop_song.scrollLeft += 420;
    })
}

function addHTMLYourPlaylist() {
    console.log(`URL changed to ${window.location.pathname}`);
    let html = `
<header>
<div class="song_side container-fluid pt-2">


<div class="your_playlist bg-secondary rounded-top p-4">
            <div class="h4">
                <h4>Your Playlist</h4>
                <div class="btn_s">
                    <i id="left_scroll" class="bi bi-arrow-left-short"></i>
                    <i id="right_scroll" class="bi bi-arrow-right-short"></i>
                </div>
            </div>
            <div class="all_playlist" id="playlist-list">

            </div>
        </div>    
</div>
</header>

<button onclick="loadClient()">load</button>
<button onclick="execute(prompt('input artist name'))">execute</button>
`
    document.getElementById("inner-content").innerHTML = html;
    // fetchYourSongs().then().catch(error => console.log(error));

    let sideBarGroup = document.getElementsByClassName("side-bar-gr");
    // console.log(sideBarGroup);
    for (let i = 0; i < sideBarGroup.length; i++) {
        sideBarGroup[i].classList.remove("active");
    }
    document.getElementById("a-playlists-your-playlists").classList.add("active");
    let artistName = "adele"
    fetchYourPlaylists();
}

function elementBindingYourPlpaylist() {

}

function addEventYourPlaylist() {

}

async function fetchYourPlaylists() {
    let playlistList = document.getElementById("playlist-list");
    const response = await fetch(`${BE_SERVER_PORT}/playlists/your-playlists/${getCookie("sid")}`, defaultFetchOpts);
    const songList = await response.json();
    console.log(songList);
    if (songList.success !== false) {
        songList.forEach((item, index) => {
            console.log(index, item)
            playlistList.innerHTML +=
                `<li class="songItem">
                    <div class="img_play">
                        <img src="${(item.coverURL !== "")? item.coverURL: 'https://f4.bcbits.com/img/a3888780581_10.jpg'}" alt="alan">
                        <i class="bi playListPlay bi-play-circle-fill" id="${item.id}" onclick="playThisPlaylist(event, this.id)"></i>
                    </div>
                    <h5 class="mt-2"><span style="cursor: pointer" onclick="changeURL('/playlists/${item.id}')">${item.name}</span><br><div class="subtitle" hidden="">Artist 1, 2, 3</div></h5>
                </li>`
        })
    }

}