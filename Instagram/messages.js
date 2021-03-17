
let emojis = [
    '😄', '😂 ', '💯', '😊', '😉', '😍', '😚', '😗', '😜', '😝', '🔥', '👍','👎','👌','👊'
];

let userNames = ['azygouslaurie', 'lori_white', 'eugene_the_machine', 
                 'mils_kitchen_', 'briannathebanana' ,'lazyfrog256', 'orangegoose462', 
                 'brownostrich308', 'smallkoala707', 'crazymeercat', 'minypanda506', 'wolfpac']

let randomEmoji = () => {
    return emojis[Math.floor(Math.random() * emojis.length)];
}

const randomProfilePic = () => {
    var image = new Image()
    let randomId = Math.floor(Math.random() * 99) + 1
    let gender = Math.floor(Math.random() * 2) + 1

    gender = gender == 1 ? "men" : "women"
    image.src = `https://randomuser.me/api/portraits/${gender}/${randomId}.jpg?`  + new Date().getTime()
    return image
}


for (let i = 0; i < userNames.length; i++) {
    let messageCont = document.querySelector('#user-messages-container')

    let newDiv = document.createElement('div')
    let profilePic = randomProfilePic()
        newDiv.innerHTML = `<div class="message">
        <img src=${profilePic.src}>
        <div id="username">${userNames[i]}</div>
        <div id="preview">Reacted to your story: ${randomEmoji()} 1h</div>
        </div>`
        
        messageCont.appendChild(newDiv)
   
}