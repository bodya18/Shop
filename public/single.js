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