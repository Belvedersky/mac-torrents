from flask import Flask,render_template,request, redirect, url_for
from parser import getSearch, torrentList

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():

    if request.method == 'GET':   
        return render_template('index.html', getMethod = 'GET')

    if request.method == 'POST':
        search = request.form['search']
        getSearch(search)
        return redirect(url_for('result'))

@app.route('/result')
def result():
    torrentsList = torrentList()
    return render_template('result.html', torrentsList = torrentsList)
    

if __name__ == '__main__':
    app.run(port=5001)