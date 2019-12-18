#!/usr/bin/env node

/**
 * mac-torrents CLI app for parse torrents website
 * Search,download and open .torrents
 */
const menu = require('../lib');
const argv = require('minimist')(process.argv.slice(2));

console.dir(argv);
menu.start();
