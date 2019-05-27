# Chinese Pinyin Filter
## 纯JS实现的拼音匹配器
### 可用于Select组件的拼音搜索、拼音过滤、模糊搜索等场景，支持全拼、首字母、中英文混合等多种规则

## 使用方法：
```
npm i -s pinyin-test

const Pinyin = require('pinyin-test');
const dict = require('./dict.json');

p = new Pinyin(dict);

r = p.test('拼音', 'pinyin');
```
### 注意：
字典需要手动加载，可以根据实际情况选择合适的字典。
demo：[https://github.com/roughwin/pinyin-filter/blob/master/test/word.json](https://github.com/roughwin/pinyin-filter/blob/master/test/word.json)

### 功能
  #### 拼音匹配：
  p.test('合作项目', 'hezuoxiangmu') // output: 4
  #### 拼音首字母：
  p.test('合作项目', 'hzxm') // output: 4
  #### 跳字匹配
  p.test('合作项目', 'hxm') // output: 3
  #### 汉字拼音混合
  p.test('合作项目', '合作xm') // output: 4
  #### 原文汉字字母混合
  p.test('合作项目abc', 'hzxmabc') // output: 7
  #### 多音字
  p.test('银行', yinhang) // output: 2

  p.test('银行', yinxing) // output: 2

