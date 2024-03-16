$(() => {
    const completion = {
        "name" : false,
        "username" : false,
        "email" : false,
        "password" : false
    }

    $("#signinForm").on("submit", () => {
        const usr = $("#username").val();
        const pwd = $("#password").val();
        if (usr != "" && pwd != "")
            //- Send signin request
            $.post("/api/user/signin", { "username": usr, "password": pwd }, (res) => {
                //- Response handling
                if (res.status) {
                    window.location.href = "/home";
                }
                else {
                    alert("Đăng nhập không thành công");
                }
            }, "json");
        else
            console.log("Blank")
        return false;
    })

    $("#signupForm input").on("input", function () {
        let satisfied = false;
        const value = $(this).val();
        const name = $(this).attr("id");
        switch (name) {
            case "name":
                satisfied = /^(?=.{8,20}$)([\w]+\s?)+[\w]$/.test(value);
                break;
            case "username":
                satisfied = /^[a-zA-Z0-9]{6,12}$/.test(value);
                break;
            case "email":
                satisfied = /^[\w\.-]+@([\w-]+\.)+[\w-]{2,5}$/.test(value);
                break;
            case "password":
                satisfied = /^(?=.{8,1000}$)(?!([^\s])\1+$)[^\s]+$/.test(value);
                break;
        }
        if (satisfied) {
            $(this).siblings("label").css("color", "#28B463")
        }
        else {
            $(this).siblings("label").css("color", "#CB4335");
        }
        completion[name] = satisfied;
        for (key in completion) {
            if (!completion[key]) {
                return $("#completeSignupButton").prop("disabled", true);
            }
        }
        $("#completeSignupButton").prop("disabled", false);
    })

    $("#signupForm").on("submit", () => {
        const signupFormData = {
            "name" : $("#signupForm input#name").val(),
            "email" : $("#signupForm input#email").val(),
            "username" : $("#signupForm input#username").val(),
            "password" : $("#signupForm input#password").val()
        }

        $.post("/api/user/signup", signupFormData, (res) => {
            if (res.status == true) {
                alert("Đăng ký thành công!!!")
                location.reload();
            } else {
                switch(res.code) {
                    case 1:
                        alert("Tên đăng nhập đã tồn tại!!");
                        $("#signupForm #username").siblings("label").css("color", "#CB4335");
                        break;
                    case 2:
                        alert("Lỗi sở dữ liệu. Xin hãy thử lại sau.");
                        break;
                    case 3:
                        alert("Thông tin đã gửi không hợp lệ.");
                        break;
                    default:
                        alert("Lỗi không xác định...");
                }
            }
        }, "json")
        return false;
    })
})