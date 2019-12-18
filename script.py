from search import *
from helpList import *

def mainMenu():
    menu = True
    print("""
 s - search torrent
 c - search by categories
 n - show new torrents
 h - help
 q - exit
    """)
    while menu: 
        userKey = input(""" ///////////////
 Command: """)
        if userKey == "h":
            helpList()
        elif userKey == "s":
            Search()
        elif userKey == "n":
            ShowNewTorrents()
        elif userKey == "c":
            Categories()
        elif userKey == "q":
            menu = False
        else:
            pass
mainMenu()    

