class Estudiantes {
  addForm() {
    var html = `<!-- modal de datos del usuario -->
    <div class="regla-modal active" id="regla-modal">
      <div class="regla-modal-header">
        <div class="title">Nuevo estudiante</div>
        <div class="close-button">X</div>
      </div>
      <div class="modal-body">
        <input class="field" type="text" placeholder="Identificación" name="id" autocomplete="false">
        <input class="field" type="text" placeholder="Nombres" name="nombre">
        <input class="field" type="text" placeholder="Apellidos" name="lastName">
        <input class="field" type="text" placeholder="Correo" name="mail">
        <input class="field" type="text" placeholder="Ficha" name="ficha">
        <input class="save_button" type="submit" value="Guardar">
      </div>
    </div>
    <div id="overlay" class="active"></div>`;

    var father = document.querySelector(".app");
    father.innerHTML += html;
    var cerrarModalReglas = document.querySelector(".close-button");
    cerrarModalReglas.onclick = (e) => {
      this.hideModal();
    };
  }
  hideModal() {
    var overlay = document.querySelector("#overlay");
    var studentModal = document.querySelector(".regla-modal");
    studentModal.remove();
    overlay.remove();
  }
  updateForm() {}
}

export default Estudiantes;
