import notify from "../views/notify.js";
import docente from "./docente.js";
import {Mail} from "./mail.js";
class Llamados {
  loggedPerson = {};
  estudiantes = []

  async addForm() {
    var html = `<!-- modal de datos del usuario -->
      <div class="regla-modal-header">
        <div class="title">Nuevo llamado</div>
        <div class="close-button">X</div>
      </div>
      <div class="modal-body">
        <form id="llamado-form"> 
          <select class="category" name="regla_id" id="reglas"></select>
          <select class="category" name="materia_id" id="materias"></select>
          <select class="category" name="persona_id" id="estudiante"></select>
          <textarea class="text_area"placeholder="Observación" name="observacion" rows="4" cols="50"></textarea>
          <input class="field" type="hidden" id="docente_id" name="docente_id" value="${userData.persona_id}">
          <input class="save_button" type="submit" value="Guardar">
        </form>
      </div>`;

    // agregamos el modal
    var father = document.querySelector(".app");
    const modal = document.createElement("div");
    modal.classList.add("regla-modal");
    modal.classList.add("active");
    modal.setAttribute("name", "modal")
    modal.setAttribute("id", "regla-modal");
    modal.innerHTML += html;

    //Creamos el overlay
    const overlay = document.createElement("div");
    overlay.classList.add("active");
    overlay.setAttribute("id", "overlay");

    //Agregamos el formulario y el overlay
    father.appendChild(overlay);
    father.appendChild(modal);

    // Close button in modal
    var cerrarModalReglas = document.querySelector(".close-button");
    cerrarModalReglas.onclick = (e) => {
      this.hideModal();
    };

    /// Agregamos las reglas
    const reglasSelect = document.querySelector("#reglas");
    const reglasData = await this.getReglas();
    this.cargarSelectReglas(reglasSelect, reglasData);

    /// Agregamos las materias
    const materiaSelected = document.querySelector("#selectMaterias").value;
    const materiasSelect = document.querySelector("#materias");
    const materiaData = await this.getMaterias(`${userData.persona_id}`);
    this.cargarSelectMaterias(materiasSelect, materiaData, materiaSelected);
    document.getElementById("materias").onchange = function () {
      const llamados = new Llamados();
      llamados.cleanEstudiantesOptions();
      llamados.onMateriaChange(llamados);
    };

    /// Agregamos los estudiantes iniciales
    const estudianteSelect = document.querySelector("#estudiante");
    this.estudiantes = await this.getEstudiantes(materiaSelected);
    this.cargarSelectEstudiantes(estudianteSelect, this.estudiantes);

    /// agregamos metodo submit
    const llamadoForm = document.getElementById("llamado-form");
    llamadoForm.addEventListener("submit", e => this.onSubmit(e));
  }

  hideModal() {
    var overlay = document.querySelector("#overlay");
    var studentModal = document.querySelector(".regla-modal");
    studentModal.remove();
    overlay.remove();
  }

  updateForm() {}

  async getReglas() {
    const req = await fetch(`../model/reglas.php`);
    const res = await req.json();
    return res;
  }

  async getMaterias(persona_id) {
    const req = await fetch(
      `../model/materias_persona.php?persona_id=${persona_id}`
    );
    const res = await req.json();
    return res;
  }

  async getEstudiantes(materia_id) {
    const req = await fetch(
      `../model/estudiantes_materia.php?materia_id=${materia_id}`
    );
    const res = await req.json();
    return res;
  }

  cargarSelectReglas(ref, data) {
    let options = `<option value="0">Seleccione una regla</option>`;
    data.forEach((item) => {
      options += `
        <option value="${item.id}">${item.articulo} - ${item.nombre}</option>
      `;
    });
    ref.innerHTML = options;
  }

  cargarSelectMaterias(ref, data, init) {
    let options = `<option value="0">Seleccione una materia</option>`;
    data.forEach((item) => {
      if (item.materia_id == init) {
        options += `
        <option selected value="${item.materia_id}">${item.materia}</option>
      `;
      } else {
        options += `
        <option value="${item.materia_id}">${item.materia}</option>
      `;
      }
    });
    ref.innerHTML = options;
  }

  cargarSelectEstudiantes(ref, data) {
    let options = "";
    if (data.error === "true") {
      options += `
      <option value="0">Seleccione un estudiante</option>
    `;
    } else {
      options += `
      <option value="0">Seleccione un estudiante</option>
    `;
      data.forEach((item) => {
        options += `
          <option value="${item.id}">${item.nombre}</option>
        `;
      });
    }
    ref.innerHTML = options;
  }

  cleanEstudiantesOptions() {
    const estudiantes = document.querySelector("#estudiante");
    estudiantes.innerHTML = "";
  }

  async onMateriaChange(llamados) {
    const materiaSelected = document.querySelector("#materias").value;
    const estudianteSelect = document.querySelector("#estudiante");
    this.estudiantes = await llamados.getEstudiantes(materiaSelected);
    llamados.cargarSelectEstudiantes(estudianteSelect, this.estudiantes);
  }

  async onSubmit(event) {
    event.preventDefault();
    var reglaId = document.getElementsByName("regla_id")[0].value;
    var materiaId = document.getElementsByName("materia_id")[0].value;
    var personaId = document.getElementsByName("persona_id")[0].value;
    var observacion = document.getElementsByName("observacion")[0].value;
    var regla = document.getElementsByName("regla_id")[0].selectedOptions[0].textContent;
    console.log(reglaId)
    console.log(materiaId)
    console.log(personaId)
    console.log(observacion)
    if (
      reglaId.trim() === 0 ||
      materiaId.trim() === 0 ||
      personaId.trim() === "0" ||
      observacion.trim() === ""
    ) {
      notify({
        type: "danger",
        message: "Debe ingresar todos los datos",
      });
    } else {
      const url = "../model/llamados.php";
      var formdata = new FormData(document.getElementById("llamado-form"));

      var llamados = new Llamados();
      var result = await llamados.postFormData(url, formdata);
      if (result == true) {
        llamados.hideModal();
      }
      const estudiante = this.estudiantes.find(estudiante => estudiante.id == personaId)
      const titulo = "Nuevo llamado | " + regla;
      const mensaje = "Se ha generado un llamado de atencion a su nombre: <br/>" + observacion
      const mail = new Mail(estudiante.correo, titulo, mensaje)
      mail.send()
      const d = new docente()
      const docenteId = d.docenteData.persona_id
      d.cargarTablaLlamados(docenteId)
    }
  }

  async postFormData(url, formdata) {
    const fetchOptions = {
      method: "post",
      body: formdata,
    };
    const response = await fetch(url, fetchOptions);
    const userValidation = await response.json();
    if (userValidation["error"] === "true") {
      notify({
        type: "danger",
        message: userValidation["message"],
      });
      return false;
    } else {
      notify({
        type: "success",
        message: "¡Llamado creado con éxito!",
      });
      return true;
    }
  }
}

export default Llamados;
