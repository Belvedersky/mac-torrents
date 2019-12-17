#!/usr/bin/env node

/**
 * mac-torrent-parser CLI app
 * Search,download and open .torrents app
 */
/* eslint-disable require-jsdoc */
/* eslint-disable no-trailing-spaces */
// eslint-disable-next-line no-unused-vars

const arg = require('arg');
const _ = require('lodash');
const __ = require('../lib/mac-torrents');
const menu = require('../lib/menu');

// eslint-disable-next-line no-unused-vars
const args = arg({
  // Types
  '--help': Boolean,
  '--version': Boolean,
  '--verbose': Boolean,
  '--port': Number,
  '--name': String,
  '--tag': [String],
  // Aliases
  '-v': '--verbose',
  '-n': '--name',
  '--label': '--name',
});

function getTorrentList(data) {
  const torrents = _.keyBy(data, 'title');
  menu.selectTorrents(torrents).then((answers) => {
    const name = answers.torrents; 
    __.getTorrents(torrents[name].link)
        .then((data) => {
          menu.writeTorrentInfo(data);
          return data;
        })
        .then((data) => {
          menu.saveOrOpen().then((d) => {
          // console.log(d, data, torrents);
            if (d.action === 'Save and open on torrent app') {
              __.saveAndOpenTorrent(data);
            }
            if (d.action === 'Only save torrent file') {
              __.saveTorrents(data);
            } else {
              console.clear();
              getTorrentList(torrents);
            }
          });
        });
  });
}


menu.main.then((answers) => {
  switch (answers.action) {
    case 'Get top-list torrents list':
      __.getLastTorrents().then((data) => {
        getTorrentList(data);
      });
      break;

    case 'Search torrent by name':
      // console.log('Search ->');
      menu.findMenu().then((data) => {
        __.searchTorrents(data.search).then((data) => {
          getTorrentList(data);
        });
      });
      break;

    case 'Search torrent by categories':
      menu.categoryMenu().then((data)=>{
        __.getTorrentsByCategory(data.category).then((data) => {
          getTorrentList(data);
        });
      });
      break;
    case 'Settings':
      console.log(menu.toDo);
      break;

    default:
      break;
  }
});
