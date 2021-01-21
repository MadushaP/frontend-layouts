window.onload = function () {
    let profiles = [
        { image: 'images/pic.jpg', name: 'Your Story' },
        { image: 'images/display-pictures/face1.jpg', name: 'Mark' },
        { image: 'images/display-pictures/face2.jpg', name: 'Raj' },
        { image: 'images/display-pictures/face3.jpg', name: 'Lisa' },
        { image: 'images/display-pictures/face4.jpg', name: 'Shanice' },
        { image: 'images/display-pictures/face5.png', name: 'Amila' },
    ]

    let storyContainer = document.querySelector('#story-container')

    let storiesHTML = profiles.map(profile => {
        return (
        `<div class="story">
          <img class="story-image" src=${profile.image}></img>
          <div class="story-name">${profile.name}</div>
         </div>`)
    }).join('\n')

    storyContainer.innerHTML = storiesHTML
}
