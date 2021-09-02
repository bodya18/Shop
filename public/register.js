document.getElementById('register-user').addEventListener('click', ()=>{
    let email = document.getElementById('r-email-user').value
    let password = document.getElementById('r-password-user').value
    let name = document.getElementById('r-name-user').value
    let repeat = document.getElementById('r-repeat-user').value
    
    let data = JSON.stringify({email, password, repeat, name})
    let request = new XMLHttpRequest
    request.open("POST", "/register")
    request.setRequestHeader("Content-Type", "application/json")
    request.addEventListener('load', ()=>{
        let ifError = JSON.parse(request.response)
        if (ifError.error) {
            document.getElementById('register-error').innerHTML = ''
            document.getElementById('register-error').append(ifError.error)
        }
        else
            location.reload()
    })
    request.send(data)
})