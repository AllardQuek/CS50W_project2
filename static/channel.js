document.addEventListener('DOMContentLoaded', () => {
    // configure button to consolidate user's message info 
    document.getElementById('send_message').onclick = () => {
        var display_name = localStorage.getItem('displayName');
        var content = document.getElementById('textarea').value;
        var datetime = new Date().toLocaleString();
        var channel_name = document.getElementById('channel_name').innerHTML;

        // emit event to check message limit and store info server-side
        socket.emit('send_message', {'display_name': display_name, 'content': content, 'datetime': datetime, 'channel_name': channel_name});
    };
});

// remember the channel user is on before leaving the page
window.addEventListener('beforeunload', () => {
    localStorage.setItem('previousChannel', document.getElementById('channel_name').innerHTML);
    });