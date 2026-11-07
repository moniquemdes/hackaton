export type ContactType = "emergencia" | "trafico" | "desaparecidos" | "apoio" | "internacional";

export interface Contact {
  id: string;
  country: string;
  name: string;
  type: ContactType;
  phone?: string;
  url?: string;
  description: string;
  hours?: string;
}

export const CONTACT_TYPE_LABEL: Record<ContactType, string> = {
  emergencia: "Emergência",
  trafico: "Tráfico de pessoas",
  desaparecidos: "Pessoas desaparecidas",
  apoio: "Apoio às famílias",
  internacional: "Cooperação internacional",
};

export const INTERNATIONAL = "Internacional";

export const CONTACTS: Contact[] = [
  // Internacional
  {
    id: "icrc-rfl",
    country: INTERNATIONAL,
    name: "Cruz Vermelha — Restabelecimento de Laços Familiares",
    type: "internacional",
    url: "https://familylinks.icrc.org",
    description:
      "Ajuda a localizar familiares separados por migração, conflitos ou desastres. Atendimento gratuito e confidencial em vários países.",
  },
  {
    id: "interpol-yellow",
    country: INTERNATIONAL,
    name: "INTERPOL — Difusão Amarela",
    type: "internacional",
    url: "https://www.interpol.int/pt/Como-trabalhamos/Notificacoes/Notificacoes-amarelas",
    description:
      "Alerta mundial para pessoas desaparecidas. Não é pedido pela família: solicite à polícia do seu país que faça o pedido.",
  },
  {
    id: "oim",
    country: INTERNATIONAL,
    name: "OIM — Organização Internacional para as Migrações",
    type: "internacional",
    url: "https://www.iom.int",
    description:
      "Assistência a vítimas de tráfico, abrigo, retorno seguro e reintegração em mais de 170 países.",
  },
  {
    id: "unodc",
    country: INTERNATIONAL,
    name: "UNODC — Escritório da ONU sobre Drogas e Crime",
    type: "internacional",
    url: "https://www.unodc.org/unodc/pt/human-trafficking/",
    description: "Informação oficial sobre tráfico de pessoas e as leis que protegem as vítimas.",
  },
  {
    id: "icmp",
    country: INTERNATIONAL,
    name: "ICMP — Comissão Internacional sobre Pessoas Desaparecidas",
    type: "desaparecidos",
    url: "https://www.icmp.int",
    description:
      "Apoio técnico, identificação por DNA e registro de casos de pessoas desaparecidas em contexto internacional.",
  },
  {
    id: "mce",
    country: INTERNATIONAL,
    name: "Missing Children Europe — 116 000",
    type: "desaparecidos",
    phone: "116 000",
    url: "https://missingchildreneurope.eu",
    description:
      "Linha europeia gratuita para crianças desaparecidas, disponível em todos os países da União Europeia.",
  },

  // Brasil
  {
    id: "br-190",
    country: "Brasil",
    name: "Polícia Militar",
    type: "emergencia",
    phone: "190",
    description: "Emergência imediata. Registre o desaparecimento sem esperar 24 horas.",
    hours: "24h",
  },
  {
    id: "br-100",
    country: "Brasil",
    name: "Disque 100 — Direitos Humanos",
    type: "trafico",
    phone: "100",
    url: "https://www.gov.br/mdh/pt-br/disque100",
    description:
      "Denúncias de tráfico de pessoas, exploração e violações de direitos. Gratuito e pode ser anônimo.",
    hours: "24h",
  },
  {
    id: "br-180",
    country: "Brasil",
    name: "Ligue 180 — Central de Atendimento à Mulher",
    type: "trafico",
    phone: "180",
    url: "https://www.gov.br/mulheres/pt-br/ligue180",
    description:
      "Recebe denúncias de tráfico e exploração de mulheres, inclusive brasileiras no exterior.",
    hours: "24h",
  },
  {
    id: "br-pf",
    country: "Brasil",
    name: "Polícia Federal",
    type: "trafico",
    url: "https://www.gov.br/pf/pt-br",
    description:
      "Responsável por investigar o tráfico internacional de pessoas e solicitar alertas à INTERPOL.",
  },
  {
    id: "br-mre",
    country: "Brasil",
    name: "Itamaraty — Assistência consular",
    type: "internacional",
    url: "https://www.gov.br/mre/pt-br/assuntos/portal-consular",
    description:
      "Para brasileiros desaparecidos ou em risco no exterior. Contate o consulado do país onde a pessoa estava.",
  },
  {
    id: "br-maes-se",
    country: "Brasil",
    name: "Mães da Sé",
    type: "apoio",
    url: "https://www.maesdase.org.br",
    description:
      "Organização de famílias que acolhe, orienta e ajuda na divulgação de pessoas desaparecidas.",
  },

  // Portugal
  {
    id: "pt-112",
    country: "Portugal",
    name: "Número Europeu de Emergência",
    type: "emergencia",
    phone: "112",
    description: "Emergência imediata: polícia, bombeiros e saúde.",
    hours: "24h",
  },
  {
    id: "pt-tsh",
    country: "Portugal",
    name: "Linha de Apoio a Vítimas de Tráfico de Pessoas",
    type: "trafico",
    phone: "964 608 288",
    url: "https://www.gov.pt/servicos/pedir-apoio-para-as-vitimas-de-trafico-de-pessoas",
    description: "Serviço anónimo e confidencial com informação sobre apoio e proteção.",
    hours: "24h",
  },
  {
    id: "pt-116000",
    country: "Portugal",
    name: "SOS Criança Desaparecida",
    type: "desaparecidos",
    phone: "116 000",
    description: "Linha gratuita para casos de crianças e jovens desaparecidos.",
    hours: "24h",
  },
  {
    id: "pt-apav",
    country: "Portugal",
    name: "APAV — Linha de Apoio à Vítima",
    type: "apoio",
    phone: "116 006",
    url: "https://apav.pt",
    description: "Apoio gratuito e confidencial a vítimas de crime e às suas famílias.",
  },

  // Espanha
  {
    id: "es-112",
    country: "Espanha",
    name: "Emergências",
    type: "emergencia",
    phone: "112",
    description: "Emergência imediata. Também 091 (Policía Nacional) e 062 (Guardia Civil).",
    hours: "24h",
  },
  {
    id: "es-trata",
    country: "Espanha",
    name: "Policía Nacional — Linha contra a Trata",
    type: "trafico",
    phone: "900 10 50 90",
    url: "https://www.policia.es",
    description: "Denúncias de tráfico de pessoas. Também por e-mail: trata@policia.es.",
    hours: "24h",
  },
  {
    id: "es-116000",
    country: "Espanha",
    name: "Fundación ANAR — Menores desaparecidos",
    type: "desaparecidos",
    phone: "116 000",
    url: "https://www.anar.org",
    description: "Linha gratuita para crianças e adolescentes desaparecidos.",
    hours: "24h",
  },

  // Argentina
  {
    id: "ar-145",
    country: "Argentina",
    name: "Línea 145 — Trata de personas",
    type: "trafico",
    phone: "145",
    url: "https://www.argentina.gob.ar/justicia/trata",
    description: "Denúncias gratuitas e anónimas de tráfico e exploração de pessoas.",
    hours: "24h",
  },
  {
    id: "ar-911",
    country: "Argentina",
    name: "Emergências",
    type: "emergencia",
    phone: "911",
    description: "Emergência imediata.",
    hours: "24h",
  },

  // Colômbia
  {
    id: "co-trata",
    country: "Colômbia",
    name: "Línea Nacional Anti-Trata — Ministerio del Interior",
    type: "trafico",
    phone: "01 8000 52 2020",
    url: "https://www.mininterior.gov.co/grupo-de-lucha-contra-la-trata-de-personas/linea-de-atencion-gratuita/",
    description:
      "Denúncias, orientação e verificação de ofertas de trabalho suspeitas. E-mail: lineatratadepersonas@mininterior.gov.co.",
    hours: "24h",
  },
  {
    id: "co-123",
    country: "Colômbia",
    name: "Emergências",
    type: "emergencia",
    phone: "123",
    description: "Emergência imediata. Fiscalía: 122.",
    hours: "24h",
  },

  // México
  {
    id: "mx-trata",
    country: "México",
    name: "Línea Nacional contra la Trata de Personas",
    type: "trafico",
    phone: "800 5533 000",
    url: "https://consejociudadanomx.org",
    description: "Orientação e denúncia confidencial, operada pelo Consejo Ciudadano.",
    hours: "24h",
  },
  {
    id: "mx-911",
    country: "México",
    name: "Emergências",
    type: "emergencia",
    phone: "911",
    description: "Emergência imediata. Denúncia anónima: 089.",
    hours: "24h",
  },

  // Estados Unidos
  {
    id: "us-nhth",
    country: "Estados Unidos",
    name: "National Human Trafficking Hotline",
    type: "trafico",
    phone: "1-888-373-7888",
    url: "https://humantraffickinghotline.org",
    description: "Atendimento em mais de 200 idiomas. Também por SMS: 233733.",
    hours: "24h",
  },
  {
    id: "us-ncmec",
    country: "Estados Unidos",
    name: "NCMEC — Crianças desaparecidas e exploradas",
    type: "desaparecidos",
    phone: "1-800-843-5678",
    url: "https://www.missingkids.org",
    description: "Apoio em casos de crianças desaparecidas ou exploradas.",
    hours: "24h",
  },
  {
    id: "us-namus",
    country: "Estados Unidos",
    name: "NamUs — Sistema Nacional de Desaparecidos",
    type: "desaparecidos",
    url: "https://namus.nij.ojp.gov",
    description: "Base pública de pessoas desaparecidas e não identificadas.",
  },

  // Reino Unido
  {
    id: "uk-msh",
    country: "Reino Unido",
    name: "Modern Slavery & Exploitation Helpline",
    type: "trafico",
    phone: "08000 121 700",
    url: "https://www.modernslaveryhelpline.org",
    description: "Linha confidencial sobre escravidão moderna e exploração.",
    hours: "24h",
  },
  {
    id: "uk-missing",
    country: "Reino Unido",
    name: "Missing People",
    type: "apoio",
    phone: "116 000",
    url: "https://www.missingpeople.org.uk",
    description: "Apoio gratuito e confidencial às famílias de pessoas desaparecidas.",
    hours: "24h",
  },
];

export function listCountries(contacts: Contact[] = CONTACTS): string[] {
  const set = new Set(contacts.map((c) => c.country));
  const rest = [...set].filter((c) => c !== INTERNATIONAL).sort((a, b) => a.localeCompare(b, "pt"));
  return set.has(INTERNATIONAL) ? [INTERNATIONAL, ...rest] : rest;
}

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function filterContacts(
  contacts: Contact[],
  opts: { country?: string; type?: ContactType | "todos"; query?: string },
): Contact[] {
  const q = opts.query ? normalize(opts.query.trim()) : "";
  return contacts.filter((c) => {
    if (opts.country && opts.country !== "todos") {
      // International resources are always shown alongside a chosen country.
      if (c.country !== opts.country && c.country !== INTERNATIONAL) return false;
    }
    if (opts.type && opts.type !== "todos" && c.type !== opts.type) return false;
    if (q) {
      const hay = normalize(`${c.name} ${c.description} ${c.country} ${c.phone ?? ""}`);
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}
