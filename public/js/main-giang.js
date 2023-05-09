const BE_SERVER_PORT = "http://127.0.0.1:1800"
const defaultFetchOpts = {
    credentials: "include"
}
const pageOnloadJS = {};
const pageOnBeforeUnloadJS = {};
document.onload = onloadTasks;
window.onbeforeunload = setCookieCurrentSong;

mainEventAdd();
onloadContentTasks()
onloadNavLoad();

function onloadTasks() {
    console.log("Running first time load tasks");
    onloadNavLoad();

    onloadContentTasks().then().catch(error => console.log(error))
}

document.addEventListener("click", function (e) {
    console.log(e.target);
})


// trash
async function onloadNavLoad() {
    console.log("nav bar loading")

    let isLogged = false;
    if (getCookie("sid")) {
        await fetch(`${BE_SERVER_PORT}/session/${getCookie("sid")}`, defaultFetchOpts)
            .then(raw => raw.json())
            .then(data => {
                console.log(data)
                if (data.success) {
                    isLogged = true;
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    let leftNavBarHtml = `
                        <a href="#" class="nav-item nav-link side-bar-gr" id="a-songs-create"
                          onclick="changeURL('/songs/create')">
                        <i class="me-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="bi bi-cloud-upload-fill" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                      d="M8 0a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 4.095 0 5.555 0 7.318 0 9.366 1.708 11 3.781 11H7.5V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11h4.188C14.502 11 16 9.57 16 7.773c0-1.636-1.242-2.969-2.834-3.194C12.923 1.999 10.69 0 8 0zm-.5 14.5V11h1v3.5a.5.5 0 0 1-1 0z"/>
                            </svg>
                        </i>Upload song</a>
                    <a href="#" class="nav-item nav-link side-bar-gr" id="a-playlists-create"
                    onclick="changeURL('/create-playlists')">
                        <i class="me-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="bi bi-plus-circle-fill" viewBox="0 0 16 16"
                                 >
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                            </svg>
                        </i>Add playlist</a>
                    <a href="#" class="nav-item nav-link side-bar-gr" id="a-songs-your-songs"
                          onclick="changeURL('/songs/your-songs')">
                        <i class="me-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="bi bi-music-note" viewBox="0 0 16 16">
                                <path d="M9 13c0 1.105-1.12 2-2.5 2S4 14.105 4 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>
                                <path fill-rule="evenodd" d="M9 3v10H8V3h1z"/>
                                <path d="M8 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 13 2.22V4L8 5V2.82z"/>
                            </svg>
                        </i>Your songs</a>
                    <div class="nav-item dropdown">
                        <a href="/playlists/your-playlists" class="nav-link dropdown-toggle side-bar-gr" data-bs-toggle="dropdown"
                           id="a-playlists-your-playlists">
                            <i class="me-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     class="bi bi-grid-3x3-gap" viewBox="0 0 16 16">
                                    <path d="M4 2v2H2V2h2zm1 12v-2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V7a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm5 10v-2a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V7a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V2a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zM9 2v2H7V2h2zm5 0v2h-2V2h2zM4 7v2H2V7h2zm5 0v2H7V7h2zm5 0h-2v2h2V7zM4 12v2H2v-2h2zm5 0v2H7v-2h2zm5 0v2h-2v-2h2zM12 1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zm-1 6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zm1 4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-2z"/>
                                </svg>
                            </i>Your playlists</a>
                        <div class="dropdown-menu bg-transparent border-0" >
                            <a href="#" class="dropdown-item" onclick="changeURL('/your-playlists')">All</a>
                            <a href="/playlist/playlistID" class="dropdown-item">Playlist1</a>
                            <span onclick="changeURL()">Hello</span>
                        </div>
                    </div>
    `;
    let topRightNavBarHtml = `
<div class="nav-item dropdown">
                <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                    <i class="fa fa-envelope me-lg-2"></i>
                    <span class="d-none d-lg-inline-flex">Message</span>
                </a>
                <div class="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
                    <a href="#" class="dropdown-item">
                        <div class="d-flex align-items-center">
                            <img class="rounded-circle" src="/img/user.jpg" alt=""
                                 style="width: 40px; height: 40px;">
                            <div class="ms-2">
                                <h6 class="fw-normal mb-0">Jhon send you a message</h6>
                                <small>15 minutes ago</small>
                            </div>
                        </div>
                    </a>
                    <hr class="dropdown-divider">
                    <a href="#" class="dropdown-item">
                        <div class="d-flex align-items-center">
                            <img class="rounded-circle" src="/img/user.jpg" alt=""
                                 style="width: 40px; height: 40px;">
                            <div class="ms-2">
                                <h6 class="fw-normal mb-0">Jhon send you a message</h6>
                                <small>15 minutes ago</small>
                            </div>
                        </div>
                    </a>
                    <hr class="dropdown-divider">
                    <a href="#" class="dropdown-item">
                        <div class="d-flex align-items-center">
                            <img class="rounded-circle" src="/img/user.jpg" alt=""
                                 style="width: 40px; height: 40px;">
                            <div class="ms-2">
                                <h6 class="fw-normal mb-0">Jhon send you a message</h6>
                                <small>15 minutes ago</small>
                            </div>
                        </div>
                    </a>
                    <hr class="dropdown-divider">
                    <a href="#" class="dropdown-item text-center">See all message</a>
                </div>
            </div>
            <div class="nav-item dropdown">
                <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                    <i class="fa fa-bell me-lg-2"></i>
                    <span class="d-none d-lg-inline-flex">Notificatin</span>
                </a>
                <div class="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
                    <a href="#" class="dropdown-item">
                        <h6 class="fw-normal mb-0">Profile updated</h6>
                        <small>15 minutes ago</small>
                    </a>
                    <hr class="dropdown-divider">
                    <a href="#" class="dropdown-item">
                        <h6 class="fw-normal mb-0">New user added</h6>
                        <small>15 minutes ago</small>
                    </a>
                    <hr class="dropdown-divider">
                    <a href="#" class="dropdown-item">
                        <h6 class="fw-normal mb-0">Password changed</h6>
                        <small>15 minutes ago</small>
                    </a>
                    <hr class="dropdown-divider">
                    <a href="#" class="dropdown-item text-center">See all notifications</a>
                </div>
            </div>
            <div class="nav-item dropdown">
                <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                    <img class="rounded-circle me-lg-2" src="/img/user.jpg" alt=""
                         style="width: 40px; height: 40px;">
                    <span class="d-none d-lg-inline-flex">John Doe</span>
                </a>
                <div class="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
                    <a href="#" class="dropdown-item">My Profile</a>
                    <a href="#" class="dropdown-item">Settings</a>
                    <span class="dropdown-item" onclick="tryLogOut()">Log Out</span>
                </div>
            </div>
    `;
    let loginButtonHtml = `
    <div class="navbar-nav w-100">
                <a href="/users/login" type="button" class="btn btn-primary m-2">Log In</a>
            </div>
    `;
    if (isLogged) {
        document.getElementById("left-nav-bar").innerHTML += leftNavBarHtml;

        document.getElementById("top-right-nav-bar").innerHTML += topRightNavBarHtml;
    } else {
        document.getElementById("top-right-nav-bar").innerHTML += loginButtonHtml;
    }
}

//
async function onloadContentTasks() {
    console.log("Checking content on page");
    // console.log(window.location.pathname);
    let scriptURL;
    let path = window.location.pathname.split("/");
    switch (path[1]) {
        case "songs":
            switch (path[2]) {
                case "create":
                    scriptURL = "/js/upload-song-script.js";
                    break;
                case "your-songs":
                    scriptURL = "/js/your-songs.js";
                    break;
                default:
                    scriptURL = "/js/songs.js";
                    break;
            }
            break;
        case "":
        case "browse":
            scriptURL = "/js/browse.js";
            break;
        case "your-playlists":
            scriptURL = "/js/your-playlists.js";
            break;
        case "create-playlists":
            scriptURL = "/js/create-playlist.js";
            break;
        case "playlists":
            scriptURL = "/js/playlist-detail.js";
            break;
    }

    if (scriptURL) {
        // document.getElementById("additional-script").firstChild.remove();
        if (!document.getElementById(scriptURL)) {
            await loadScript(scriptURL)
            console.log(`Script ${scriptURL} loaded successfully`);
        } else {
            console.log(`Script ${scriptURL} is loaded before`);
        }
        if (!pageOnloadJS[scriptURL]) {
            switch (path[1]) {
                case "songs":
                    switch (path[2]) {
                        case "create":
                            pageOnloadJS[scriptURL] = onloadUpload;
                            break
                        case "your-songs":
                            pageOnloadJS[scriptURL] = onloadYourSong;
                            break;
                        default:
                            pageOnloadJS[scriptURL] = onloadSongs;
                            break;
                    }
                    break;
                case "":
                case "browse":
                    pageOnloadJS[scriptURL] = onloadBrowse;
                    break;
                case "your-playlists":
                    pageOnloadJS[scriptURL] = onloadYourPlaylist;
                    break;
                case "create-playlists":
                    pageOnloadJS[scriptURL] = onloadCreateP;
                    break;
                case "playlists":
                    pageOnloadJS[scriptURL] = onloadPlaylistDetail;
                    break;
            }
        }

        pageOnloadJS[scriptURL]();
    }
}

async function tryLogOut() {
    // console.log(req.session.user)
    try {
        const response = await fetch(`${BE_SERVER_PORT}/session/${getCookie("sid")}`, {
            method: "DELETE",
            credentials: "include"
        });
        const jsonData = await response.json();
        console.log("data received:", jsonData);
        setCookie("sid", "", 0);
        window.location = "";
    } catch (e) {
        console.error(e)
    }
}

//
function onloadBrowse() {
    console.log(`URL changed to ${window.location.pathname}`)
    document.getElementById("inner-content").innerHTML = "Browse To Added";

    let sideBarGroup = document.getElementsByClassName("side-bar-gr");
    // console.log(sideBarGroup);
    for (let i = 0; i < sideBarGroup.length; i++) {
        sideBarGroup[i].classList.remove("active");
    }
    document.getElementById("a-browse").classList.add("active")
}

//
// function pageJSCreate() {
//     console.log(`URL changed to ${window.location.pathname}`);
//     document.getElementById("inner-content").innerHTML =
//         `            <div class="container-fluid pt-4 px-4">
//                 <div class="row g-4">
//                     <div class="col-sm-12 col-xl-12">
//                         <div class="bg-secondary rounded h-100 p-4">
//                             <form action="http://127.0.0.1:1800/songs" method="post" id="upload-form">
//                                 <h6 class="mb-4">Upload a new song</h6>
//                                 <div class="form-floating mb-3">
//                                     <input type="text" class="form-control" id="song-title" name="songTitle"
//                                            placeholder="Song's title">
//                                     <label for="song-title">Song's title</label>
//                                 </div>
//                                 <div class="container-fluid p-0 mb-3">
//                                     <div class="row g-4">
//                                         <div class="col-sm-9 col-xl-9">
//                                             <div class="form-floating autocomplete">
//                                                 <input type="text" id="artist-id-list" hidden="" name="artist">
//                                                 <input type="text" id="chosen-artist-id" hidden="">
//                                                 <input type="text" class="form-control" id="artist-name-input"
//                                                        placeholder="Artist">
//                                                 <label for="artist-name-input">Artist</label>
//                                             </div>
//                                         </div>
//                                         <div class="col-sm-3 col-xl-3">
//                                             <button type="button" class="btn btn-primary rounded-pill m-2"
//                                                     id="add-artist-button">Add Artist
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div id="artist-show-div" class="mb-3"></div>
//                                 <div class="mb-3">
//                                     <input type="hidden" name="songURL" id="song-url">
//                                     <input class="form-control bg-dark" type="file" id="formFile"
//                                            onchange="uploadAudio(event)">
//                                 </div>
//                                 <div class="progress form-group mb-3" id="progress-bar" hidden="">
//                                     <div id="upload-progress"
//                                          class="progress-bar progress-bar-striped progress-bar-animated bg-danger"
//                                          role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
//                                          style="width: 0">0%
//                                     </div>
//                                 </div>
//                                 <button id="upload-button" type="submit" class="btn btn-success mb-3" onclick="submitForm()"
//                                         disabled>
//                                     Finish
//                                 </button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
// `;
//
//     let sideBarGroup = document.getElementsByClassName("side-bar-gr");
//     // console.log(sideBarGroup);
//     for (let i = 0; i < sideBarGroup.length; i++) {
//         sideBarGroup[i].classList.remove("active");
//     }
//     document.getElementById("a-songs-create").classList.add("active");
//
//     let getElmInterval = setInterval(()=> {
//         if (artistNameInput && artistIDList && addArtistButton) {
//             console.log("elmt all got:",artistNameInput, artistIDList, addArtistButton);
//             console.log(artistNameInput.removeEventListener("input", artistInputFetching))
//             console.log(artistInputFetching)
//             artistNameInput.addEventListener("input", artistInputFetching)
//             addArtistButton.addEventListener("click", addButtonClicked)
//             clearInterval(getElmInterval)
//         } else {
//             artistNameInput = document.getElementById("artist-name-input");
//             artistIDList = document.getElementById("artist-id-list");
//             addArtistButton = document.getElementById("add-artist-button");
//         }
//
//     }, 500);
// }

