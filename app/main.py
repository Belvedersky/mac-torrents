from flask import Flask,render_template,request, redirect, url_for, make_response
from parser import torrentList, Search
from categories import getCategories

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        return render_template('index.html', getMethod = 'GET')

    if request.method == 'POST':
        search = request.form['search']
        page = 1
        return redirect(url_for('result', search = search, pages = page))



@app.route('/search/', methods=['GET', 'POST'])
def result():
    searchName = request.args['search']
    page = request.args['pages']
    torrentsList,searchResult = torrentList(searchName, page)
    return render_template('result.html',
                            torrentsList = torrentsList,
                            searchResult = searchResult,
                            categories = getCategories())


@app.route('/categorys/', methods=['GET', 'POST'])
def categorys():
    category = request.args['category']
    url = request.args['url']
    torrentsList, searchResult = Search(url)

    return render_template('result.html',
                            torrentsList = torrentsList,
                            searchResult = searchResult,
                            category = category,
                            categories = getCategories())



if __name__ == '__main__':
    # app.run(port=5001, use_reloader=True)
    app.run(port=5001, use_reloader=True, debug=True) 
    # не удаляй, это фронтенд смотреть 
    # ток с дебагом изменения видны 


