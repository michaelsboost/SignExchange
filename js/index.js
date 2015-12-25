var updateIndicator = function() {
  var status = navigator.onLine ? "online" : "offline";
  if (status === "online") {
    document.querySelector("#header").setAttribute("class", "below hide");
        document.querySelector("nav").setAttribute("class", "below hide");
      document.querySelector("#site").setAttribute("class", "above");
  }
  if (status === "offline") {
          document.querySelector("#site").setAttribute("class", "below hide");
        document.querySelector("#header").setAttribute("class", "above offline");
            document.querySelector("nav").setAttribute("class", "above");
    document.querySelector("#connection").innerHTML = "<h1 class=\"nomar\">Oops you're " + status + "!</h1><br><br>Listening for connection!<br><div class=\"spinner\"><div class=\"bounce1\"></div><div class=\"bounce2\"></div><div class=\"bounce3\"></div></div>";
  }
};
function start() {
  updateIndicator();
}
window.onload    = start;
window.ononline  = start;
window.onoffline = start;
