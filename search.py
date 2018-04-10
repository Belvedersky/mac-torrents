import requests
from bs4 import BeautifulSoup

def Search(searchName):
    mode = "search"
    page = 1
    maxPage = 1000
    if (searchName == ""):
        searchName = input(" Search: ")
    category = ""
    name = f"?s={searchName}"
    torrentList = ParsingTorrents(name, page, maxPage, category, mode)
    return torrentList

def ParsingTorrents(name, currentPage, maxPage, category, mode):
    if int(currentPage) < 0 or int(currentPage) > int(maxPage):
        print("Error number page go back...")
        CommandUser("deadlock", name, 1, maxPage, category, mode)
    link = f"https://mac-torrent-download.net/{category}page/{currentPage}/{name}"
    requestsall = requests.get(link)
    soup = BeautifulSoup(requestsall.content, "html.parser")
    torrents_search = soup.find_all("a",{"rel":"bookmark"})

    return torrents_search
        
def ParsingInformationForPagination(soup):
    pages = soup.find("div",{"class":"pagination"}).next.get_text()
    maxPage = int(soup.find("div",{"class":"pagination"}).next.get_text().split()[3])
    return pages, maxPage

def ShowCategoriesList():
    link = "https://mac-torrent-download.net/"
    print(" Wait...")
    requestsall = requests.get(link)
    soup = BeautifulSoup(requestsall.content, "html.parser")
    categories = soup.find_all("li",{"class": "menu-item"}) 
    item_torrent = 1 

    for name in categories[:27]:
        name_category = name.text 
        print(f"{item_torrent}. {name_category}") 
        item_torrent += 1 
    
    choise_torrent = int(input("\n Choice number category:")) 
    link = categories[choise_torrent-1].next.get("href").split("/")
    category = f"{link[3]}/{link[4]}/{link[5]}" 
    return category

def CommandUser(commandUser, name, currentPage, maxPage, category,mode): 
    commandMenu = True
    while commandMenu:
        if commandUser == "n":
            ParsingTorrents(name, currentPage + 1, maxPage, category, mode)
        elif commandUser == "d":
            ParsingTorrents(name, currentPage - 1, maxPage, category, mode)
        elif commandUser[0] == "p":
            pageChoiceUser = commandUser.split()
            ParsingTorrents(name, int(pageChoiceUser[1]), maxPage, category, mode)
        elif commandUser == "deadlock":
            ParsingTorrents(name, currentPage, maxPage, category,mode)
        elif commandUser == "x":
            exit()
        else:
            break

def PrintTorrentsList(torrentsList):
    print(" Wait...")
    item_torrent = 1
    for linked in torrentsList:
        print(f" {item_torrent}. {linked.text}")
        item_torrent +=1

def PrintHelpCommandInTorrentList():
    #Справка по коммандам
    print("""
 Enter number to choice download Torrent
 n - next page
 p [number page] - go to page number
 d - Previos page
    """)
        
def ParsingTorrent(linkTorrent):
    #Парсинг выбранного торрента
    requestsUser = requests.get(linkTorrent)
    soup = BeautifulSoup(requestsUser.content, "html.parser")
    #Получаем информацию о торренте
    # linkInfo_th = soup.find_all('th', {"class": "cell"})
    # linkInfo_td = soup.find_all('td', {"class": "cell"})

    #list = 1
    # print(" ----------------------")
    # for info in linkInfo_th:
    #     table_info = info.text
    #     info_torrent = linkInfo_td[list].get_text()
    #     print(f" {table_info}: {info_torrent}")
    #     list += 1
    # print(" ----------------------")

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

