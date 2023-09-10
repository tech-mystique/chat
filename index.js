const sendButton = document.querySelector('#send');
const userInput = document.querySelector('#user-input');
const messagesList = document.querySelector('#messages-list');

const listElement = (url, signature, message) => {
    return `<li class="message-list-item">
            <div class="user-info">
              <div class="user-photo-wrapper">
                <img
                  src=${url}
                  id="use-photo"
                  width="80px"
                  height="80px"
                  object-position="-27px"
                />
              </div>
              <p class="user-signature">${signature}</p>
            </div>
            <div class="user-message">${message}</div>
          </li>`
}

 fetch('http://localhost:4040/chatSession/')
    .then(res => res.json())
    .then(res => {
        const chatList = res.map(el => {
            return listElement(el.userPhoto, el.userName, el.userMessage)
        })
        console.log('chatList', chatList);
        
        messagesList.insertAdjacentHTML('beforeend', chatList.join(' '));
    })
    .catch(err => console.error(err));


const newMessage = {
    userName: "Elrond",
    userPhoto: "https://comicvine.gamespot.com/a/uploads/original/11127/111273287/5824042-elrond_in_rivendell_-_the_hobbit.jpg",
    userMessage: ""    
}

const sendNewMessage = () => {
    newMessage.userMessage = userInput.value;

    fetch('http://localhost:4040/chatSession/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage)
    })
    .then(res => res.json())
        .then(() => {
            userInput.value = ''
    })
    .catch(err => console.error(err));
}

sendButton.addEventListener('click', sendNewMessage)