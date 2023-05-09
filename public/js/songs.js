function onloadSongs() {
    addHTMLSongs();
    elementBindingSongs();
    addEventSongs();
}

function addHTMLSongs() {
    console.log(`URL changed to ${window.location.pathname}`);
    let html = `
    <div class="container-fluid pt-4 px-4">
            <div class="row g-4">

                <div class="col-sm-12 col-xl-12">
                    <div class="bg-secondary rounded h-100 p-4">
                        <h6 class="mb-4">All Songs</h6>
                        <table class="table table-hover">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Play</th>
                                <th scope="col">Song Title</th>
                                <th scope="col">Artist</th>
                                <th scope="col" id="like-thead">Like</th>
                                <th scope="col" onclick="window.location ='/top-50-liked-song'">Likes Received</th>
                                <th scope="col" onclick="window.location ='/top-50-played-song'">Times Played</th>
                            </tr>
                            </thead>
                            <tbody id="tbody">
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    `
    document.getElementById("inner-content").innerHTML = html;
    fetchSongs().then().catch(error => console.log(error));

    let sideBarGroup = document.getElementsByClassName("side-bar-gr");
    // console.log(sideBarGroup);
    for (let i = 0; i < sideBarGroup.length; i++) {
        sideBarGroup[i].classList.remove("active");
    }
    document.getElementById("a-songs").classList.add("active");
}

function elementBindingSongs() {

}

function addEventSongs() {

}

async function fetchSongs () {
    let tbody = document.getElementById("tbody");
    const response = await fetch(`${BE_SERVER_PORT}/songs`, defaultFetchOpts);
    const songList = await response.json();
    console.log(songList);
    console.log(songList.success === false)
    if (songList.success === false) {
        return
    }
    songList.forEach((item, index) => {
        console.log(index, item)
        tbody.innerHTML +=
            `<tr>
            <th scope="row">${++index}</th>
            <td class="song-play-td p-0 pe-auto">
                                        <button type="button" class="btn btn-sm btn-sm-square btn-outline-primary m-2"
                                                onclick="playThisSongOnly(this.value)"
                                                value="${item.id}">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
</svg>
                                        </button>
                                    </td>
            <td>${item.songTitle}</td>
            <td>${item.artists.map(item => item.name).join(", ")}</td>
            <td></td>
        </tr>`
    })
}

