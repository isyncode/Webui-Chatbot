let send_button = document.querySelector('#send');
let message_box = document.querySelector('.message');
let user_message = document.querySelector('textarea')
send_button.addEventListener('click', addUserText);


// add user text
function addUserText() {
    let user_text = user_message.value;

    if (!user_text) {
        return;
    }

    let new_element = `<div class="user-container">
    <div id="user-content">
        <div class="user-message">${user_text}</div>
        <img src="https://img.icons8.com/emoji/48/orange-circle-emoji.png" alt="user photo">
    </div>
</div>`

    let parser = new DOMParser();
    let user_element = parser.parseFromString(new_element, 'text/html').body.firstChild;

    message_box.appendChild(user_element);
    message_box.scrollTop += 200;
    user_message.value = null;

    // add bot
    addLoading()
    let data = {
        user_text: user_text
    }

    const sendData = async() => {
        let bot_response = await fetch('/get-response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const response_data = await bot_response.json();
        removeLoading()
        addBotText(response_data.response)
    }

    sendData();
}

function addBotText(text) {
    let new_element = `<div class="bot-container">
    <div id="bot-content">
        <img src="https://img.icons8.com/emoji/48/purple-circle-emoji.png" alt="bot photo">
        <div class="bot-message">${text}</div>
    </div>
</div>`
    let parser = new DOMParser();
    let bot_element = parser.parseFromString(new_element, 'text/html').body.firstChild;

    message_box.appendChild(bot_element);
    message_box.scrollTop += 200;
}

function addLoading(text) {
    let new_element = `<div class="bot-container">
    <div id="bot-content">
        <img src="https://img.icons8.com/emoji/48/purple-circle-emoji.png" alt="bot photo">
        <div class="bot-loading">
            <div class="bot-loading-circle bc1"></div>
            <div class="bot-loading-circle bc2"></div>
            <div class="bot-loading-circle bc3"></div>
        </div>
    </div>
</div>`
    let parser = new DOMParser();
    let user_element = parser.parseFromString(new_element, 'text/html').body.firstChild;

    message_box.appendChild(user_element);
    message_box.scrollTop += 100;
}

function removeLoading() {
    let isLoading = document.querySelectorAll('.bot-loading');

    if (isLoading) {
        // delete from 2 parents above
        isLoading[0].parentNode.parentNode.remove();
    }
}