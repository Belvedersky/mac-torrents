from tkinter import * 
from search import * 

class GUI_Function():

    def torrentsParse(self, event):
        userParse = textBoxParsing.get()
        self.torrentsList = Search(userParse)
        torrentsListBox.delete(0, END)
        torrentPropertyListBox.delete(0,END)
        for torrent in self.torrentsList:
            torrentsListBox.insert(END, torrent.text)
        
    def onselectTorrent(self, event):
        widget = event.widget
        index = int(widget.curselection()[0])
        linkTorrent = self.torrentsList[index].get("href")
        torrent, magnet = ParsingTorrent(linkTorrent)
        self.printTorrentInListBox(torrent, magnet)

    def printTorrentInListBox(self, torrent, magnet):
        torrentPropertyListBox.delete(0,END)
        torrentPropertyListBox.insert(END, torrent)
        torrentPropertyListBox.insert(END, magnet)

GUI_Function = GUI_Function()

root = Tk()
root.title("MacTorrentParser")
root.geometry("1000x780+300+200")

textBoxParsing = Entry(root)
textBoxParsing.bind("<Return>", GUI_Function.torrentsParse)
textBoxParsing.pack()

buttonParsing = Button(root, bg = "red", text ="Parse!", command = GUI_Function.torrentsParse).pack()

torrentsListBox = Listbox(root, height = 20, width = 100, selectmode = SINGLE)
torrentsListBox.bind('<<ListboxSelect>>', GUI_Function.onselectTorrent)
torrentsListBox.place(x = 20, y = 20)
torrentsListBox.pack()

torrentPropertyListBox = Listbox(root, height = 120, width = 50, selectmode = SINGLE)
torrentPropertyListBox.place(x = 120, y = 120)
torrentPropertyListBox.pack()

root.mainloop()
