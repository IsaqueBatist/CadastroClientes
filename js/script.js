$("#cepinput").mask("00000-000")
const errordiv = document.getElementById('messageError')
const form = document.getElementById('formData')

//Aray com os clientes
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

//Faz do tamanho do CEP e se ele existe
function checkInput() {
  const cepinput = document.getElementById("cepinput").value
  if (cepinput.length < 9) {
    errordiv.innerHTML = `CEP invalido`
    $("#savebutton").prop("disabled", true)
    setInputs(false)
  } else {
    errordiv.innerHTML = ``
    $("#savebutton").prop("disabled", false)
    getData(cepinput.replace("-", ""))
  }
}

//Faz o preenchimentos dos inputs desabilitados
function setInputs(data = [], validation) {
  const { logradouro, bairro, localidade, uf } = data
  if (validation) {
    document.getElementById('adress').value = logradouro
    document.getElementById('neighborhood').value = bairro
    document.getElementById('city').value = localidade
    document.getElementById('state').value = uf
    $("#housenumber").prop("disabled", false)
    $("#savebutton").prop("disabled", false)
  } else {
    document.getElementById('adress').value = ""
    document.getElementById('neighborhood').value = ""
    document.getElementById('city').value = ""
    document.getElementById('state').value = ""
    $("#housenumber").prop("disabled", true)
    $("#savebutton").prop("disabled", true)
    errordiv.innerHTML = 'CEP não encontrado'
  }
}

//Faz o get na API
async function getData(cep) {
  const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
  data.cep ? setInputs(data, true) : setInputs(data, false)
}

//Cria um novo cliente e o adiciona no array
form.addEventListener('submit', function (event) {
  event.preventDefault()
  const fullname = `${document.getElementById('iname').value} ${document.getElementById('ilastname').value}`
  if (customers.filter((e) => e.name === fullname).length == 0) {
    let newCustomers = {
      id: customers.length + 1,
      name: fullname,
      adress: document.getElementById('adress').value + ', ' + document.getElementById('housenumber').value,
      cep: document.getElementById("cepinput").value,
      neighborhood: document.getElementById("neighborhood").value,
      city: document.getElementById("city").value,
      stat: document.getElementById("state").value,
    }
    customers.push(newCustomers)
    loadTable(newCustomers)
    form.reset()
  } else {
    alert('Usuario já existente')
  }

})

//preenche a tabela de acordo com o Array
function loadTable(customer) {
  const body = document.getElementById('databody')
  body.innerHTML += `
        <tr>
          <th scope="row">${customer.id}</th>
          <td>${customer.name}</td>
          <td  class="d-none d-md-table-cell">${customer.adress}</td>
          <td  class="d-none d-md-table-cell"></td>
          <td  class="d-none d-md-table-cell"></td>
          <td  class="d-none d-md-table-cell"></td>
          <td>${customer.cep}</td>
          <td>${customer.neighborhood}</td>
          <td>${customer.city}</td>
          <td>${customer.stat}</td>
        </tr>
      `
}
customers.map((e) => loadTable(e))

