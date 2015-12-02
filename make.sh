git submodule init
cd purescript-hatter
npm install
bower install
$(npm bin)/gulp bin
cp index.js ../hatter.js
echo "module.exports = PS['Text.Hatter'].hatter;" >> ../hatter.js
