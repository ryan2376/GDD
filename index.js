function calculateGDD() {
    var baseTemp = parseInt(document.getElementById("base-temp").value);
    var avgTemp = parseInt(document.getElementById("avg-temp").value);
  
    if (isNaN(baseTemp) || isNaN(avgTemp)) {
      document.getElementById("result").innerHTML = "Please enter valid temperature values.";
      return;
    }
  
    var gdd = Math.max(avgTemp - baseTemp, 0);
    document.getElementById("result").innerHTML = "Growing Degree Days: " + gdd;
  }