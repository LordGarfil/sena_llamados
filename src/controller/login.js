const loginForm = document.getElementById("main-form");
loginForm.addEventListener("submit", onSubmit);

async function onSubmit(event) {
    event.preventDefault();
    var user = document.getElementsByName("user")[0].value;
    var password = document.getElementsByName("password")[0].value;
    if (user.trim() === "" || password.trim() === "") {
        alert("Debe ingresar todos los datos")
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
    console.log(userValidation);
    console.log(Object.keys(userValidation).length);
    if (Object.keys(userValidation).length === 0) {
        alert(`API - RESPONSE {}`);
    } else
    if (userValidation["error"] === "true") {
        alert(userValidation["message"]);
    } else {
        window.location.replace("http://www.w3schools.com");
        alert("Logueado el care tamal esete y su rol es " + userValidation["rol_id"]);
    }
}