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
var spotifyData = function (songTitle) {
    spotify.search(
        {
            type: 'track',
            query: song,
        },
        
        function (err, data) {
            if (err) {
                return;
            } else {
                var songList = data.tracks.items;

                for (var i = 0; i < songList.length; i++) {
                    console.log('Track ' + i + ' of ' + songList.length);
                    console.log('Album: ');
                    console.log('Song Title: ');
                    console.log('Artist(s): ');
                    console.log('Preview Link: ');
                    console.log();
                };
            };
        }
    );
};

// main app driver
var query = process.argv[2];
var dataInput = process.argv.slice(3).join(' ');
console.log(dataInput);