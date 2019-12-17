/* eslint-disable no-tabs */
const inquirer = require('inquirer');
const _ = require('lodash');
const wrapAnsi = require('wrap-ansi');
const chalk = require('chalk');
const config = require('./config');
'use strict';
exports.main = inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What do you want to do?',
        choices: [
          'Get top-list torrents list',
          'Search torrent by name',
          'Search torrent by categories',
          new inquirer.Separator(),
          'Settings',
        ],
      },
    ]);

exports.selectTorrents = (data) =>
  inquirer.prompt([
    {
      type: 'list',
      name: 'torrents',
      message: 'What do you want to get?',
      choices: [..._.keys(data)],
    }]);

exports.saveOrOpen = () =>
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Save ?',
      choices: [
        'Only save torrent file',
        'Save and open on torrent app',
        'Back to list',
      ],
    }]);

exports.writeTorrentInfo = (data) =>{
  console.log(chalk`
-- {blue ${data.title} } --

Date:  {green ${data.time}}
Size: {yellow ${data.size}}
Category: {rgb(255,131,0)  ${data.category}}
	`);
  console.log(wrapAnsi(data.description, 40));
  console.log('\n');
};

exports.findMenu = () =>
  inquirer.prompt([
    {
      type: 'input',
      name: 'search',
      message: 'Find: ',
    }]);

exports.categoryMenu =()=>
  inquirer.prompt([
    {
      type: 'list',
      name: 'category',
      message: 'Select category',
      choices: [..._.keys(config.torrentmac.category)],
    }]);

exports.toDo = `
TODO:
-> Add search by categories
-> Manage menu
-> Add select torrent program like: Transmittion, WebTorrent, uTorrent,
-> Add select input website as config.js and save this as .json`;
