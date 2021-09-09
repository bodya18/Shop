addEventListener('load', ()=>{
    let request = new XMLHttpRequest
    
    request.open("POST", "/api/cookies/get", true);   

    request.setRequestHeader("Content-Type", "application/json");

    request.addEventListener("load", function () {
        let isCookie = JSON.parse(request.response)
        if(!isCookie){
            swal({
                position: 'bottom-end',
                type: 'info',
                title: 'Согласны ли вы принять наши cookie?',
                showConfirmButton: true,
                showCancelButton: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
                toast: true,
              }).then(res=>{
                  if('value' in res){
                    let request = new XMLHttpRequest
    
                    request.open("POST", "/api/cookies/set", true);   
                
                    request.setRequestHeader("Content-Type", "application/json");

                    request.send()
                  }
              })
        }
    })
    request.send()
})