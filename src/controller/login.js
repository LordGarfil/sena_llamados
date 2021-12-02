import notify from "../views/notify.js"

const loginForm = document.getElementById("main-form");
loginForm.addEventListener("submit", onSubmit);

async function onSubmit(event) {
    event.preventDefault();
    var user = document.getElementsByName("user")[0].value;
    var password = document.getElementsByName("password")[0].value;
    if (user.trim() === "" || password.trim() === "") {
        notify({
            type: "danger",
            message: "Debe ingresar todos los datos"
        });
    } else {
        const url = "http://localhost/sena_llamados/src/model/login.php";
        var formdata = new FormData(document.getElementById("main-form"));
        postFormData(url, formdata);
    }
}


async function postFormData(url, formdata) {
    const fetchOptions = {
        method: "post",
        body: formdata,
    }
    const response = await fetch(url, fetchOptions);
    const userValidation = await response.json();
    if (userValidation["error"] === "true") {
        notify({
            type: "danger",
            message: userValidation["message"]
        });
    } else {
        console.log(userValidation)
        const rol = userValidation['rol'].toLowerCase()
        window.location.replace("./src/" + rol);
    }
}