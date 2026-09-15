export interface LeadData {
  nome: string;
  email: string;
  whatsapp: string;
  instagram: string;
  tempoAtuacaoCloser: string; // até 1 ano | de 1 a 3 anos | Mais de 3 anos
  ultimaEmpresa: string; // Qual a última empresa ou projeto você trabalhou?
  formacaoVendas: string; // Sim (quais?) | Não
  quaisFormacoes?: string; // Detalhes caso Sim
  taxaConversao: string; // Qual era sua taxa de conversão em vendas no seu último trabalho?
  faixaTicketMedio: string; // Até 3k | de 3k a 5k | de 5k a 10k | Acima de 10k
  modeloRemuneracao: string; // Fixo mensal + comissão por venda | Apenas comissão por venda | Apenas fixo

  // Geolocation / DDD intelligence
  ddd?: string;
  uf?: string;
  estado?: string;
  regiao?: string;
  
  // Metadata & Tracking
  id: string;
  createdAt: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  campaignId?: string;
  adsetId?: string;
  adId?: string;
  anuncio?: string;
  conjunto?: string;
  campanha?: string;
  posicionamento?: string;
  device?: string;
  browser?: string;

  // Real-time Database Fields
  status?: 'Novo' | 'Aguardando reunião' | 'Reunião agendada' | 'Reunião realizada' | 'Proposta enviada' | 'Fechado' | 'Perdido';
  leadScore?: number;
  dataCadastro?: string;
  horaCadastro?: string;
  dataReuniao?: string;
  horaReuniao?: string;
  googleMeetLink?: string;

  // Optional backwards-compatibility slots
  empresa?: string;
  segmento?: string;
  trabalhaComCacau?: string;
  faturamento?: string;
  operacaoComercial?: string;
  origemLeads?: string[];
  crm?: string;
  desafioPrincipal?: string;
  momentoEmpresa?: string;
  investimentoMarketing?: string;
  equipeComercial?: string;
  prazoInicio?: string;
  lgpd?: boolean;
  telefone?: string;
  historicoAds?: string;
  orcamentoAds?: string;
  mensalidadeGestao?: string;
  teveAgencia?: string;
  nomeAgencia?: string;
  objetivo?: string;
  prazo?: string;
}

export interface IntegrationConfig {
  webhookUrl: string;
  n8nUrl: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
  metaPixelId: string;
  gaTrackingId: string;
  gtmId: string;
  googleSheetsUrl: string;
  calendlyUrl?: string;
  redirectUrl?: string;
  adminPassword?: string;
  thankYouVideoUrl?: string;
  presenterName?: string;
}

export type QuestionType = 'text' | 'email' | 'tel' | 'select' | 'checkbox' | 'multiselect';

export interface Question {
  id: string;
  variable: keyof LeadData;
  type: QuestionType;
  title: string;
  placeholder?: string;
  options?: string[];
  required?: boolean;
  dependsOn?: {
    variable: keyof LeadData;
    value: any;
  };
}

export interface BookedMeeting {
  date: string;
  hour: string;
  meetLink: string;
}
