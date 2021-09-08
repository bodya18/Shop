addEventListener('load', ()=>{
    let div = document.getElementById('paginationLists')
    let CountPages = document.getElementById('search_CountPages').value
    let page = document.getElementById('search_page').value
    let categoryId = document.getElementById('categoryId').value
    page = parseInt(page)
    div.insertAdjacentHTML('beforeend', `<a href="/category/${page-1}/${categoryId}">&laquo;</a>`)
    if(page<5){
        if(CountPages > 6){
            for (let i = 1; i <= 6; i++) {
                if(page === i)
                    div.insertAdjacentHTML('beforeend', `<a class="active" href="/category/${i}/${categoryId}">${i}</a>`)
                else
                    div.insertAdjacentHTML('beforeend', `<a href="/category/${i}/${categoryId}">${i}</a>`)
            }
            div.insertAdjacentHTML('beforeend', `<a> . . . . . </a>`)
            div.insertAdjacentHTML('beforeend', `<a href="/category/${CountPages}/${categoryId}">${CountPages}</a>`)
        }
        else{
            for (let i = 1; i <= CountPages; i++) {
                if(page === i)
                    div.insertAdjacentHTML('beforeend', `<a class="active" href="/category/${i}/${categoryId}">${i}</a>`)
                else
                    div.insertAdjacentHTML('beforeend', `<a href="/category/${i}/${categoryId}">${i}</a>`)
            }
        }
    }
    else{
        div.insertAdjacentHTML('beforeend', `<a href="/category/1/${categoryId}">1</a>`)
        div.insertAdjacentHTML('beforeend', `<a href="/category/2/${categoryId}">2</a>`)
        div.insertAdjacentHTML('beforeend', `<a> . . . . . </a>`)
        div.insertAdjacentHTML('beforeend', `<a href="/category/${page-1}/${categoryId}">${page-1}</a>`)
        div.insertAdjacentHTML('beforeend', `<a class="active" href="/category/${page}/${categoryId}">${page}</a>`)
        if(CountPages-page <=5)
            for (let i = page+1; i <= CountPages; i++) {
                div.insertAdjacentHTML('beforeend', `<a href="/category/${i}/${categoryId}">${i}</a>`)
            }
        else{
            div.insertAdjacentHTML('beforeend', `<a href="/category/${page+1}/${categoryId}">${page+1}</a>`)
            div.insertAdjacentHTML('beforeend', `<a href="/category/${page+2}/${categoryId}">${page+2}</a>`)
            div.insertAdjacentHTML('beforeend', `<a> . . . . . </a>`)
            div.insertAdjacentHTML('beforeend', `<a href="/category/${CountPages}/${categoryId}">${CountPages}</a>`)
        }  
    }
    div.insertAdjacentHTML('beforeend', `<a href="/category/${page+1}/${categoryId}">&raquo;</a>`)
})