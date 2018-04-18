from flask import Flask,render_template,request, redirect, url_for
from parser import torrentList

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':   
        return render_template('index.html', getMethod = 'GET')

    if request.method == 'POST':
        search = request.form['search']
        return redirect(url_for('result', search = search))


@app.route('/search/', methods=['GET', 'POST'])
@app.route('/search/page/<int:page>/', methods=['GET', 'POST'])
def result(page = 1):
    searchName = request.args['search']
    torrentsList = torrentList(searchName, page)
    return render_template('result.html', torrentsList = torrentsList)
    
if __name__ == '__main__':
    app.run(port=5001)