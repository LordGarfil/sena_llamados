import notify from "../views/notify.js";
class Reglas {
  async addForm() {
    var html = `<!-- modal de datos del usuario -->
    <div class="regla-modal-header">
      <div class="title">Nueva regla</div>
      <div class="close-button">X</div>
    </div>
    <div class="modal-body">
      <form id="regla-form"> 
        <input class="field" type="text" placeholder="Articulo" name="articulo">
        <input class="field" type="text" placeholder="titulo" name="nombre">
        <select class="category" name="categoria_id" id="categories"></select>
        <textarea class="text_area"placeholder="Descripcion" name="descripcion" rows="4" cols="50"></textarea>
        <input class="save_button" type="submit" value="Guardar">
      </form>
    </div>`;

    // agregamos el mmodal
    var father = document.querySelector(".app");
    const modal = document.createElement("div");
    modal.classList.add("regla-modal");
    modal.classList.add("active");
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
    var categorySelect = document.querySelector("#categories");
    var categoryData = await this.getCategoriasReglas();
    this.cargarSelect(categorySelect, categoryData, "Categoria");

    /// agregamos metodo submit
    const reglaForm = document.getElementById("regla-form");
    reglaForm.addEventListener("submit", this.onSubmit);
  }

  hideModal() {
    var overlay = document.querySelector("#overlay");
    var studentModal = document.querySelector(".regla-modal");
    studentModal.remove();
    overlay.remove();
  }

  updateForm() {}

  async getCategoriasReglas() {
    const req = await fetch(`../model/categorias.php`);
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
    var article = document.getElementsByName("articulo")[0].value;
    var title = document.getElementsByName("nombre")[0].value;
    var category = document.getElementsByName("categoria_id")[0].value;
    var description = document.getElementsByName("descripcion")[0].value;
    if (
      article.trim() === "" ||
      title.trim() === "" ||
      category.trim() == 0 ||
      description.trim() === ""
    ) {
      notify({
        type: "danger",
        message: "Debe ingresar todos los datos",
      });
    } else {
      const url = "../model/reglas.php";
      var formdata = new FormData(document.getElementById("regla-form"));

      var reglas = new Reglas();
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
        message: "¡Regla creada con éxito!",
      });
      return true;
    }
  }
}

export default Reglas;
