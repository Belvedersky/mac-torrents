import requests
from bs4 import BeautifulSoup

def getSearch(search):
    link = f"https://mac-torrent-download.net/?s={search}"
    return link

def torrentList():
    link = getSearch(0)
    requestsall = requests.get(link)
    soup = BeautifulSoup(requestsall.content, "html.parser")

    torrents_search = soup.find_all("a",{"rel":"bookmark"})# search name and link
    torrents_img = soup.find_all("img",{"class":"attachment-thumb100 size-thumb100 wp-post-image"})# search image
    torrents_dat = soup.find_all("time",{"itemprop":"datePublished"})# search name and link

    torrents_name = [torName.text for torName in torrents_search] # name
    torrents_link = [torLink.get('href') for torLink in torrents_search] # link
    torrents_image = [torImg.get('srcset').rsplit('?')[0][:-4] for torImg in torrents_img] # image
    torrents_date = [torDat.text for torDat in torrents_dat]

    torrentList = list()
    for i in range(0, 49):
        torrentList.append(dict(name = torrents_name[i],
                                link = torrents_link[i],
                                image = torrents_image[i], 
                                date = torrents_date[i]))

    return torrentList

