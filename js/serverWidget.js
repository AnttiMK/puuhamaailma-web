window.onload = function execWidget() {
    serverWidget();
    setInterval(serverWidget, 30000);
}

function serverWidget() {
    const xhr = new XMLHttpRequest;
    const url = "https://api.minetools.eu/ping/puuhamaailma.fi";
    // const url = "https://httpstat.us/500";

    xhr.responseType = "json"; // Parses response to JSON object
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status == 200) { // Check if request is OK
                const data = xhr.response;

                if (data.error) { // Handle and print JSON error
                    $("#status").text(data.error).css('color', 'red');
                } else { // Set HTML values
                    $("#statusIcon").attr('class', "fas fa-heartbeat fa-lg statusOnline");
                    $("#statusText").addClass("statusOnline").text("Online-tilassa");
                    $("#players").text(data.players.online);
                    $("#version").text(data.version.name.slice(data.version.name.search("1")));
                    $("#statusContainer").css("display", "flex")
                }
            } else { // Handle non-200 HTTP codes
                $("#statusIcon").attr('class', "fas fa-heart-broken fa-lg statusFailed");
                $("#statusText").addClass("statusFailed").text(`Ei saatavilla (HTTP ${xhr.status})`);
                $("#statusContainer").hide();
                console.warn("[STATUS WIDGET] Server status check failed. Is the API server down? (Check the log above for details)");
            }
        }
    }

    xhr.open("GET", url);
    xhr.send();
}