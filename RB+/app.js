window.onload = function () {
    let images = ['image1', 'image2', 'image3']
    let imageHtml = images.map((image, index) => {
        let selected = index == 0 ? "selected" : ""

        return `<div class="carouselItem ${selected}">
                  <img src="images/${image}.jpg">
               </div>`
    }).join('/n')

    document.getElementById('carouselRow').innerHTML = imageHtml
};

let currentIndex = 0
let previousIndex = 0

function slide(direction) {

    let currentOffset = parseInt(document.getElementById('carouselRow').style.left)
    let offset = 80
    previousIndex = currentIndex

    if (direction == "right") {
        currentIndex++
        currentOffset -= offset
    }
    else {
        currentIndex--
        currentOffset += offset
    }

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
