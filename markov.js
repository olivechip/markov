/** Textual markov chain generator */

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    const map = new Map();

    for (let i = 0; i <= this.words.length-1; i++){
      let currentWord = this.words[i]
      let nextWord = this.words[i+1] || null;
      

      if (map.has(currentWord)){
        map.get(currentWord).push(nextWord);
      } else {
        map.set(currentWord, [nextWord]);
      }
    }
    this.chains = map;
    // console.log(this.chains);
    // console.log('end chain')
  }

  // return a random choice from arr
  static choice(arr){
    return arr[Math.floor(Math.random()*arr.length)];
  }

  /** return random text from chains */
  makeText(numWords = 100) {

    let keys = Array.from(this.chains.keys());
    let randomKey = MarkovMachine.choice(keys);
    let words = [];

    // console.log('arr of map...')
    // console.log(keys)

    // randomized the first word, pushed into final word array
    while (words.length < numWords && randomKey !== null){
      words.push(randomKey);
      randomKey = MarkovMachine.choice(this.chains.get(randomKey));
    }
    // console.log(words)
    console.log(words.join(" "));
  }
}

// let mm = new MarkovMachine('i like green eggs and i dislike green ham')
// mm.makeChains();
// mm.makeText(5)
module.exports = { MarkovMachine };