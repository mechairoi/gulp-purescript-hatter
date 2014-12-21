git submodule init
cd purescript-hatter
npm install
bower install -p
$(npm bin)/gulp bin
cp output/node_modules/index.js ../hatter.js
