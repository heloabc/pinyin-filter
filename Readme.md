# Chinese Pinyin Filter
## 纯JS实现的拼音搜索

## 使用方法：
```
npm i -s pinyin-filter

const Pinyin = require('pinyin-filter');
const dict = require('./dict.json');

p = new Pinyin(dict);

r = p.rank('拼音', 'pinyin');
```