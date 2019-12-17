#!/usr/bin/env node

/**
 * mac-torrent-parser CLI app
 * Search,download and open .torrents app
 */

/* eslint-disable require-jsdoc */
/* eslint-disable no-trailing-spaces */
// eslint-disable-next-line no-unused-vars
const arg = require('arg');
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

menu.start();
