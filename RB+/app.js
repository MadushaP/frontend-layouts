

function slide(direction) {
    let currentOffset = parseInt(document.getElementById('carouselRow').style.left)
    let carouselItemWidth = document.getElementsByClassName('carouselItem')[0].clientWidth
  
    currentOffset -= direction == "right" ? carouselItemWidth : -carouselItemWidth

    let maxOffset = (-carouselItemWidth * 3) + 40

    if (currentOffset > 40 || currentOffset <= maxOffset)
        return

    document.getElementById('carouselRow').style.left = currentOffset + "px"
}