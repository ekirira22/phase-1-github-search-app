const apiURL = 'https://api.github.com/users'
const init = () => {

    //get user info, search and display them
    document.querySelector('form#github-form').addEventListener('submit', e => {
        e.preventDefault()
        const username = e.target.search.value
        document.querySelector('ul#repos-list').innerHTML = ""
        searchUserAndDisplay(username)
    })
    // searchUser()


}

async function displayRepos(url){
    const method = 'GET'
    const userobj = await fetchData(url,method)
    const repository = document.querySelector('ul#repos-list')
    
    userobj.forEach(repo => {
        let list = document.createElement('li')
        list.innerHTML = `
            <p>${repo.name}</p>
        `
        
        repository.appendChild(list)
    })
}

/**************Reusable Functions******************/
async function searchUserAndDisplay(username){
    const url = `${apiURL}/${username}`
    const method = 'GET'
    const userobj = await fetchData(url,method)
    
    const user = document.querySelector('ul#user-list')
    
        let info = document.createElement('div')
        info.innerHTML = `
            <h2>Name: ${userobj.name}</h2>
            <img src="${userobj.avatar_url}"/>
            <p>Bio: ${userobj.bio}</p><br>
            <a href="${userobj.html_url}">Link to Profile </a> <br>
            <a href="#" id="displayrepos">View Repos     </a>


        `
        info.querySelector('a#displayrepos').addEventListener('click', () => {
            displayRepos(userobj.repos_url)
        })
        user.innerHTML = ''
        user.appendChild(info)
    
}
async function fetchData(url,method,dataObj=null){
       
    try{
        const config = {
            method : method,
            headers : {
                'Content-Type' : 'application/json',
                Accept : 'application/json'
            }
        }

        if(dataObj !== null){
            config.body = JSON.stringify(dataObj)
        }

        let response = await fetch(url)

        if(!response.ok){
            alert(`Error ${response.status} - ${response.error}`)
        }

        return response.json()

    }catch(error){
        console.log(error.message)
        alert(error.message)
    }
}
/************ MAIN EVENT LISTENER ****************/
document.addEventListener('DOMContentLoaded', init)