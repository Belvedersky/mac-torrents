import tkinter as tk                # python 3
from tkinter import font  as tkfont # python 3


class TorrentApp(tk.Tk):

    def __init__(self, *args, **kwargs):
        tk.Tk.__init__(self, *args, **kwargs)
        self.title_font = tkfont.Font(family='Helvetica', weight="normal" ,size=28)
        self.resizable(width=False, height=False)
        self.geometry("600x580+300+200")
        # the container is where we'll stack a bunch of frames
        # on top of each other, then the one we want visible
        # will be raised above the others
        container = tk.Frame(self)
        container.pack(side="top", fill="both", expand=True)
        container.grid_rowconfigure(0, weight=1)
        container.grid_columnconfigure(0, weight=1)

        self.frames = {}
        for F in (StartPage, PageSearch):
            page_name = F.__name__
            frame = F(parent=container, controller=self)
            self.frames[page_name] = frame
            frame.grid(row=0, column=0, sticky="nsew")

        self.show_frame("StartPage")

    def show_frame(self, page_name):
        '''Show a frame for the given page name'''
        frame = self.frames[page_name]
        frame.tkraise()


class StartPage(tk.Frame):

    def __init__(self, parent, controller):
        tk.Frame.__init__(self, parent)
        self.controller = controller
        label = tk.Label(self, text="mac-torrent-download.net-parser", font=controller.title_font)
        label.pack(side="top", fill="x", pady=10)
        button1 = tk.Button(self, text="Search",
                                  borderwidth = 0,                                
                                  padx =10,
                                  command=lambda: controller.show_frame("PageSearch"))
        button1.pack()


class PageSearch(tk.Frame):

    def __init__(self, parent, controller):
        tk.Frame.__init__(self, parent)
        self.controller = controller
        button = tk.Button(self, text="back", borderwidth=0,
                           command=lambda: controller.show_frame("StartPage"))
        button.pack(side="top",fill="y", pady=10)
        label = tk.Label(self, text="Search", font=controller.title_font)
        label.pack(side="top", fill="x", pady=10)
        label2 = tk.Label(self, text="а тут инпут с кнопкой поиска")
        label2.pack(side="top", fill="x", pady=10)

if __name__ == "__main__":
    app = TorrentApp()
    app.mainloop()