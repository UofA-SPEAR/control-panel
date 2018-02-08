window.addEventListener("load", () => {
    let videoElement = document.getElementById("video");
    loadVideoStream(videoElement, "http://localhost/hls/mystream.m3u8");
});

function loadVideoStream(videoElement, source) {
    if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(source);
        hls.attachMedia(videoElement);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            videoElement.play();
        });
    }
    // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
    // When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element throught the `src` property.
    // This is using the built-in support of the plain video element, without using hls.js.
    else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
        videoElement.src = source;
        videoElement.addEventListener("canplay", () => {
            videoElement.play();
        });
    }
}
