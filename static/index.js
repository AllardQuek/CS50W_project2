// localStorage.removeItem('displayName')

// if user hasn't chosen a display name, prompt user and store it locally
if (!localStorage.getItem('displayName')) {
    var displayName = prompt("Please provide a display name.");
    localStorage.setItem('displayName', displayName);
}

document.addEventListener('DOMContentLoaded', () => {

    // render chosen name at top right of window
    document.getElementById('displayName').innerHTML = localStorage.getItem('displayName');

    // Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    // When connected, configure buttons
    socket.on('connect', () => {

        // Each button should emit a "create channel" event
        document.getElementById('createChannel').onclick = () => {
                var channel_name = prompt('Channel name:');
                socket.emit('create_channel', {'channel_name': channel_name});
                console.log("EMITTED");
            };
        });

    
    socket.on('existing channel', () => {
        alert("Sorry this channel name already exists!");
        });

    socket.on('success_redirect', function (data) {
        window.location = data.url;
        alert("Successfully created channel!");
        });
    
    });

    
    // function setLink(channelName) {
    //     channelName = channel.innerHTML;
    //     channel.setAttribute('href', "{{ url_for('view_channel', channel_name=channelName)")
    // }



    //newChannel = document.querySelector('.dropdown-item').cloneNode()
        // newChannel = $('.dropdown-item').first().clone();
        // console.log("BEFORE", newChannel);
        // newChannel.innerHTML = channel_name;
        // console.log(newChannel);

    // document.getElementById('createChannel').onclick = () => {
    //     channelName = prompt('Channel name:');

    //     if (channels.has(channelName)) {
    //         alert("Channel name already exists! Please pick another name.");
    //     }

    //     channels.add(channelName);
    // };



    // Each button should emit a "submit vote" event
    // document.querySelectorAll('.dropdown-item').forEach(channel => {
    //     channel.onclick = () => {
    //         channelName = channel.innerHTML;
    //         channel.setAttribute('href', "{{ url_for('view_channel', channel_name=channelName)")
    //         const selection = button.dataset.vote;
    //         socket.emit('submit vote', {'selection': selection});
    //     };
    // });
