
let currentIndex = 0
let previousIndex = 0
function slide(direction) {
    let currentOffset = parseInt(document.getElementById('carouselRow').style.left)
    let offset = 80
    previousIndex = currentIndex

    if (direction == "right") {
        currentIndex++
    }
    else {
        offset = -offset
        currentIndex--
    }

    currentOffset -= offset 

    if (currentIndex < 0) {
        currentIndex = 0
        return
    }

    if (currentIndex > 2) {
        currentIndex = 2
        return
    }

    document.getElementById('carouselRow').style.left = currentOffset + "%"
    document.getElementsByClassName('carouselItem')[previousIndex].classList.remove('selected')
    document.getElementsByClassName('carouselItem')[currentIndex].classList.add('selected')
}