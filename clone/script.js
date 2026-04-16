let videos = [];

// LOAD VIDEOS FROM BACKEND
async function loadVideos() {
    let res = await fetch("http://localhost:3000/videos");
    let data = await res.json();
    videos = data;
    displayVideos(videos);
}

// DISPLAY
function displayVideos(list) {
    let container = document.getElementById("results");
    if (!container) return;

    container.innerHTML = "";

    list.forEach(video => {
        container.innerHTML += `
            <div class="video-card" onclick="openVideo('${video.file}')">
                <p>${video.title}</p>
            </div>
        `;
    });
}

// SEARCH
function searchVideos() {
    let input = document.getElementById("search").value.toLowerCase();
    let filtered = videos.filter(v => v.title.toLowerCase().includes(input));
    displayVideos(filtered);
}

// OPEN VIDEO
function openVideo(file) {
    localStorage.setItem("video", file);
    window.location.href = "video.html";
}

// LOAD VIDEO PAGE
window.onload = function () {
    loadVideos();

    let file = localStorage.getItem("video");
    if (file && document.getElementById("videoPlayer")) {
        document.getElementById("videoPlayer").src = "http://localhost:3000/videos/" + file;
    }
};

// LIKE
let likes = 0;
function likeVideo() {
    likes++;
    alert("Likes: " + likes);
}

// SUBSCRIBE
function subscribe() {
    alert("Subscribed!");
}

// UPLOAD
let form = document.getElementById("uploadForm");
if (form) {
    form.onsubmit = async function(e) {
        e.preventDefault();

        let formData = new FormData(this);

        await fetch("http://localhost:3000/upload", {
            method: "POST",
            body: formData
        });

        alert("Uploaded!");
        loadVideos();
    };
}
