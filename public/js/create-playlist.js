let songSuggestionList = [];
let songNameInput, songIDList, addSongButton;
console.log("elmt at start:", songNameInput, songIDList)

function onloadCreateP() {
    addHTMLCreateP();
    elementBindingCreateP();
    addEventCreateP();
}

function addHTMLCreateP() {
    console.log(`URL changed to ${window.location.pathname}`);
    let html = `
    <div class="container-fluid pt-4 px-4 position-relative">
    <div id="playlist-cover" class="border border-primary border-3 rounded position-absolute ">
    <img src="https://f4.bcbits.com/img/a3888780581_10.jpg" alt="playlist-cover" id="cover-img">
</div>
                <div class="row g-4">
                    <div class="col-sm-12 col-xl-12">
                        <div class="bg-secondary rounded h-100 p-4">
                            <form action="#" method="post" id="upload-form">
                                <h6 class="mb-4">Create a new playlist</h6>
                                <div class="form-floating mb-3 col-sm-10 col-xl-10">
                                    <input type="text" class="form-control" id="playlist-name" name="name"
                                           placeholder="Song's title" autocomplete="off">
                                    <label for="song-title">Playlist name</label>
                                </div>
                                <div class="container-fluid p-0 mb-3">
                                    <div class="row g-4">
                                        <div class="col-sm-9 col-xl-9">
                                            <div class="form-floating autocomplete">
                                                <input type="text" id="song-id-list" hidden="" name="song">
                                                <input type="text" id="chosen-song-id" hidden="">
                                                <input type="text" class="form-control" id="song-title-input"
                                                       placeholder="Artist" autocomplete="off">
                                                <label for="song-title-input">Song</label>
                                            </div>
                                        </div>
                                        <div class="col-sm-3 col-xl-3">
                                            <button type="button" class="btn btn-primary rounded-pill m-2"
                                                    id="add-song-button">Add Song
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div id="artist-show-div" class="mb-3"></div>
                                <div class="mb-3">
                                    <label for="formFile" class="form-label">Upload your playlist cover</label>
                                    <input type="hidden" name="coverURL" id="cover-url">
                                    <input class="form-control bg-dark" type="file" id="formFile"
                                           onchange="uploadAudio(event)">
                                </div>
                                <div class="progress form-group mb-3" id="progress-bar" hidden="">
                                    <div id="upload-progress"
                                         class="progress-bar progress-bar-striped progress-bar-animated bg-danger"
                                         role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
                                         style="width: 0">0%
                                    </div>
                                </div>
                                <button id="upload-button" type="button" class="btn btn-success mb-3" onclick="submitForm()"
                                        disabled>
                                    Finish
                                </button>
                            </form>
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
                                <th scope="col" id="like-thead">Action</th>
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

    let sideBarGroup = document.getElementsByClassName("side-bar-gr");
    // console.log(sideBarGroup);
    for (let i = 0; i < sideBarGroup.length; i++) {
        sideBarGroup[i].classList.remove("active");
    }
    document.getElementById("a-playlists-create").classList.add("active");
}

function elementBindingCreateP() {
    songNameInput = document.getElementById("song-title-input");
    songIDList = document.getElementById("song-id-list");
    addSongButton = document.getElementById("add-song-button");
}

function addEventCreateP() {
    addSongButton.addEventListener("click", addButtonClicked);
    songNameInput.addEventListener("input", songInputFetching);
}

function removeEventUpload() {
    addSongButton.removeEventListener("click", addButtonClicked);
    songNameInput.removeEventListener("input", songInputFetching);
}

function songInputFetching() {
    fetch(`${BE_SERVER_PORT}/songs?name=${songNameInput.value}`)
        .then((response) => response.json())
        .then((data) => {
            songSuggestionList = data;
            console.log("received data:", data);
            createSongSuggestions(songNameInput, songSuggestionList)
        })
        .catch(console.error);
}


function createSongSuggestions(inp, arr) {
    console.log("possible song arr:", arr);
    let a, b, i, val = inp.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists(inp);
    /*create a DIV element that wil l contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", inp.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items p-3");
    a.setAttribute("style", "color: white");
    /*append the DIV element as a child of the autocomplete container:*/
    inp.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        // if (arr[i].title.slice(0, val.length).toUpperCase() === val.toUpperCase()) {
        let artistName = arr[i].songTitle;
        let startIndex = artistName.toUpperCase().indexOf(val.toUpperCase());
        if (artistName.toUpperCase().includes(val.toUpperCase())) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = artistName.slice(0, startIndex);
            b.innerHTML += "<strong>" + artistName.slice(startIndex, startIndex + val.length) + "</strong>";
            b.innerHTML += artistName.slice(startIndex + val.length);
            /*insert an input field that will hold the current array item's value:*/
            // b.innerHTML += "<input type='hidden' value='" + artistName + "'>";
            b.innerHTML += `<input type="hidden" value="${artistName}">`;
            /*execute a function when someone clicks on the item value (DIV element):*/
            let songID = arr[i].id;
            b.addEventListener("click", function (e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                document.getElementById("chosen-song-id").value = songID;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists(inp);
            });
            a.appendChild(b);
        }
    }
}

function closeAllLists(inp, element) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    let x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++) {
        if (element !== x[i] && element !== inp) {
            x[i].parentNode.removeChild(x[i]);
        }
    }
}

async function addButtonClicked() {
    let gotSong = await getSongID();
    console.log("gotArtist:", gotSong)
    if (gotSong) {
        let toAddArtistID = gotSong.id;
        let artistName = document.getElementById("song-title-input").value;
        let artistIDArr = [];
        if (songIDList.value !== "") {
            artistIDArr = JSON.parse(songIDList.value);
        }
        if (artistIDArr.indexOf(toAddArtistID) < 0) {
            artistIDArr.push(toAddArtistID);
            songIDList.value = JSON.stringify(artistIDArr);
            console.log(songIDList.value)
            // let artistShowDiv = document.getElementById("artist-show-div");
            // let b = `
            //     <button type="button" class="btn btn-primary position-relative" onclick="removeArtist(this.value)" value="${toAddArtistID}" id="${toAddArtistID}">
            //     ${artistName}
            //         <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            //             x
            //             <span class="visually-hidden">remove artist button</span>
            //         </span>
            //     </button>
            // `;
            document.getElementById("song-title-input").value = "";
            document.getElementById("chosen-song-id").value = "";
            // artistShowDiv.innerHTML += b;
            fetchChosenSongList();
        }
    }
}

async function getSongID() {
    let gotArtist;
    await fetch(`${BE_SERVER_PORT}/songs/get-by-name?name=${songNameInput.value}`)
        .then((response) => response.json())
        .then((data) => {
            console.log("received data:", data);
            gotArtist = data;
        })
        .catch(console.error);
    return gotArtist;
}

function removeArtist(artistID) {
    let artistIDArr = JSON.parse(songIDList.value);
    let index = artistIDArr.findIndex(item => item === artistID);
    artistIDArr.splice(index, 1);
    songIDList.value = JSON.stringify(artistIDArr);
    console.log("songIDList:", songIDList.value);
    fetchChosenSongList();
}

async function fetchChosenSongList () {
    let tbody = document.getElementById("tbody");
    tbody.innerHTML = "";
    console.log("song ID list:", songIDList.value)
    const response = await fetch(`${BE_SERVER_PORT}/songs?list=${songIDList.value}`, defaultFetchOpts);
    const songList = await response.json();
    console.log(songList);
    if (songList.success === false) {
        return false
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
            <td>
            <button type="button" class="btn btn-primary position-relative" onclick="removeArtist(this.value)" value="${item.id}">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
</svg>
                </button>
</td>
        </tr>`
    })
}

function submitForm() {
    let uploadForm = document.getElementById("upload-form");
    let formData = new FormData(uploadForm);
    formData.append("sid", getCookie("sid"));
    const plainFormData = Object.fromEntries(formData.entries());
    console.log(plainFormData)
    const formDataJsonString = JSON.stringify(plainFormData);
    console.log("formDataJsonString:", formDataJsonString);
    const uploadRequest = new Request(`${BE_SERVER_PORT}/playlists`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: formDataJsonString,
        credentials: "include"
    });
    fetch(uploadRequest)
        .then((response) => response.json())
        .then((data) => {
            console.log("received data:", data);
            if (data.success) {
                // alert("Register successfully");
                document.getElementById("notification").innerHTML = `
                        <div class="alert alert-success alert-dismissible fade show notification" role="alert" id="success-register"
         hidden="">
        <i class="fa fa-exclamation-circle me-2"></i>Playlist is successfully create, check here <a href="/songs/your-songs">Your Songs</a>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
                    `;
                document.getElementById("success-register").removeAttribute("hidden");
                $('#success-register').alert();

                uploadForm.reset();
                console.log(new FormData(uploadForm).entries())
            } else {
                // alert("Register unsuccessfully");
                document.getElementById("notification").innerHTML = `
                        <div class="alert alert-primary alert-dismissible fade show notification" role="alert" id="failed-register" hidden="">
        <i class="fa fa-exclamation-circle me-2"></i>Playlist creation unsuccessfully
        <button type="button" class="btn-close" aria-label="Close" onclick="$('#failed-register').alert('close')"></button>
    </div>
                    `;
                document.getElementById("failed-register").removeAttribute("hidden");
                $('#failed-register').alert();
            }

        })
        .catch(console.error);
}