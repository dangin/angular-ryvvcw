import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class BingoService {
  playerCards = [
    {
      name: 'Dan',
      codes: ['a236ebf6ec8b5cf4d715a168','d62c55219bca2f71b4c3941e','1f3544b2f6c486438ad2f4e7','e427a47c8e45399d125a13cd','c54de81a6fa3176e2b4e8167','c6a54ab2edb5f9e9fd75ec72']
    },
    {
      name: 'Lili',
      codes: ['764cb45f8adce89452eea2f7','59e471af5bb238ea526f3169','4fb23b87f492686b4188e35a','428e6c9a1868234b8c67594e']
    }
  ];
  codes = [];
  pickedNumbers = [];
  availableNumbers = this.availableNumbersGenerator();

  assignCard(name, codes) {
    if (this.assignCard[name]) {
      prompt('This name already has cards assigned, add to existing list or')
    }
    this.assignCard[name] = codes;
  }

  availableNumbersGenerator() {
    let n = Array.from(Array(76).keys());
    n.shift();
    return n;
  }

  pickNumber() {
    let r = Math.floor(Math.random() * this.availableNumbers.length);
    let n = this.availableNumbers.splice(r,1)[0];
    this.pickedNumbers.push(n);
    return n;
  }
 
  generateBingoCard() {
    let card = [];
    for (let i = 0; i < 5;i++) {
      card.push(this.generateColumn(i*15+1,(i+1)*15,5))
    }
    let code = this.serializeCard(this.fixCard(card));
    this.codes.push(code);
  }

  generateColumn(rangeStart,rangeEnd,amount) {
    let col = [];
    let nums = [];
    for (let i = rangeStart; i <= rangeEnd; i++) {
     nums.push(i);
    }
    while (col.length < amount) {   
      let r = Math.random() * nums.length;
      let n = Math.floor(r); 
      col.push(nums.splice(n,1)[0]);
    }
    return col;
  }
  
  fixCard(card) {
    let c = [];
    for (let col = 0; col < card.length; col++) {
      let r = []
      for (let row = 0; row < card[col].length; row++) {
        if(row==2 && col==2) {
          r.push('FREE')
        } else {
          r.push(card[row][col]);
        }
      }
      c.push(r);
    }
    return c;
  }

  serializeCard(card) {
    let nums = [];
    for (let col = 0; col < card.length; col++) {
      for (let row = 0; row < card[col].length; row++) {
        let n = card[row][col] - (col*15);
        if(n>0) {
          nums.push(n.toString(16));
        }
      }
    }
    return nums.join('');
  }

  deserializeCard(s) {
    let c = [];
    let nums = [];
    for(let chr = 0; chr < s.length; chr++) {
      let row = Math.floor(chr/5);
      let n = parseInt(s[chr], 16) + (row*15);
      nums.push(n);
    }
    nums.splice(12,0,'FREE');
    c.push(nums.splice(0,5))
    c.push(nums.splice(0,5))
    c.push(nums.splice(0,5))
    c.push(nums.splice(0,5))
    c.push(nums.splice(0,5))
    return this.fixCard(c);
  }
}