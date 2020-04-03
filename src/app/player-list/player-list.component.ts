import { Component, OnInit } from '@angular/core';
import { BingoService } from '../bingo.service';

@Component({
  selector: 'player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  query
  constructor(public bingoService: BingoService) { 
  }

  ngOnInit() {
  }
  
  loadCards(name) {
    let p = this.bingoService.playerCards.find(function(p) {
      return p.name == name;
    });
    this.bingoService.codes = p.codes;    
  }
}