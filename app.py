from flask import Flask, render_template, send_file, request
from flask_socketio import SocketIO, send, emit


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


@app.route('/chat/', methods = ['POST', 'GET'])
def index():
    return render_template('chatbox.html')
    

# Receiving message
@socketio.on('message')
def handle_message(data):
   
    send(data)
    

if __name__ == '__main__':
    socketio.run(app, host='localhost', port=5000, debug=True)
