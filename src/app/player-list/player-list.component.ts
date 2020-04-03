import { Component, OnInit } from '@angular/core';
import { BingoService } from '../bingo.service';
import { Player } from '../models/Player';

@Component({
  selector: 'player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  query
  players:Player[]

  constructor(public bingoService: BingoService) { 
  }

  ngOnInit() {
    this.bingoService.getPlayers().subscribe(players => {console.log(players); this.players = players})
  }
  
  loadCards(name) {
    let p = this.players.find(function(p) {
      return p.name == name;
    });
    this.bingoService.codes = p.codes;    
  }
}