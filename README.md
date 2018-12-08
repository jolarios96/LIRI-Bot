# LIRI-Bot
A language interpretation/recognition interface node.js application, in this case is fed parameters to return data from the Spotify API.

# Usage & Features
- Select from the list of functions: (more options in the future)
![Screencap of the inquirer prompt menu](images/function-menu.png)

- In this case we look up data from Spotify by song name:
![Screencap of a completed Song Search](images/complete-program.png)

# Planned Features
- concert-this: search the Bands in Town Artist Events API for an artist and render the following info:
- - Name of the Venue
- - Venue Location
- - Date/Time of the event (MM/DD/YYY)

- movie-this: search a movie by name to grab various data and ratings via the OMDB API.
- - title, release year, plot, actors, language, the country the movie was produced in.
- - get ratings from IMDB and Rotten Tomatoes

# Requirements:
- You will need a Spotify API key, and to create a .env file in which to store it in. like so:
```
# Spotify API key
SPOTIFY_ID=
SPOTIFY_SECRET=
```
- You will also need to install dependencies as needed via the terminal:
```
npm i
```
or
```
npm install
```
