function isPosValid(newPos, startPos) {
  const [a1, b1, c1] = newPos;
  const [a0, b0, c0] = startPos;
  const asame = a1 === a0; const bsame = b1 === b0; const
    csame = c1 === c0;
  switch(true) {
    case (asame && (!bsame) && c0 >= 0):
    case (asame && bsame && csame):
    case (!asame && (c1 > 0)):
    case (asame && bsame && (c1 - c0 != 1)):
    return false;
  }
  return newPos;
}

function getPos(line, char, lastPos) {
  const [a0, b0, c0] = lastPos;
  let a = a0; let b = b0; let c = c0;
  const result = [];
  for (; a < line.length; a += 1, b = 0, c = 0) {
    const word = line[a];
    for (; b < word.length; b += 1, c = 0) {
      const str = word[b];
      for (; c < str.length; c += 1) {
        const strarr = str.split('');
        const t = strarr[c] || '';
        if (t.toUpperCase() === char.toUpperCase()) {
          if (isPosValid([a, b, c], lastPos)) {
            result.push([a, b, c]);
          }
        }
      }
    }
    if (result.length)
      break;
  }
  return result;
}

function max(arr = []) {
  return arr.reduce((m, current) => {
    if (current.length > m.length) {
      return current;
    }
    return m;
  }, [])
}

function getSubTestRank(line, subTest, startPos, parentRank = []) {
  if (!subTest.length) return parentRank;
  const positions = getPos(line, subTest[0], startPos);
  if (positions && positions.length) {
    const newSubranks = positions.map((newPos) => {
      let newRank = parentRank.map(a => a);
      if (newPos[0] === 0)
        newRank = [0];
      if (newPos[0] !== startPos[0]) {
        newRank.push(newPos[0])
      }
      return getSubTestRank(line, subTest.slice(1), newPos, newRank)
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
    const r = [];
    const sarr = s.split('');
    sarr.forEach(c => {
      const x = this.map[c];
      if (x) {
        r.push(x.concat(c));
      } else {
        r.push([c])
      }
    });
    return r;
  }

  initDict(wordMap) {
    Object.keys(wordMap).forEach(k => {
      const s = wordMap[k].split('');
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
    const arr = this.genPinyin(str);
    const testArr = test.split('');
    let startPos = [0, 0, -1];
    const x = getSubTestRank(arr, testArr, startPos, [])
    return x;
  }
}

module.exports = Pinyin;
