const countShowOrders = 1;
let nowIndexShowOrders = countShowOrders;
function AddMoreOrders(e){
    e.preventDefault()

    let request = new XMLHttpRequest();
    request.open("POST", "/api/orders/done", true);   

    request.setRequestHeader("Content-Type", "application/json");

    request.addEventListener("load", function () {
        let orders = JSON.parse(request.response)
        orders = orders.reverse()
        let thisOrders = orders.slice(nowIndexShowOrders, countShowOrders + nowIndexShowOrders)

        nowIndexShowOrders+=countShowOrders

        document.getElementById('show-more-orders').remove()
        let div = document.getElementById('showOrders')

        for (let i = 0; i < thisOrders.length; i++) {
            div.insertAdjacentHTML(
                'beforeend', 
                `<tr>
                    <td><h5>${thisOrders[i].title}</h5></td>
                    <td><h5>${thisOrders[i].dimension}</h5></td>
                    <td><h5>${thisOrders[i].NewPrice}</h5></td>
                    <td><h5>${thisOrders[i].address}</h5></td>
                    <td><h5>${thisOrders[i].number}</h5></td>
                    <td>
                        <form action="/admin/orders/repeat/${thisOrders.id}" method="POST">
                            <input type="submit" class="btn btn-warning" value="Перевести в первую стадию обработки">
                        </form>
                    </td>
                    <td>
                        <form action="/admin/orders/delete/${thisOrders.id}" method="POST">
                            <input type="submit" class="btn btn-danger" value="Удалить заказ">
                        </form>
                    </td>
                </tr>`
            )
        }
        if(orders.length > nowIndexShowOrders){
            var btn = document.createElement("button");
            btn.id = 'show-more-orders'
            btn.setAttribute("onclick","AddMoreOrders(event)");
            btn.className = 'btn btn-success btn-list-more'
            var t = document.createTextNode("Загрузить еще");
            btn.appendChild(t)
            but = document.getElementById('will-be-btn')
            but.append(btn)
        }
    })
    request.send()
}