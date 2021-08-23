const countShowUsers = 100;
let nowIndexShowUsers = countShowUsers;
function AddMoreUsers(e){
    e.preventDefault()

    let request = new XMLHttpRequest();
    request.open("POST", "/api/users", true);   

    request.setRequestHeader("Content-Type", "application/json");

    request.addEventListener("load", function () {
        let data = JSON.parse(request.response)
        let thisUsers = data.users.slice(nowIndexShowUsers, countShowUsers + nowIndexShowUsers)

        nowIndexShowUsers+=countShowUsers

        document.getElementById('show-more-users').remove()
        let div = document.getElementById('showUsers')
        
        for (let i = 0; i < thisUsers.length; i++) {
            let rols = ''
            for (const j in data.roleUser)
                if(data.roleUser[j].userId === thisUsers[i].id)
                    rols += data.roleUser[j].role + '&nbsp;&nbsp;&nbsp;'
            div.insertAdjacentHTML(
                'beforeend', 
                `<tr>
                    <td><a href="/profile/${thisUsers[i].id}"><h5>${thisUsers[i].name}</h5></a></td>
                    <td class="table-list-users"><h5>${thisUsers[i].email}</h5></td>
                    <td class="table-list-users">
                        <h5 class="float-left" id="RoleUser-${thisUsers[i].id}">`+rols+`
                        </h5>
                    </td>
                    <td>
                        <form action="/profile/delete" method="POST">
                            <input type="hidden" name="userId" value="${thisUsers[i].id}">
                            <input type="submit" class="btn btn-danger">
                        </form>
                    </td>
                </tr>`
            )
        }
        if(data.users.length > nowIndexShowUsers){
            var btn = document.createElement("button");
            btn.id = 'show-more-users'
            btn.setAttribute("onclick","AddMoreUsers(event)");
            btn.className = 'btn btn-success btn-list-more'
            var t = document.createTextNode("Загрузить еще");
            btn.appendChild(t)
            let but = document.getElementById('will-be-btn-users')
            but.append(btn)
        }
    })
    request.send()
}