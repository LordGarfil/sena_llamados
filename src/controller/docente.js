import Estudiantes from "./estudiantes.js"
import Reglas from "./reglas.js"
import Llamados from "./llamados.js"
class docente{
  buttonToogle = 0

  async init(){
    console.log(userData)
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
          <div class="item-column">${llamado.estudiante_id}</div>
          <div class="item-column">${llamado.estudiante}</div>
          <div class="item-column">${llamado.correo}</div>
          <div class="item-column"><div class="badge">${llamado.llamados}</div></div>
        </div>
        `
      })
      tabla.innerHTML += llamadosHtml
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
      console.log(this.buttonToogle);
      if(this.buttonToogle == 0){
        this.showAgregarOptions()
      }else{
        this.hideAgregarOptions()
      }
    }
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
    }
  }

}

const app = new docente()
app.init()
