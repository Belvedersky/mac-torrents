import requests
from bs4 import BeautifulSoup

def Search(link):
    requestsall = requests.get(link)
    soup = BeautifulSoup(requestsall.content, "html.parser")
    Result = str(soup.find("h2").get_text())
    maxPage = int(soup.find("div",{"class":"pagination"}).next.get_text().split()[3]) # Max page
    currentPage =  int(soup.find("span",{"class":"current"}).text)

    torrents_search = soup.find_all("a",{"rel":"bookmark"})# search name and link
    torrents_img= soup.find_all("dt",{"onselectstart" :"return false"})# search image
    torrents_dat = soup.find_all("time",{"itemprop":"datePublished"})# search name and link
    torrents_tags = soup.find_all("span",{"class":"pcone"})

    torrents_tag = [torTag.text[2:] for torTag in torrents_tags] #tags name 
    torrents_name = [torName.text for torName in torrents_search] # name
    torrents_link = [torLink.get('href') for torLink in torrents_search] # link
    torrents_image = [torImg.find_next("img").get("src") for torImg in torrents_img] # image
    torrents_date = [torDat.text for torDat in torrents_dat]
    
    Result = {"Result": Result, "currentPage": currentPage,
                    "Maxpage": maxPage}

    List = list()
    for i in range(0,len(torrents_name)):
        List.append(dict(name = torrents_name[i],
                                link = torrents_link[i],
                                tags = torrents_tag[i],
                                image = torrents_image[i], 
                                date = torrents_date[i]))
    
    return List, Result

def torrentList(search, page):
    link = f"https://mac-torrent-download.net/page/{page}/?s={search}"
    torrentList, searchResult = Search(link)
    return torrentList, searchResult

