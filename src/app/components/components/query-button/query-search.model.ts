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