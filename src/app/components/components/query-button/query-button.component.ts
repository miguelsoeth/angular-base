import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';

@Component({
  selector: 'app-query-button',
  templateUrl: './query-button.component.html',
  styleUrls: ['./query-button.component.css']
})
export class QueryButtonComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openSearchDialog(): void {
    const dialogRef = this.dialog.open(SearchDialogComponent, {
      width: '50%',
    });
  }

}
