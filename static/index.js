// localStorage.removeItem('previousChannel');  RUN THESE IN BROWSER TO RESET PREVIOUS CHANNEL
// localStorage.removeItem('displayName');

// if user hasn't chosen a display name, prompt user and store it locally
if (!localStorage.getItem('displayName')) {
    var displayName = prompt("Please provide a display name.");
    localStorage.setItem('displayName', displayName);
}

// Connect to websocket
var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

// When connected, if user was on a channel previously redirect him to url for viewchannel() route, else return index.html
socket.on('connect', () => {
    socket.on('check_previous_channel', () => {
        if (localStorage.getItem('previousChannel')) {
            var previous_channel = localStorage.getItem('previousChannel');
            window.location = `/channel/${previous_channel}`;
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {

    // render chosen name at top right of window
    document.getElementById('displayName').innerHTML = localStorage.getItem('displayName');

    // configure create channel button
    document.getElementById('createChannel').onclick = () => {
        var channel_name = prompt('Channel name:');
        if (channel_name !== '') {
            socket.emit('create_channel', {'channel_name': channel_name});
        };
    };

    // SOCKET EVENTS
    socket.on('existing channel', () => {
        alert("Sorry this channel name already exists!");
        });

    socket.on('success_redirect', (data) => {
        window.location = data.url;
        alert("Successfully created channel!");
        });

    socket.on('message_sent', (data) => {
        // if first message sent
        if (data.number_of_messages == 0) {
            insertMessageInHTML(data);
            return;
        }
        cloneMessageToBottom(data);
        });

    // Personal Touch: Allow user to change display name
    document.getElementById('displayName').onclick = () => {
        displayName = prompt('Change your display name to:');
        localStorage.setItem('displayName', displayName);
        document.getElementById('displayName').innerHTML = localStorage.getItem('displayName');
    }
});


function insertMessageInHTML(data) {
    // create new html elements with classes
    var a = document.createElement('a');
    a.className = "list-group-item list-group-item-action flex-column align-items-start active";
    var div = document.createElement('div');
    div.className = "d-flex w-100 justify-content-between";
    var h5 = document.createElement('h5');
    h5.className = "mb-1"
    var p = document.createElement('p');
    p.className = "mb-1";

    // set message details as innerHTML
    h5.innerHTML = `${data.message.display_name} (${data.message.datetime})`;
    p.innerHTML = data.message.content;
    a.style.color = "white";

    // order elements
    $(div).append($(h5));
    $(a).append($(div));
    $(a).append($(p));

    // insert block into channel.html at the bottom; for most recent messages at the bottom, use append()
    $(".list-group").append($(a));
}

function cloneMessageToBottom(data) {
    // else at least 1 message, clone existing message to bottom and update content
    $(".list-group-item:first").clone().appendTo(".list-group");
    $("h5").last().html(`${data.message.display_name} (${data.message.datetime})`);
    $("p").last().html(data.message.content);    
}