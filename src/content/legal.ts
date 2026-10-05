import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/routing";

/**
 * Privacy policy and Terms of Use — DRAFT FOR LEGAL REVIEW.
 *
 * Publication workflow (production launch checklist, section 3):
 *   1. Legal/business reviews this text (PT is the reference version; EN must match it).
 *   2. Fill NEXT_PUBLIC_LEGAL_NAME / _ADDRESS / _REGISTRATION and NEXT_PUBLIC_PRIVACY_EMAIL.
 *   3. Replace every "[A CONFIRMAR …]" / "[TO CONFIRM …]" decision below (retention, processors).
 *   4. Set `approved: true` and update `updated`. The draft banner and noindex disappear,
 *      and the page joins the sitemap. `npm run launch:check` blocks indexing until then.
 *
 * Text in square brackets is shown on purpose while in draft so reviewers can see what is missing.
 */
export const legalStatus = {
  privacy: { approved: false, updated: "2026-10-01" },
  terms: { approved: false, updated: "2026-10-01" },
} as const;

export type LegalDoc = keyof typeof legalStatus;

export type LegalBlock = string | { list: string[] } | { table: { head: string[]; rows: string[][] } };
export interface LegalSection {
  id: string;
  heading: string;
  blocks: LegalBlock[];
}
export interface LegalContent {
  title: string;
  seoDescription: string;
  updatedLabel: string;
  draftNotice: string;
  intro: string;
  sections: LegalSection[];
}

function value(v: string | null | undefined, missing: string): string {
  return v && v.trim() ? v : missing;
}

function privacyPt(): LegalContent {
  const entity = value(siteConfig.legal.name, "[A CONFIRMAR: nome da entidade legal responsável]");
  const address = value(siteConfig.legal.address, "[A CONFIRMAR: morada]");
  const registration = value(siteConfig.legal.registration, "[A CONFIRMAR: número de registo / NIF]");
  const contact = value(siteConfig.privacyEmail, "[A CONFIRMAR: email de privacidade]");
  return {
    title: "Política de privacidade",
    seoDescription: "Como a Servus trata os dados pessoais enviados através deste website.",
    updatedLabel: "Última atualização",
    draftNotice:
      "Versão em revisão jurídica. Este texto ainda não foi aprovado e pode mudar antes da publicação definitiva.",
    intro:
      "Esta política explica que dados pessoais recolhemos através deste website, para que os usamos, com quem os partilhamos, durante quanto tempo os guardamos e como pode exercer os seus direitos.",
    sections: [
      {
        id: "responsavel",
        heading: "1. Quem é o responsável pelo tratamento",
        blocks: [
          `O responsável pelo tratamento dos dados é ${entity}, com sede em ${address}, ${registration} ("Servus", "nós").`,
          `Para qualquer questão sobre privacidade ou para exercer os seus direitos, escreva para ${contact}.`,
        ],
      },
      {
        id: "dados",
        heading: "2. Que dados recolhemos",
        blocks: [
          "Recolhemos apenas os dados que nos envia nos formulários: nome, email e, conforme o formulário, empresa, país, a descrição do pedido e as opções que escolher (prazo, orçamento indicativo, módulos de interesse, produto, etc.).",
          "Registamos também a data e hora do envio, o idioma usado, a referência atribuída ao pedido e a confirmação de que aceitou esta política.",
          "Por razões de segurança, o servidor regista temporariamente dados técnicos como o endereço IP e o tipo de navegador, para prevenir abuso e spam.",
          "Não pedimos documentos, dados de pagamento, palavras-passe nem categorias especiais de dados (por exemplo, dados de saúde) no primeiro contacto. Pedimos que não os inclua nas mensagens.",
        ],
      },
      {
        id: "finalidades",
        heading: "3. Para que usamos os dados e com que fundamento",
        blocks: [
          {
            table: {
              head: ["Formulário", "Finalidade", "Fundamento"],
              rows: [
                ["Pedido de serviço", "Responder ao pedido, avaliar o projeto e preparar uma proposta", "Diligências pré-contratuais a seu pedido"],
                ["Parceria", "Avaliar e responder à proposta de parceria", "Diligências pré-contratuais / interesse legítimo"],
                ["Demonstração RH", "Agendar e realizar a demonstração", "Diligências pré-contratuais a seu pedido"],
                ["Contacto geral", "Responder à sua mensagem", "Interesse legítimo em responder a quem nos contacta"],
                ["Suporte de produto", "Resolver o problema reportado no Trumuno Footy", "Execução do contrato / termos do produto"],
                ["Listas de interesse e novidades de produto", "Avisar quando o produto estiver disponível no seu mercado", "Consentimento, que pode retirar a qualquer momento"],
              ],
            },
          },
          "Não usamos os seus dados para publicidade, não os vendemos e não tomamos decisões automatizadas com efeitos jurídicos sobre si.",
        ],
      },
      {
        id: "conservacao",
        heading: "4. Durante quanto tempo guardamos os dados",
        blocks: [
          {
            list: [
              "Pedidos que não resultem em contrato: até 24 meses após o último contacto [A CONFIRMAR].",
              "Pedidos que resultem em contrato: durante a relação contratual e pelos prazos legais de conservação aplicáveis [A CONFIRMAR].",
              "Pedidos de suporte: até 24 meses após o encerramento do pedido [A CONFIRMAR].",
              "Listas de interesse: até ao lançamento do produto no seu mercado ou até retirar o consentimento, no máximo 24 meses [A CONFIRMAR].",
              "Registos técnicos de segurança: apenas pelo período de retenção do fornecedor de alojamento, normalmente alguns dias.",
            ],
          },
        ],
      },
      {
        id: "subcontratantes",
        heading: "5. Com quem partilhamos os dados",
        blocks: [
          "Os pedidos são encaminhados apenas para a equipa Servus responsável. Usamos os seguintes prestadores de serviços (subcontratantes), que tratam os dados por nossa conta e segundo as nossas instruções:",
          {
            list: [
              "Vercel Inc. (EUA): alojamento do website e registos técnicos.",
              "Resend (EUA): envio dos emails gerados pelos formulários.",
              "[A CONFIRMAR: fornecedor das caixas de email da Servus, por exemplo Zoho, Proton, Google Workspace ou Microsoft 365].",
              "[A CONFIRMAR: ferramenta de registo de pedidos ou CRM, se for usada].",
            ],
          },
          "Este website não usa ferramentas de análise (analytics) nem cookies de publicidade. Se isso mudar, esta política será atualizada antes da ativação.",
          "Podemos divulgar dados quando a lei o exigir.",
        ],
      },
      {
        id: "transferencias",
        heading: "6. Transferências internacionais",
        blocks: [
          "A Servus trabalha com clientes em Angola, no Japão e noutros países, e alguns dos nossos prestadores estão nos Estados Unidos. Por isso, os seus dados podem ser tratados fora do país onde se encontra.",
          "Nesses casos, recorremos a prestadores que oferecem garantias adequadas, como cláusulas contratuais-tipo ou mecanismos equivalentes previstos na lei aplicável [A CONFIRMAR pelo jurídico].",
        ],
      },
      {
        id: "direitos",
        heading: "7. Os seus direitos",
        blocks: [
          "Nos termos da legislação de proteção de dados aplicável (incluindo, conforme o caso, a Lei n.º 22/11 de Proteção de Dados Pessoais de Angola, a lei japonesa de proteção de informação pessoal (APPI) e o Regulamento Geral sobre a Proteção de Dados da UE), pode:",
          {
            list: [
              "pedir acesso aos dados que temos sobre si;",
              "pedir a correção de dados incorretos ou incompletos;",
              "pedir a eliminação dos seus dados;",
              "opor-se ao tratamento ou pedir a sua limitação;",
              "retirar o consentimento a qualquer momento, sem afetar o tratamento já realizado;",
              "pedir a portabilidade dos dados, quando aplicável;",
              "apresentar reclamação à autoridade de proteção de dados competente (em Angola, a Agência de Proteção de Dados).",
            ],
          },
          `Para exercer estes direitos, escreva para ${contact}. Respondemos no prazo previsto na lei e poderemos pedir informação para confirmar a sua identidade.`,
        ],
      },
      {
        id: "saude",
        heading: "8. Dados de saúde e projetos de parceiros",
        blocks: [
          "Os formulários deste website não se destinam a recolher dados de saúde. Os projetos de parceiros apresentados no website (por exemplo, Urolundo) têm as suas próprias políticas de privacidade. Se algum serviço operado pela Servus vier a tratar dados de saúde, será informado em separado, antes da recolha, sobre o fundamento e as garantias adicionais aplicáveis.",
        ],
      },
      {
        id: "cookies",
        heading: "9. Cookies",
        blocks: [
          "Usamos apenas um cookie funcional, NEXT_LOCALE, que guarda o idioma escolhido. Não contém dados pessoais e é apagado quando fecha o navegador. Por ser necessário ao funcionamento do website, não exige consentimento.",
          "Não usamos cookies de análise nem de publicidade.",
        ],
      },
      {
        id: "seguranca",
        heading: "10. Segurança",
        blocks: [
          "O website usa ligação cifrada (HTTPS). As credenciais dos serviços de envio ficam apenas no servidor, o acesso aos pedidos está limitado à equipa responsável e aplicamos medidas contra spam e abuso.",
        ],
      },
      {
        id: "alteracoes",
        heading: "11. Alterações a esta política",
        blocks: [
          "Podemos atualizar esta política, por exemplo quando mudarmos de prestadores. A data da última atualização aparece no topo da página.",
        ],
      },
    ],
  };
}

function privacyEn(): LegalContent {
  const entity = value(siteConfig.legal.name, "[TO CONFIRM: name of the responsible legal entity]");
  const address = value(siteConfig.legal.address, "[TO CONFIRM: address]");
  const registration = value(siteConfig.legal.registration, "[TO CONFIRM: registration / tax number]");
  const contact = value(siteConfig.privacyEmail, "[TO CONFIRM: privacy email]");
  return {
    title: "Privacy policy",
    seoDescription: "How Servus handles the personal data sent through this website.",
    updatedLabel: "Last updated",
    draftNotice: "Under legal review. This text has not been approved yet and may change before final publication.",
    intro:
      "This policy explains what personal data we collect through this website, what we use it for, who we share it with, how long we keep it and how you can exercise your rights.",
    sections: [
      {
        id: "controller",
        heading: "1. Who is responsible for your data",
        blocks: [
          `The data controller is ${entity}, registered at ${address}, ${registration} ("Servus", "we").`,
          `For any privacy question, or to exercise your rights, write to ${contact}.`,
        ],
      },
      {
        id: "data",
        heading: "2. What data we collect",
        blocks: [
          "We only collect the data you send us through the forms: name, email and, depending on the form, company, country, the description of your request and the options you choose (timeline, indicative budget, modules of interest, product, etc.).",
          "We also record the date and time of submission, the language used, the reference assigned to your request and your acceptance of this policy.",
          "For security, the server temporarily logs technical data such as your IP address and browser type, to prevent abuse and spam.",
          "We do not ask for documents, payment details, passwords or special categories of data (for example, health data) in a first contact. Please don't include them in your messages.",
        ],
      },
      {
        id: "purposes",
        heading: "3. What we use the data for, and on what basis",
        blocks: [
          {
            table: {
              head: ["Form", "Purpose", "Legal basis"],
              rows: [
                ["Service request", "Reply to your request, assess the project and prepare a proposal", "Steps taken at your request before a contract"],
                ["Partnership", "Assess and reply to the partnership proposal", "Pre-contractual steps / legitimate interest"],
                ["RH demo", "Schedule and run the demo", "Steps taken at your request before a contract"],
                ["General enquiry", "Reply to your message", "Legitimate interest in replying to people who contact us"],
                ["Product support", "Solve the issue you reported in Trumuno Footy", "Performance of a contract / product terms"],
                ["Interest lists and product updates", "Let you know when the product is available in your market", "Consent, which you can withdraw at any time"],
              ],
            },
          },
          "We do not use your data for advertising, we do not sell it and we do not make automated decisions with legal effects about you.",
        ],
      },
      {
        id: "retention",
        heading: "4. How long we keep the data",
        blocks: [
          {
            list: [
              "Requests that don't lead to a contract: up to 24 months after the last contact [TO CONFIRM].",
              "Requests that lead to a contract: for the duration of the contract and the applicable legal retention periods [TO CONFIRM].",
              "Support requests: up to 24 months after the request is closed [TO CONFIRM].",
              "Interest lists: until the product launches in your market or you withdraw consent, for at most 24 months [TO CONFIRM].",
              "Technical security logs: only for the hosting provider's retention period, usually a few days.",
            ],
          },
        ],
      },
      {
        id: "processors",
        heading: "5. Who we share the data with",
        blocks: [
          "Requests are only forwarded to the responsible Servus team. We use the following service providers (processors), who handle data on our behalf and under our instructions:",
          {
            list: [
              "Vercel Inc. (USA): website hosting and technical logs.",
              "Resend (USA): sending the emails generated by the forms.",
              "[TO CONFIRM: Servus mailbox provider, e.g. Zoho, Proton, Google Workspace or Microsoft 365].",
              "[TO CONFIRM: request-tracking tool or CRM, if used].",
            ],
          },
          "This website uses no analytics tools and no advertising cookies. If that changes, this policy will be updated before they are switched on.",
          "We may disclose data where required by law.",
        ],
      },
      {
        id: "transfers",
        heading: "6. International transfers",
        blocks: [
          "Servus works with clients in Angola, Japan and other countries, and some of our providers are in the United States. Your data may therefore be processed outside the country where you are.",
          "In those cases we use providers that offer appropriate safeguards, such as standard contractual clauses or equivalent mechanisms under the applicable law [TO CONFIRM by legal].",
        ],
      },
      {
        id: "rights",
        heading: "7. Your rights",
        blocks: [
          "Under the applicable data protection law (including, as relevant, Angola's Personal Data Protection Law No. 22/11, Japan's Act on the Protection of Personal Information (APPI) and the EU General Data Protection Regulation), you can:",
          {
            list: [
              "ask for access to the data we hold about you;",
              "ask us to correct inaccurate or incomplete data;",
              "ask us to delete your data;",
              "object to processing or ask us to restrict it;",
              "withdraw consent at any time, without affecting processing already carried out;",
              "ask for data portability, where applicable;",
              "complain to the competent data protection authority (in Angola, the Agência de Proteção de Dados).",
            ],
          },
          `To exercise these rights, write to ${contact}. We reply within the period set by law and may ask for information to confirm your identity.`,
        ],
      },
      {
        id: "health",
        heading: "8. Health data and partner projects",
        blocks: [
          "The forms on this website are not intended to collect health data. Partner projects shown on the website (for example, Urolundo) have their own privacy policies. If a service operated by Servus ever processes health data, you will be informed separately, before collection, of the legal basis and the additional safeguards that apply.",
        ],
      },
      {
        id: "cookies",
        heading: "9. Cookies",
        blocks: [
          "We only use one functional cookie, NEXT_LOCALE, which remembers your chosen language. It contains no personal data and is deleted when you close your browser. Because it is needed for the website to work, it does not require consent.",
          "We use no analytics or advertising cookies.",
        ],
      },
      {
        id: "security",
        heading: "10. Security",
        blocks: [
          "The website uses an encrypted connection (HTTPS). Credentials for the sending services are kept on the server only, access to requests is limited to the responsible team, and we apply anti-spam and anti-abuse measures.",
        ],
      },
      {
        id: "changes",
        heading: "11. Changes to this policy",
        blocks: ["We may update this policy, for example when we change providers. The date of the last update is shown at the top of the page."],
      },
    ],
  };
}

function termsPt(): LegalContent {
  const entity = value(siteConfig.legal.name, "[A CONFIRMAR: nome da entidade legal]");
  return {
    title: "Termos de utilização",
    seoDescription: "Condições de utilização do website da Servus.",
    updatedLabel: "Última atualização",
    draftNotice: "Versão em revisão jurídica. Este texto ainda não foi aprovado e pode mudar antes da publicação definitiva.",
    intro: `Estes termos regulam a utilização deste website, operado por ${entity}. Ao usar o website, aceita estes termos.`,
    sections: [
      {
        id: "objeto",
        heading: "1. Finalidade do website",
        blocks: [
          "Este website apresenta a Servus, os seus serviços, produtos e trabalhos, e permite enviar pedidos de contacto. A informação é geral e não constitui uma proposta contratual. Qualquer serviço é regulado por um contrato próprio.",
        ],
      },
      {
        id: "conteudos",
        heading: "2. Conteúdos e imagens",
        blocks: [
          "Os textos, o logótipo e os restantes conteúdos pertencem à Servus ou aos respetivos titulares e não podem ser reutilizados sem autorização.",
          "As imagens assinaladas como \"Imagem conceptual\" ou \"Ilustração conceptual\" são ilustrativas e não representam clientes, pessoas ou locais reais.",
          "Os nomes e marcas de parceiros e produtos de terceiros pertencem aos respetivos titulares e são apresentados com a sua autorização [A CONFIRMAR].",
        ],
      },
      {
        id: "ligacoes",
        heading: "3. Ligações para outros websites",
        blocks: [
          "O website inclui ligações para websites de produtos e parceiros (por exemplo, Trumuno Footy e IBEX). Esses websites têm os seus próprios termos e políticas, pelos quais a Servus não é responsável.",
        ],
      },
      {
        id: "uso",
        heading: "4. Utilização aceitável",
        blocks: [
          "Não pode usar o website ou os formulários para enviar spam, conteúdos ilícitos ou maliciosos, nem tentar aceder sem autorização a sistemas ou dados.",
        ],
      },
      {
        id: "responsabilidade",
        heading: "5. Disponibilidade e responsabilidade",
        blocks: [
          "Procuramos manter a informação correta e o website disponível, mas não garantimos que esteja sempre livre de erros ou interrupções. Na medida permitida por lei, a Servus não é responsável por danos resultantes da utilização do website.",
        ],
      },
      {
        id: "privacidade",
        heading: "6. Privacidade",
        blocks: ["O tratamento dos dados pessoais enviados através do website é descrito na política de privacidade."],
      },
      {
        id: "lei",
        heading: "7. Lei aplicável",
        blocks: ["Estes termos regem-se pela lei [A CONFIRMAR: Angola / Japão], sendo competentes os tribunais de [A CONFIRMAR]."],
      },
    ],
  };
}

function termsEn(): LegalContent {
  const entity = value(siteConfig.legal.name, "[TO CONFIRM: legal entity name]");
  return {
    title: "Terms of use",
    seoDescription: "Conditions for using the Servus website.",
    updatedLabel: "Last updated",
    draftNotice: "Under legal review. This text has not been approved yet and may change before final publication.",
    intro: `These terms govern the use of this website, operated by ${entity}. By using the website, you accept these terms.`,
    sections: [
      {
        id: "purpose",
        heading: "1. Purpose of the website",
        blocks: [
          "This website presents Servus, its services, products and work, and lets you send contact requests. The information is general and is not a contractual offer. Any service is governed by its own contract.",
        ],
      },
      {
        id: "content",
        heading: "2. Content and images",
        blocks: [
          "The text, logo and other content belong to Servus or their respective owners and may not be reused without permission.",
          "Images labelled \"Conceptual image\" or \"Conceptual illustration\" are illustrative and do not show real clients, people or places.",
          "Partner and third-party product names and brands belong to their owners and are shown with their permission [TO CONFIRM].",
        ],
      },
      {
        id: "links",
        heading: "3. Links to other websites",
        blocks: [
          "The website links to product and partner websites (for example, Trumuno Footy and IBEX). Those websites have their own terms and policies, for which Servus is not responsible.",
        ],
      },
      {
        id: "use",
        heading: "4. Acceptable use",
        blocks: ["You may not use the website or its forms to send spam, unlawful or malicious content, or try to gain unauthorized access to systems or data."],
      },
      {
        id: "liability",
        heading: "5. Availability and liability",
        blocks: [
          "We aim to keep the information accurate and the website available, but we do not guarantee it will always be free of errors or interruptions. To the extent permitted by law, Servus is not liable for damage resulting from the use of the website.",
        ],
      },
      {
        id: "privacy",
        heading: "6. Privacy",
        blocks: ["How we handle personal data sent through the website is described in the privacy policy."],
      },
      {
        id: "law",
        heading: "7. Governing law",
        blocks: ["These terms are governed by the law of [TO CONFIRM: Angola / Japan], and the courts of [TO CONFIRM] have jurisdiction."],
      },
    ],
  };
}

const builders: Record<LegalDoc, Record<Locale, () => LegalContent>> = {
  privacy: { pt: privacyPt, en: privacyEn },
  terms: { pt: termsPt, en: termsEn },
};

export function getLegal(doc: LegalDoc, locale: Locale): LegalContent {
  return builders[doc][locale]();
}
