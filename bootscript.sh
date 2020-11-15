mongo(){
echo "" > mongolog.txt;
mongod >> mongolog.txt & export mongopid=$!
echo "mongo started"
}

backend(){
echo "" > nodelog.txt;

cd backend;
if [ "$1" == "true" ] ;
then
npm install >> ../nodelog.txt 2>&1;
fi
node index.js >> ../nodelog.txt 2>&1 & export nodepid=$!
cd ..;
echo "backend started"

}

frontend(){
echo "" > reactlog.txt;
cd frontend;
if [ "$1" == "true" ] ;
then
npm i >> ../reactlog.txt 2>&1;
fi
npm start >> ../reactlog.txt 2>&1 & export reactpid=$!
cd ..;
echo "frontend started"

}


while test $# -gt 0; do
    if [ "$1" == "-all" ]; then
        mongo;
        backend true;
        frontend true;
    fi
    
    if [ "$1" == "-mongo" ];
    then
        mongo
    fi
    
    if [ "$1" == "-backend" ];
    then
        shift
        backend $1
    fi
    
    if [ "$1" == "-frontend" ];
    then
        shift
        frontend $1
    fi
    
    shift
done

exit 0;

