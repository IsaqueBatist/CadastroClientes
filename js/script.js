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

function setInputs(data, validation){
  const errordiv = document.getElementById("messageError")
  const {logradouro, bairro, localidade, uf } = data
  if(validation){
    document.getElementById('adress').value = logradouro
    document.getElementById('neighborhood').value = bairro
    document.getElementById('city').value = localidade
    document.getElementById('state').value = uf
    $("#housenumber").prop("disabled", false)
  }else {
    document.getElementById('adress').value = ""
    document.getElementById('neighborhood').value = ""
    document.getElementById('city').value = ""
    document.getElementById('state').value = ""
    $("#housenumber").prop("disabled", true)

    errordiv.innerHTML = 'CEP não encontrado'
  }
}

async function getData(cep) {
    const {data} = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    data.cep? setInputs(data, true) : setInputs(data, false)
}
document.getElementById('formData').addEventListener('submit', function(event) {
  event.preventDefault()
  const fullname = document.getElementById('iname').value + ' ' + document.getElementById('ilastname').value
  if(customers.filter((e) => e.name === fullname).length == 0){
      let newCustomers = {
        id: customers.length + 1,
        name: fullname,
        adress: document.getElementById('adress').value + ', ' +document.getElementById('housenumber').value,
        cep: document.getElementById("cepinput").value,
        neighborhood:  document.getElementById("neighborhood").value,
        city: document.getElementById("city").value,
        stat: document.getElementById("state").value,
      }
      customers.push(newCustomers)
      loadTable(newCustomers)
  }else{
    alert('Usuario já existente')
  }

})

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

