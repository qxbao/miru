const socket = io();
$(() => {
    const theme = $.cookie("theme");
    if (theme == "dark")
        $("body").attr("theme", "dark")
    else
        $("body").attr("theme", "light")
})