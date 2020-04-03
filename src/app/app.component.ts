import { Component,HostBinding,OnInit } from '@angular/core';
import { BingoService } from './bingo.service';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Player } from './models/Player';

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
export class AppComponent implements OnInit {
  constructor(public bingoService: BingoService,public dialog: MatDialog) {} 
  ngOnInit() {
    this.bingoService.getPlayers().subscribe(players => this.players = players)
  }

  title = '';
  lastPick = null;
  pickedNumbers = this.bingoService.pickedNumbers;
  players:Player[]

  public newPlayer() {
    const dialogRef = this.dialog.open(NewPlayerDialog, {});

    dialogRef.afterClosed().subscribe(data => {
      let codes = [];
      for (var i = 0; i < parseInt(data[1]); i++) {
        codes.push(this.bingoService.generateBingoCard());
      }
      let p = new Player(data[0], codes)
      this.bingoService.addPlayer(p)
    });
  }

  public columnName(n) {
    if (n) {
      let cols = ['B','I','N','G','O'];
      return cols[Math.floor(n/15)];
    }
  }

  public pickNumber() {
    this.lastPick = this.bingoService.pickNumber();
  }  
}

@Component({
  selector: 'new-player-dialog',
  templateUrl: './new-player/new-player.component.html'
})
export class NewPlayerDialog {
  cancel() {

  }

  playerName = new FormControl('', [
    Validators.required
  ]);
  amount = new FormControl('6', [
    Validators.required,
    Validators.min(1),
    Validators.max(100)
  ]);
}