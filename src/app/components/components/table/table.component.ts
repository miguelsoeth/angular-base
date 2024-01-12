
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TableDataSource } from './table-datasource';
import { QueryHistoryService } from '../query-button/query-history.service';
import { QueryHistoryResponse } from '../query-button/query-history.model';

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
  displayedColumns = ['username', 'querydate', 'type', 'document', 'referreddate', 'interval'];
  
  constructor(private qhService: QueryHistoryService) {}

  ngOnInit() {
    this.dataSource = new TableDataSource(this.qhService);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
