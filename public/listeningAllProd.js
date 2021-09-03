addEventListener('load', ()=>{
 
    let div = document.getElementById('paginationLists')
    let CountPages = document.getElementById('search_CountPages').value
    let page = document.getElementById('search_page').value
    page = parseInt(page)
    div.insertAdjacentHTML('beforeend', `<a href="/product/list/${page-1}">&laquo;</a>`)
    if(page<5){
        if(CountPages > 6){
            for (let i = 1; i <= 6; i++) {
                if(page === i)
                    div.insertAdjacentHTML('beforeend', `<a class="active" href="/product/list/${i}">${i}</a>`)
                else
                    div.insertAdjacentHTML('beforeend', `<a href="/product/list/${i}/">${i}</a>`)
            }
            div.insertAdjacentHTML('beforeend', `<a> . . . . . </a>`)
            div.insertAdjacentHTML('beforeend', `<a href="/product/list/${CountPages}/">${CountPages}</a>`)
        }
        else{
            for (let i = 1; i <= CountPages; i++) {
                if(page === i)
                    div.insertAdjacentHTML('beforeend', `<a class="active" href="/product/list/${i}/">${i}</a>`)
                else
                    div.insertAdjacentHTML('beforeend', `<a href="/product/list/${i}/">${i}</a>`)
            }
        }
    }
    else{
        div.insertAdjacentHTML('beforeend', `<a href="/product/list/1/">1</a>`)
        div.insertAdjacentHTML('beforeend', `<a href="/product/list/2/">2</a>`)
        div.insertAdjacentHTML('beforeend', `<a> . . . . . </a>`)
        div.insertAdjacentHTML('beforeend', `<a href="/product/list/${page-1}/">${page-1}</a>`)
        div.insertAdjacentHTML('beforeend', `<a class="active" href="/product/list/${page}/">${page}</a>`)
        if(CountPages-page <=5)
            for (let i = page+1; i <= CountPages; i++) {
                div.insertAdjacentHTML('beforeend', `<a href="/product/list/${i}/">${i}</a>`)
            }
        else{
            div.insertAdjacentHTML('beforeend', `<a href="/product/list/${page+1}/">${page+1}</a>`)
            div.insertAdjacentHTML('beforeend', `<a href="/product/list/${page+2}/">${page+2}</a>`)
            div.insertAdjacentHTML('beforeend', `<a> . . . . . </a>`)
            div.insertAdjacentHTML('beforeend', `<a href="/product/list/${CountPages}/">${CountPages}</a>`)
        }  
    }
    div.insertAdjacentHTML('beforeend', `<a href="/product/list/${page+1}/">&raquo;</a>`)
})