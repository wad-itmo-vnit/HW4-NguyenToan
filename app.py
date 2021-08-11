from flask import Flask, render_template, send_file, request, Response
from flask_socketio import SocketIO, send, emit
import prediction
import time
import threading
from threading import Lock, Event

event_obj = Event()
lock = Lock()


# Auto chat
auto_mess = []
def auto_chat():
    global auto_mess
    while True:
        time.sleep(10)
        # lock.acquire()
        auto_mess.append('Please leave a review for this movie!')
        # event_obj.set()
        # lock.release()
        
autoChat = threading.Thread(target=auto_chat)
autoChat.start()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

# Chatbot answering route
@app.route('/chat', methods=[ 'POST'])
def chat():
    req = request.form.get('message')
    print(f'\n\n{type(req)}\n\n')
    ans = prediction.predict(req)
    print(f'\n\n{ans}\n\n')
    if ans < .3:
        print("\n\n" ,ans, "\n\n")
        return 'I hate this movie too'
    else:
        print("\n\n" ,ans, "\n\n")
        return 'Yes, this movie is very good'
    

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
    return render_template('chatbox.html', method="socket")
    
@socketio.on('message')
def handle_message(data):
    response = prediction.predict(data) # Model AI 
    if response < .4:
        print("\n\n" ,response, "\n\n")
        send('I hate this movie too')
    else:
        print("\n\n" ,response, "\n\n")
        send('Yes, this movie is very good')
    
    
if __name__ == '__main__':
    socketio.run(app, host='localhost', port=5000, debug=True)
