(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  function isPosValid(newPos, startPos) {
    var _newPos = _slicedToArray(newPos, 3),
        a1 = _newPos[0],
        b1 = _newPos[1],
        c1 = _newPos[2];

    var _startPos = _slicedToArray(startPos, 3),
        a0 = _startPos[0],
        b0 = _startPos[1],
        c0 = _startPos[2];

    var asame = a1 === a0;
    var bsame = b1 === b0;
    var csame = c1 === c0;

    switch (true) {
      case asame && !bsame && c0 >= 0: // 同字，不同音

      case asame && bsame && csame: // 完全相同，忽略

      case (!asame || !bsame || c0 < 0) && c1 > 0: // 切换字时，从首字母开始匹配

      case asame && bsame && c1 - c0 != 1:
        // 检测拼音是否连续
        return false;
    }

    return newPos;
  }

  function getPos(line, char, lastPos) {
    var _lastPos = _slicedToArray(lastPos, 3),
        a0 = _lastPos[0],
        b0 = _lastPos[1],
        c0 = _lastPos[2];

    var a = a0;
    var b = b0;
    var c = c0;
    var result = [];

    for (; a < line.length; a += 1, b = 0, c = 0) {
      var word = line[a];

      for (; b < word.length; b += 1, c = 0) {
        var str = word[b];

        for (; c < str.length; c += 1) {
          var strarr = str.split('');
          var t = strarr[c] || '';

          if (t.toUpperCase() === char.toUpperCase()) {
            if (isPosValid([a, b, c], lastPos)) {
              result.push([a, b, c]);
            }
          }
        }
      }

      if (result.length) break;
    }

    return result;
  }

  function max() {
    var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return arr.reduce((m, current) => {
      if (current.length > m.length) {
        return current;
      }

      return m;
    }, []);
  }

  function getSubTestRank(line, subTest, startPos) {
    var parentRank = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    if (!subTest.length) return parentRank;
    var positions = getPos(line, subTest[0], startPos);

    if (positions && positions.length) {
      var newSubranks = positions.map(newPos => {
        var newRank = parentRank.map(a => a);

        if (newPos[0] === 0) {
          newRank = [0];
        }

        if (newPos[0] !== startPos[0]) {
          newRank.push(newPos[0]);
        }

        return getSubTestRank(line, subTest.slice(1), newPos, newRank);
      });
      return max(newSubranks);
    } else {
      return [];
    }
  }

  class Pinyin {
    constructor(wordMap) {
      this.map = {};
      this.initDict(wordMap || {});
    }

    genPinyin(s) {
      var r = [];
      var sarr = s.split('');
      sarr.forEach(c => {
        var x = this.map[c];

        if (x) {
          r.push(x.concat(c));
        } else {
          r.push([c]);
        }
      });
      return r;
    }

    initDict(wordMap) {
      Object.keys(wordMap).forEach(k => {
        var s = wordMap[k].split('');
        s.forEach(c => {
          if (this.map[c]) {
            this.map[c].push(k);
          } else {
            this.map[c] = [k];
          }
        });
      });
    }

    test(str, test) {
      var arr = this.genPinyin(str);
      var testArr = test.split('');
      var startPos = [0, 0, -1];
      var x = getSubTestRank(arr, testArr, startPos, []);
      return x;
    }

  }

  module.exports = Pinyin;

}));
