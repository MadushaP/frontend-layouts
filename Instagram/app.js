let storyContainer = document.querySelector('#stories')
let profiles = mockData
let pages = 1
let currentPage = 1
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const loadEmoji = () => {
    new FgEmojiPicker({
        trigger: ['.emoji'],
        position: ['top', 'right'],
        preFetch: true,
        emit(obj, triggerElement) {
            let inputDom = triggerElement.parentElement.parentElement.querySelector('input')
            let postButton = triggerElement.parentElement.parentElement.querySelector('button')
            postButton.disabled = false
            postButton.style.color = '#0095f6'
            postButton.style.cursor = 'pointer'
            inputDom.value += obj.emoji
        }
    })
}

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

function amountscrolled() {
    var winheight = window.innerHeight || (document.documentElement || document.body).clientHeight
    var docheight = document.documentElement.scrollHeight
    var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
    var trackLength = docheight - winheight
    var pctScrolled = Math.floor(scrollTop / trackLength * 100)

    if (pctScrolled == 100) {
        loadPictures()
    }

}

window.addEventListener("scroll", function () {
    amountscrolled()
}, false)

const pageValidator = () => {
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

const navigate = (direction) => {
    if (buttonBackOff)
        return
    
    let currentPos = storyContainer.style.right

    if (direction == "next") {
        currentPage++
        pageValidator()
        currentPos = parseInt(currentPos) + 600
    } else {
        currentPage--
        pageValidator()
        currentPos = parseInt(currentPos) - 600
    }
    storyContainer.style.right = currentPos + "px"

    buttonBackOff = true
    setTimeout(() => { buttonBackOff = false }, 500)
}

let currentStory = 0
let progTimer
let loadedStories = []
const handleMouse = (e) => {
    if (e.changedTouches[0].pageX < (window.innerWidth / 2)) {
        navigateUserStory("left")
    } else {
        navigateUserStory("right")
    }
}

const closeStoryOverlay = () => {
    clearTimeout(progTimer)
    document.querySelector('#story-overlay').style.display = 'none'
    document.querySelector('#main-container').style.display = 'block'
    document.querySelector('#top-nav').style.display = 'block'

    document.querySelectorAll('.progress').forEach(element => {
        element.classList.remove('full')
        element.classList.remove('seen')
    })
    currentStory = 0
	document.removeEventListener("touchstart", handleMouse);
    document.getElementsByTagName('html')[0].style.position = null
	document.querySelector('#active-story-pic').src = "https://thumbs.gfycat.com/DearWellinformedDalmatian-size_restricted.gif"
}

const autoNextStory = () => {
	return setInterval(() => {
        currentStory++
        if (currentStory == 5) {
            clearTimeout(progTimer)
            closeStoryOverlay()
            return
        }
        document.querySelector('#active-story-pic').src = loadedStories[currentStory]
        document.querySelectorAll('.progress')[currentStory - 1].classList.remove('full')
        document.querySelectorAll('.progress')[currentStory - 1].classList.add('seen')
        document.querySelectorAll('.progress')[currentStory].classList.add('full')
    }, 5000)
}

const generateUserStories = (num) => {
  let picSumResolution = isMobile ? '1000' : '614'
  let picSumPromises = []
  for(let i = 0; i < num; i++) {
	picSumPromises.push(fetch(`https://picsum.photos/${picSumResolution}`)
					   .then(response => response.blob())
					   .then(blob => URL.createObjectURL(blob)))
  }

  return Promise.all(picSumPromises)
}

const userStory = (story) => {
    let [displayPictureDom, username] = story.children
	story.style.opacity = 0.5
  
    document.querySelector('#user-profile').innerHTML = `<img src=${displayPictureDom.src}></img>
                                                            <div class="text-bold">
                                                                ${username.outerHTML}
                                                            </div>
                                                          <span>10h</span>`

	document.querySelector('#story-overlay').style.display = 'block'
    document.querySelector('#main-container').style.display = 'none'
    document.getElementsByTagName('html')[0].style.position = 'fixed'
    document.addEventListener("touchstart", handleMouse)

    generateUserStories(5).then(images => {
		loadedStories = images
		document.querySelector('#active-story-pic').src = loadedStories[0]
		document.querySelectorAll('.progress')[0].classList.add('full')
		progTimer = autoNextStory()
	})
}

const navigateUserStory = (side) => {
    clearTimeout(progTimer)
    let progDom = document.querySelectorAll('.progress')
    if (side == "right") {
        currentStory++
        if (currentStory == 5) {
            closeStoryOverlay()
            return
        }
        progDom[currentStory - 1].classList.remove('full')
        progDom[currentStory - 1].classList.add('seen')
        progDom[currentStory].classList.add('full')
    } else {
        currentStory--
        if (currentStory == -1) {
            closeStoryOverlay()
            return
        }
        progDom[currentStory + 1].classList.remove('full')
        progDom[currentStory].classList.remove('seen')
        setTimeout(() => { progDom[currentStory].classList.add('full') }, 10)
    }

    document.querySelector('#active-story-pic').src = loadedStories[currentStory]
    progTimer = autoNextStory()
}

const loadStories = () => {
    if (profiles.length < 7) {
        document.querySelector('.story-navigate.right').style.display = "none"
    } else {
        pages = Math.ceil(profiles.length / 6)
    }

    let storiesHTML = profiles.map(profile => {
        return (
            `<div class="story" onclick="userStory(this)">
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

const randomProfilePic = (i) => {
    var image = new Image()
    let randomId = Math.floor(Math.random() * 99) + 1
    let gender = Math.floor(Math.random() * 2) + 1

    gender = gender == 1 ? "men" : "women"
    image.src = `https://randomuser.me/api/portraits/${gender}/${randomId}.jpg?` + i + new Date().getTime()
    return image
}

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

document.addEventListener('input', function (e) {
    let commentContainer = e.target.parentElement.parentElement
    let postButton = commentContainer.querySelector('.comment-input button')
    if (e.target.value.length > 0) {
        postButton.disabled = false
        postButton.style.color = '#0095f6'
        postButton.style.cursor = 'pointer'
    } else {
        postButton.style.color = '#b3dffc'
        postButton.disabled = true
        postButton.style.cursor = 'default'
    }
});

const submitComment = (elem) => {
    let containerDom = elem.parentElement.parentElement.querySelector('.comments')
    let inputText = elem.parentElement.querySelector('div input').value
    let postButton = elem.parentElement.querySelector('div button')
    let container = getComputedStyle(containerDom)
    containerDom.style.height = `${parseInt(container.height, 10) + 20}px`


    var div = document.createElement('div')
    div.innerHTML = `<div class="text-bold">
                     You <span> ${inputText}
                     </span>
                    </div>`
    containerDom.appendChild(div)
    elem.parentElement.querySelector('div input').value = null
    postButton.style.color = '#b3dffc'
    postButton.disabled = true
    postButton.style.cursor = 'default'
}

const loadPictures = () => {
    let pictureContainer = document.querySelector('#pictures')

    for (let i = 0; i < 10; i++) {
        let name = mockData[Math.floor(Math.random() * (mockData.length - 1) + 1)].name
        let likes = numberWithCommas(Math.floor(Math.random() * 100000))
        var picture = new Image();
        picture.src = "https://picsum.photos/614/614?time=" + (new Date()).getTime() + i;
        let profilePic = randomProfilePic()

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
    <img onclick="like(this)" src="./images/heart.svg" style="height: 24px" />
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
    <div> <img class="emoji" src="./images/smiley.svg"></img></div>
    <div> <input placeholder="Add comment"> </input> </div>
    <button disabled=false onclick="submitComment(this)"> Post </button>
</div>
</div>`

        var wrapper = document.createElement('div');
        wrapper.innerHTML = template
        pictureContainer.appendChild(wrapper)
    }
}

const like = (heart) => {
    let heartImage = heart.src.split("/").pop()
    let oldLikes = heart.parentElement.nextElementSibling.children[0].textContent.trim().split(" ")[0].replace(',', '')
    if (heartImage == "heart.svg") {
        let newLikes = numberWithCommas(parseInt(oldLikes) + 1)
        heart.src = "images/heart-liked.svg"
        heart.classList.add("heart-active")
        heart.parentElement.nextElementSibling.children[0].innerHTML = `${newLikes} likes`
    }
    else {
        let newLikes = numberWithCommas(parseInt(oldLikes) - 1)
        heart.src = "images/heart.svg"
        heart.classList.remove("heart-active")
        heart.parentElement.nextElementSibling.children[0].innerHTML = `${newLikes} likes`
    }
}


loadStories()
loadPictures()
loadEmoji()
