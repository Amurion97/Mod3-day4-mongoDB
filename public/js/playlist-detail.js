function onloadPlaylistDetail() {
    addHTMLPlaylistDetail();
    elementBindingPlaylistDetail();
    addEventPlaylistDetail();
}

async function addHTMLPlaylistDetail() {
    console.log(`URL changed to ${window.location.pathname}`);
    let playlistID = window.location.pathname.split("/")[2];
    if (await fetchPlaylistDetail(playlistID) === false) {
        changeURL("/404");
        onloadContentTasks();
    }

    let sideBarGroup = document.getElementsByClassName("side-bar-gr");
    // console.log(sideBarGroup);
    for (let i = 0; i < sideBarGroup.length; i++) {
        sideBarGroup[i].classList.remove("active");
    }
}

function elementBindingPlaylistDetail() {

}

function addEventPlaylistDetail() {


}

function removeEventUpload() {


}
async function fetchPlaylistDetail(id) {
    const response = await fetch(`${BE_SERVER_PORT}/playlists/${id}`, defaultFetchOpts);
    const playlist = await response.json();
    console.log("playlist:", playlist);
    if (playlist.success === false) {
        return false
    }

    let html = `
    <div class="container-fluid pt-4 px-4 position-relative">
    <div class="album-info">
            <div class="main">
                <div class="left-content ">
                    <div class="big-img border border-dark rounded">
                        <img class="border border-dark rounded"
                                src="${(playlist.coverURL !== "")? playlist.coverURL: 'https://f4.bcbits.com/img/a3888780581_10.jpg'}"
                             alt=""/>
                    </div>

                </div>
                <div class="right-content">
                    <h2 class="product-heading">${playlist.name}</h2>
                    <p class="product-tagline">{creatorName}</p>
                    <p class="product-desc">
                        {playlistDetail}
                    </p>
                    <div class="stars">
                        <span><i class="fas fa-star"></i></span>
                        <span><i class="fas fa-star"></i></span>
                        <span><i class="fas fa-star"></i></span>
                        <span><i class="fas fa-star"></i></span>
                        <span><i class="fas fa-star"></i></span>
                        <!-- green stars -->
                    </div>
                    <p class="product-review"><span>{likeNumber}</span> likes</p>
                    <a href="#">Submit Review</a>
                    <div>
                        <button class="btn btn-danger" onclick="playThisPlaylist(event, ${playlist.id})">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                            </svg>
                            Play
                        </button>
                        <button class="btn btn-danger">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shuffle" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"/>
                                <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z"/>
                            </svg>
                            Shuffle
                        </button>
<!--                        <button class="btn btn-outline-primary border-0" id="playlist-like-button" onclick="playlistLikeButtonClicked()">-->
<!--                        -->
<!--</button>-->
                    </div>
                </div>
            </div>
        </div>
                <div class="container-fluid pt-4 px-4">
            <div class="row g-4">
                <div class="col-sm-12 col-xl-12">
                    <div class="bg-secondary rounded h-100 p-4">
                        <h6 class="mb-4">Preview</h6>
                        <table class="table table-hover">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Play</th>
                                <th scope="col">Song Title</th>
                                <th scope="col">Artist</th>
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

    let tbody = document.getElementById("tbody");
    tbody.innerHTML = "";
    playlist.details.forEach((itemDetail, index) => {
        let item = itemDetail.song
        console.log("item: ",index, item)
        tbody.innerHTML +=
            `<tr>
            <th scope="row">${itemDetail.no}</th>
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
        </tr>`
    })
}
