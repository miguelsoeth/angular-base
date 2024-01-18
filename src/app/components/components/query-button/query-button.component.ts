import { QueryService } from './query.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { UserService } from '../../template/user.service';
import { QueryHistoryModel } from './query.model';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';

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
    { label: '5 anos', value: 60 },
    { label: '10 anos', value: 120},
    { label: '50 anos', value: 600},
  ];
  maxDate = new Date();    

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${type}: ${event.value}`);
  }

  constructor(
    public dialogRef: MatDialogRef<QueryButtonDialog>,
    private formBuilder: FormBuilder,
    private userServiceData: UserService,
    private router: Router,
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
    interval_label: '',
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

    const selectedInterval = this.dateInterval.find(interval => interval.value === this.myForm.value.intervalField);
    this.qhModel.interval_label = selectedInterval.label;

    const dataFinal = moment(this.myForm.value.dateField);
    const dataInicial = dataFinal.clone().subtract(this.myForm.value.intervalField, 'months').format('DD/MM/YYYY');

    switch (this.qhModel.type) {
      case "CPF": {
        if (this.queryService.validateCpf(this.qhModel.document)) {
          this.queryService.insertQueryHistory(this.qhModel).subscribe();
          const queryParams = {
            type: this.qhModel.type,
            document: this.qhModel.document,
            datainicial: dataInicial,
            datafinal: dataFinal.format('DD/MM/YYYY')
          };
          this.router.navigate(['/consulta/resultado'], { queryParams: queryParams});
          this.dialogRef.close();
        }
        else {
          this.queryService.showMessage("CPF Inválido!");
        }
        break;
      }
      case "CNPJ": {
        if (this.queryService.validateCnpj(this.qhModel.document)) {
          this.queryService.insertQueryHistory(this.qhModel).subscribe();
          const queryParams = {
            type: this.qhModel.type,
            document: this.qhModel.document,
            datainicial: dataInicial,
            datafinal: dataFinal.format('DD/MM/YYYY')
          };
          this.router.navigate(['/consulta/resultado'], { queryParams: queryParams});
          this.dialogRef.close();
        }
        else {
          this.queryService.showMessage("CNPJ Inválido!");
        }
        break;
      }
      default: {
        console.log("tipo selecionado com erro!");
        break;
      }        
    }
  }
}

