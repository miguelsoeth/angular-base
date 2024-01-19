import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { CepimResponse } from '../query-button/query.model';
/**
 * @title Table with expandable rows
 */
@Component({
  selector: 'app-cepim-table',
  templateUrl: './cepim-table.component.html',
  styleUrls: ['./cepim-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CepimTableComponent implements OnChanges {
  @Input() data: CepimResponse[];
  dataSource: CepimResponse[];
  columnsToDisplay = ['cnpjFormatado', 'nome', 'motivo', 'dataReferencia', 'expand'];
  expandedElement: CepimResponse | null;

  constructor() {
    this.expandedElement = null;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.dataSource = this.data;
    }
  }

  toggleExpandedElement(element: CepimResponse): void {
    this.expandedElement = this.expandedElement === element ? null : element;
  }
}
