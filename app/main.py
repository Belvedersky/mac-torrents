from flask import Flask,render_template,request, redirect, url_for
from parser import torrentList
from categories import getCategories

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        return render_template('index.html', getMethod = 'GET', categories = getCategories())

    if request.method == 'POST':
        search = request.form['search']
        return redirect(url_for('result', search = search))


# @app.route('/categories/', methods=['GET', 'POST'])
# def categories():
#     return render_template('categories.html', categories=getCategories())


@app.route('/search/', methods=['GET', 'POST'])
@app.route('/search/page/<int:page>/', methods=['GET', 'POST'])
def result(page = 1):
    searchName = request.args['search']
    torrentsList,searchResult = torrentList(searchName, page)
    return render_template('result.html', torrentsList = torrentsList, searchResult = searchResult)
    
if __name__ == '__main__':
    app.run(port=5001, use_reloader=True)


