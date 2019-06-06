const Pinyin = require('../src/index.js')
const wordDict = require('./word.json');

const assert = require('assert');

/**
 * rule desc: [desc, originStr, testStr, expectValue]
 */
const rules = [
  ['正常匹配','合作项目abc','hzxma',5],
  ['不匹配','合作项目abc','hzxmx',0],
  ['多音字','银行','yinhang',2],
  ['汉字原文','合作项目abc','合作',2],
  ['汉字加拼音','合作项目abc','合作x目',4],
  ['跳字','合租项目abc','hzmc',4],
  ['ｘ', '长征', 'n', 0] 
]

describe('test', function() {
  const pinyin = new Pinyin(wordDict);
  for (const rule of rules) {
    const [desc, originStr, testStr, expectValue] = rule;
    it(desc, function() {
      assert.equal(pinyin.test(originStr, testStr).length, expectValue);
    })
  }
});