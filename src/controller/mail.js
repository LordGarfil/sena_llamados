export class Mail{
  constructor(receptor, titulo, mensaje){
    this.receptor = receptor;
    this.titulo = titulo;
    this.mensaje = mensaje;
  }

  async send(){
    const url = "../model/mail.php";
    const data = {
      receptor: this.receptor,
      titulo: this.titulo,
      mensaje: this.mensaje
    }
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify(data),
    };
    await fetch(url, fetchOptions);
  }

}