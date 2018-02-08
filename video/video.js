window.addEventListener("load", (e) => {
    // Load the video module.
    fetch(window.location.origin + "/video/video.html")
        .then(response => response.text())
        .then(text => document.getElementById("window-video").innerHTML = text)
        .catch(error => {
            console.log("An error occured loading the video module.");
            console.log(error);
        });
});
