const notify = ({ type, message }) => {
  if (!type) {
    type = "success"
    message = "Transacción exitosa"
  }

  const alert = document.createElement("div")
  alert.classList.add("alert-father")
  const html = `<div class="alert-container alert-${type}">
  <div class="alert-header">
    <span>Notificación</span>
    <span class="close">X</span>
  </div>
  <div class="alert-body">
    <div class="">
      ${message}
    </div>
    <div class="">
      <button class="close">Aceptar</button>
    </div>
  </div>
</div>`

  alert.innerHTML = html
  const body = document.querySelector("body")
  const appContainer = document.querySelector(".app")
  appContainer.classList.add("overlay")
  body.appendChild(alert)

  initEvents()
}

function initEvents() {
  const botones = document.querySelectorAll(".close")
  botones.forEach((boton) => {
    boton.onclick = (e) => {
      console.log(e)
      const appContainer = document.querySelector(".app")
      appContainer.classList.remove("overlay")
      const alertContainer = document.querySelector(".alert-father")
      const body = document.querySelector("body")
      body.removeChild(alertContainer)
    }
  })
}

export default notify
