let storyContainer = document.querySelector('#stories')
let profiles = mockData
let pages = 1
let currentPage = 1

let pageValidator = () => {
    console.log(currentPage, pages)
    if (currentPage > 1 && currentPage < pages) {
        document.querySelector('.story-navigate.right').style.display = "block"
        document.querySelector('.story-navigate.left').style.display = "block"
    } else if (currentPage == pages) {
        document.querySelector('.story-navigate.right').style.display = "none"
        document.querySelector('.story-navigate.left').style.display = "block"

    } else if (currentPage == 1) {
        document.querySelector('.story-navigate.left').style.display = "none"
        document.querySelector('.story-navigate.right').style.display = "block"

    }
}

let navigate = (direction) => {
    if (direction == "next") {
        currentPage++
        pageValidator()
        let currentPos = storyContainer.computedStyleMap().get('right');
        currentPos.value += 600
        storyContainer.style.right = currentPos.value + "px"

    } else {
        currentPage--
        pageValidator()
        let currentPos = storyContainer.computedStyleMap().get('right');
        currentPos.value -= 600
        storyContainer.style.right = currentPos.value + "px"
    }
}



let loadStories = () => {

    if (profiles.length < 7) {
        document.querySelector('.story-navigate.right').style.display = "none"
    } else {
        pages = Math.ceil(profiles.length / 6)
    }


    let storiesHTML = profiles.map(profile => {

        return (
            `<div class="story">
              <img class="story-image" src=${profile.image}></img>
              <div class="story-name">${profile.name}</div>
             </div>`)
    }).join('\n')

    storyContainer.innerHTML = storiesHTML

    let allProfiles = document.querySelectorAll('.story-image')
    for (let i = 1; i < allProfiles.length; i++) {
        var image = new Image();
        let randomId = Math.floor(Math.random() * 99) + 1  
        let gender = Math.floor(Math.random() * 2) + 1  

        gender  = gender == 1 ? "men" : "women" 
        image.src = `https://randomuser.me/api/portraits/${gender}/${randomId}.jpg?` + i + new Date().getTime();
        allProfiles[i].src = image.src
    }

}

loadStories()

