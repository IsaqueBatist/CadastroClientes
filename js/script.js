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

async function getData(cep) {
  try{
    const {data} = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
  }catch (error){
    console.error(error)
  }
}

document.getElementById('formData').addEventListener('submit', function(event) {
  event.preventDefault()
  const cep = document.getElementById("cepinput").value
  const cepkey = cep.replace("-", "")
  getData(cepkey)
})