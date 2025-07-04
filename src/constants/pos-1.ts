export const moodData = [
  { id: 'timido', label: 'Tímido' },
  { id: 'Ponderado', label: 'Ponderado' },
  { id: 'extrovertido', label: 'Extrovertido' },
];
export const mood = moodData.map((i) => i.id);

export const dispositionData = [
  { id: 'retraido', label: 'Retraído' },
  { id: 'facilComunicacao', label: 'Fácil Comunicação' },
  { id: 'muitoComunicativo', label: 'Muito Comunicativo' },
];
export const disposition = dispositionData.map((i) => i.id);

export const participationData = [
  { id: 'semIniciativa', label: 'Sem Iniciativa' },
  { id: 'iniciativaEmPartes', label: 'Iniciativa em Partes' },
  { id: 'totalParticipacao', label: 'Total Participação' },
];
export const participation = participationData.map((i) => i.id);

export const aboutFatherData = [
  { id: 'falecido', label: 'Falecido' },
  { id: 'separadoDivorciado', label: 'Separado/Divorciado' },
  { id: 'padrasto', label: 'Padrasto' },
];
export const aboutFather = aboutFatherData.map((i) => i.id);

export const aboutMotherData = [
  { id: 'falecida', label: 'Falecida' },
  { id: 'separadaDivorciada', label: 'Separada/Divorciada' },
  { id: 'madrasta', label: 'Madrasta' },
];
export const aboutMother = aboutMotherData.map((i) => i.id);

export const livesWithData = [
  { id: 'mae', label: 'Mãe' },
  { id: 'pai', label: 'Pai' },
  { id: 'outro', label: 'Outro' },
];
export const livesWith = livesWithData.map((i) => i.id);

export const parentsReligionData = [
  { id: 'catolicos', label: 'Católicos' },
  { id: 'outro', label: 'Outro' },
];
export const parentsReligion = parentsReligionData.map((i) => i.id);

export const sacramentsData = [
  { id: 'batismo', label: 'Batismo' },
  { id: 'comumhao', label: 'Comunhão' },
  { id: 'crisma', label: 'Crisma' },
  { id: 'confissaoFrequente', label: 'Confissão Frequente' },
  { id: 'missaDominicalFrequente', label: 'Missa Dominical Frequente' },
];
export const sacraments = sacramentsData.map((i) => i.id);
export const sacramentsCLJllData = [
  { id: 'oracaoDiaria', label: 'Oração Diária' },
  { id: 'missaDominicalSemanal', label: 'Missa Dominical Semanal' },
  { id: 'confissaoFrequente', label: 'Confissão Frequente' },
  { id: 'visitaAoSacrario', label: 'Visita ao Sacrário Semanal' },
  { id: 'leituraDoEvangelioDiaria', label: 'Leitura do Evangelho Diária' },
  { id: 'reuniaoDeComunidade', label: 'Reunião de Comunidade' },
];
export const sacramentsCLJll = sacramentsData.map((i) => i.id);

export const hasDiseaseData = [
  { id: 'sim', label: 'Sim' },
  { id: 'nao', label: 'Não' },
];
export const hasDisease = hasDiseaseData.map((i) => i.id);

export const takesMedicationData = [
  { id: 'sim', label: 'Sim' },
  { id: 'nao', label: 'Não' },
];
export const takesMedication = takesMedicationData.map((i) => i.id);
