document.getElementById('login-user').addEventListener('click', ()=>{
    let email = document.getElementById('email-user').value
    let password = document.getElementById('password-user').value
    
    let data = JSON.stringify({email, password})
    let request = new XMLHttpRequest
    request.open("POST", "/login")
    request.setRequestHeader("Content-Type", "application/json")
    request.addEventListener('load', ()=>{
        let ifError = JSON.parse(request.response)
        if (ifError.error) {
            document.getElementById('login-error').innerHTML = ''
            document.getElementById('login-error').append(ifError.error)
        }
        else
            location.reload()
    })
    request.send(data)
})

document.getElementById('Forgot-pass').addEventListener('click', ()=>{
    document.getElementById('login-body').innerHTML = `
    <input name="email" type="email" id="email-user" class="form-control" placeholder="Введите ваш email">
    ` 
    document.getElementById('login-footer').innerHTML = `
    <input id="recovery-pass-user" onclick="recovery(event)" type="submit" class="button" value="Восстановить пароль">
    ` 
})
function recovery(){
    let email = document.getElementById('email-user').value
    let data = JSON.stringify({email})
    let request = new XMLHttpRequest
    request.open("POST", "/login/recovery")
    request.setRequestHeader("Content-Type", "application/json")
    request.send(data)
    location.reload()
}