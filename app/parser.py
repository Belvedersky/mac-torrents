import requests
from bs4 import BeautifulSoup

def torrentList(search, page):
    link = f"https://mac-torrent-download.net/page/{page}/?s={search}"
    requestsall = requests.get(link)
    soup = BeautifulSoup(requestsall.content, "html.parser")

    maxPage = int(soup.find("div",{"class":"pagination"}).next.get_text().split()[3]) # Max page
    currentPage =  int(soup.find("span",{"class":"current"}).text)

    print(link)
    print(currentPage,maxPage)

    torrents_search = soup.find_all("a",{"rel":"bookmark"})# search name and link
    torrents_img= soup.find_all("dt",{"onselectstart" :"return false"})
    torrents_dat = soup.find_all("time",{"itemprop":"datePublished"})# search name and link
    
    torrents_name = [torName.text for torName in torrents_search] # name
    torrents_link = [torLink.get('href') for torLink in torrents_search] # link
    torrents_image = [torImg.find_next("img").get("src") for torImg in torrents_img] # image
    torrents_date = [torDat.text for torDat in torrents_dat]
    
    torrentList = list()
    for i in range(0,len(torrents_name)):
        torrentList.append(dict(name = torrents_name[i],
                                link = torrents_link[i],
                                image = torrents_image[i], 
                                date = torrents_date[i]))

    return torrentList

