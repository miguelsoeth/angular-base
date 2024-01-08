import { Component, OnInit } from '@angular/core';

interface document {
  type: string;
}

interface date {
  interval: string;
}

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.css']
})
export class SearchDialogComponent implements OnInit {
  
  selectedDocumentType: string;

  constructor() { }

  ngOnInit(): void {
  }

  documents: document[] = [
    {type: 'CNPJ'},
    {type: 'CPF'}
  ];

  dates: date[] = [
    {interval: '3 Meses'},
    {interval: '6 Meses'},
    {interval: '12 Meses'}
  ];

}
