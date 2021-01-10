let saved = 0;
let stars = document.getElementsByClassName('star')

function starClicked(index) {
     saved = index

    for (let i = 0; i < index; i++) {
        stars[i].classList.add('selected')
    }

    clearStars()
}

function highlightStar(index) {
    for (let i = 0; i < index; i++) {
        stars[i].classList.add('selected')
    }

}

function clearStars() {
    for (let i = saved; i < stars.length; i++) {
        stars[i].classList.remove('selected')
    }
}