import notify from "../views/notify.js";
class Estudiantes {
  async addForm() {
    var html = `<!-- modal dcreación d del usuario -->
    <div class="regla-modal-header">
      <div class="title">Nuevo estudiante</div>
      <div class="close-button">X</div>
    </div>
    <div class="modal-body">
      <form id="estudiante-form"> 
        <input class="field" type="text" placeholder="Identificación" name="id">
        <input class="field" type="text" placeholder="Nombres" name="nombre">
        <input class="field" type="text" placeholder="Apellidos" name="apellido">
        <input class="field" type="text" placeholder="Correo" name="correo">
        <select class="category" name="ficha" id="fichas"></select>
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

    /// Agregamos las categorias
    var categorySelect = document.querySelector("#fichas");
    var categoryData = await this.getFichas();
    this.cargarSelect(categorySelect, categoryData, "Seleccione una ficha");

    /// agregamos metodo submit
    const reglaForm = document.getElementById("estudiante-form");
    reglaForm.addEventListener("submit", this.onSubmit);
  }

  hideModal() {
    var overlay = document.querySelector("#overlay");
    var studentModal = document.querySelector(".regla-modal");
    studentModal.remove();
    overlay.remove();
  }

  updateForm() {}

  async getFichas() {
    const req = await fetch(`../model/fichas.php`);
    const res = await req.json();
    return res;
  }

  cargarSelect(ref, data, firstItem) {
    let options = `<option value="0">${firstItem}</option>`;
    data.forEach((item) => {
      options += `
        <option value="${item.id}">${item.nombre}</option>
      `;
    });
    ref.innerHTML = options;
  }

  async onSubmit(event) {
    event.preventDefault();
    var id = document.getElementsByName("id")[0].value;
    var nombre = document.getElementsByName("nombre")[0].value;
    var apellido = document.getElementsByName("apellido")[0].value;
    var correo = document.getElementsByName("correo")[0].value;
    var ficha_id = document.getElementsByName("ficha")[0].value;
    if (
      id.trim() === "" ||
      nombre.trim() === "" ||
      apellido.trim() === "" ||
      correo.trim() === "" ||
      ficha_id.trim() == 0
    ) {
      notify({
        type: "danger",
        message: "Debe ingresar todos los datos",
      });
    } else {
      const url = "../model/estudiante.php";
      var formdata = new FormData(document.getElementById("estudiante-form"));

      var reglas = new Estudiantes();
      var result = await reglas.postFormData(url, formdata);
      if (result == true) {
        reglas.hideModal();
      }
    }
  }

  async postFormData(url, formdata) {
    const fetchOptions = {
      method: "post",
      body: formdata,
    };
    const response = await fetch(url, fetchOptions);
    const userValidation = await response.json();
    console.log(userValidation);
    if (userValidation["error"] === "true") {
      notify({
        type: "danger",
        message: userValidation["message"],
      });
      return false;
    } else {
      notify({
        type: "success",
        message: "¡Estudiante creado con éxito!",
      });
      return true;
    }
  }
}

export default Estudiantes;
