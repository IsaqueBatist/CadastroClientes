$("#cepinput").mask("00000-000")
function checkInput() {
  const cepinput = document.getElementById("cepinput").value
  const errordiv = document.getElementById('messageError')
  console.log(cepinput.length)
  if(cepinput.length < 9){
    errordiv.innerHTML = `CEP invalido`
  }else {
    errordiv.innerHTML = ``
    getData(cepinput.replace("-", ""))
  }
}

async function getData(cep) {
  const errordiv = document.getElementById("messageError").value
  try{
    const {data} = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    const {logradouro, bairro, localidade, uf } = data
    
    document.getElementById('adress').value = logradouro? logradouro: ''
    document.getElementById('neighborhood').value = bairro? bairro: ''
    document.getElementById('city').value = localidade? localidade: ''
    document.getElementById('state').value = uf? uf: ''
    uf? $("#housenumber").prop("disabled", false) : null


  }catch{
    errordiv.innerHTML = `CEP não encontrado`
  }
}