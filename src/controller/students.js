console.log(person_information);
window.onload = async function (){
  const url = `http://localhost/sena_llamados/src/model/llamados.php?filter=${person_information["rol_id"]}&persona_id=${person_information["persona_id"]}`;
  const response = await fetch(url);
  const loadData = await response.json();
  if(loadData != null || loadData.length > 0){
    loadStudentData();
    fillTheTable(loadData);
    stopLoading();
  }
};


function loadStudentData(){
  var ficha = document.querySelector(".ficha");
  var name = document.querySelector(".student-name");
  var htmlName = `
   <a href="">
    ${person_information["persona"]}
  </a>`
  name.innerHTML = htmlName;
  var htmlFicha = `
  <h1>${person_information["ficha_id"]}</h1>
  `
  ficha.innerHTML = htmlFicha;
}

function fillTheTable(data){
  var table = document.querySelector(".table")
 data.forEach(d=>{
  console.log(d);
  const item = document.createElement("div");
  item.classList.add("item");
  const html = `
    <div class="llamado">
      <h1>${d["regla"]}</h1>
    </div>
    <div class="articulo">
      <h1>${d["regla_id"]}</h1>
    </div>
    <div class="docente">
      <h1>${d["docente"]}</h1>
    </div>
    <div class="categoria" style="background-color:${d["color"]}" >
      ${d["categoria"]}
    </div>
  `;
  item.innerHTML = html;
  table.appendChild(item);
 })
}


function stopLoading(){
  document.querySelector(".center_loader").style = "display:none";
  document.querySelector(".body-content").classList.remove("invisible");
}