import { Component, Input, OnInit } from '@angular/core';
import { BingoService } from '../bingo.service';

@Component({
  selector: 'bingo-card',
  templateUrl: './bingo.component.html',
  styleUrls: ['./bingo.component.css']
})
export class BingoComponent implements OnInit {
  card
  constructor(private bingoService: BingoService) { 
  }
  @Input() 
  code: string;


  
  isPicked(n) {
    return this.bingoService.pickedNumbers.find(function(v) { return n == v});
  }
  isCenter(n) {
    return isNaN(n);
  }
  ngOnInit() {
    this.card = this.bingoService.deserializeCard(this.code);
  }

}