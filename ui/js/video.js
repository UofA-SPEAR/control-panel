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
    const tx2 = "http://localhost:8080";
    const rpi = "http://localhost:8080";

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
});
