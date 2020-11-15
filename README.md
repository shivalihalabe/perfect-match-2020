# Perfect Match 2020

An algorithmic matchmaking quiz for Valentine's Day at Cornell. Utilizes React JS for frontend, Node JS and MongoDB for backend, and a modified version of the Gale-Shapley algorithm for pair generation. 

## Commands
These only work on Linux/Mac OS and are intended to run on an Ubuntu 18.04 Linux server.

### Start from scratch:
./bootscript.sh -all 

### General:
./bootscript.sh

with options:  
-mongo - start the mongo server  
-backend boolean - start the backend server. If boolean is true, npm i  
-frontend boolean - start the frontend server. If boolean is true, npm i  

example: ./bootscript.sh -mongo -backend false -frontend true

### Run for Production:
./prodscript.sh


### Stop command:
killall mongod; killall node;
