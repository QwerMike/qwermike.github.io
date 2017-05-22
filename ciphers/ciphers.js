// sortByFrequencyAndRemoveDuplicates
function generateFrequencyTable(array) {
    var frequency = {}, value;
    // compute frequencies of each value
    for(var i = 0; i < array.length; i++) {
        value = array[i];
        if(value in frequency) {
            frequency[value]++;
        }
        else {
            frequency[value] = 1;
        }
    }
    // make array from the frequency object to de-duplicate
    var uniques = [];
    for(value in frequency) {
        uniques.push(value);
    }
    // sort the uniques array in descending order by frequency
    function compareFrequency(a, b) {
        return frequency[b] - frequency[a];
    }

    return uniques.sort(compareFrequency);
}

function caesarCipherEncrypt(msg) {
  var encrypted = '';
  for (var i = 0; i < msg.length; ++i) {
    encrypted += String.fromCharCode(msg.charCodeAt(i) + 3);
  }
  return encrypted;
}

function caesarCipherDecrypt(msg) {
  var decrypted = '';
  for (var i = 0; i < msg.length; ++i) {
    decrypted += String.fromCharCode(msg.charCodeAt(i) - 3);
  }
  return decrypted;
}

function simpleSubstitute(msg, fromAlphabet, toAlphabet) {
  if (fromAlphabet.length < toAlphabet.length) {
    throw alert('Cannot build substitution alphabet!');
  }
  return msg
    .split('')
    .map(function (ch) {
      var iCh = fromAlphabet.indexOf(ch);
      if (iCh == -1) {
        throw alert('Unspecified character: ' + ch + '!');
      }
      return toAlphabet[iCh];
    })
    .join('');
}

// ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz
function vigenereEncrypt(msg, key, alphabet) {
  return msg
    .split('')
    .map(function (ch, i) {
      var iCh = alphabet.indexOf(ch);
      if (iCh == -1) {
        return ch;
      }
      var iChKey = alphabet.indexOf(key.charAt(i % key.length));
      return alphabet.charAt((iCh + iChKey) % alphabet.length);
    })
    .join('');
}

function vigenereDecrypt(encrypted, key, alphabet) {
  return encrypted
    .split('')
    .map(function (ch, i) {
      var iCh = alphabet.indexOf(ch);
      if (iCh == -1) {
        return ch;
      }
      var iChKey = alphabet.indexOf(key.charAt(i % key.length));
      return alphabet.charAt((alphabet.length + iCh - iChKey) % alphabet.length);
    })
    .join('');
}

var imported = document.createElement('script');
imported.src = 'http://peterolson.github.com/BigInteger.js/BigInteger.min.js';
document.head.appendChild(imported);

// p, q - prime numbers
// returns {publicKey: k1, privateKey: k2, n: n}
function generateKeys(p, q) {
  var n = p.times(q)
    , fn = p.minus(1).times(q.minus(1));
  var e;
  do {  
    e = bigInt.randBetween(1, fn);
  } while(bigInt.gcd(e,fn) != 1);
  
  var d = e.modInv(fn);
  
  return { publicKey: e, privateKey: d, n: n };
}

// msg, e, n is a BigInteger
function rsaEncrypt(msg, e, n) {
  return msg.modPow(e, n);
}

// encrypted, d, n is a BigInteger
function rsaDecrypt(encrypted, d, n) {
  return encrypted.modPow(d, n);
}

function rsaEncryptString(msg, e, n) {
  return msg
    .split('')
    .map(function (ch) {
      var encryptedSymbol = rsaEncrypt(bigInt(ch.charCodeAt(0)), e, n);
      return String.fromCharCode(encryptedSymbol);
    })
    .join('');
}

function rsaDecryptString(encrypted, d, n) {
  return encrypted
    .split('')
    .map(function (ch) {
      var decryptedSymbol = rsaDecrypt(bigInt(ch.charCodeAt(0)), d, n);
      return String.fromCharCode(decryptedSymbol);
    })
    .join('');
}


// privateKey, publicKey, n - BigInteger
// n - prime number
// 1 <= publicKey <= n
// 1 <= privateKey <= n - 1 
function dhMixKeys(privateKey, publicKey, n) {
  return publicKey.modPow(privateKey, n);
}

// privateKey, mixedKey, n - BigInteger
// n - prime number
// 1 <= privateKey <= n - 1 
function dhSecretKey(privateKey, mixedKey, n) {
  return mixedKey.modPow(privateKey, n);
}