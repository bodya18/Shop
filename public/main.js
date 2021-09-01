addEventListener('load', ()=>{
    let request = new XMLHttpRequest

    request.open("POST", "/api/settings", true);   

    request.setRequestHeader("Content-Type", "application/json");

    request.addEventListener("load", function () {
        let data = JSON.parse(request.response)
        let main_quote = document.getElementById('main_quote')
        let Main_bottom_text = document.getElementById('Main_bottom_text')
        for (const i in data) {
            if (data[i]._key === 'Main_quote') {
                console.log(data[i].value);
                main_quote.insertAdjacentHTML('beforeend', data[i].value)
                continue;
            }
            if(data[i]._key === 'Main_bottom_text'){
                Main_bottom_text.insertAdjacentHTML('beforeend', data[i].value)
            }
        }
    })
    request.send()
})