import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { QueryHistoryResponse } from '../query-button/query-history.model';
import { QueryService } from '../query-button/query.service';

export class TableDataSource extends DataSource<QueryHistoryResponse> {
  data: QueryHistoryResponse[];
  paginator: MatPaginator;
  sort: MatSort;

  constructor(private qService: QueryService) {
    super();
    this.initializeData();
  }

  private initializeData()  {
    const Data: QueryHistoryResponse[] = [];
    this.qService.readQueryHistory().subscribe((qData: QueryHistoryResponse[]) => {
      this.data = qData.map(item => ({
        username: item.username,
        querydate: item.querydate,
        type: item.type,
        document: item.document,
        referreddate: item.referreddate,
        interval: item.interval
      }));
    });
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<QueryHistoryResponse[]> {    
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
  private getPagedData(data: QueryHistoryResponse[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.slice(startIndex, startIndex + this.paginator.pageSize);
  }

  private getSortedData(data: QueryHistoryResponse[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'username': return compare(a.username, b.username, isAsc);
        case 'querydate': return compare(a.querydate, b.querydate, isAsc);
        case 'type': return compare(a.type, b.type, isAsc);
        case 'document': return compare(a.document, b.document, isAsc);
        case 'referreddate': return compare(a.referreddate, b.referreddate, isAsc);
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
