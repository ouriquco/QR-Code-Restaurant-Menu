from flask import Flask
from flask import render_template, request, redirect, make_response, jsonify
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO

import db
import views

app = Flask(__name__)
CORS(app)

mysql = db.init(app)
socketio = SocketIO(app, cors_allowed_origins="*")

views.init(app, mysql, socketio)

# Initialize Flask-SocketIO


if __name__ == '__main__':
    # app.run(
    #     debug=True, 
    #     use_reloader=True
    # )
    socketio.run(app, debug=True)