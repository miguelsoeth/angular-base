import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CepimResponse, PepResponse } from 'src/app/components/components/query-button/query.model';
import { QueryService } from 'src/app/components/components/query-button/query.service';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {
  queryParams: any;
  responseArray: PepResponse[] | CepimResponse[];

  constructor(private route: ActivatedRoute, headerService: HeaderService, private qService: QueryService) {
    headerService.HeaderData = {
      title: "Consultas",
      icon: 'search',
      routeUrl: '/consulta'
    }
  }

  ngOnInit(): void {
    this.queryParams = this.route.snapshot.queryParams;

    switch(this.queryParams.type) {
      case "CPF": {
        this.qService.getPepData(this.queryParams.document, this.queryParams.datainicial, this.queryParams.datafinal).subscribe(
          (result) => {
            result.map(item => ({ ...item, cpf_completo: this.queryParams.document }))
            this.fillEmptyFields(result, "Não informado");
            this.responseArray = result;
          },
          (error) => {
            this.qService.showMessage(error.error);
          }
        );
        break;
      }
      case "CNPJ": {
        this.qService.getCepimData(this.queryParams.document, this.queryParams.datainicial, this.queryParams.datafinal).subscribe(
          (result) => {
            this.fillEmptyFields(result, "Não informado");
            this.responseArray = result;
          },
          (error) => {
            this.qService.showMessage(error.error);
          }
        );
        break;
      }
      default: {
        this.qService.showMessage("Erro...");
        break;
      }
    }
    this.qService.showMessage("Busca concluída!");
  }

  fillEmptyFields(obj: any, defaultValue: string): void {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (value && typeof value === 'object') {
          this.fillEmptyFields(value, defaultValue);
        } else if (value === '') {
          obj[key] = defaultValue;
        }
      }
    }
  }
}
