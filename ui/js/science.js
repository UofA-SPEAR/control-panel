var moist; // data from moisture sensor
var temp; // data from temperature sensor
var uv; // data from uv sensor
var gps; // data from gps data

// Processes data recived from server before loading to html
function science_processData(jsoData) {
    // any processing of data I.E. unit conversions, scaling, formating will go here
    if (jsoData.hasOwnProperty("moisture")) {
        moist = jsoData.moisture;
    }
    if (jsoData.hasOwnProperty("gps")) {
        gps = jsoData.gps;
    }
    if (jsoData.hasOwnProperty("uv")) {
        uv = jsoData.uv;
    }
    if (jsoData.hasOwnProperty("temperature")) {
        temp = jsoData.temperature;
    }
    science_refreshData();
}


// Loads the date received from the server into the html
function science_refreshData() {
    document.getElementById("science-temperature").innerHTML = temp + "&#176;";
    document.getElementById("science-moisture").innerHTML = moist + "%";
    document.getElementById("science-uv").innerHTML = uv + " mW/m^2";
    document.getElementById("science-gps").innerHTML = gps.lon + ", " + gps.lat;
}
