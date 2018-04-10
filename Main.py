from tkinter import *
from search import *

class Parsing():

    def button_parse(self):
        userParse = text1.get("1.0", END)
        self.torrentsList = Search(userParse[0:-1])
        for torrent in self.torrentsList:
            TorrentsListBox.insert(END, torrent.text)
        
    def onselect(self, event):
        widget = event.widget
        index = int(widget.curselection()[0])
        linkTorrent = self.torrentsList[index].get("href")
        torrent, magnet = ParsingTorrent(linkTorrent)
        TorrentBox.insert(END, torrent)
        TorrentBox.insert(END, magnet)

parsingFunc = Parsing()

root = Tk()
root.title("MacTorrentParser")
root.geometry("1000x780+300+200")

text1 = Text(root, height = 1, width = 13, font = "Arial 14", wrap = WORD )
text1.pack()

button1 = Button(root, bg = "red", text ="Parse!", command = parsingFunc.button_parse)
button1.pack()

TorrentsListBox = Listbox(root, height = 20, width = 100, selectmode = SINGLE)
TorrentsListBox.bind('<<ListboxSelect>>', parsingFunc.onselect)
TorrentsListBox.place(x = 20, y = 20)

TorrentBox = Listbox(root, height = 120, width = 50, selectmode = SINGLE)
TorrentBox.place(x = 120, y = 120)

TorrentsListBox.pack()
TorrentBox.pack()

torrentsList = ""

root.mainloop()
