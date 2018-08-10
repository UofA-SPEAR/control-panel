window.addEventListener("load", () => {
    const videoPrimary = document.getElementById("video-primary");
    const videoOne = document.getElementById("video-one");
    const videoTwo = document.getElementById("video-two");
    const videoThree = document.getElementById("video-three");

    // Displays a default image if the video stream could not be found.
    function onError() {
        const errorImage = "http://localhost:8888/error.jpg"
        this.src = errorImage;
    }
    videoPrimary.addEventListener("error", onError);
    videoOne.addEventListener("error", onError);
    videoTwo.addEventListener("error", onError);
    videoThree.addEventListener("error", onError);

    // Network addresses of the TX2 and the Raspberry Pi.
    const tx2 = "http://tars:8080";
    const rpi = "http://case:8080";

    // The full urls of the different cameras.
    const webcam = tx2 + "/stream/webcam";
    const openmv = tx2 + "/stream/openmv";
    const infrared = rpi + "/stream/infrared";

    // Begin streaming MJPEG video to each of the image elements.
    videoPrimary.src = webcam;
    videoOne.src = webcam;
    videoTwo.src = openmv;
    videoThree.src = infrared;

    // Clicking a video from the sidebar changes the primary video stream to match.
    function onClick() {
        videoPrimary.src = this.src;
    }
    videoOne.addEventListener("click", onClick);
    videoTwo.addEventListener("click", onClick);
    videoThree.addEventListener("click", onClick);

    // Clicking the save screenshot button opens a new tab showing the current frame.
    const videoScreenshot = document.getElementById("video-screenshot");
    videoScreenshot.addEventListener("click", () => {
        // Requests a still image of the primary stream.
        const link = document.createElement("a");
        link.href = videoPrimary.src.replace("stream", "image");
        link.download = new Date();
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
