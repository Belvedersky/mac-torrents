from flask import Flask,render_template,request, redirect, url_for
from parser import *
app = Flask(__name__)


@app.route('/',methods=['GET', 'POST'])
def index():
    items = torrentList()  
    if request.method == 'POST':
        search = request.form['search']
        getSearch(search=search)
        return redirect(url_for('index'))         
    return render_template('index.html', torrents = items )  

if __name__ == '__main__':
    app.run(debug=True)