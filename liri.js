// dependencies
require("dotenv").config();

// importing keys and packages
var keys = require('./keys');
var Spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');
var fs = require('fs');
var inquirer = require('inquirer');

var spotify = new Spotify(keys.spotify);

// functions
var getSpotifyData = function (songTitle) {

    spotify.search(
        {
            type: 'track',
            query: songTitle,
        },

        function (err, data) {
            if (err) {
                return;
            }
            var songList = data.tracks.items;

            for (var i = 0; i < songList.length; i++) {

                console.log('\nResult ' + (i + 1) + ' of ' + songList.length + ':');

                console.log('  Song Title: ' + songList[i].name);

                console.log('  Album: ' + songList[i].album.name);

                // gets name of artist(s) from data
                console.log('  Artists: ' + songList[i].artists.map(function (artist) {
                    return artist.name;
                }).join(', '));

                console.log('  Preview Link: ' + songList[i].preview_url);
            };
        }
    );
};

// main app driver

// logic without inquirer: 
//
// read command
// var query = process.argv[2];
//
// read data given
// var dataInput = process.argv.slice(3).join(' ');
//
// switch statement per command (if multiple), else, standalone function

inquirer.prompt([
    {
        type: 'list',
        message: 'Choose a function: ',
        choices: ['spotify-this-song', 'Exit'],
        name: 'query',
    },
]).then(function (response) {
    switch (response.query) {
        case 'spotify-this-song':
            inquirer.prompt([
                {
                    type: 'input',
                    message: 'Input a song!\n',
                    name: 'input'
                }
            ]).then(function (response) {
                getSpotifyData(response.input);
                console.log('Loading . . .')
            });
            break;

        case 'Exit':
            break;
    }
});