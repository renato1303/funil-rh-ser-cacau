import { Question, LeadData, IntegrationConfig } from './types';

export const QUESTIONS_LIST: Question[] = [
  {
    id: 'p1',
    variable: 'nome',
    type: 'text',
    title: 'Qual é o seu nome completo?',
    placeholder: 'Digite seu nome completo...',
    required: true,
  },
  {
    id: 'p2',
    variable: 'email',
    type: 'email',
    title: 'Qual é o seu e-mail?',
    placeholder: 'exemplo@email.com',
    required: true,
  },
  {
    id: 'p3',
    variable: 'whatsapp',
    type: 'tel',
    title: 'Qual é o seu WhatsApp?',
    placeholder: '(11) 99999-9999',
    required: true,
  },
  {
    id: 'p4',
    variable: 'instagram',
    type: 'text',
    title: 'Qual é o seu Instagram?',
    placeholder: '@seuusuario',
    required: true,
  },
  {
    id: 'p5',
    variable: 'tempoAtuacaoCloser',
    type: 'select',
    title: 'Quanto tempo de atuação como closer?',
    options: [
      'até 1 ano',
      'de 1 a 3 anos',
      'Mais de 3 anos'
    ],
    required: true,
  },
  {
    id: 'p6',
    variable: 'ultimaEmpresa',
    type: 'text',
    title: 'Qual a última empresa ou projeto em que você trabalhou?',
    placeholder: 'Nome da última empresa ou projeto...',
    required: true,
  },
  {
    id: 'p7',
    variable: 'formacaoVendas',
    type: 'select',
    title: 'Alguma formação específica em vendas?',
    options: [
      'Sim (quais?)',
      'Não'
    ],
    required: true,
  },
  {
    id: 'p7_detalhe',
    variable: 'quaisFormacoes',
    type: 'text',
    title: 'Quais formações específicas em vendas você possui?',
    placeholder: 'Ex: Cursos, mentorias, certificações...',
    dependsOn: {
      variable: 'formacaoVendas',
      value: 'Sim (quais?)'
    },
    required: true,
  },
  {
    id: 'p8',
    variable: 'taxaConversao',
    type: 'text',
    title: 'Qual era sua taxa de conversão em vendas no seu último trabalho?',
    placeholder: 'Ex: 25%, cerca de 30%...',
    required: true,
  },
  {
    id: 'p9',
    variable: 'faixaTicketMedio',
    type: 'select',
    title: 'Que faixa de ticket médio você tem experiência em vender?',
    options: [
      'Até 3k',
      'de 3k a 5k',
      'de 5k a 10k',
      'Acima de 10k'
    ],
    required: true,
  },
  {
    id: 'p10',
    variable: 'modeloRemuneracao',
    type: 'select',
    title: 'Qual modelo de remuneração você estaria disposto a iniciar conosco?',
    options: [
      'Fixo mensal + comissão por venda',
      'Apenas comissão por venda',
      'Apenas fixo'
    ],
    required: true,
  }
];

export const DEFAULT_INTEGRATIONS_CONFIG: IntegrationConfig = {
  webhookUrl: 'https://seu-webhook.com/leads',
  n8nUrl: 'https://n8n.suaempresa.com/webhook/sense-sales',
  supabaseUrl: 'https://xyz.supabase.co',
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSJ9...',
  metaPixelId: '1378981757464908',
  gaTrackingId: 'G-XXXXXXXXXX',
  gtmId: 'GTM-XXXXXXX',
  googleSheetsUrl: 'https://script.google.com/macros/s/AKfycbxYvD_hFfiFbBas4aVlC0KPztfOJ572Sdznhy2Z6-w20v7VsSTTNRcrliHMiY7gKlLy/exec',
  calendlyUrl: 'https://calendly.com/comercial-seracacau/30min',
  redirectUrl: 'https://agradecimento.seracacau.com.br/',
  adminPassword: 'sensesales@admin',
  thankYouVideoUrl: 'https://vimeo.com/1206543972',
  presenterName: 'nosso especialista',
};

export function getResolvedIntegrationsConfig(): IntegrationConfig {
  let config: IntegrationConfig = { ...DEFAULT_INTEGRATIONS_CONFIG };
  try {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('sensesales_integrations_config') : null;
    if (stored) {
      const parsed = JSON.parse(stored);
      // Auto-migrate previous default URLs to the new active Google Sheets script
      const previousUrls = [
        'AKfycbyJSBeAgSpjnOhdYfHUZbSCSVuAGjuxMrJPjzohtECTipLlDxZsdjWCRv9Rg-NrIu6h',
        'AKfycbwWBZRJxFvksSyLijJhnkk29GOZcFOOIPTPx43K6ttM38sdL-E9XPEA_ZmSxl640mA',
        'AKfycbxv8pRSfIliUoL04yyu6qYk7fDVkhbZrgkCUIRwZH4vgrNPH6anVepkCfV5SYWz6uM',
        'AKfycbxYtMW_ArRB56US7gP0W8_hJXzazIN8sLDjOAgXmu5dnz7LPzwiAmzcJvTLQDN35oe_'
      ];
      if (parsed.googleSheetsUrl && previousUrls.some(old => parsed.googleSheetsUrl.includes(old))) {
        parsed.googleSheetsUrl = DEFAULT_INTEGRATIONS_CONFIG.googleSheetsUrl;
      }
      // Auto-migrate placeholder meta pixel ID
      if (!parsed.metaPixelId || parsed.metaPixelId === '1234567890') {
        parsed.metaPixelId = DEFAULT_INTEGRATIONS_CONFIG.metaPixelId;
      }
      localStorage.setItem('sensesales_integrations_config', JSON.stringify(parsed));
      config = { ...DEFAULT_INTEGRATIONS_CONFIG, ...parsed };
    }
  } catch (e) {}
  return config;
}

export const INITIAL_LEAD_DATA: LeadData = {
  nome: '',
  email: '',
  whatsapp: '',
  instagram: '',
  tempoAtuacaoCloser: '',
  ultimaEmpresa: '',
  formacaoVendas: '',
  quaisFormacoes: '',
  taxaConversao: '',
  faixaTicketMedio: '',
  modeloRemuneracao: '',
  empresa: '',
  segmento: '',
  trabalhaComCacau: '',
  faturamento: '',
  operacaoComercial: '',
  origemLeads: [],
  crm: '',
  desafioPrincipal: '',
  momentoEmpresa: '',
  investimentoMarketing: '',
  equipeComercial: '',
  prazoInicio: '',
  lgpd: true,
  ddd: '',
  uf: '',
  estado: '',
  regiao: '',
  id: '',
  createdAt: '',
};

// Complete Brazilian DDD Mapping (67 DDDs across all 26 States + DF)
export const BRAZIL_DDD_MAP: Record<string, { uf: string; estado: string; regiao: string }> = {
  // São Paulo (SP)
  '11': { uf: 'SP', estado: 'São Paulo', regiao: 'São Paulo (Capital e Região Metropolitana)' },
  '12': { uf: 'SP', estado: 'São Paulo', regiao: 'São José dos Campos, Vale do Paraíba e Litoral Norte' },
  '13': { uf: 'SP', estado: 'São Paulo', regiao: 'Santos, Baixada Santista e Vale do Ribeira' },
  '14': { uf: 'SP', estado: 'São Paulo', regiao: 'Bauru, Marília, Jaú e Botucatu' },
  '15': { uf: 'SP', estado: 'São Paulo', regiao: 'Sorocaba, Itapetininga e Região' },
  '16': { uf: 'SP', estado: 'São Paulo', regiao: 'Ribeirão Preto, Franca, São Carlos e Araraquara' },
  '17': { uf: 'SP', estado: 'São Paulo', regiao: 'São José do Rio Preto, Barretos e Catanduva' },
  '18': { uf: 'SP', estado: 'São Paulo', regiao: 'Presidente Prudente, Araçatuba e Assis' },
  '19': { uf: 'SP', estado: 'São Paulo', regiao: 'Campinas, Piracicaba, Limeira e Americana' },

  // Rio de Janeiro (RJ)
  '21': { uf: 'RJ', estado: 'Rio de Janeiro', regiao: 'Rio de Janeiro (Capital e Região Metropolitana)' },
  '22': { uf: 'RJ', estado: 'Rio de Janeiro', regiao: 'Campos dos Goytacazes, Macaé e Cabo Frio' },
  '24': { uf: 'RJ', estado: 'Rio de Janeiro', regiao: 'Petrópolis, Volta Redonda e Angra dos Reis' },

  // Espírito Santo (ES)
  '27': { uf: 'ES', estado: 'Espírito Santo', regiao: 'Vitória e Região Metropolitana / Norte do ES' },
  '28': { uf: 'ES', estado: 'Espírito Santo', regiao: 'Cachoeiro de Itapemirim e Sul do ES' },

  // Minas Gerais (MG)
  '31': { uf: 'MG', estado: 'Minas Gerais', regiao: 'Belo Horizonte e Região Metropolitana' },
  '32': { uf: 'MG', estado: 'Minas Gerais', regiao: 'Juiz de Fora, Barbacena e Zona da Mata' },
  '33': { uf: 'MG', estado: 'Minas Gerais', regiao: 'Governador Valadares, Teófilo Otoni e Leste de MG' },
  '34': { uf: 'MG', estado: 'Minas Gerais', regiao: 'Uberlândia, Uberaba e Triângulo Mineiro' },
  '35': { uf: 'MG', estado: 'Minas Gerais', regiao: 'Poços de Caldas, Pouso Alegre, Varginha e Sul de MG' },
  '37': { uf: 'MG', estado: 'Minas Gerais', regiao: 'Divinópolis, Itaúna e Centro-Oeste de MG' },
  '38': { uf: 'MG', estado: 'Minas Gerais', regiao: 'Montes Claros, Diamantina e Norte de MG' },

  // Paraná (PR)
  '41': { uf: 'PR', estado: 'Paraná', regiao: 'Curitiba e Região Metropolitana / Litoral' },
  '42': { uf: 'PR', estado: 'Paraná', regiao: 'Ponta Grossa, Guarapuava e Campos Gerais' },
  '43': { uf: 'PR', estado: 'Paraná', regiao: 'Londrina, Apucarana e Norte do PR' },
  '44': { uf: 'PR', estado: 'Paraná', regiao: 'Maringá, Campo Mourão e Noroeste do PR' },
  '45': { uf: 'PR', estado: 'Paraná', regiao: 'Foz do Iguaçu, Cascavel, Toledo e Oeste do PR' },
  '46': { uf: 'PR', estado: 'Paraná', regiao: 'Francisco Beltrão, Pato Branco e Sudoeste do PR' },

  // Santa Catarina (SC)
  '47': { uf: 'SC', estado: 'Santa Catarina', regiao: 'Joinville, Blumenau, Itajaí e Balneário Camboriú' },
  '48': { uf: 'SC', estado: 'Santa Catarina', regiao: 'Florianópolis e Região Metropolitana / Criciúma' },
  '49': { uf: 'SC', estado: 'Santa Catarina', regiao: 'Chapecó, Lages, Concórdia e Oeste Catarinense' },

  // Rio Grande do Sul (RS)
  '51': { uf: 'RS', estado: 'Rio Grande do Sul', regiao: 'Porto Alegre e Região Metropolitana' },
  '53': { uf: 'RS', estado: 'Rio Grande do Sul', regiao: 'Pelotas, Rio Grande e Sul do RS' },
  '54': { uf: 'RS', estado: 'Rio Grande do Sul', regiao: 'Caxias do Sul, Bento Gonçalves e Serra Gaúcha' },
  '55': { uf: 'RS', estado: 'Rio Grande do Sul', regiao: 'Santa Maria, Uruguaiana e Noroeste do RS' },

  // Distrito Federal / Goiás (DF / GO)
  '61': { uf: 'DF', estado: 'Distrito Federal', regiao: 'Brasília e Região Integrada do Entorno' },
  '62': { uf: 'GO', estado: 'Goiás', regiao: 'Goiânia, Anápolis e Centro-Norte de GO' },
  '64': { uf: 'GO', estado: 'Goiás', regiao: 'Rio Verde, Itumbiara, Caldas Novas e Sul de GO' },

  // Tocantins (TO)
  '63': { uf: 'TO', estado: 'Tocantins', regiao: 'Palmas e todo o Estado do Tocantins' },

  // Mato Grosso (MT)
  '65': { uf: 'MT', estado: 'Mato Grosso', regiao: 'Cuiabá e Região Metropolitana / Oeste de MT' },
  '66': { uf: 'MT', estado: 'Mato Grosso', regiao: 'Rondonópolis, Sinop, Sorriso e Norte/Leste de MT' },

  // Mato Grosso do Sul (MS)
  '67': { uf: 'MS', estado: 'Mato Grosso do Sul', regiao: 'Campo Grande, Dourados e todo o Estado do MS' },

  // Acre (AC)
  '68': { uf: 'AC', estado: 'Acre', regiao: 'Rio Branco e todo o Estado do Acre' },

  // Rondônia (RO)
  '69': { uf: 'RO', estado: 'Rondônia', regiao: 'Porto Velho e todo o Estado de Rondônia' },

  // Bahia (BA)
  '71': { uf: 'BA', estado: 'Bahia', regiao: 'Salvador e Região Metropolitana' },
  '73': { uf: 'BA', estado: 'Bahia', regiao: 'Ilhéus, Itabuna, Porto Seguro e Sul da Bahia' },
  '74': { uf: 'BA', estado: 'Bahia', regiao: 'Juazeiro, Jacobina e Norte da Bahia' },
  '75': { uf: 'BA', estado: 'Bahia', regiao: 'Feira de Santana, Alagoinhas e Centro-Leste da Bahia' },
  '77': { uf: 'BA', estado: 'Bahia', regiao: 'Vitória da Conquista, Barreiras e Oeste da Bahia' },

  // Sergipe (SE)
  '79': { uf: 'SE', estado: 'Sergipe', regiao: 'Aracaju e todo o Estado de Sergipe' },

  // Pernambuco (PE)
  '81': { uf: 'PE', estado: 'Pernambuco', regiao: 'Recife, Caruaru e Zona da Mata de PE' },
  '87': { uf: 'PE', estado: 'Pernambuco', regiao: 'Petrolina, Garanhuns e Sertão de PE' },

  // Alagoas (AL)
  '82': { uf: 'AL', estado: 'Alagoas', regiao: 'Maceió, Arapiraca e todo o Estado de Alagoas' },

  // Paraíba (PB)
  '83': { uf: 'PB', estado: 'Paraíba', regiao: 'João Pessoa, Campina Grande e todo o Estado da PB' },

  // Rio Grande do Norte (RN)
  '84': { uf: 'RN', estado: 'Rio Grande do Norte', regiao: 'Natal, Mossoró e todo o Estado do RN' },

  // Ceará (CE)
  '85': { uf: 'CE', estado: 'Ceará', regiao: 'Fortaleza e Região Metropolitana' },
  '88': { uf: 'CE', estado: 'Ceará', regiao: 'Juazeiro do Norte, Sobral e Interior do CE' },

  // Piauí (PI)
  '86': { uf: 'PI', estado: 'Piauí', regiao: 'Teresina, Parnaíba e Norte do PI' },
  '89': { uf: 'PI', estado: 'Piauí', regiao: 'Picos, Floriano e Sul do PI' },

  // Pará (PA)
  '91': { uf: 'PA', estado: 'Pará', regiao: 'Belém e Região Metropolitana do PA' },
  '93': { uf: 'PA', estado: 'Pará', regiao: 'Santarém, Altamira e Oeste do PA' },
  '94': { uf: 'PA', estado: 'Pará', regiao: 'Marabá, Parauapebas e Sul do PA' },

  // Amazonas (AM)
  '92': { uf: 'AM', estado: 'Amazonas', regiao: 'Manaus e Região Metropolitana de Manaus' },
  '97': { uf: 'AM', estado: 'Amazonas', regiao: 'Interior do Amazonas e Médio/Alto Solimões' },

  // Roraima (RR)
  '95': { uf: 'RR', estado: 'Roraima', regiao: 'Boa Vista e todo o Estado de Roraima' },

  // Amapá (AP)
  '96': { uf: 'AP', estado: 'Amapá', regiao: 'Macapá e todo o Estado do Amapá' },

  // Maranhão (MA)
  '98': { uf: 'MA', estado: 'Maranhão', regiao: 'São Luís e Norte do Maranhão' },
  '99': { uf: 'MA', estado: 'Maranhão', regiao: 'Imperatriz, Caxias e Sul do Maranhão' },
};

export interface DDDInfo {
  ddd: string;
  uf: string;
  estado: string;
  estadoUf: string;
  regiao: string;
  isIdentified: boolean;
}

// Automatically extract DDD and locate Brazilian State (UF)
export function getDDDInfo(phoneOrDdd?: string): DDDInfo {
  if (!phoneOrDdd) {
    return {
      ddd: '',
      uf: '',
      estado: '',
      estadoUf: '',
      regiao: '',
      isIdentified: false,
    };
  }

  let digits = String(phoneOrDdd).replace(/\D/g, '');

  // Strip international country code if +55 was included
  if (digits.startsWith('55') && (digits.length === 12 || digits.length === 13)) {
    digits = digits.slice(2);
  } else if (digits.startsWith('0') && digits.length >= 11) {
    // Strip leading 0 (e.g. 015...)
    digits = digits.slice(1);
  }

  const dddCandidate = digits.slice(0, 2);
  const match = BRAZIL_DDD_MAP[dddCandidate];

  if (match) {
    return {
      ddd: dddCandidate,
      uf: match.uf,
      estado: match.estado,
      estadoUf: `${match.estado} (${match.uf})`,
      regiao: match.regiao,
      isIdentified: true,
    };
  }

  return {
    ddd: dddCandidate || '',
    uf: '',
    estado: '',
    estadoUf: '',
    regiao: '',
    isIdentified: false,
  };
}

// Mask WhatsApp input to (XX) XXXXX-XXXX
export function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 2) {
    return digits;
  }
  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 11;
}

export function buildFormattedMessageText(lead?: LeadData | Partial<LeadData> | null): string {
  if (!lead) return '';
  const score = lead.leadScore !== undefined && lead.leadScore !== null
    ? lead.leadScore
    : calculateLeadScore(lead);

  const phone = lead.whatsapp || lead.telefone || 'Não informado';

  // Automatically calculate / retrieve DDD location
  const dddInfo = getDDDInfo(phone || lead.ddd);
  const estadoLabel = lead.estado 
    ? `${lead.estado}${lead.uf ? ` (${lead.uf})` : ''}` 
    : (dddInfo.isIdentified ? `${dddInfo.estado} (${dddInfo.uf})` : '');

  const lines: string[] = [
    `Olá, sou ${lead.nome || 'Candidato(a)'}.`,
    ``,
    `Acabei de preencher a minha aplicação para a vaga de Closer de Vendas!`,
    ``,
    `📋 RESUMO DA CANDIDATURA (CLOSER):`,
    `• Nome Completo: ${lead.nome || 'Não informado'}`,
    `• E-mail: ${lead.email || 'Não informado'}`,
    `• WhatsApp: ${phone}`,
  ];

  if (lead.instagram) {
    lines.push(`• Instagram: ${lead.instagram}`);
  }

  if (estadoLabel) {
    lines.push(`• Localização (DDD): ${estadoLabel}${dddInfo.regiao ? ` - ${dddInfo.regiao}` : ''}`);
  }

  lines.push(`• Tempo de atuação como closer: ${lead.tempoAtuacaoCloser || 'Não informado'}`);
  lines.push(`• Última empresa ou projeto: ${lead.ultimaEmpresa || lead.empresa || 'Não informado'}`);
  
  if (lead.formacaoVendas) {
    const formacaoTxt = lead.quaisFormacoes 
      ? `${lead.formacaoVendas} - Detalhes: ${lead.quaisFormacoes}` 
      : lead.formacaoVendas;
    lines.push(`• Formação específica em vendas: ${formacaoTxt}`);
  }

  if (lead.taxaConversao) {
    lines.push(`• Taxa de conversão no último trabalho: ${lead.taxaConversao}`);
  }

  lines.push(`• Faixa de ticket médio: ${lead.faixaTicketMedio || 'Não informada'}`);
  lines.push(`• Modelo de remuneração pretendido: ${lead.modeloRemuneracao || 'Não informado'}`);

  if (lead.dataReuniao) {
    lines.push(`• Entrevista/Reunião Agendada: ${lead.dataReuniao} às ${lead.horaReuniao || ''}`);
  }

  lines.push(``);
  lines.push(`📊 Score de Qualificação: ${score}%`);
  lines.push(``);
  lines.push(`Estou à disposição para avançar para as próximas etapas!`);

  return lines.join('\n');
}

export function buildWhatsAppMessage(lead?: LeadData | Partial<LeadData> | null): string {
  if (!lead) return '';
  return encodeURIComponent(buildFormattedMessageText(lead));
}

export function calculateLeadScore(lead?: Partial<LeadData> | null): number {
  if (!lead) return 0;
  let score = 0;

  // 1. Tempo de atuação como closer (Max 100)
  const tempo = lead.tempoAtuacaoCloser || '';
  if (tempo.toLowerCase().includes('mais de 3 anos') || tempo.includes('> 3')) {
    score += 100;
  } else if (tempo.toLowerCase().includes('1 a 3 anos')) {
    score += 80;
  } else if (tempo.toLowerCase().includes('até 1 ano')) {
    score += 55;
  } else {
    score += 50;
  }

  // 2. Faixa de ticket médio (Max 100)
  const ticket = lead.faixaTicketMedio || '';
  if (ticket.toLowerCase().includes('acima de 10k')) {
    score += 100;
  } else if (ticket.toLowerCase().includes('5k a 10k')) {
    score += 85;
  } else if (ticket.toLowerCase().includes('3k a 5k')) {
    score += 70;
  } else if (ticket.toLowerCase().includes('até 3k')) {
    score += 55;
  } else {
    score += 50;
  }

  // 3. Formação específica em vendas (Max 100)
  const formacao = lead.formacaoVendas || '';
  if (formacao.toLowerCase().includes('sim')) {
    score += 100;
  } else if (formacao.toLowerCase().includes('não') || formacao.toLowerCase().includes('nao')) {
    score += 65;
  } else {
    score += 60;
  }

  // 4. Modelo de remuneração disposto a iniciar (Max 100)
  const remuneracao = lead.modeloRemuneracao || '';
  if (remuneracao.toLowerCase().includes('apenas comissão')) {
    score += 100; // Ultra high confidence closer
  } else if (remuneracao.toLowerCase().includes('fixo mensal + comissão') || remuneracao.toLowerCase().includes('comissão')) {
    score += 90;
  } else if (remuneracao.toLowerCase().includes('apenas fixo')) {
    score += 60;
  } else {
    score += 70;
  }

  // Normalize by 4 criteria -> percentage 0-100
  return Math.round((score / 4) || 0);
}
