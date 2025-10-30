document.addEventListener(`DOMContentLoaded`, function() {
    let elements = document.querySelectorAll(`.appear`)
    let observer = new IntersectionObserver(function(entries){
        for(let i = 0; i < entries.length; i++){
            let entry = entries[i]
            if(entry.isIntersecting){
                entry.target.classList.add(`visible`)
                observer.unobserve(entry.target)
            }
        }
    }, {threshold: 0.5})
    for(let i = 0; i < elements.length; i++){
        observer.observe(elements[i])
    }
})

async function gitHubData(){
    let username = "PacIsGod96"
    try{
        let userResponse = await fetch(`https://api.github.com/users/${username}`)
        let userData = await userResponse.json()
        let repoResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
        let repoData = await repoResponse.json()
        let totalStars = repoData.reduce((acc, repo) => acc + repo.stargazers_count, 0)
        let eventsResponse = await fetch(`https://api.github.com/users/${username}/events/public`)
        let eventsData = await eventsResponse.json()
        let recentCommits = eventsData
            ? eventsData
                .filter(event => event.type == "PushEvent")
                .reduce((acc, event) => acc + (event.payload?.commits?.length || 0), 0)
            : 0
        let publicRepo = userData.public_repos
        let followers = userData.followers

    document.getElementById(`repos`).textContent = publicRepo
    document.getElementById(`stars`).textContent = totalStars
    document.getElementById(`followers`).textContent = followers
    document.getElementById(`commits`).textContent = recentCommits
    } catch (error){
        document.getElementById(`repos`).textContent = `Error`
        document.getElementById(`stars`).textContent = `Error`
        document.getElementById(`followers`).textContent = `Error`
        document.getElementById(`commits`).textContent = `Error`
    }
    
}

document.addEventListener("DOMContentLoaded", gitHubData)

document.addEventListener(`DOMContentLoaded`, function(){
    let submitBtn = document.getElementById(`submitBtn`)
    let successMessage = document.getElementById(`success`)

    submitBtn.addEventListener(`click`, function(e){
        e.preventDefault()

        let firstName = document.getElementById(`firstName`).value.trim()
        let lastName = document.getElementById(`lastName`).value.trim()
        let email = document.getElementById(`email`).value.trim()
        let subject = document.getElementById(`subject`).value.trim()
        let message = document.getElementById(`message`).value.trim()

        if(!firstName || !lastName || !email || !subject || !message){
            alert(`Please fill in all required fields`)
            return
        }
        document.getElementById(`firstName`).value = ``
        document.getElementById(`lastName`).value = ``
        document.getElementById(`email`).value = ``
        document.getElementById(`subject`).value = ``
        document.getElementById(`message`).value = ``

        setTimeout(() => {
            successMessage.style.display = `none`
        }, 3000)
    })
})