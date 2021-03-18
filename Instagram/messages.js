
let emojis = [
  '😄', '😂 ', '💯', '😊', '😭', '😍', '😚', '😜', '😝', '🔥', '👍', '👌', '👊', '😎'
];

let userNames = ['azygouslaurie', 'lori_white', 'eugene_the_machine',
  'mils_kitchen_', 'briannathebanana', 'lazyfrog256', 'orangegoose462',
  'brownostrich308', 'smallkoala707', 'crazymeercat', 'minypanda506', 'wolfpac']

let randomEmoji = () => {
  return emojis[Math.floor(Math.random() * emojis.length)];
}

const randomProfilePic = () => {
  var image = new Image()
  let randomId = Math.floor(Math.random() * 99) + 1
  let gender = Math.floor(Math.random() * 2) + 1

  gender = gender == 1 ? "men" : "women"
  image.src = `https://randomuser.me/api/portraits/${gender}/${randomId}.jpg?` + new Date().getTime()
  return image
}


for (let i = 0; i < userNames.length; i++) {
  let messageCont = document.querySelector('#user-messages-container')
  let newDiv = document.createElement('div')
  let profilePic = randomProfilePic()
  newDiv.innerHTML = `<button class="message" autofocus>
        <img src=${profilePic.src}>
        <div class="username">${userNames[i]}</div>
        <div class="preview">Reacted to your story: ${randomEmoji()} ${12 - i}h</div>
        </button>`
  messageCont.appendChild(newDiv)
}


document.querySelector('#conversation #conversation-top .small-display-picture').src = document.querySelector('#user-messages-container .message img').src
document.querySelector('#conversation #conversation-top #conversation-username').innerHTML = document.querySelector('#user-messages-container .message .username').innerHTML
document.querySelector('#conversation #conversation-top').style['border-bottom'] = '1px solid #dbdbdb';

let currentSelectedUsed;

document.querySelector('#user-messages-container').addEventListener('click', (event) => {
  if (currentSelectedUsed)
    currentSelectedUsed.style = 'background-color: white'

  currentSelectedUsed = event.target.closest('.message')

  event.target.closest('.message').style = 'background-color: #efefef'

  let image = event.target.closest('.message').querySelector('img')
  let username = event.target.closest('.message').querySelector('.username').innerHTML

  document.querySelector('#conversation #conversation-top .small-display-picture').src = image.src
  document.querySelector('#conversation #conversation-top #conversation-username').innerHTML = username
  document.querySelector('#conversation #conversation-top').style['border-bottom'] = '1px solid #dbdbdb';
})

