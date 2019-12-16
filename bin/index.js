#!/usr/bin/env node

/**
 * mac-torrent-parser CLI app
 * Search,download and open .torrents app
 */

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

menu.main.then((answers) => {
  switch (answers.action) {
    case 'Get top-list torrents list':
      __.getLastTorrents().then((data) => {
        const torrents = _.keyBy(data, 'title');
        menu.selectTorrents(torrents).then((answers) => {
          // console.log(torrents[answers.torrents]);
          __.getTorrents(torrents[answers.torrents].link)
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
                    __.getTorrents(torrents[answers.torrents].link);
                  }
                });
              });
        });
      });
      break;

    case 'Search torrent by name':
      // console.log('Search ->');
      menu.findMenu().then((data)=>{
        __.searchTorrents(data.search);
        // console.log(data);
      });
      break;
    case 'Search torrent by categories':
      console.log('Select categories -> TODO');
      break;
    case 'Settings':
      console.log(`
TODO:
-> Add search by categories
-> Manage menu
-> Add select torrent program like: Transmittion, WebTorrent, uTorrent,
-> Add select input website as config.js and save this as .json`);
      break;

    default:
      console.log(answers);
      break;
  }
});

// __.say("Hello world!");
