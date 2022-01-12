import Estudiantes from "./estudiantes.js"
import notify from "../views/notify.js"
import Reglas from "./reglas.js"
import Llamados from "./llamados.js"
class docente{
  buttonToogle = 0

  async init(){
    await this.cargarHeader()
    await this.cargarTablaLlamados()
    this.initialEvents()
  }

  async cargarHeader(){
    const header = document.querySelector('.header')
    header.querySelector('#nombrePesona').innerHTML = userData.persona
    const selectMaterias = document.querySelector('#selectMaterias')

    const materias = await this.getPersonaMaterias()  
    const materias_ = materias.map(item =>{
      const item_ = {}
      item_.id = item.materia_id
      item_.nombre = item.materia
      return item_
    })
    this.cargarSelect(selectMaterias, materias_)
  }

  cargarSelect(ref, data){
    let options = ""
    data.forEach(item =>{
      options += `
        <option value="${item.id}">${item.nombre}</option>
      `
    })
    ref.innerHTML = options
  }

  async getPersonaMaterias(){
    const req = await fetch(`../model/materias_persona.php?persona_id=${userData.persona_id}`)
    const res = await req.json()
    return res
  }

  async getLlamadosDocente(){
    const materiaId = document.querySelector('#selectMaterias').value
    const req = await fetch(`../model/llamados.php?filter=2&persona_id=${userData.persona_id}&materia_id=${materiaId}`)
    const res = await req.json()
    return res
  }

  async getLlamadosEstudiante(personaId){
    const materiaId = document.querySelector('#selectMaterias').value
    const req = await fetch(`../model/llamados.php?filter=1&persona_id=${personaId}&materia_id=${materiaId}`)
    const res = await req.json()
    return res
  }

  async cargarTablaLlamados(){
    const tabla = document.querySelector('.div-table')
    const llamados = await this.getLlamadosDocente()

    let llamadosHtml = ""

    if(!llamados.error){

      const llamadosNotZero = llamados.every(item => item.llamados == 0)

      if(!llamadosNotZero){
        tabla.innerHTML = `
          <div class="table-header">
          <div class="item-column">Identificación</div>
          <div class="item-column">Estudiante</div>
          <div class="item-column">Correo</div>
          <div class="item-column"># Llamados</div>
        </div>
        `
        llamados.forEach(llamado => {
        llamadosHtml += `
          <div class="table-item">
          <div class="item-column" name="personaId">${llamado.estudiante_id}</div>
          <div class="item-column" name="nombre">${llamado.estudiante}</div>
          <div class="item-column" name="correo">${llamado.correo}</div>
          <div class="item-column" name="numLlamados"><div class="badge">${llamado.llamados}</div></div>
        </div>
        `
      })
      tabla.innerHTML += llamadosHtml
      this.listenToTableItems()
      }else{
        tabla.innerHTML = "No se encontraron llamados"
      }
      
    }else{
      tabla.innerHTML = "No se encontraron llamados"
    }
  }

  initialEvents(){
    const materiaSelect = document.querySelector('#selectMaterias')
    materiaSelect.onchange = (e) =>{
      this.cargarTablaLlamados()
    }

    const buttonAgregar = document.querySelector('#btnAgregar')
    buttonAgregar.onclick = (e) =>{
      if(this.buttonToogle == 0){
        this.showAgregarOptions()
      }else{
        this.hideAgregarOptions()
      }
    }

  }

  async listenToTableItems() {
    const tableItem = document.querySelectorAll('.table-item')
    if(tableItem){
      tableItem.forEach(item => {
      item.addEventListener('click', (e) => {
        const target = e.target
        let itemTable = null
        if(target.classList.contains('table-item')){
          itemTable = target
        }else{
          itemTable = target.parentNode
        }
        const personaId = itemTable.querySelector('div[name=personaId]').textContent
        this.getLlamadosEstudiante(personaId)
        .then(llamados => {
           this.mostrarLlamadosEstudiante(llamados, itemTable)
        })
      })
    })
    }
  }

  async mostrarLlamadosEstudiante(llamados, itemTable){
    this.addForm() 
    const RowsColumn = document.querySelector('.rows-column')
    llamados.forEach(llamado => {
      RowsColumn.appendChild(this.mostrarRowItems(llamado))
    })

    const rowsItem = document.querySelectorAll('.row-item')
    let req = await fetch('../model/reglas.php?')
    const reglas = await req.json()
    let reglasHtml = `<select name="regla_id">`
    let optionsHtml = ''
    reglas.forEach(regla =>{
      optionsHtml += `<option value="${regla.id}">${regla.nombre}</option>`
    })
    reglasHtml += `${optionsHtml}</select>`

    req = await fetch(`../model/materias_persona.php?persona_id=${userData.persona_id}`)
    const materias = await req.json()

    let materiasHtml = `<select name="materia_id">`
    optionsHtml = ''
    materias.forEach(materia =>{
      optionsHtml += `<option value="${materia.materia_id}">${materia.materia}</option>`
    })
    materiasHtml += `${optionsHtml}</select>`

    rowsItem.forEach(row => {
      row.addEventListener('click', (e) => {
        let parent = null
        if(e.target.classList.contains('row-item')){
          parent = e.target
        }else if(e.target.classList.contains('bottom-data')){
          parent = e.target.parentElement
        }else{
          parent = e.target.parentElement.parentElement
        }
        const llamadoId = parent.querySelector('div[name=llamadoId]').textContent
        const reglaId = parent.querySelector('div[name=reglaId]').textContent
        const materiaId = parent.querySelector('div[name=materiaId]').textContent
        const estudiante = parent.querySelector('div[name=estudiante]').textContent
        const estudianteId = parent.querySelector('div[name=estudiante_id]').textContent
        const observacion = parent.querySelector('div[name=observacion]').textContent

        this.mostrarLlamadoDetails({
          llamadoId, reglaId, materiaId, estudiante, estudianteId, observacion
        }, reglasHtml, materiasHtml, parent, itemTable)
      })
    })
  }

  mostrarRowItems(data){
    const container = document.createElement('div')
    container.className = 'row-item'
    const html = `
          <div class="top-data">
            <strong name="regla">${data.regla}</strong>
            <div class="categoria" style="background:${data.color}">
              ${data.categoria}
            </div>
          </div>
          <div class="bottom-data">
            <small>
              ${data.fecha}
            </small>
          </div>
          <div class="hidden-info">
            <div name="llamadoId" hidden>${data.llamado_id}</div>
            <div name="reglaId" hidden>${data.regla_id}</div>
            <div name="materiaId" hidden>${data.materia_id}</div>
            <div name="materia" hidden>${data.materia}</div>
            <div name="estudiante_id" hidden>${data.estudiante_id}</div>
            <div name="estudiante" hidden>${data.estudiante}</div>
            <div name="observacion" hidden>${data.observacion}</div>
          </div>
    `
    container.innerHTML = html
    return container
  }

  mostrarLlamadoDetails(data, reglas, materias, rowItem, itemTable){
    const infoColumn = document.querySelector('.info-column')
    const html = `<form>
      ${reglas}
        ${materias}
       <input type="text" value="${data.estudiante}">
       <input type="text" name="persona_id" value="${data.estudianteId}" hidden>
        <input type="text" name="id" value="${data.llamadoId}" hidden>
        <textarea name="observacion" cols="30" rows="10">${data.observacion}</textarea>
        <div class="actions">
          <button class="primary" name="guardar">Guardar</button>
          <button class="danger" name="eliminar">Eliminar</button>
        </div>
    </form`
    infoColumn.innerHTML = html

    document.querySelector("select[name=materia_id]").value = data.materiaId
    document.querySelector("select[name=regla_id]").value = data.reglaId


    const guardarButton = document.querySelector('button[name="guardar"]')
    guardarButton.addEventListener('click', (e) =>{
      this.editarLlamado(e, data, rowItem, itemTable)
    })

  }

  addForm(){
    const html = `
  <div class="modal-container">
    <div class="modal-header">
      <div class="info-header"><span>Llamados de atención | Juan Restrepo</span></div>
      <div class="close-button">x</div>
    </div>
    <div class="modal-body">
      <div class="rows-column">
        
      </div>
      <div class="info-column">
      </div>
    </div>
  </div>
    `;

    // agregamos el modal
    var father = document.querySelector(".app");
    const modal = document.createElement("div");
    modal.classList.add("modal-extended");
    modal.classList.add("active");
    modal.setAttribute("id", "llamados-modal");
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
  }

  showAgregarOptions(){
    const container = document.querySelector('.actions')

    const optionsContainer = document.createElement('div')
    optionsContainer.classList.add('actions-pop-up')
    const options = ` <div class="action-item" id="item-estudiante">Estudiante</div>
            <div class="action-item" id="item-regla">Regla</div>
            <div class="action-item" id="item-llamado">Llamado</div>`
    optionsContainer.innerHTML = options
    container.append(optionsContainer)
    this.buttonToogle = 1

    this.initActionsEvents()
  }

  hideAgregarOptions(){
    const container = document.querySelector('.actions')
    const optionsContainer = document.querySelector('.actions-pop-up')
    container.removeChild(optionsContainer)
    this.buttonToogle = 0
  }

  initActionsEvents(){
    const estudianteOption = document.querySelector('#item-estudiante')
    estudianteOption.onclick = (e) =>{
      this.hideAgregarOptions()
      const estudiante = new Estudiantes()
      estudiante.addForm()
    }

    const reglaOption = document.querySelector('#item-regla')
    reglaOption.onclick = (e) =>{
      this.hideAgregarOptions()
      const regla = new Reglas()
      regla.addForm()
    }

    const llamadoOptions = document.querySelector('#item-llamado')
    llamadoOptions.onclick = (e) =>{
      this.hideAgregarOptions()
      const llamado = new Llamados()
      llamado.addForm()
      llamado.loggedPerson = userData;
    }
  }

  hideModal() {
    var overlay = document.querySelector("#overlay");
    var modal = document.querySelector(".modal-extended");
    modal.remove();
    overlay.remove();
  }

  editarLlamado(e, previousData, rowItem, itemTable){
    e.preventDefault()
    const parent = e.target.parentElement.parentElement
    const form = new FormData(parent)
    form.append('method', 'PUT')
    form.append('docente_id', userData.persona_id)

    fetch('../model/llamados.php', {
      method: 'POST',
      body: form
    })
    .then(res =>{
      if(res){
        notify({
          type: "success",
          message: "Actualizado correctamente"
        })
        if(previousData.materiaId != form.get('materia_id')){
          this.removerLlamado(rowItem, itemTable)
        }
      }
    })

  }

  removerLlamado(rowItem, itemTable){
    const rowsColumn = document.querySelector('.rows-column')
    const rowItems = document.querySelectorAll('.row-item')
    const llamadoId = rowItem.querySelector('div[name=llamadoId]').textContent

    // Se remueve el llamado de la fila
    rowItems.forEach(item => {
      const llamadoId_ = item.querySelector('div[name=llamadoId]').textContent
      if(llamadoId_ == llamadoId){
        rowsColumn.removeChild(item)
      }
    })

    // Se resta el llamado del contador de llamados del estudiante
    const oldValue = itemTable.querySelector('.badge').textContent
    itemTable.querySelector('.badge').textContent = (oldValue - 1)

    // Se remueve la informacion del llamado seleccionado
    const infoColumn = document.querySelector('.info-column')
    const form = infoColumn.querySelector('form')
    infoColumn.removeChild(form)


  }

}

const app = new docente()
app.init()
