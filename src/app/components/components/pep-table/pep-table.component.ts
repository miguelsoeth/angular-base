import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { PepTableDataSource, PepTableItem } from './pep-table-datasource';

@Component({
  selector: 'app-pep-table',
  templateUrl: './pep-table.component.html',
  styleUrls: ['./pep-table.component.css']
})
export class PepTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<PepTableItem>;
  dataSource: PepTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['cpf', 'nome', 'funcao', 'orgao', 'inicioExercicio', 'fimExercicio', 'expand'];

  ngOnInit() {
    this.dataSource = new PepTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  toggleExpansion(row: PepTableItem): void {
    row.expanded = !row.expanded;
  }
}
