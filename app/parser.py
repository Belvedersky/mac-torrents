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
    torrents_data = [torDat.text for torDat in torrents_dat]
    torrents = {'name': torrents_name, 'link': torrents_link, 'image' : torrents_image, 'date' : torrents_data}
    #print(len(torrents_name),len(torrents_link),len(torrents_image[:-24]),len(torrents_data))
    #print(len(torrents))
    #return torrents_list
    return torrents

# getSearch("adobe")
# torrentList()
