import { Component,HostBinding } from '@angular/core';
import { BingoService } from './bingo.service';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {
  trigger,
  state,
  style,
  animate,
  transition
  } from '@angular/animations';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  constructor(public bingoService: BingoService,public dialog: MatDialog) {} 

  cards = [];
  title = '';
  lastPick = null;
  pickedNumbers = this.bingoService.pickedNumbers;

  newPlayer() {
    const dialogRef = this.dialog.open(NewPlayerDialog, {
      height: '240px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.bingoService.playerCards.push({
        name:name,
        codes:JSON.parse(JSON.stringify(this.bingoService.codes))
      })
    });
    //this.bingoService.cdRef.detectChanges();
  }

  copyCodes() {
    this.copyToClipboard(this.bingoService.codes.join(','));
  }
  pasteCodes() {
    let codes = prompt()
    if (codes) {
      this.bingoService.codes=codes.split(',');
    }
    this.cards = this.bingoService.codes
  }

  columnName(n) {
    if (n) {
      let cols = ['B','I','N','G','O'];
      return cols[Math.floor(n/15)];
    }
  }

  pickNumber() {
    this.lastPick = this.bingoService.pickNumber();
  }
  cardCounter(n) {
    return new Array(n);
  }

  createCards(n) {
    this.bingoService.codes.length = 0;
    for(let i = 0; i < parseInt(n); i++) {
      this.bingoService.generateBingoCard();
    }
  }

  copyToClipboard(str) {
    const el = document.createElement('textarea');  
    el.value = str;                                 
    el.setAttribute('readonly', '');                
    el.style.position = 'absolute';                 
    el.style.left = '-9999px';                      
    document.body.appendChild(el);                  
    const selected =            
      document.getSelection().rangeCount > 0        
        ? document.getSelection().getRangeAt(0)     
        : false;                                    
    el.select();                                    
    document.execCommand('copy');                   
    document.body.removeChild(el);                  
    if (selected) {                                 
      document.getSelection().removeAllRanges();    
      document.getSelection().addRange(selected);   
    }
  };
}

@Component({
  selector: 'new-player-dialog',
  templateUrl: './new-player/new-player.component.html'
})
export class NewPlayerDialog {
  playerName = new FormControl('', [
    Validators.required
  ]);
  amount = new FormControl('6', [
    Validators.required,
    Validators.min(1),
    Validators.max(100)
  ]);
}