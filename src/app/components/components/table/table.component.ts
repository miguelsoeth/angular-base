import { QueryHistoryResponse } from './../query-button/query.model';

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TableDataSource } from './table-datasource';
import { QueryService } from '../query-button/query.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<QueryHistoryResponse>;
  dataSource: TableDataSource;
  
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['username', 'querydate', 'type', 'document', 'referreddate', 'interval', 'view'];
  
  constructor(private qService: QueryService, private router: Router) {}

  ngOnInit() {
    this.dataSource = new TableDataSource(this.qService);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  viewQueryResult(row: QueryHistoryResponse) {
    const dataFinal = moment(row.referreddate);
    const dataInicial = dataFinal.clone().subtract(row.interval, 'months').format('DD/MM/YYYY');

    const queryParams = {
      type: row.type,
      document: row.document,
      datainicial: dataInicial,
      datafinal: dataFinal.format('DD/MM/YYYY')
    };
    this.router.navigate(['/consulta/resultado'], { queryParams: queryParams});
  }
}
