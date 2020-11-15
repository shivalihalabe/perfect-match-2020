echo "" > mongolog.txt;
mongod >> mongolog.txt & export mongopid=$!
echo "mongo started";

git fetch --all;
git reset --hard origin/master;

echo "" > nodelog.txt;
cd frontend;
npm i;
npm run build;
cd ..;

cd backend;
npm install >> ../nodelog.txt 2>&1;
NODE_ENV=production screen -d -m -S pm20 node index.js >> ../nodelog.txt 2>&1 & export nodepid=$!
echo "backend started";

cd ..
