class docente{
  async init(){
    // console.log(userData)
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
    const req = await fetch(`../model/persona_materias.php?persona_id=${userData.persona_id}`)
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
    console.log(llamados)

    let llamadosHtml = ""

    if(!llamados.error){

      const llamadosNotZero = llamados.every(item => item.llamados == 0)

      if(!llamadosNotZero){
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
      tabla.innerHTML = llamadosHtml
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
  }

}

const app = new docente()
app.init()
