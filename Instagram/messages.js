
let messages = [
  'Hey 😄', 'You are a joker 😂 ', 'Certi 💯', 'You want to go kfc', 'I\'m glad 😊',
  'whyyyyy 😭', '😍 wow', '😚 wat', 'yooo 😜', 'hahaha', 'this ui is 🔥', 'LOOOOL',
  '👍', 'okay 👌', '👊 safe', 'cool 😎', 'Noo.. Drake is the 🐐', 'I cant get a ps5', 'Sup',
  'u invest in alt coins?', 'bitcoin defo crashing'
];

let userNames = ['azygouslaurie', 'lori_white', 'eugene_the_machine',
  'mils_kitchen_', 'briannathebanana', 'lazyfrog256', 'orangegoose462',
  'brownostrich308', 'smallkoala707', 'crazymeercat', 'minypanda506', 'wolfpac']

let randomEmoji = () => {
  return messages[Math.floor(Math.random() * messages.length)];
}

const randomProfilePic = () => {
  var image = new Image()
  let randomId = Math.floor(Math.random() * 99) + 1
  let gender = Math.floor(Math.random() * 2) + 1

  gender = gender == 1 ? "men" : "women"
  image.src = `https://randomuser.me/api/portraits/${gender}/${randomId}.jpg?` + new Date().getTime()
  return image
}


const loadEmoji = () => {
  new FgEmojiPicker({
    trigger: ['#emoji'],
    position: ['top', 'right'],
    preFetch: true,
    emit(obj, triggerElement) {
      triggerElement.nextElementSibling.value += obj.emoji
    }
  })
}

loadEmoji()

for (let i = 0; i < userNames.length; i++) {
  let messageCont = document.querySelector('#user-messages-container')
  let newDiv = document.createElement('div')
  let profilePic = randomProfilePic()
  newDiv.innerHTML = `<button class="message" autofocus>
        <img src=${profilePic.src}>
        <div class="username">${userNames[i]}</div>
        <div class="preview">${randomEmoji()} · ${12 - i}h</div>
        </button>`
  messageCont.appendChild(newDiv)
}


document.querySelector('#conversation #conversation-top .small-display-picture').src = document.querySelector('#user-messages-container .message img').src
document.querySelector('#conversation #conversation-top #conversation-username').innerHTML = document.querySelector('#user-messages-container .message .username').innerHTML
document.querySelector('#conversation #conversation-top').style['border-bottom'] = '1px solid #dbdbdb';
document.querySelector('#conversation #conversation-text .bubble-text-reply').innerHTML = document.querySelector('#user-messages-container .message .preview').innerHTML.split('·')[0]

let currentSelected = document.querySelector('#user-messages-container').children[1].firstChild;
currentSelected.style = 'background-color: #efefef'

document.querySelector('#user-messages-container').addEventListener('click', (event) => {
  if(currentSelected.closest('.message') == event.target.closest('.message'))
    return

  document.querySelectorAll('.bubble-text').forEach(dom => dom.parentElement.parentElement.remove())

  if (currentSelected)
    currentSelected.style = 'background-color: white'

  currentSelected = event.target.closest('.message')
  event.target.closest('.message').style = 'background-color: #efefef'

  let image = event.target.closest('.message').querySelector('img')
  let username = event.target.closest('.message').querySelector('.username').innerHTML
  let preview = event.target.closest('.message').querySelector('.preview').innerHTML.split('·')[0]

  document.querySelector('#conversation #conversation-top .small-display-picture').src = image.src
  document.querySelector('#conversation #conversation-top #conversation-username').innerHTML = username
  document.querySelector('#conversation #conversation-top').style['border-bottom'] = '1px solid #dbdbdb';
  document.querySelector('#conversation #conversation-text .bubble-text-reply').innerHTML = preview
})

document.querySelector('#message-input').addEventListener("keyup", (event) => {
  if (event.target.value == '')
    return
  if (event.key === "Enter") {
    let newBubbleText = document.createElement('div')
    newBubbleText.innerHTML = `<div class="message-row">
    <div class="bubble-text">${event.target.value}</div>
  </div>`
    document.querySelector('#conversation-text').appendChild(newBubbleText)

    event.target.value = null
  }
})

