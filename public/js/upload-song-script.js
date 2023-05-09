let artistSuggestionList = [];
let artistNameInput, artistIDList, addArtistButton;
console.log("elmt at start:", artistNameInput, artistIDList)

function onloadUpload() {
    addHTMLUpload();
    elementBindingUpload();
    addEventUpload();
}

function addHTMLUpload() {
    console.log(`URL changed to ${window.location.pathname}`);
    let html = `
    <div class="container-fluid pt-4 px-4">
                <div class="row g-4">
                    <div class="col-sm-12 col-xl-12">
                        <div class="bg-secondary rounded h-100 p-4">
                            <form action="${BE_SERVER_PORT}/songs" method="post" id="upload-form">
                                <h6 class="mb-4">Upload a new song</h6>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="song-title" name="songTitle"
                                           placeholder="Song's title">
                                    <label for="song-title">Song's title</label>
                                </div>
                                <div class="container-fluid p-0 mb-3">
                                    <div class="row g-4">
                                        <div class="col-sm-9 col-xl-9">
                                            <div class="form-floating autocomplete">
                                                <input type="text" id="artist-id-list" hidden="" name="artist">
                                                <input type="text" id="chosen-artist-id" hidden="">
                                                <input type="text" class="form-control" id="artist-name-input"
                                                       placeholder="Artist" autocomplete="off">
                                                <label for="artist-name-input">Artist</label>
                                            </div>
                                        </div>
                                        <div class="col-sm-3 col-xl-3">
                                            <button type="button" class="btn btn-primary rounded-pill m-2"
                                                    id="add-artist-button">Add Artist
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div id="artist-show-div" class="mb-3"></div>
                                <div class="mb-3">
                                    <input type="hidden" name="songURL" id="song-url">
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
    `
    document.getElementById("inner-content").innerHTML = html;

    let sideBarGroup = document.getElementsByClassName("side-bar-gr");
    // console.log(sideBarGroup);
    for (let i = 0; i < sideBarGroup.length; i++) {
        sideBarGroup[i].classList.remove("active");
    }
    document.getElementById("a-songs-create").classList.add("active");
}

function elementBindingUpload() {
    artistNameInput = document.getElementById("artist-name-input");
    artistIDList = document.getElementById("artist-id-list");
    addArtistButton = document.getElementById("add-artist-button");
}

function addEventUpload() {
    addArtistButton.addEventListener("click", addButtonClicked);
    artistNameInput.addEventListener("input", artistInputFetching);
}

function removeEventUpload() {
    addArtistButton.removeEventListener("click", addButtonClicked);
    artistNameInput.removeEventListener("input", artistInputFetching);
}

function artistInputFetching() {
    fetch(`http://127.0.0.1:1800/artists?name=${artistNameInput.value}`)
        .then((response) => response.json())
        .then((data) => {
            artistSuggestionList = data;
            console.log("received data:", data);
            createArtistSuggestions(artistNameInput, artistSuggestionList)
        })
        .catch(console.error);
}


function createArtistSuggestions(inp, arr) {
    console.log("possible arr:", arr);
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
        let artistName = arr[i].name;
        let startIndex = artistName.toUpperCase().indexOf(val.toUpperCase());
        if (artistName.toUpperCase().includes(val.toUpperCase())) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = artistName.slice(0, startIndex);
            b.innerHTML += "<strong>" + artistName.slice(startIndex, startIndex + val.length) + "</strong>";
            b.innerHTML += artistName.slice(startIndex + val.length);
            /*insert an input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + artistName + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            let artistID = arr[i]._id;
            b.addEventListener("click", function (e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                document.getElementById("chosen-artist-id").value = artistID;
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
    let gotArtist = await getArtistID();
    console.log("gotArtist:", gotArtist)
    let trials = 0;
    while (!gotArtist) {
        await createNewArtist();
        gotArtist = await getArtistID();
        console.log("gotArtist:", gotArtist);
        trials++;
        if (trials > 10) {
            break;
        }
    }

    if (gotArtist) {
        let toAddArtistID = gotArtist.id;
        let artistName = document.getElementById("artist-name-input").value;
        let artistIDArr = [];
        if (artistIDList.value !== "") {
            artistIDArr = JSON.parse(artistIDList.value);
        }
        if (artistIDArr.indexOf(toAddArtistID) < 0) {
            artistIDArr.push(toAddArtistID);
            artistIDList.value = JSON.stringify(artistIDArr);
            console.log(artistIDList.value)
            let artistShowDiv = document.getElementById("artist-show-div");
            let b = `
                <button type="button" class="btn btn-primary position-relative" onclick="removeArtist(this.value)" value="${toAddArtistID}" id="${toAddArtistID}">
                ${artistName}
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        x
                        <span class="visually-hidden">remove artist button</span>
                    </span>
                </button>
            `;
            document.getElementById("artist-name-input").value = "";
            document.getElementById("chosen-artist-id").value = "";
            artistShowDiv.innerHTML += b;
        }
    }
}

async function createNewArtist() {
    let success = false;
    const createArtistRequest = new Request(`${BE_SERVER_PORT}/artists`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: artistNameInput.value
        })
    });

    await fetch(createArtistRequest)
        .then((response) => response.json())
        .then((data) => {
            console.log("received data:", data);
            success = data.success;
        })
        .catch(console.error);
    return success
}
async function getArtistID() {
    let gotArtist;
    await fetch(`${BE_SERVER_PORT}/artists/get-by-name?name=${artistNameInput.value}`)
        .then((response) => response.json())
        .then((data) => {
            console.log("received data:", data);
            gotArtist = data;
        })
        .catch(console.error);
    return gotArtist;
}

function removeArtist(artistID) {
    let artistIDArr = JSON.parse(artistIDList.value);
    let index = artistIDArr.findIndex(item => item === artistID);
    artistIDArr.splice(index, 1);
    artistIDList.value = JSON.stringify(artistIDArr);
    console.log(artistIDList.value)
    document.getElementById(artistID).remove();
}

function submitForm(e) {
    console.log(document.getElementById("upload-button").getAttribute("disabled"));
    // if (document.getElementById("upload-button").)
    let uploadForm = document.getElementById("upload-form");
    let formData = new FormData(uploadForm);
    formData.append("sid", getCookie("sid"));
    const plainFormData = Object.fromEntries(formData.entries());
    console.log(plainFormData)
    const formDataJsonString = JSON.stringify(plainFormData);
    console.log("formDataJsonString:", formDataJsonString);
    const uploadRequest = new Request(`${BE_SERVER_PORT}/songs`, {
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
        <i class="fa fa-exclamation-circle me-2"></i>Song is successfully create, check here <a href="/songs/your-songs">Your Songs</a>
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
        <i class="fa fa-exclamation-circle me-2"></i>Song creation unsuccessfully
        <button type="button" class="btn-close" aria-label="Close" onclick="$('#failed-register').alert('close')"></button>
    </div>
                    `;
                document.getElementById("failed-register").removeAttribute("hidden");
                $('#failed-register').alert();
            }

        })
        .catch(console.error);
}