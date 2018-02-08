// Processes data recived from server before loading to html
function science_processData(jsoData) {
    // any processing of data I.E. unit conversions, scaling, formating will go here
    science_loadData(jsoData.moisture, jsoData.temperature, jsoData.uv, jsoData.gps);
}

// Loads the date recived from the server into the html
function science_loadData(moist, temp, uv, gps) {
    document.getElementById("science-temperature").innerHTML = temp + "&#176;";
    document.getElementById("science-moisture").innerHTML = moist + "%";
    document.getElementById("science-uv").innerHTML = uv + " mW/m^2";
    document.getElementById("science-gps").innerHTML = gps.lon + ", " + gps.lat;
}
