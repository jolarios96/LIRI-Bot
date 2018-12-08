// dependencies
require("dotenv").config();

// importing keys and packages
var keys = require('./keys');
var Spotify = require('node-spotify-api');

// currently unused
// var axios = require('axios');
// var moment = require('moment');
// var fs = require('fs');

// importing inquirer for ease of use and scalability
var inquirer = require('inquirer');

var spotify = new Spotify(keys.spotify);

// functions
var getSpotifyData = function (songTitle, limit) {

    spotify.search(
        {
            type: 'track',
            query: songTitle,
            limit: limit
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

// MAIN DRIVER

// logic without inquirer: 
//
// // read command
// var query = process.argv[2];
//
// // read data given
// var dataInput = process.argv.slice(3).join(' ');
//
// switch statement per command (if multiple), else, standalone function
// ---------- End of Psuedocode ----------

//------------------------------------------------------------------
// to use data from random.txt, structure like so:
//
// var fs.readFile('random.txt', 'utf8', function(error, data){
//   var extData = data.split(',');
//   if (extData.length === 2){
//      return extData[2];
//   } else {
//      return 'insufficient data';
//   }
// });
//
// then feed the data into the standalone function 'spotify-this-song'
// ---------- End of Psuedocode ----------

inquirer.prompt([
    {
        type: 'list',
        message: 'Choose a function: ',
        choices: ['spotify-this-song (Search for song by Name on Spotify)', 'Exit'],
        name: 'query',
    },
]).then(function (response) {
    switch (response.query) {
        case 'spotify-this-song (Search for song by Name on Spotify)':
            inquirer.prompt([
                {
                    type: 'input',
                    message: 'Input a song!\n',
                    name: 'input'
                },
                {
                    type: 'list',
                    message: 'How many results?\n',
                    choices: ['1', '5', '10', '25', '50'],
                    name: 'limit'
                }
            ]).then(function (response) {
                if (!response.input) {
                    console.log('No input.')
                    return;
                } else {
                    getSpotifyData(response.input, response.limit);
                    console.log('Loading . . .')
                }
            });
            break;

        case 'Exit':
            break;
    }
});