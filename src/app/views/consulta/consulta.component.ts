import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  constructor(private headerService: HeaderService) {
    headerService.HeaderData = {
      title: "Consultas",
      icon: 'search',
      routeUrl: '/consulta'
    }
  }

  ngOnInit(): void {
  }

}
