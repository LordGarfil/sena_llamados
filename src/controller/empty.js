class Empty{
  render(text){
    const html = `
      <div class="empty-state">
  <div class="empty-state__content">
    <div class="empty-state__icon">
      <img src="../imagenes/empty.png" alt="">
    </div>
    <div class="empty-state__message">No se encontraron datos.</div>
    <div class="empty-state__help">
      ${text}
    </div>
  </div>
</div>
    `
    return html
  }
}

export default Empty