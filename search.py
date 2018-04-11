import requests
from bs4 import BeautifulSoup

def Search(searchName):
    currentPage = 1
    category = ""
    name = f"?s={searchName}"
    torrentList = ParsingTorrents(category, currentPage, name)

    return torrentList

def ParsingTorrents(category, currentPage, name):
    link = f"https://mac-torrent-download.net/{category}page/{currentPage}/{name}"
    requestsall = requests.get(link)
    soup = BeautifulSoup(requestsall.content, "html.parser")
    torrents_search = soup.find_all("a",{"rel":"bookmark"})
    
    return torrents_search


def ParsingTorrent(linkTorrent):
    #Парсинг выбранного торрента
    requestsUser = requests.get(linkTorrent)
    soup = BeautifulSoup(requestsUser.content, "html.parser")

    #Получаем массив из двух объектов(в 1 будет Магнет ссылка, во втором ссылка на Торрент)
    arrayMagtenAndTorrent = soup.find_all('li', {"class": "btn-list"})
    linkMagnet = arrayMagtenAndTorrent[0].next.get("href")
    linkTorrent = arrayMagtenAndTorrent[1].next.get("href")

    #Дальше парсим магнет ссылку
    requestsMagnet = requests.get(linkMagnet)
    soupMagnet = BeautifulSoup(requestsMagnet.content, "html.parser")

    #Заодно парсим торрент ссылку
    requestsTorrent = requests.get(linkTorrent)
    soupTorrent = BeautifulSoup(requestsTorrent.content, "html.parser")

    #Ссылка на скачку магнет
    magnet = soupMagnet.find('p', {"id":"dlbtn"}).next.get("href")

    #Ссылка на скачку торрент файла
    torrent = soupTorrent.find('p', {"id":"dlbtn"}).next.get("href")
    
    return (torrent, magnet)

