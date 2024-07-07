$("#cepinput").mask("00000-000")

function checkInput() {
  const cepinput = document.getElementById("cepinput").value
  const errordiv = document.getElementById('messageError')
  console.log(cepinput.length)
  if(cepinput.length < 9){
    errordiv.innerHTML = `CEP invalido`
  }else {
    errordiv.innerHTML = ``
  }
}