$(() => {
    console.log("jQuery is ready!");
    $("#loginForm").on("submit", () => {
        const usr = $("#username").val();
        const pwd = $("#password").val();
        if (usr != "" && pwd != "")
            //- Send login request
            $.post("/api/user/login", {"username" : usr, "password" : pwd}, (res) => {
                //- Response handling
                if (res.status) {
                    window.location.href = "/dashboard";
                }
                else {
                    alert(res.ercode);
                }
            });
        else
            console.log("Blank")
        return false;
    })
})