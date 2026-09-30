import type { StaticImageData } from "next/image";
import type { Locale } from "@/i18n/routing";
import type { ProductSlug, WorkSlug } from "./catalog";

import servusHero from "@/assets/images/servus-hero.webp";
import trumunoHome from "@/assets/images/trumuno-home.webp";
import trumunoScoring from "@/assets/images/trumuno-scoring.webp";
import trumunoTiers from "@/assets/images/trumuno-tiers.webp";
import audioCleaner from "@/assets/images/audio-cleaner.webp";
import moambeira from "@/assets/images/moambeira.webp";
import rh from "@/assets/images/rh.webp";
import ibexVenue from "@/assets/images/ibex-venue.webp";
import fenixAcademy from "@/assets/images/fenix-academy.webp";
import urolundo from "@/assets/images/urolundo.webp";
import partnership from "@/assets/images/partnership.webp";

/**
 * Every image on the site, with its provenance. Source: "Pacote visual" Revisão 2 (30 Sept 2026).
 *
 * kind:
 *  - "conceptual"  AI-generated. Always shows the "Imagem conceptual" label (guide: autenticidade).
 *  - "screenshot"  Real product interface. No label.
 *  - "photo"       Real photograph (may be retouched). No label.
 *
 * position: CSS object-position used when the image is cropped (guide: "não usar o mesmo
 * centro de recorte em todas as imagens").
 *
 * To replace a conceptual image with an official one: drop the new file in src/assets/images,
 * point `src` at it, change `kind`, and update the alt text. Nothing else changes.
 */
export type MediaKind = "conceptual" | "screenshot" | "photo";

export interface Media {
  src: StaticImageData;
  kind: MediaKind;
  position: string;
  alt: Record<Locale, string>;
  caption?: Record<Locale, string>;
}

export const media = {
  servusHero: {
    src: servusHero,
    kind: "conceptual",
    position: "72% 50%",
    alt: {
      pt: "Profissionais internacionais colaboram num projeto tecnológico num escritório moderno.",
      en: "International professionals collaborate on a technology project in a modern office.",
    },
  },
  trumunoHome: {
    src: trumunoHome,
    kind: "screenshot",
    position: "0% 0%",
    alt: {
      pt: "Página inicial real do Trumuno Footy com desafios, competições e opções de liga.",
      en: "The real Trumuno Footy home page, showing challenges, competitions and league options.",
    },
  },
  trumunoScoring: {
    src: trumunoScoring,
    kind: "screenshot",
    position: "50% 0%",
    alt: {
      pt: "Sistema de pontuação do Trumuno Footy no nível Profissional: resultado exato, resultado correto e marcador.",
      en: "Trumuno Footy scoring in the Professional tier: exact score, correct result and scorer pick.",
    },
    caption: {
      pt: "Três níveis, três classificações. Cada um tem as suas regras de pontuação.",
      en: "Three tiers, three leaderboards, each with its own scoring rules.",
    },
  },
  trumunoTiers: {
    src: trumunoTiers,
    kind: "screenshot",
    position: "50% 0%",
    alt: {
      pt: "Nível Amador do Trumuno Footy, com uma escolha de marcador por jogo.",
      en: "Trumuno Footy Amateur tier, with one scorer pick per match.",
    },
    caption: {
      pt: "Experimente antes de jogar: veja como os pontos funcionam em cada nível.",
      en: "Try it before you play: see how points work in each tier.",
    },
  },
  audioCleaner: {
    src: audioCleaner,
    kind: "conceptual",
    position: "80% 50%",
    alt: {
      pt: "Criadora de conteúdos grava áudio com microfone enquanto uma forma de onda representa a limpeza de ruído.",
      en: "A content creator records audio at a microphone while a waveform represents noise being cleaned up.",
    },
  },
  moambeira: {
    src: moambeira,
    kind: "conceptual",
    position: "50% 45%",
    alt: {
      pt: "Viajante e comprador confirmam a entrega transparente de um produto regional legal num aeroporto.",
      en: "A traveller and a buyer confirm the transparent handover of a legal regional product at an airport.",
    },
  },
  rh: {
    src: rh,
    kind: "conceptual",
    position: "42% 50%",
    alt: {
      pt: "Profissional de recursos humanos utiliza automação e digitalização de documentos num escritório angolano.",
      en: "An HR professional uses automation and document scanning in an office in Angola.",
    },
  },
  ibexVenue: {
    src: ibexVenue,
    kind: "photo",
    position: "55% 50%",
    alt: {
      pt: "Balcão iluminado e interior real do IBEX Tokyo em Roppongi.",
      en: "The illuminated bar and real interior of IBEX Tokyo in Roppongi.",
    },
  },
  fenixAcademy: {
    src: fenixAcademy,
    kind: "conceptual",
    position: "50% 50%",
    alt: {
      pt: "Formador orienta profissionais angolanos numa sala moderna de formação com computadores.",
      en: "An instructor guides Angolan professionals in a modern training room with computers.",
    },
  },
  urolundo: {
    src: urolundo,
    kind: "conceptual",
    position: "55% 50%",
    alt: {
      pt: "Médico e coordenadora consultam uma agenda digital numa clínica moderna.",
      en: "A doctor and a clinic coordinator review a digital schedule in a modern clinic.",
    },
  },
  partnership: {
    src: partnership,
    kind: "conceptual",
    position: "50% 45%",
    alt: {
      pt: "Profissionais internacionais celebram uma parceria tecnológica numa reunião.",
      en: "International professionals celebrate a technology partnership in a meeting.",
    },
  },
} satisfies Record<string, Media>;

export type MediaKey = keyof typeof media;

export const productMedia: Record<ProductSlug, MediaKey> = {
  "trumuno-footy": "trumunoHome",
  "audio-cleaner": "audioCleaner",
  moambeira: "moambeira",
  rh: "rh",
};

/** Extra real screenshots shown in a gallery on the product page. */
export const productGallery: Partial<Record<ProductSlug, MediaKey[]>> = {
  "trumuno-footy": ["trumunoScoring", "trumunoTiers"],
};

export const workMedia: Record<WorkSlug, MediaKey> = {
  ibex: "ibexVenue",
  "fenix-academy": "fenixAcademy",
  urolundo: "urolundo",
};
