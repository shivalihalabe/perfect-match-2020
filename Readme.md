# Commands:
Note: These only work for linux/mac. It is intended to run on an ubuntu 18.04 linux server


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
