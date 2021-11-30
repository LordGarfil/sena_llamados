

document.querySelector("form").onsubmit = async function (){
  var user = document.getElementById("user").value;
  var password = document.getElementById("password").value;
  if(user === "" || password ===  ""){
    alert("Debe ingresar todos los datos")
  }else{
    var url = "http://localhost/sena_llamados/src/model/login.php?user=${user}&password=${password}";
    var resultFetch = await fetch(url);
    console.log(resultFetch);
    return false;
  }
};
