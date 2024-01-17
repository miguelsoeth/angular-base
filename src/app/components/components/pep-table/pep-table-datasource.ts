import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

export interface PepTableItem {
  cpf: string;
  nome: string;
  funcao: string;
  orgao: string;
  inicioExercicio: string;
  fimExercicio: string;
  expanded?: boolean;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: PepTableItem[] = [
  {
    cpf: "***.289.837-**",
    nome: "AÉCIO NEVES DA CUNHA",
    funcao: "Deputado Federal",
    orgao: "Câmara dos Deputados",
    inicioExercicio: "2019-02-01",
    fimExercicio: "2023-01-31"
  },
  {
    cpf: "***.289.837-**",
    nome: "AÉCIO NEVES DA CUNHA",
    funcao: "Deputado Federal",
    orgao: "Câmara dos Deputados",
    inicioExercicio: "2023-02-01",
    fimExercicio: ""
  }
];

/**
 * Data source for the PepTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class PepTableDataSource extends DataSource<PepTableItem> {
  data: PepTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<PepTableItem[]> {
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
  private getPagedData(data: PepTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: PepTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'nome': return compare(a.nome, b.nome, isAsc);
        case 'cpf': return compare(a.cpf, b.cpf, isAsc);
        case 'funcao': return compare(a.funcao, b.funcao, isAsc);
        case 'orgao': return compare(a.orgao, b.orgao, isAsc);
        case 'inicioExercicio': return compare(a.inicioExercicio, b.inicioExercicio, isAsc);
        case 'fimExercicio': return compare(a.fimExercicio, b.fimExercicio, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
