echo "Preparing to start video streams..."
ffmpeg -re -i video.mp4 -c:v libx264 -preset veryfast -maxrate 3000k -bufsize 6000k -pix_fmt yuv420p -g 50 -c:a aac -b:a 160k -ac 2 -ar 44100 -strict -2 -f flv rtmp://localhost:1935/hls/video-one >> stream1.log 2>&1 &
ffmpeg -re -i video.mp4 -c:v libx264 -preset veryfast -maxrate 3000k -bufsize 6000k -pix_fmt yuv420p -g 50 -c:a aac -b:a 160k -ac 2 -ar 44100 -strict -2 -f flv rtmp://localhost:1935/hls/video-two >> stream2.log 2>&1 &
ffmpeg -re -i video.mp4 -c:v libx264 -preset veryfast -maxrate 3000k -bufsize 6000k -pix_fmt yuv420p -g 50 -c:a aac -b:a 160k -ac 2 -ar 44100 -strict -2 -f flv rtmp://localhost:1935/hls/video-three >> stream3.log 2>&1 &
ffmpeg -re -i video.mp4 -c:v libx264 -preset veryfast -maxrate 3000k -bufsize 6000k -pix_fmt yuv420p -g 50 -c:a aac -b:a 160k -ac 2 -ar 44100 -strict -2 -f flv rtmp://localhost:1935/hls/video-four >> stream4.log 2>&1 &
ffmpeg -re -i video.mp4 -c:v libx264 -preset veryfast -maxrate 3000k -bufsize 6000k -pix_fmt yuv420p -g 50 -c:a aac -b:a 160k -ac 2 -ar 44100 -strict -2 -f flv rtmp://localhost:1935/hls/video-five >> stream5.log 2>&1 &
ffmpeg -re -i video.mp4 -c:v libx264 -preset veryfast -maxrate 3000k -bufsize 6000k -pix_fmt yuv420p -g 50 -c:a aac -b:a 160k -ac 2 -ar 44100 -strict -2 -f flv rtmp://localhost:1935/hls/video-six >> stream6.log 2>&1 &
echo "Video streams have been started."

