const Pinyin = require('../src/index.js')
const wordDict = require('./word.json');

const pinyin = new Pinyin(wordDict);


console.log(pinyin.rank('合作项目abc', 'heuxbc'));
console.log(pinyin.rank('合作项目abc', 'hzxma'))