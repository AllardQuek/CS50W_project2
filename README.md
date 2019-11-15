# CS50W Project 2: Flack
Web Programming with Python and JavaScript

This is an online messaging service using Flask, JavaScript and Socket.IO similar in spirit to [Slack.](https://slack.com) Built the web UI with Javascript running code server-side and Socket.IO communicating between clients and servers.

Users will be able to sign in with a display name, create channels (i.e. chatrooms) to communicate in, as well as see and join existing channels. Once a channel is selected, users will be able to send and receive messages with one another in real time. A simple personal touch I added was allowing the user to change his/her display name by clicking on the current name in the top right corner.

## What's contained in each file?
- static folder: channel.js contains javascript to be run only when on channel.html page; index.js contains    client-side javascript for all pages including the use of localStorage, alerts, and emitting socket          events; styles.css contains custom styles
- templates folder: index.html is the first page user visits; channel.html shows the current channel user is   on; error.html is not used but could be implemented where necessary during testing
- application.py contains server-side code, including global variables storing all the channels and messages
- global_variable.py is a python script I created for testing when exploring the changing of global variables
- reflections.txt contains some of my thoughts while doing the project and the unused code which reflects      the project's journey to completion
- specifications.txt is a summarised version of the tasks to be completed as given by CS50W