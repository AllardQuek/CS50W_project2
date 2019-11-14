import os
import requests

from flask import Flask, jsonify, render_template, request, redirect, flash, url_for
from flask_socketio import SocketIO, emit
from datetime import datetime

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

channels = list()
messages = dict()   # messages will be a dictionary containing each channel's lists of messages, 
                    # where each message is a dictionary storing the message, displayname and timstamp

@app.route("/")
def index():
    socketio.emit('check_previous_channel', broadcast=True)     # When you want to emit from a regular route you have to use socketio.emit(), 
                                                                # only socket handlers have the socketio context necessary to call the plain emit().
    return render_template("index.html", channels=channels)

@app.route("/channel/<channel_name>", methods=["GET", "POST"])
def view_channel(channel_name):
    return render_template("channel.html", channels=channels, channel_name=channel_name, channel_messages=messages[channel_name])


@socketio.on("create_channel")
def create(data):

    channel_name = data["channel_name"]
    if channel_name in channels:
        emit("existing channel", broadcast=True)

    else:
        # if channel name not taken, add to channels list and initialise a list to store this channel's messages
        channels.append(channel_name)
        messages[channel_name]= []

        # redirect to the channel's page
        emit('success_redirect', {'url': url_for('view_channel', channel_name=channel_name)}, broadcast=True)

@socketio.on("send_message")
def send(data):

    channel_name = data["channel_name"]
    number_of_messages = len(messages[channel_name])

    # if stored maximum of 100 messages, remove first/oldest message
    if number_of_messages >= 100:
        messages[channel_name].pop(0)

    # create a dictionary to store the details of the message 
    message = dict()
    message["content"] = data["content"]
    message["display_name"] = data["display_name"]
    message["datetime"] = data["datetime"]

    # append message to the channel's list of messages stored server-side
    messages[channel_name].append(message)

    emit("message_sent", {'message': message, 'number_of_messages':number_of_messages}, broadcast=True)


# allows running of flask app via CLI using 'python application.py' without setting FLASK_APP variable
if __name__ == "__main__":
    socketio.run(app)