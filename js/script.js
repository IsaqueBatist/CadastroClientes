let customers = [
  {
    id: 1,
    name: "Glauco Todesco",
    adress: "	Rua Leite Penteado, 999",
    cep: "18010-050",
    neighborhood: "	Centro",
    city: "Sorocaba",
    stat: "SP",
  }
]

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
document.getElementById('formData').addEventListener('submit', function(event) {
  event.preventDefault()

  let newCustomers = {
    id: customers.length + 1,
    name: document.getElementById('iname').value + ' ' + document.getElementById('ilastname').value ,
    adress: document.getElementById('adress').value + ', ' +document.getElementById('housenumber').value,
    cep: document.getElementById("cepinput").value,
    neighborhood:  document.getElementById("neighborhood").value,
    city: document.getElementById("city").value,
    stat: document.getElementById("state").value,
  }
  customers.push(newCustomers)
  loadTable(customers)

})

function loadTable(data) {
  const body = document.getElementById('databody')
  body.innerHTML = ''
  data.map((customer) => {
    body.innerHTML += `
      <tr>
        <th scope="row">${customer.id}</th>
        <td>${customer.name}</td>
        <td>${customer.adress}</td>
        <td></td>
        <td></td>
        <td></td>
        <td>${customer.cep}</td>
        <td>${customer.neighborhood}</td>
        <td>${customer.city}</td>
        <td>${customer.stat}</td>
      </tr>
    `
  })
}
loadTable(customers)
