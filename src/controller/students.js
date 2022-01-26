import Empty from "./empty.js"

var data = [];

window.onload = async function () {
  const url = `http://localhost/sena_llamados/src/model/llamados.php?filter=${person_information["rol_id"]}&persona_id=${person_information["persona_id"]}`;
  const response = await fetch(url);
  const loadData = await response.json();
  if (typeof(loadData) != 'object' && !'error' in loadData) {
    data = loadData;
    loadStudentData();
    fillTheTable(loadData);
    stopLoading();
    const tableItem = document.querySelectorAll(".table-item");
    tableItem.forEach((element) => {
      element.addEventListener("click", onTableItemClick);
    });
  }else{
    loadStudentData();
    stopLoading()
    const body = document.querySelector(".body-content")
    const emptyObj = new Empty()
    const empty = emptyObj.render('Espera a que un docente te agregue un llamado.')
    body.innerHTML = empty
  }
};

function loadStudentData() {
  //Cargamos los datos del usuario
  loadPersonalData();

  // Cargamos los datos del header del estudiante

  var ficha = document.querySelector(".ficha");
  var name = document.querySelector(".student-name");
  var htmlName = `
   <a href="javascript:showModal()">
    ${person_information["persona"]}
  </a>`;
  name.innerHTML = htmlName;
  var htmlFicha = `
  <h1>${person_information["ficha_id"]}</h1>
  `;
  ficha.innerHTML = htmlFicha;
}

function fillTheTable(data) {
  var table = document.querySelector(".table");
  const header = document.createElement("div");
  header.classList.add("table-header");
  header.innerHTML = `
  <div class="item-column llamado">Llamado</div>
  <div class="item-column articulo">Artículo</div>
  <div class="item-column docente">Docente</div>
  <div class="item-column categoria">Categoría</div>
  `;

  const tableContent = document.createElement("div");
  tableContent.classList.add("table-content");

    data.forEach((d) => {
    const item = document.createElement("div");
    item.classList.add("table-item");
    const html = `
    <input type="hidden" id="llamadoId" value="${d["llamado_id"]}">
    <div class="llamado" name="item" >
      <h1>${d["regla"]}</h1>
    </div>
    <div class="articulo" name="item">
      <h1>${d["regla_id"]}</h1>
    </div>
    <div class="docente" name="item">
      <h1>${d["docente"]}</h1>
    </div>
    <div class="categoria" name="item" style="background-color:${d["color"]}" >
      ${d["categoria"]}
    </div>
  `;
    item.innerHTML = html;
    tableContent.appendChild(item);
  });

  table.appendChild(header);
  table.appendChild(tableContent);

  //Adding the event click
  const item = document.getElementsByName("item");
  item.forEach((element) => {
    element.addEventListener("click", onItemClick);
  });
}

function stopLoading() {
  document.querySelector(".center_loader").style = "display:none";
  document.querySelector(".body-content").classList.remove("invisible");
}

function loadPersonalData() {
  var bodyModal = document.querySelector(".modal-body");
  var html = `
  <div class="input-data">
    <div class="item-key">Id:</div>
    <div class="item-value">${person_information["persona_id"]}</div>
  </div>
  <div class="input-data">
    <div class="item-key">Nombre:</div>
    <div class="item-value">${person_information["persona"]}</div>
  </div>
  <div class="input-data">
    <div class="item-key">Rol:</div>
    <div class="item-value">${person_information["rol"]}</div>
  </div>
  <div class="input-data">
    <div class="item-key">Correo electronico:</div>
    <div class="item-value">${person_information["correo"]}</div>
  </div>
  <div class="input-data">
    <div class="item-key">Ficha:</div>
    <div class="item-value">${person_information["ficha_id"]} | ${person_information["ficha"]}</div>
  </div>
  `;
  bodyModal.innerHTML += html;
}

function showModal() {
  var overlay = document.querySelector("#overlay");
  var studentModal = document.querySelector(".student-modal");
  studentModal.classList.add("active");
  overlay.classList.add("active");
}

function showCallModal() {
  var overlay = document.querySelector("#call-overlay");
  var studentModal = document.querySelector(".call-modal");
  studentModal.classList.add("active");
  overlay.classList.add("active");
}

function hideModal() {
  var overlay = document.querySelector("#overlay");
  var studentModal = document.querySelector(".student-modal");
  studentModal.classList.remove("active");
  overlay.classList.remove("active");
}

function hideCallModal() {
  var overlay = document.querySelector("#call-overlay");
  var studentModal = document.querySelector(".call-modal");
  studentModal.classList.remove("active");
  overlay.classList.remove("active");
}

function onTableItemClick(event) {
  const tableItem = event.target;
  const llamado_id =
    tableItem.querySelector("#llamadoId") != null
      ? tableItem.querySelector("#llamadoId").value
      : -1;
  var found = data.find((element) => element["llamado_id"] == llamado_id);
  if (found) {
    var bodyCallModal = document.querySelector(".call-modal-body");
    var header = document.querySelector(".call-modal-header");
    header.innerHTML = `
      <div class="date">${found["fecha"]}</div>
      <div class="title">Llamado de atención</div>
      <button onclick="hideCallModal()" class="close-button">&times;</button>
    `;
    var html = `
      <div class="input-data">
        <div class="item-key">Titulo:</div>
        <div class="item-value">${found["regla"]}</div>
      </div>
      <div class="input-data">
        <div class="item-key">Regla:</div>
        <div class="item-value">${found["regla_id"]}</div>
      </div>
      <div class="input-data">
        <div class="item-key">Docente:</div>
        <div class="item-value">${found["materia"]} | ${found["docente"]}</div>
      </div>
      <div class="input-data">
        <div class="item-key">Observaciones:</div>
        <div class="item-value">${found["observaciones"]}</div>
      </div>
    `;
    bodyCallModal.innerHTML = html;
    showCallModal();
  }
}

function onItemClick(event) {
  event.preventDefault();
  const item = event.target.parentElement.parentElement;
  const llamado_id =
    item.querySelector("#llamadoId") != null
      ? item.querySelector("#llamadoId").value
      : -1;
  var found = data.find((element) => element["llamado_id"] == llamado_id);
  if (found) {
    var bodyCallModal = document.querySelector(".call-modal-body");
    var header = document.querySelector(".call-modal-header");
    header.innerHTML = `
      <div class="date">${found["fecha"]}</div>
      <div class="title">Llamado de atención</div>
      <button onclick="hideCallModal()" class="close-button">&times;</button>
    `;
    var html = `
      <div class="input-data">
        <div class="item-key">Titulo:</div>
        <div class="item-value">${found["regla"]}</div>
      </div>
      <div class="input-data">
        <div class="item-key">Regla:</div>
        <div class="item-value">${found["regla_id"]}</div>
      </div>
      <div class="input-data">
        <div class="item-key">Docente:</div>
        <div class="item-value">${found["materia"]} | ${found["docente"]}</div>
      </div>
      <div class="input-data">
        <div class="item-key">Observaciones:</div>
        <div class="item-value">${found["observaciones"]}</div>
      </div>
    `;
    bodyCallModal.innerHTML = html;
    showCallModal();
  }
}
