import { QueryService } from './query.service';
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
    private queryService: QueryService) {}

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
    const intervalMonths: number = parseInt(this.myForm.value.intervalField);
    const dataFinal = moment(this.myForm.value.dateField);
    const dataInicial = dataFinal.subtract(intervalMonths, 'months').format('DD/MM/YYYY').toString();

    this.queryService.showMessage("Buscando...");    

    if (this.qhModel.type === "CPF") {
      if (this.queryService.validateCpf(this.qhModel.document)) {
        this.queryService.getPepData(this.qhModel.document, dataInicial, dataFinal.format('DD/MM/YYYY')).subscribe(
          (result) => {
            console.log('API Response:', result);
            this.queryService.insertQueryHistory(this.qhModel);
            this.dialogRef.close();
          }   
        );
      }
      else {
        this.queryService.showMessage("CPF Inválido!");
      }         
    }
    else if (this.queryService.validateCnpj(this.qhModel.document)) {
      this.queryService.getCepimData(this.qhModel.document, dataInicial, dataFinal.format('DD/MM/YYYY')).subscribe(
        (result) => {
          console.log('API Response:', result);
          this.queryService.insertQueryHistory(this.qhModel);
          this.dialogRef.close();
        }
      );
    }
    else {
      this.queryService.showMessage("CNPJ Inválido!");
    }
    
  }
}

