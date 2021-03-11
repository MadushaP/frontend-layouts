let storyContainer = document.querySelector('#stories')
let profiles = mockData
let pages = 1
let currentPage = 1

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

const navigateStory = (story) => {
    document.querySelector('#story-overlay').style.display = 'block'
    document.querySelector('#main-container').style.display = 'none'
    setTimeout(() => {
        document.querySelectorAll('.progress')[0].classList.add('full')
    }, 100)

    let i = 1
    let progTimer = setInterval(() => {
        if (i == 5) {
            clearTimeout(progTimer)
            document.querySelector('#story-overlay').style.display = 'none'
            document.querySelector('#main-container').style.display = 'block'
            document.querySelector('#top-nav').style.display = 'block'
        }

        document.querySelector('#active-story-pic').src = "https://picsum.photos/614/614?time=" + (new Date()).getTime()
        document.querySelectorAll('.progress')[i-1].classList.remove('full')
        document.querySelectorAll('.progress')[i].classList.add('full')
        i++
    }, 5000)
}

const loadStories = () => {
    if (profiles.length < 7) {
        document.querySelector('.story-navigate.right').style.display = "none"
    } else {
        pages = Math.ceil(profiles.length / 6)
    }

    let storiesHTML = profiles.map(profile => {
        return (
            `<div class="story" onclick="navigateStory(this)">
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


loadStories()
loadPictures()
loadEmoji()
