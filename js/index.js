document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#github-form")
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = event.target.search.value
        const ul = document.querySelector('#user-list')
        ul.innerHTML = null
            
        fetch(`https://api.github.com/search/users?q=${username}`)
        .then(response => response.json())
        .then( data => {

            for (let i = 0; i < data.items.length; i++) {   
                const userName = document.createElement('h1') 
                userName.id = 'username'
                userName.textContent = `${data.items[i].login}`
                const avatar = document.createElement('img')
                 avatar.src = `${data.items[i].avatar_url}`
                avatar.alt = `user_avatar`
                const li = document.createElement('li')
                ul.appendChild(li)
                li.appendChild(userName)
                li.appendChild(avatar)
            }
        })   
        
        ul.addEventListener('click', (event) => {
            const username = event.target.parentNode.firstChild.textContent

            fetch(`https://api.github.com/users/${username}/repos`)
            .then((response) => response.json())
            .then(array => {
                let repoList;
                let ul_repo = document.querySelector('#repos-list')
                    ul_repo.innerHTML = ''

                for (const iterator in array) {
                    repoList = array[iterator].name
                    const li_repo = document.createElement('li')
                    ul_repo.appendChild(li_repo)
                    li_repo.textContent = repoList
                }   
                const p = document.createElement('p')
                p.textContent = `${username}\'s REPOSITORIES:`
                p.style = 'color: green'
                ul_repo.prepend(p)
            })
        })
        
    })
})