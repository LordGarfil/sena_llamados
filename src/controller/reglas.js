class Reglas {
  addForm() {
    var html = `<!-- modal de datos del usuario -->
    <div class="regla-modal active" id="regla-modal">
      <div class="regla-modal-header">
        <div class="title">Nueva regla</div>
        <div class="close-button">X</div>
      </div>
      <div class="modal-body">
        <input class="field" type="text" placeholder="Articulo" name="article" autocomplete="false">
        <input class="field" type="text" placeholder="titulo" name="title">
        <select class="category" name="category">
          <option value="volvo">Categoria</option>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
        <textarea class="text_area"placeholder="Descripcion" name="description" rows="4" cols="50"></textarea>
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

export default Reglas;
