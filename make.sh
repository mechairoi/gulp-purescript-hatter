git submodule init
cd purescript-hatter
npm install
bower install
$(npm bin)/gulp bin
cp output/node_modules/index.js ../
