addEventListener('load', ()=>{
 
    let div = document.getElementById('paginationLists')
    let search = document.getElementById('search_req').value
    let CountPages = document.getElementById('search_CountPages').value
    let page = document.getElementById('search_page').value
    page = parseInt(page)
    div.insertAdjacentHTML('beforeend', `<a href="/search/${page-1}/${search}">&laquo;</a>`)
    
    if(page<5){
        for (let i = 1; i <= 6; i++) {
            if(page === i)
                div.insertAdjacentHTML('beforeend', `<a class="active" href="/search/${i}/${search}">${i}</a>`)
            else
                div.insertAdjacentHTML('beforeend', `<a href="/search/${i}/${search}">${i}</a>`)
        }
        div.insertAdjacentHTML('beforeend', `<a> . . . . . </a>`)
        div.insertAdjacentHTML('beforeend', `<a href="/search/${CountPages}/${search}">${CountPages}</a>`)
    }
    else{
        div.insertAdjacentHTML('beforeend', `<a href="/search/1/${search}">1</a>`)
        div.insertAdjacentHTML('beforeend', `<a href="/search/2/${search}">2</a>`)
        div.insertAdjacentHTML('beforeend', `<a> . . . . . </a>`)
        div.insertAdjacentHTML('beforeend', `<a href="/search/${page-1}/${search}">${page-1}</a>`)
        div.insertAdjacentHTML('beforeend', `<a class="active" href="/search/${page}/${search}">${page}</a>`)
        if(CountPages-page <=5)
            for (let i = page+1; i <= CountPages; i++) {
                div.insertAdjacentHTML('beforeend', `<a href="/search/${i}/${search}">${i}</a>`)
            }
        else{
            div.insertAdjacentHTML('beforeend', `<a href="/search/${page+1}/${search}">${page+1}</a>`)
            div.insertAdjacentHTML('beforeend', `<a href="/search/${page+2}/${search}">${page+2}</a>`)
            div.insertAdjacentHTML('beforeend', `<a> . . . . . </a>`)
            div.insertAdjacentHTML('beforeend', `<a href="/search/${CountPages}/${search}">${CountPages}</a>`)
        }  
    }
    div.insertAdjacentHTML('beforeend', `<a href="/search/${page+1}/${search}">&raquo;</a>`)
})