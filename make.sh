git submodule init
cd purescript-hatter
npm install
bower install
$(npm bin)/gulp pack
cp hatter.js ../
