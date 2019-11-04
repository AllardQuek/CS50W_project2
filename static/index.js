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

    socket.on('success_redirect', (data) => {
        window.location = data.url;
        alert("Successfully created channel!");
        });

    socket.on('message_sent', () => {
        console.log("DOING GOOD");
        });
        
    });
