export const lifeSpiritualStyleData = [
  { id: 'oracaoDiaria', label: 'Oração Diária' },
  { id: 'missaDominicalSemanal', label: 'Missa Dominical Semanal' },
  { id: 'confissaoFrequente', label: 'Confissão Frequente' },
  { id: 'visitaSacrarioSemanal', label: 'Visita Sacrário Semanal' },
  { id: 'leituraEvangelhoDiaria', label: 'Leitura Evangelho Diária' },
  { id: 'reuniaoComunidadeSemanal', label: 'Reunião Comunidade Semanal' },
];
export const lifeSpiritualStyle = lifeSpiritualStyleData.map((i) => i.id);

export const parishCoordinationIndicationsData = [
  { id: 'cozinha', label: 'Cozinha' },
  { id: 'auxLiturgia', label: 'Aux. Liturgia' },
  { id: 'secretaria', label: 'Secretaria' },
  { id: 'suxSecretaria', label: 'Aux. Secretaria' },
  { id: 'bar', label: 'Bar' },
  { id: 'coordFolclore', label: 'Coord. Folclore' },
  { id: 'monitor', label: 'Monitor' },
  { id: 'palestrante', label: 'Palestrante' },
  { id: 'acolito', label: 'Acólito' },
];
export const parishCoordinationIndications = parishCoordinationIndicationsData.map((i) => i.id);

export const coursesTakenData = [
  { id: 'CLJI', label: 'CLJ I' },
  { id: 'CLJII', label: 'CLJ II' },
  { id: 'CLJIII', label: 'CLJ III' },
];
export const coursesTaken = coursesTakenData.map((i) => i.id);

export const instrumentData = [
  { id: 'violao', label: 'Violão' },
  { id: 'teclado', label: 'Teclado' },
  { id: 'cajon', label: 'Cajon' },
];
export const instrument = instrumentData.map((i) => i.id);
export const workPreferenceData = [
  { id: 'sala', label: 'Sala' },
  { id: 'cozinha', label: 'Cozinha' },
];
export const workPreference = workPreferenceData.map((i) => i.id);
