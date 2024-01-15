import { QuerySearchService } from './query-search.service';
import { QueryHistoryService } from './query-history.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { UserService } from '../../template/user.service';
import { QueryHistoryModel } from './query-history.model';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

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
    { label: '1 ano', value: 12 },
    { label: '10 anos', value: 120}
  ];
  maxDate = new Date();

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${type}: ${event.value}`);
  }

  constructor(
    public dialogRef: MatDialogRef<QueryButtonDialog>,
    private formBuilder: FormBuilder,
    private userServiceData: UserService,
    private queryHistoryService: QueryHistoryService,
    private querySearchService: QuerySearchService) {}

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

  qhModel: QueryHistoryModel = {
    username: '',
    type: '',
    document: '',
    referredDate: '',
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
    
    this.queryHistoryService.showMessage("Buscando...");

    const intervalMonths: number = parseInt(this.myForm.value.intervalField);
    const currentDate = moment(this.myForm.value.dateField);
    const newDate = currentDate.subtract(intervalMonths, 'months').format('DD/MM/YYYY').toString();

    this.queryHistoryService.insertQueryHistory(this.qhModel).subscribe(() => {
      console.log("Pesquisa armazenada no histórico!");
    });

    if (this.qhModel.type === "CPF") {
      this.querySearchService.getPepData(this.qhModel.document, newDate, moment(this.myForm.value.dateField).format('DD/MM/YYYY')).subscribe(
        (result) => {
          console.log('API Response:', result);
          // Handle the result as needed
        },
        (error) => {
          console.error('API Error:', error);
          // Handle errors
        }
      );
    }
    else {
      this.querySearchService.getCepimData(this.qhModel.document, newDate, moment(this.myForm.value.dateField).format('DD/MM/YYYY')).subscribe(
        (result) => {
          console.log('API Response:', result);
          // Handle the result as needed
        },
        (error) => {
          console.error('API Error:', error);
          // Handle errors
        }
      );
    }
    this.dialogRef.close();
  }
}

/*
  const intervalMonths: number = parseInt(this.myForm.value.intervalField);
  const currentDate = moment(this.myForm.value.dateField);
  const newDate = currentDate.subtract(intervalMonths, 'months');
  console.log(newDate.format('DD/MM/YYYY').toString());
*/
