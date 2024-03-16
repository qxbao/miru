$(() => {
    socket.emit("req dashboard info");
    socket.on("dashboard info", (data) => {
        // Update dashboard
        $("#mirucaDisplay").text(data.miruca.toLocaleString("vi-vn"));
        $("#itemDisplay").text(data.items.length);
        $("#investmentDisplay").text(data.investments.length);
    })
})