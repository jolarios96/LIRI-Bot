// dependencies
require("dotenv").config();

// importing keys and packages
var keys = require('./keys');
var Spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');
var fs = require('fs');

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

                if (songList[i].album.name) {
                    console.log('  Album: ' + songList[i].album.name);
                } else {
                    console.log('  Album: not available')
                }

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
var query = process.argv[2];
var dataInput = process.argv.slice(3).join(' ');

switch (query) {
    case 'spotify-this-song':
        getSpotifyData(dataInput);
        break;
    case '':
        break;
}
console.log(dataInput);