import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Player } from './models/Player';
import { PLAYERS } from './mock/players';

@Injectable()
export class BingoService {
  players: Player[] = PLAYERS
  codes: string[] = [];
  pickedNumbers: number[] = [];
  availableNumbers: number[] = this.availableNumbersGenerator();

  public getPlayers():Observable<Player[]> {
    return of(PLAYERS)
  }

  private availableNumbersGenerator() {
    let n = Array.from(Array(76).keys());
    n.shift();
    return n;
  }

  public addPlayer(p:Player) {
    this.players.push(p);
  }

  public pickNumber() {
    let r = Math.floor(Math.random() * this.availableNumbers.length);
    let n = this.availableNumbers.splice(r,1)[0];
    this.pickedNumbers.push(n);
    return n;
  }
 
  public generateBingoCard() {
    let card = [];
    for (let i = 0; i < 5;i++) {
      card.push(this.generateColumn(i*15+1,(i+1)*15,5))
    }
    let code = this.serializeCard(this.fixCard(card));
    return code;
  }

  private generateColumn(rangeStart,rangeEnd,amount) {
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
  
  private fixCard(card) {
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

  private serializeCard(card) {
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

  public deserializeCard(s) {
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