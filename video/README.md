# Setting up the video streaming server

The video streaming server runs using NGINX built with the nginx-rtmp-module. When running the project for the first time, the following steps must be followed for the rover's live stream to work.

Clone the GitHub project:
```
git clone https://github.com/sergey-dryabzhinsky/nginx-rtmp-module.git
```

Install all the necessary build dependencies:
```
sudo apt-get install build-essential libpcre3 libpcre3-dev libssl-dev
```

Download and extract NGINX:
```
wget http://nginx.org/download/nginx-1.13.8.tar.gz
tar -xf nginx-1.13.8.tar.gz
cd nginx-1.13.8
```

Compile NGINX:
```
./configure --with-http_ssl_module --add-module=../nginx-rtmp-module
make
make install
```

Replace the server config (usually installed to "/usr/local/nginx/conf/nginx.conf") with the nginx.conf file in the current folder.

Start the NGINX server:
```
/usr/local/nginx/sbin/nginx
```

Note that NGINX may be installed to any of the following locations, depending on your system and the version of NGINX downloaded: `/usr/local/nginx/conf`, `/etc/nginx`, or `/usr/local/etc/nginx`.
