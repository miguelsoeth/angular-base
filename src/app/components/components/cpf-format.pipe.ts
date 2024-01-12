// cpf-format.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfFormat'
})
export class CpfFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    // Format the string as CPF
    const formattedCpf = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    return formattedCpf;
  }
}
