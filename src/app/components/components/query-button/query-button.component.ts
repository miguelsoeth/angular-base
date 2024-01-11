import { QueryHistoryService } from './query-history.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { UserService } from '../../template/user.service';

export interface DialogData {
  type: string;
  document: string;
  date: string;
  interval: number;
}

@Component({
  selector: 'app-query-button',
  templateUrl: './query-button.component.html',
  styleUrls: ['./query-button.component.css']
})
export class QueryButtonComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialogQuery(): void {
    const dialogRef = this.dialog.open(QueryButtonDialog, {
      width: '50%'
    });
  }

}

@Component({
  selector: 'query-button-dialog',
  templateUrl: 'query-button-dialog.html',
  styleUrls: ['./query-button.component.css'],
})
export class QueryButtonDialog implements OnInit{

  myForm: FormGroup;
  documentType: string[] = ['CPF', 'CNPJ'];
  dateInterval: { label: string; value: number }[] = [
    { label: '3 meses', value: 3 },
    { label: '6 meses', value: 6 },
    { label: '1 ano', value: 12 }
  ];

  constructor(
    public dialogRef: MatDialogRef<QueryButtonDialog>,
    private formBuilder: FormBuilder,
    private userServiceData: UserService,
    private queryHistoryService: QueryHistoryService) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      typeField: ['', Validators.required],
      documentField: ['', Validators.required],
      dateField: ['', Validators.required],
      intervalField: ['', Validators.required],
    });
    this.myForm.get('documentField')?.disable();
    this.myForm.get('typeField').valueChanges.subscribe((value) => {
      if (value) {
        this.myForm.get('documentField')?.enable();
      }
    });
  }
  
  data: DialogData = {
    type: '',
    document: '',
    date: '',
    interval: 0
  };

  closeDialog(): void {
    this.dialogRef.close();
  }

  search(): void {
    this.userServiceData.getUsername;
    this.data.type = this.myForm.value.typeField;
    this.data.date = moment(this.myForm.value.dateField).format('DDMMYYYY');
    this.data.document = this.myForm.value.documentField;
    this.data.interval = this.myForm.value.intervalField;
    console.log(this.data);
    
    const intervalMonths: number = parseInt(this.myForm.value.intervalField);
    const currentDate = moment(this.myForm.value.dateField);
    const newDate = currentDate.subtract(intervalMonths, 'months');
    console.log(newDate.format('DDMMYYYY').toString());
    this.queryHistoryService.showMessage("Buscando...");
    this.dialogRef.close();
  }
}
