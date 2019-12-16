/* eslint-disable no-tabs */
const inquirer = require('inquirer');
const _ = require('lodash');
const wrapAnsi = require('wrap-ansi');
const chalk = require('chalk');

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
  // const log = console.log;
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

