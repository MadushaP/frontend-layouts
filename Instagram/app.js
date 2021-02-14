let storyContainer = document.querySelector('#stories')
let profiles = mockData
let pages = 1
let currentPage = 1

let pageValidator = () => {
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

let buttonBackOff = false

let navigate = (direction) => {
    if (buttonBackOff)
        return

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
    buttonBackOff = true
    setTimeout(() => { buttonBackOff = false }, 500)

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
        var image = randomProfilePic(i)
        allProfiles[i].src = image.src
    }
}

function randomProfilePic(i) {
    var image = new Image()
    let randomId = Math.floor(Math.random() * 99) + 1
    let gender = Math.floor(Math.random() * 2) + 1

    gender = gender == 1 ? "men" : "women"
    image.src = `https://randomuser.me/api/portraits/${gender}/${randomId}.jpg?` + i + new Date().getTime()
    return image
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

let loadPictures = () => {
    let pictureContainer = document.querySelector('#pictures')

    for (let i = 0; i < 10; i++) {
        let name = mockData[Math.floor(Math.random() * (mockData.length - 1) + 1)].name
        let likes = numberWithCommas(Math.floor(Math.random() * 100000))
        var picture = new Image();
        picture.src = "https://picsum.photos/614/614?time=" + (new Date()).getTime() + i;
        var profilePic = randomProfilePic()



        let template = `<div class="picture-container">
<div class="picture-header">
    <div class="display-picture">
        <img src=${profilePic.src}> </img>
    </div>
    <div class="text-bold">
        ${name}
    </div>
    <div class="bread-crumb">
        ...
    </div>
</div>
<div class="picture-body">
    <img src="${picture.src}" />
</div>
<div class="picture-icon-row">
    <img src="./images/heart.svg" style="height: 24px" />
    <img src="./images/comment.svg" />
    <img src="./images/direct.svg" />
    <img src="./images/favourite.svg" style="float: right; margin-right: 15px;">
</div>
<div class="comments">
    <div class="text-bold" style="line-height: 20px;  padding-top: 7px;">
        ${likes} likes
    </div>
    <div class="text-bold">
        Frank <span> woooow nice one 😲 </span>
    </div>
    <div class="text-bold">
        Rahool <span> SICKKK pic bro. Can you make me a website? £5 final
            offer </span>
    </div>
    <div class="text-bold">
        Amila <span> 🚀 </span>
    </div>
    <div class="text-bold">
        Mum <span> I have forgotten my password can you tell me wat it is
        </span>
    </div>
</div>
<div class="comment-input">
    <div> <img src="./images/smiley.svg"></img></div>
    <div> <input placeholder="Add comment"> </input> </div>
    <div> Post </div>
</div>
</div>`

        var wrapper = document.createElement('div');
        wrapper.innerHTML = template
        pictureContainer.appendChild(wrapper)
    }


}

loadStories()
loadPictures()


