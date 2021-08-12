from flask import Flask, render_template, send_file, request, Response
from flask_socketio import SocketIO, send, emit
from prediction import predict, random_message
import time
import threading



# Auto chat
auto_mess = []
def auto_chat():
    global auto_mess
    while True:
        time.sleep(10)
        auto_mess.append('Please leave a review for this film!')
        
autoChat = threading.Thread(target=auto_chat)
autoChat.start()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)
sending_to_socket = {}

# Chatbot answering route
@app.route('/chat', methods=[ 'POST'])
def chat():
    req = request.json
    print(f'\n\n{req}\n\n')
    score = predict(req['content'])
    ans = random_message(score)
    return ans


# Routes for short polling method
@app.route('/short')
def short():
    global auto_mess
    auto_mess.clear()
    return render_template('chatbox.html', method = 'short')
    
@app.route('/short/chat', methods=[ 'POST' ])
def shortChat():
    global auto_mess
    try:
        ans  = auto_mess.pop()
        return ans
    except:
        return Response('', status = 404)
    
# Long polling routes
@app.route('/long')
def long():
    global auto_mess
    auto_mess.clear()
    return render_template('chatbox.html', method = 'long')
@app.route('/long/chat', methods =[ 'POST'])
def longChat():
    global auto_mess
    while len(auto_mess) < 1 :
        pass
    ans = auto_mess.pop()
    return ans

# Socket routes
@app.route('/socket', methods = ['POST', 'GET'])
def socket():
    global auto_mess
    auto_mess.clear()
    return render_template('chatbox.html', method="socket")
    

@socketio.on('connect')
def on_connect(data):
    sending_to_socket[request.sid] = True
    auto = threading.Thread(target=autochat_to_socket, args=(request.sid,))
    auto.start()

@socketio.on('disconnect')
def on_disconnect(data):
    sending_to_socket[request.sid] = False

@socketio.on('message')
def on_message(data, methods=['GET', 'POST']):
    print(f"\n\n{data}\n\n")
    score = predict(data['content'])
    ans = random_message(score)
    socketio.send(ans, room=request.sid)


def autochat_to_socket(sid):
    while sending_to_socket[sid]:
        try:
            ans = auto_mess.pop()
            socketio.send( ans, to=sid)
        except:
            pass  




    
if __name__ == '__main__':
    socketio.run(app, host='localhost', port=5000, debug=True)
