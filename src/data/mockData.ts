import {
  IncidentAlert,
  SecurityWorkshop,
  PatrolUnit,
  MunicipalCamera,
  ConnectedStore,
  ThreatCategory
} from '../types';

export const ASSET_URLS = {
  logoShield: 'https://lh3.googleusercontent.com/aida/AEtjO1UiyA7DNffmrXe55-fr2T3m1wC2yM82FMf5smSzhp4yDiuxjA7MUwlT9Do_Ts50oz5PoozjqWCVnY7TBptBjUcNDh0d5f7IpBEpe0sOGZZqCRVUdkKNSjl1-Jw7-vpCTG_Lec0vINKmIvE5AKQov02b7s6wCNfh2CaCnTMFs5ajDQs0QyC2SJUxoTOnMprIhaBQhEtVLNMVwf0wmBvsoC9xgMYeRyOhsL5gXEqboIpctSOHsy75e503KRKN',
  officerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpiRuAHfYGkF5sGJytzxTuR0ZXrFRiB3YEl91ig2W-86o8oPKZISTdoQ6s2v2aoHXeUhZweuCgWWdpqW6HwWf6uRUrTjpixr9RXmxQUvVkltY5Wy-AMds5sn8KQLRrWZVavbKmlTEJHmsHjEGd0AfSj-ZKlhQ4lO-j3L6O_UrFKjWHZAnTa6xaSTkiBCcxDbcDs3fw3AV9JLS6SKCbl7fXYuY4-ffL8U2ZdUj5gHZx65DDMD0OGLkR4g',
  mapBackground: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuGqrXDT3IsW1eWAJkGMbSypvpWeyFX8X_-H2ZxxmWTsCjK2fQhLNeSvltDgSS_8en3d--EhV1YZf-gfytyD8SSwU2ZNPBNT4fTtKJ1flsDOkU1eaaNytknoIJq7mJCV4Tq2GPUIm37nwvYiFU1BWDnaHM-1FBFbEVQZmzo1De_uCRMSRIJelpi5KedyQiQpSRQWksyZaW6Oau9q4_zm5yqoIHYU3v86yzQvyGF3vdhgzLem8wxE-OeQ',
  cameraFeed: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBnVbgRLeAR6UYRv5IHJlOm2DtudEadxb4Ixw80eGmF6Gj3MQWjbU_nIzUaqvCKZCToMUEGwSn4U34xHT40VhoHym4gJpQCl_Zc5Bw6lOMvub6814da6qT5yWbxkAPoZSquUQHEeiFM14yiGhA5q1yIyQUz-_WykhXUk5mifjQWj9bDaK92A20D1ecYTh-u5h6D_VuV1E-X-U0weTO-Hng-ZoelXcusFxuc7BnPMdH_ade_0kh7-67Ug'
};

export const INITIAL_THREAT_CATEGORIES: ThreatCategory[] = [
  {
    id: 'extorsion',
    name: 'Intimidación / Extorsión (Cobro de cupos)',
    icon: 'warning',
    priority: 'Alta',
    description: 'Sujetos solicitando cupos, amenazas telefónicas, cartas o notas intimidatorias.'
  },
  {
    id: 'robo',
    name: 'Robo a Comercio en curso',
    icon: 'store',
    priority: 'Inmediata',
    description: 'Asalto o tentativa en bodega o establecimiento cercano.'
  },
  {
    id: 'sospechoso',
    name: 'Sospechoso en Zona comercial',
    icon: 'visibility',
    priority: 'Alta',
    description: 'Personas merodeando o fotografiando fachadas y rutinas de comerciantes.'
  },
  {
    id: 'moto',
    name: 'Moto lineal sin Placa con 2 ocupantes',
    icon: 'two_wheeler',
    priority: 'Alta',
    description: 'Motociclistas con cascos oscuros circulando a baja velocidad.'
  },
  {
    id: 'estafa',
    name: 'Intento de Estafa / Billete Falso',
    icon: 'payments',
    priority: 'Media',
    description: 'Pagos con billetes falsos de S/ 100 o transferencias simuladas.'
  },
  {
    id: 'ruido',
    name: 'Disturbio vecinal o alteración del orden',
    icon: 'volume_up',
    priority: 'Media',
    description: 'Griterío, consumo de licor en vía pública o agresión verbal.'
  }
];

export const INITIAL_ALERTS: IncidentAlert[] = [
  {
    id: 'alert-1',
    title: 'Sospechoso en zona comercial',
    timeAgo: 'Hace 12 min',
    location: 'Calle Carpaccio cuadra 3',
    description: '2 personas fotografiando fachadas de bodegas en motocicleta lineal sin placa. Llevan cascos oscuros cerrados.',
    category: 'Sospechoso en Zona',
    status: 'En Verificación',
    confirmations: 14,
    dismissals: 1,
    icon: 'two_wheeler',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-900',
    author: 'Bodega El Buen Sabor',
    coords: { x: 48, y: 36 }
  },
  {
    id: 'alert-2',
    title: 'Intento de Estafa / Billete Falso',
    timeAgo: 'Hace 35 min',
    location: 'Bodega La Esquina (Jr. Mozart)',
    description: 'Intento de pago con billete falso de S/ 100 con serie repetida 4821-B. Se desplazaron a pie hacia el parque.',
    category: 'Estafa / Fraude',
    status: 'Alerta Alta',
    confirmations: 8,
    dismissals: 0,
    icon: 'payments',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-900',
    author: 'Bodega La Esquina',
    coords: { x: 62, y: 55 }
  },
  {
    id: 'alert-3',
    title: 'Marcaje sospechoso en vereda comercial',
    timeAgo: 'Hace 1h 10m',
    location: 'Av. Las Artes Norte c/ Av. San Luis',
    description: 'Vehículo oscuro estacionado con lunas polarizadas encendido por más de 40 min frente a farmacia.',
    category: 'Intimidación',
    status: 'Confirmada',
    confirmations: 19,
    dismissals: 2,
    icon: 'directions_car',
    badgeBg: 'bg-purple-100',
    badgeText: 'text-purple-900',
    author: 'Farmacia San Borja',
    coords: { x: 32, y: 44 }
  }
];

export const INITIAL_WORKSHOPS: SecurityWorkshop[] = [
  {
    id: 'ws-1',
    day: '24',
    month: 'OCT',
    tag: 'Capacitación Gratuita',
    tagColor: 'bg-emerald-100 text-emerald-900',
    title: 'Prevención de Extorsión Digital y Manejo Seguro de Caja',
    description: 'Estrategias prácticas para comerciantes frente a cobros por aplicativos y llamadas falsas.',
    time: 'Sábado 24 Oct, 10:00 AM - 12:00 PM',
    location: 'Centro Comunal Sector 4 (Av. San Borja Sur 210)',
    seatsTotal: 30,
    seatsReserved: 18,
    userRsvp: false,
    freePassRequirement: '18 de 30 cupos reservados'
  },
  {
    id: 'ws-2',
    day: '29',
    month: 'OCT',
    tag: 'Tecnología Barrial',
    tagColor: 'bg-primary-fixed text-primary',
    title: 'Cámaras Vecinales Conectadas a la Nube',
    description: 'Cómo integrar tu cámara privada con el centro de monitoreo de Serenazgo sin costos de red.',
    time: 'Jueves 29 Oct, 6:00 PM - 7:30 PM',
    location: 'Auditorio Municipal (Piso 2, Sede Central)',
    seatsTotal: 50,
    seatsReserved: 24,
    userRsvp: false,
    freePassRequirement: 'Acceso libre con DNI'
  },
  {
    id: 'ws-3',
    day: '05',
    month: 'NOV',
    tag: 'Protocolo Comercial',
    tagColor: 'bg-secondary-fixed text-on-secondary-fixed',
    title: 'Manejo de Pagos Digitales Sin Riesgo (Yape & Plin Seguro)',
    description: 'Verificación de comprobantes oficiales y reducción de efectivo físico en caja frente a asaltos.',
    time: 'Miércoles 05 Nov, 4:00 PM - 6:00 PM',
    location: 'Sala Zoom Municipal & Presencial Centro Cívico',
    seatsTotal: 100,
    seatsReserved: 42,
    userRsvp: false,
    freePassRequirement: 'Certificado de Asistencia Municipal'
  }
];

export const PATROLS: PatrolUnit[] = [
  {
    id: 'patrol-14',
    name: 'Móvil 14 (Serenazgo)',
    type: 'Automóvil',
    status: 'En Ronda',
    etaMin: 2,
    sector: 'Sector 4 • Cuadrante 3B',
    lastPing: 'Hace 45 seg',
    coords: { x: 74, y: 28 }
  },
  {
    id: 'patrol-08',
    name: 'Móvil 08 (Motorizado)',
    type: 'Motocicleta',
    status: 'Disponible',
    etaMin: 4,
    sector: 'Sector 4 • Cuadrante 3A',
    lastPing: 'Hace 1 min',
    coords: { x: 25, y: 68 }
  }
];

export const CAMERAS: MunicipalCamera[] = [
  {
    id: 'cam-sb-049',
    code: 'CAM-SB-049',
    name: 'Cámara Municipal Vinculada',
    intersection: 'Av. Las Artes Norte c/ Av. San Luis',
    status: 'En Vivo',
    imageUrl: ASSET_URLS.cameraFeed,
    coords: { x: 50, y: 48 }
  },
  {
    id: 'cam-sb-052',
    code: 'CAM-SB-052',
    name: 'Domo PTZ Rotativo',
    intersection: 'Calle Carpaccio con Jr. Da Vinci',
    status: 'En Vivo',
    imageUrl: ASSET_URLS.cameraFeed,
    coords: { x: 44, y: 32 }
  },
  {
    id: 'cam-sb-021',
    code: 'CAM-SB-021',
    name: 'Cámara Panorámica Municipal',
    intersection: 'Av. San Borja Sur con Av. Aviación',
    status: 'En Vivo',
    imageUrl: ASSET_URLS.cameraFeed,
    coords: { x: 70, y: 65 }
  }
];

export const CONNECTED_STORES: ConnectedStore[] = [
  {
    id: 'st-1',
    name: 'Bodega Don Lucho',
    address: 'Av. Las Artes Norte 412',
    type: 'Bodega & Minimarket',
    cuadrante: 'Cuadrante 3B',
    owner: 'Luis Mendoza',
    verified: true,
    coords: { x: 50, y: 50 }
  },
  {
    id: 'st-2',
    name: 'Bodega Doña Rosa',
    address: 'Calle Carpaccio 315',
    type: 'Abarrotes y Frutería',
    cuadrante: 'Cuadrante 3B',
    owner: 'Rosa Calderón',
    verified: true,
    coords: { x: 46, y: 38 }
  },
  {
    id: 'st-3',
    name: 'Farmacia San Borja Salud',
    address: 'Av. San Luis 1420',
    type: 'Botica & Farmacia',
    cuadrante: 'Cuadrante 3B',
    owner: 'Dr. C. Rivera',
    verified: true,
    coords: { x: 58, y: 42 }
  },
  {
    id: 'st-4',
    name: 'Panadería y Pastelería Dulce Arte',
    address: 'Jr. Rembrandt 240',
    type: 'Panadería artesanal',
    cuadrante: 'Cuadrante 3B',
    owner: 'Silvia Morales',
    verified: true,
    coords: { x: 38, y: 56 }
  },
  {
    id: 'st-5',
    name: 'Librería & Bazar El Estudiante',
    address: 'Calle Da Vinci 112',
    type: 'Bazar escolar',
    cuadrante: 'Cuadrante 3B',
    owner: 'Jorge Vega',
    verified: true,
    coords: { x: 65, y: 30 }
  }
];
