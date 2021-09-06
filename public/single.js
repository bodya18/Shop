addEventListener('load', ()=>{
    let request = new XMLHttpRequest

    request.open("POST", "/api/settings", true);   

    request.setRequestHeader("Content-Type", "application/json");

    request.addEventListener("load", function () {
        let data = JSON.parse(request.response)
        let single_quote = document.getElementById('single_quote')
        for (const i in data) {
            if (data[i]._key === 'single_quote') {
                single_quote.insertAdjacentHTML('beforeend', data[i].value)
                break;
            }
        }
    })
    request.send()
})

document.getElementById('create_order').addEventListener('click', (e)=>{
    e.preventDefault()
    radio = document.getElementsByName('DimensionProductId')
    let DimensionProductId = null
    for (const i in radio) {
        if(radio[i].checked)
            DimensionProductId = radio[i].value
    }
    let address = document.getElementById('address').value
    let number = document.getElementById('number').value
    if(!DimensionProductId){
        document.getElementById('error_order').innerHTML = '' 
        document.getElementById('error_order').innerHTML = "Выберите размер товара"
        return
    }
    if(number.length < 6){
        document.getElementById('error_order').innerHTML = '' 
        document.getElementById('error_order').innerHTML = "Введите настоящий номер"
        return
    }
    if(address.length < 6){
        document.getElementById('error_order').innerHTML = '' 
        document.getElementById('error_order').innerHTML = "Введите настоящий адрес"
        return
    }
    $('#exampleModalCenter').modal('hide');
    swal({
        position: 'top-end',
        type: 'success',
        title: 'Товар успешно заказан',
        showConfirmButton: false,
        timer: 1500
      })
    let data = JSON.stringify({DimensionProductId, address, number})
    let request = new XMLHttpRequest
    request.open("POST", "/product/create/orders")
    request.setRequestHeader("Content-Type", "application/json")
    request.send(data)
})