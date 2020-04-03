import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


import { AppComponent,NewPlayerDialog } from './app.component';
import { BingoComponent } from './bingo/bingo.component';
import { BingoService } from './bingo.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';

import { PlayerListComponent } from './player-list/player-list.component';
import { SearchPlayerPipe } from './player-list/search-player.pipe';

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule, 
    ReactiveFormsModule,
    MatInputModule, 
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatDialogModule,
    MatListModule,
    MatFormFieldModule
    
  ],
  declarations: [ 
    AppComponent, 
    BingoComponent, 
    PlayerListComponent, 
    SearchPlayerPipe,
    NewPlayerDialog
  ],
  bootstrap: [ 
    AppComponent 
  ],
  providers: [ 
    BingoService 
  ]
})
export class AppModule { }
