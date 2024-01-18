export interface QueryHistoryModel {
  username: string
  type: string
  document: string
  referredDate: string
  interval: string
  interval_label: string
}

export interface QueryHistoryResponse {
  id?: number;
  username: string;
  querydate: string;
  type: string;
  document?: string;
  referreddate: string;
  interval?: string;
  interval_label: string;
}

export interface PepResponse {
    cpf: string;
    nome: string;
    descricaoFuncao: string;
    nomeOrgao: string;
    dataInicioExercicio: string;
    dataFimExercicio: string;
    codigoOrgao: string;
    siglaFuncao: string;
    nivelFuncao: string;
    dataFimCarencia: string;
    cpf_completo?: string;
}

export interface CepimResponse {
    id: number
    dataReferencia: string
    motivo: string
    orgaoSuperior: OrgaoSuperior
    pessoaJuridica: PessoaJuridica
    convenio: Convenio
}
  
  export interface OrgaoSuperior {
    nome: string
    codigoSIAFI: string
    cnpj: string
    sigla: string
    descricaoPoder: string
    orgaoMaximo: OrgaoMaximo
}
  
  export interface OrgaoMaximo {
    codigo: string
    sigla: string
    nome: string
}
  
  export interface PessoaJuridica {
    id: number
    cpfFormatado: string
    cnpjFormatado: string
    numeroInscricaoSocial: string
    nome: string
    razaoSocialReceita: string
    nomeFantasiaReceita: string
    tipo: string
}
  
  export interface Convenio {
    codigo: string
    objeto: string
    numero: string
}