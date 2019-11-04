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

    return render_template("index.html", channels=channels)

@app.route("/channel/<channel_name>", methods=["GET", "POST"])
def view_channel(channel_name):

    # # if user submits a message to channel
    # if request.method == "POST":
    #     if not request.form.get("content"):
    #         return render_template("error.html", message="Please enter a message")
        
    #     # if stored maximum of 100 messages, remove first/oldest message
    #     if len(messages[channel_name]) >= 100:
    #         messages[channel_name].pop(0)

    #     # append new message
    #     content = request.form.get("content")
    #     message = dict()
    #     message['content'] = content
    #     message['timestamp'] = datetime.datetime.now()
    #     # message['user'] = driver.execute_script("window.localStorage.getItem('key');");


    print(channel_name, messages)
    print(messages[channel_name])
    messages[channel_name].append("THIS IS A TEST")
    return render_template("channel.html", channels=channels, channel_name=channel_name, channel_messages=messages[channel_name])

@socketio.on("create_channel")
def create(data):
    print("BEFORE:", channels)
    channel_name = data["channel_name"]

    
    if channel_name in channels:
        print("ALREADY EXISTS")
        emit("existing channel", broadcast=True)

    else:
        # if channel name not taken, add to channels list and initialise a list to store this channel's messages
        channels.append(channel_name)
        messages[channel_name]= []
        emit('success_redirect', {'url': url_for('index')}, broadcast=True)

       #  emit("create channel", channel_name, broadcast=True)


# @socketio.on("send_message")
# def send(data):

#     # if stored maximum of 100 messages, remove first/oldest message
#     if len(messages[channel_name]) >= 100:
#         messages[channel_name].pop(0)

#     # append new message
#     messages[channel_name].append(message)

@socketio.on("send_message")
def send(data):
    message = dict()
    message["content"] = data["content"]
    message["display_name"] = data["display_name"]
    message["datetime"] = data["datetime"]
    print(message)

    channel_name = data["channel_name"]
    messages[channel_name].append(message)
    print("GOING STRONG")
    emit("sent",  broadcast = True)