import { QueryHistoryService } from './query-history.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { UserService } from '../../template/user.service';
import { QueryHistoryModel, QueryHistoryResponse } from './query-history.model';

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

  qhModel: QueryHistoryModel = {
    username: '',
    type: '',
    document: '',
    referredDate: '',
    interval: '',
  }

  qhData: QueryHistoryResponse = {
    id: 0,
    username: '',
    querydate: '',
    type: '',
    document: '',
    referreddate: '',
    interval: '',
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  search(): void {
    this.qhModel.username = this.userServiceData.getUsername;
    this.qhModel.type = this.myForm.value.typeField;
    this.qhModel.referredDate = moment(this.myForm.value.dateField).format('YYYY-MM-DD');
    this.qhModel.document = this.myForm.value.documentField;
    this.qhModel.interval = this.myForm.value.intervalField.toString();
    console.log(this.qhModel);
    /*
    const intervalMonths: number = parseInt(this.myForm.value.intervalField);
    const currentDate = moment(this.myForm.value.dateField);
    const newDate = currentDate.subtract(intervalMonths, 'months');
    console.log(newDate.format('DDMMYYYY').toString());
    */
    this.queryHistoryService.showMessage("Buscando...");
    this.queryHistoryService.insertQueryHistory(this.qhModel).subscribe(() => {
      console.log("Pesquisa armazenada no histórico!");
    });
    this.dialogRef.close();
  }
}
