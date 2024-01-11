import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

export interface TableItem {
  user: string;
  queryDate: string;
  type: string;
  document: string;
  refferedDate: string;
  interval: string;
}

export class TableDataSource extends DataSource<TableItem> {
  data: TableItem[];
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
    this.initializeData();
  }

  private initializeData() {
    const Data: TableItem[] = [
      {
        user: 'Adm',
        queryDate: '01/01/01',
        type: 'CPF',
        document: '123.456',
        refferedDate: '02/02/02',
        interval: '3 meses'
      },
      {
        user: 'Adm',
        queryDate: '02/01/01',
        type: 'CNPJ', 
        document: '123.456.789',
        refferedDate: '02/03/02',
        interval: '6 meses'
      },
      {
        user: 'Adm',
        queryDate: '03/01/01',
        type: 'CPF',
        document: '123.456.123',
        refferedDate: '02/04/02',
        interval: '3 meses'
      },
      {
        user: 'Adm',
        queryDate: '04/01/01',
        type: 'CNPJ',
        document: '123.456.456', 
        refferedDate: '02/05/02',
        interval: '9 meses'
      }
    ];
    
    this.data = Data; // Assign data to the dataSource
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TableItem[]> {    
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.slice(startIndex, startIndex + this.paginator.pageSize);
  }

  private getSortedData(data: TableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'user': return compare(a.user, b.user, isAsc);
        case 'queryDate': return compare(a.queryDate, b.queryDate, isAsc);
        case 'type': return compare(a.type, b.type, isAsc);
        case 'document': return compare(a.document, b.document, isAsc);
        case 'refferedDate': return compare(a.refferedDate, b.refferedDate, isAsc);
        case 'interval': return compare(a.interval, b.interval, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
