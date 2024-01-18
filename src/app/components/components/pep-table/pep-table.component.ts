import { PepResponse } from '../query-button/query.model';
import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
/**
 * @title Table with expandable rows
 */
@Component({
  selector: 'app-pep-table',
  styleUrls: ['./pep-table.component.css'],
  templateUrl: './pep-table.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PepTableComponent implements OnChanges {
  @Input() data: PepResponse[];
  dataSource: PepResponse[];
  columnsToDisplay = ['cpf', 'nome', 'funcao', 'orgao', 'inicioExercicio', 'fimExercicio', 'expand'];
  expandedElement: PepResponse | null;

  constructor() {
    this.expandedElement = null;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      // Handle changes to the 'data' input property
      console.log('Data updated in TableExpandableRowsExample:', this.data);
      this.dataSource = this.data;
    }
  }

  toggleExpandedElement(element: PepResponse): void {
    this.expandedElement = this.expandedElement === element ? null : element;
  }

}