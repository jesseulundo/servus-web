import type { SiteContent } from "../types";

/**
 * Portuguese copy. Source: "Servus Guia de Marca e Website" v1.0 (Setembro de 2026).
 * Text marked with "Rascunho" / draft in the catalog awaits approval by the owners
 * listed in the blueprint checklist.
 */
const pt: SiteContent = {
  home: {
    seo: {
      title: "Tecnologia aplicada aos problemas reais do seu negócio",
      description:
        "A Servus cria produtos digitais e ajuda empresas a desenvolver websites, aplicações, sistemas de gestão e soluções com inteligência artificial.",
    },
    hero: {
      title: "Tecnologia aplicada aos problemas reais do seu negócio",
      text: "A Servus cria produtos digitais e ajuda empresas a desenvolver websites, aplicações, sistemas de gestão e soluções com inteligência artificial.",
    },
    capabilities: {
      title: "Do desafio à solução digital",
      intro: "Consultoria, desenvolvimento, automação, integrações e manutenção — da primeira conversa à implementação e evolução da plataforma.",
    },
    products: {
      title: "Produtos Servus",
      intro: "Construímos e operamos os nossos próprios produtos. É a melhor prova de que sabemos levar uma ideia até à produção.",
    },
    work: {
      title: "Soluções para os nossos parceiros",
      intro: "Projetos desenvolvidos ou geridos pela Servus para outras organizações. Cada caso indica o parceiro e a nossa contribuição.",
    },
    method: {
      title: "Como trabalhamos",
      intro: "Começamos pelo problema, validamos o valor e só depois escolhemos a tecnologia.",
      steps: [
        { title: "Descoberta", text: "Compreendemos o negócio, os utilizadores e o problema a resolver." },
        { title: "Definição", text: "Acordamos âmbito, prioridades, custos e responsabilidades." },
        { title: "Construção", text: "Desenvolvemos em ciclos curtos, com versões que pode ver e testar." },
        { title: "Lançamento", text: "Publicamos, acompanhamos a adoção e corrigimos o que for preciso." },
        { title: "Evolução", text: "Mantemos, medimos e acrescentamos funcionalidades, idiomas e integrações." },
      ],
    },
    trust: {
      title: "Tecnologia com responsabilidade",
      items: [
        { title: "Segurança", text: "Credenciais no servidor, acessos mínimos e dependências atualizadas." },
        { title: "Dados", text: "Recolhemos apenas o necessário e tratamos dados pessoais com cuidado." },
        { title: "Acessibilidade", text: "Interfaces que funcionam com teclado, leitores de ecrã e em telemóvel." },
        { title: "Suporte", text: "Acompanhamento depois do lançamento, com responsáveis definidos." },
        { title: "Transparência", text: "Explicamos limites, dependências e próximos passos sem rodeios." },
      ],
    },
    contact: {
      title: "Conte-nos o que precisa de resolver",
      text: "Uma descrição curta chega. Respondemos com perguntas ou uma proposta de conversa.",
      partnershipLink: "Procura uma parceria? Use o formulário de parcerias.",
    },
  },

  company: {
    seo: {
      title: "Empresa",
      description: "A Servus une conhecimento técnico e visão de negócio: consultoria, desenvolvimento e produtos digitais próprios.",
    },
    title: "Conhecimento técnico com visão de negócio",
    intro:
      "A Servus nasceu para unir conhecimento técnico e visão de negócio. Desenvolvemos produtos próprios e colaboramos com organizações que precisam de construir, modernizar ou manter soluções digitais.",
    blocks: [
      { title: "Quem somos", text: "Uma empresa de tecnologia focada em consultoria, desenvolvimento e produtos digitais." },
      {
        title: "O que nos distingue",
        text: "Experiência prática em produtos próprios, colaboração próxima e capacidade de trabalhar em vários mercados.",
      },
      { title: "Como pensamos", text: "Começamos pelo problema, validamos o valor e escolhemos a tecnologia adequada." },
    ],
    mission: {
      title: "Missão",
      text: "Transformar problemas operacionais e oportunidades de mercado em soluções digitais úteis, seguras e sustentáveis.",
    },
    vision: {
      title: "Visão",
      text: "Construir uma empresa tecnológica reconhecida pela capacidade de criar produtos próprios e entregar soluções digitais relevantes para organizações em África, Europa, Ásia e outros mercados.",
    },
    promise: {
      title: "Promessa",
      text: "Compreender o problema antes de propor tecnologia. Cada solução deve ser clara para o utilizador, administrável para o cliente e preparada para evoluir.",
    },
    pillarsTitle: "Princípios",
    pillars: [
      { title: "Clareza", text: "Explicamos o problema, a solução, o custo e os próximos passos sem linguagem desnecessariamente técnica." },
      { title: "Execução", text: "Mostramos produtos e projetos reais, com fases, resultados e responsabilidades definidas." },
      { title: "Adaptação", text: "Desenhamos soluções adequadas ao mercado, à equipa e ao nível de maturidade digital do cliente." },
      { title: "Confiança", text: "Tratamos dados, acessos, pagamentos e operações com responsabilidade." },
      { title: "Evolução", text: "Criamos sistemas que podem receber novas funcionalidades, idiomas e integrações." },
    ],
    markets: {
      title: "Onde atuamos",
      text: "Temos projetos com ligações ao Japão, a Angola e a mercados internacionais. Não nos limitamos a um único país.",
      tags: ["Japão", "Angola", "Internacional"],
    },
    cta: { title: "Vamos conversar sobre o seu projeto", text: "Diga-nos o que precisa de resolver e em que mercado." },
  },

  services: {
    seo: {
      title: "Serviços",
      description: "Consultoria de TI, websites responsivos, aplicações móveis, sistemas de gestão, IA e automação, manutenção e evolução.",
    },
    title: "Serviços",
    intro: "Capacidades transformadas em ofertas claras. Cada serviço começa pelo problema que resolve.",
    labels: {
      problem: "O problema",
      deliverables: "Entregáveis típicos",
      related: "Trabalho relacionado",
      faq: "Perguntas frequentes",
      process: "Processo",
    },
    items: {
      "it-consulting": {
        name: "Consultoria de TI",
        summary: "Clareza sobre arquitetura, tecnologia, dados e plano de execução antes de investir.",
        seo: {
          title: "Consultoria de TI",
          description: "Diagnóstico, arquitetura, roteiro e avaliação técnica para decidir com segurança.",
        },
        problem: {
          title: "Decisões técnicas sem informação suficiente",
          text: "Falta de clareza sobre arquitetura, tecnologia, dados ou plano de execução.",
          impact: ["Investimentos em ferramentas que não servem o processo", "Projetos que atrasam por falta de prioridades", "Dependência de fornecedores sem alternativa"],
        },
        approach: {
          title: "Como abordamos",
          text: "Analisamos o processo atual, os sistemas existentes e os objetivos do negócio. Apresentamos opções com custos, riscos e próximos passos, e ajudamos a decidir.",
        },
        deliverables: { title: "Entregáveis típicos", items: ["Diagnóstico", "Arquitetura", "Roteiro", "Avaliação técnica", "Apoio à decisão"] },
        process: {
          title: "Processo",
          steps: [
            { title: "Conversa inicial", text: "Objetivos, contexto e restrições." },
            { title: "Análise", text: "Entrevistas, sistemas e dados disponíveis." },
            { title: "Recomendação", text: "Opções comparadas e roteiro proposto." },
          ],
          clientResponsibilities: {
            title: "O que precisamos de si",
            items: ["Um responsável com poder de decisão", "Acesso à documentação e às pessoas-chave", "Disponibilidade para validar as conclusões"],
          },
        },
        faq: [
          { q: "A consultoria obriga a desenvolver com a Servus?", a: "Não. As recomendações são suas e podem ser executadas por qualquer equipa." },
        ],
        cta: { title: "Precisa de decidir o próximo passo técnico?", text: "Marque uma conversa de descoberta." },
      },
      websites: {
        name: "Websites responsivos",
        summary: "Uma presença digital atual, rápida e fácil de gerir, que converte visitas em contactos.",
        seo: { title: "Websites responsivos", description: "Websites institucionais, landing pages, portais, CMS, SEO e analytics." },
        problem: {
          title: "Presença digital fraca ou desatualizada",
          text: "Um website lento, difícil de atualizar ou que não explica o que a empresa faz perde oportunidades todos os dias.",
          impact: ["Visitantes que saem sem contactar", "Conteúdo que só um fornecedor consegue alterar", "Pouca visibilidade nos motores de pesquisa"],
        },
        approach: {
          title: "Como abordamos",
          text: "Definimos primeiro o que o visitante precisa de encontrar e a ação que queremos que tome. Depois desenhamos, escrevemos e construímos para telemóvel e desktop.",
        },
        deliverables: { title: "Entregáveis típicos", items: ["Website institucional", "Landing page", "Portal", "CMS", "SEO", "Analytics"] },
        process: {
          title: "Processo",
          steps: [
            { title: "Estrutura", text: "Mapa do website, percursos e conteúdos." },
            { title: "Design", text: "Protótipo em desktop e mobile." },
            { title: "Desenvolvimento", text: "Construção, CMS e integrações." },
            { title: "Lançamento", text: "Domínio, indexação e monitorização." },
          ],
          clientResponsibilities: {
            title: "O que precisamos de si",
            items: ["Textos e imagens aprovados, ou tempo para os validar", "Acesso ao domínio", "Um responsável pela revisão"],
          },
        },
        faq: [{ q: "Posso editar o conteúdo sozinho?", a: "Sim. Configuramos um CMS adequado à sua equipa e explicamos como o usar." }],
        cta: { title: "Quer um website que trabalhe por si?", text: "Conte-nos o objetivo e o público." },
      },
      "mobile-apps": {
        name: "Aplicações móveis",
        summary: "Uma experiência móvel dedicada para clientes, equipas ou operações no terreno.",
        seo: { title: "Aplicações móveis", description: "Aplicações iOS e Android com backend, autenticação, notificações e publicação." },
        problem: {
          title: "Necessidade de uma experiência móvel dedicada",
          text: "Alguns serviços só funcionam bem quando estão no bolso do utilizador: marcações, notificações, trabalho no terreno.",
          impact: ["Processos que dependem de telefone ou papel", "Clientes que não voltam por falta de lembretes", "Equipas sem acesso à informação fora do escritório"],
        },
        approach: {
          title: "Como abordamos",
          text: "Validamos o fluxo essencial com um protótipo antes de construir. Desenvolvemos a aplicação, o backend e tratamos da publicação nas lojas.",
        },
        deliverables: {
          title: "Entregáveis típicos",
          items: ["Aplicação iOS e Android", "Backend", "Autenticação", "Notificações", "Publicação nas lojas"],
        },
        process: {
          title: "Processo",
          steps: [
            { title: "Protótipo", text: "Fluxo principal testado com utilizadores." },
            { title: "Desenvolvimento", text: "Aplicação e backend em ciclos curtos." },
            { title: "Publicação", text: "App Store, Google Play e monitorização." },
          ],
          clientResponsibilities: {
            title: "O que precisamos de si",
            items: ["Contas de programador nas lojas", "Utilizadores disponíveis para testes", "Regras de negócio validadas"],
          },
        },
        faq: [{ q: "Uma aplicação ou um website responsivo?", a: "Depende do uso. Ajudamos a decidir antes de começar — nem sempre é preciso uma aplicação." }],
        cta: { title: "Tem uma ideia para uma aplicação?", text: "Comece por nos explicar quem a vai usar." },
      },
      "management-systems": {
        name: "Sistemas de gestão",
        summary: "Menos processos manuais e toda a informação num só lugar, com permissões e relatórios.",
        seo: { title: "Sistemas de gestão", description: "Painéis, fluxos, permissões, relatórios, integrações e auditoria." },
        problem: {
          title: "Processos manuais e informação dispersa",
          text: "Folhas de cálculo, emails e papel tornam o trabalho lento e difícil de controlar.",
          impact: ["Erros de introdução de dados", "Pouca visibilidade sobre o estado das operações", "Dificuldade em auditar quem fez o quê"],
        },
        approach: {
          title: "Como abordamos",
          text: "Mapeamos o processo real com quem o executa, simplificamos e só depois o transformamos em software.",
        },
        deliverables: {
          title: "Entregáveis típicos",
          items: ["Painéis", "Fluxos", "Permissões", "Relatórios", "Integrações", "Auditoria"],
        },
        process: {
          title: "Processo",
          steps: [
            { title: "Mapeamento", text: "Processo atual, papéis e dados." },
            { title: "Primeira versão", text: "O fluxo mais importante a funcionar." },
            { title: "Expansão", text: "Novos módulos, integrações e relatórios." },
          ],
          clientResponsibilities: {
            title: "O que precisamos de si",
            items: ["Acesso às pessoas que executam o processo", "Dados de exemplo", "Decisão sobre permissões e responsáveis"],
          },
        },
        faq: [{ q: "Podem integrar com o que já usamos?", a: "Sim, sempre que o sistema existente o permita. Avaliamos isso na fase de mapeamento." }],
        cta: { title: "Quer organizar a sua operação?", text: "Descreva o processo que mais tempo consome." },
      },
      "ai-automation": {
        name: "IA e automação",
        summary: "Menos trabalho repetitivo: documentos lidos, dados classificados e tarefas automatizadas.",
        seo: { title: "IA e automação", description: "OCR, extração de texto, classificação, assistentes, análise e automações." },
        problem: {
          title: "Trabalho repetitivo ou dados difíceis de processar",
          text: "Equipas que passam horas a copiar dados de documentos ou a classificar pedidos manualmente.",
          impact: ["Tempo gasto em tarefas de baixo valor", "Atrasos na resposta a clientes", "Erros difíceis de detetar"],
        },
        approach: {
          title: "Como abordamos",
          text: "Medimos a tarefa atual, testamos a automação com dados reais e mantemos uma pessoa no circuito onde o erro tiver custo. Nunca prometemos 100% de precisão.",
        },
        deliverables: {
          title: "Entregáveis típicos",
          items: ["OCR e extração de texto", "Classificação", "Assistentes", "Análise", "Automações"],
        },
        process: {
          title: "Processo",
          steps: [
            { title: "Prova de conceito", text: "Resultados medidos com os seus dados." },
            { title: "Integração", text: "Ligação aos sistemas e fluxos existentes." },
            { title: "Acompanhamento", text: "Monitorização da qualidade e melhorias." },
          ],
          clientResponsibilities: {
            title: "O que precisamos de si",
            items: ["Amostras de dados anonimizadas", "Critérios de qualidade aceitáveis", "Um responsável pela validação"],
          },
        },
        faq: [{ q: "Os nossos dados ficam protegidos?", a: "Definimos consigo onde os dados são processados e guardados antes de começar." }],
        cta: { title: "Que tarefa gostaria de automatizar?", text: "Explique-nos o volume e o formato dos dados." },
      },
      maintenance: {
        name: "Manutenção e evolução",
        summary: "Sistemas acompanhados, seguros e atualizados, com melhorias contínuas.",
        seo: { title: "Manutenção e evolução", description: "Monitorização, correções, melhorias, segurança e suporte." },
        problem: {
          title: "Sistemas sem acompanhamento ou atualização",
          text: "Software sem manutenção acumula falhas de segurança e fica cada vez mais caro de mudar.",
          impact: ["Falhas descobertas pelos clientes", "Dependências desatualizadas", "Ninguém responsável quando algo corre mal"],
        },
        approach: {
          title: "Como abordamos",
          text: "Começamos com uma avaliação do estado atual. Depois acordamos um plano de manutenção com tempos de resposta e prioridades claras.",
        },
        deliverables: { title: "Entregáveis típicos", items: ["Monitorização", "Correções", "Melhorias", "Segurança", "Suporte"] },
        process: {
          title: "Processo",
          steps: [
            { title: "Avaliação", text: "Código, alojamento, segurança e riscos." },
            { title: "Estabilização", text: "Correções urgentes e monitorização." },
            { title: "Evolução", text: "Melhorias planeadas por prioridade." },
          ],
          clientResponsibilities: {
            title: "O que precisamos de si",
            items: ["Acesso ao código e ao alojamento", "Histórico de problemas conhecidos", "Um contacto para prioridades"],
          },
        },
        faq: [{ q: "Mantêm sistemas que não foram feitos pela Servus?", a: "Sim, depois de uma avaliação inicial ao código e ao alojamento." }],
        cta: { title: "O seu sistema precisa de cuidados?", text: "Diga-nos o que está em produção e o que o preocupa." },
      },
    },
  },

  products: {
    seo: {
      title: "Produtos",
      description: "Produtos digitais da Servus: Trumuno Footy em produção; Audio Cleaner, MOAMBEIRA e RH em desenvolvimento.",
    },
    title: "Produtos Servus",
    intro:
      "Produtos que criamos e operamos. Cada um mantém a sua própria identidade. Os produtos em desenvolvimento ainda não estão disponíveis como serviço.",
    items: {
      "trumuno-footy": {
        name: "Trumuno Footy",
        valueProp: "Jogo gratuito de previsões de futebol com ligas, resultados e classificação.",
        seo: { title: "Trumuno Footy", description: "Preveja resultados, escolha marcadores e compita com amigos em ligas próprias. Gratuito, sem apostas." },
        heroTitle: "As suas previsões. A sua liga. A sua classificação.",
        description:
          "O Trumuno Footy é uma plataforma gratuita para fãs que querem prever resultados, escolher marcadores e competir com amigos ou comunidades em ligas próprias.",
        sections: [
          { title: "Como funciona", text: "Escolha uma liga, preveja os resultados, selecione um marcador por jornada e acompanhe a classificação." },
          { title: "Para quem", items: ["Fãs de futebol", "Grupos de amigos", "Empresas", "Comunidades", "Criadores de conteúdo"] },
          { title: "Diferencial", text: "Competição baseada em conhecimento futebolístico, sem apostas nem dinheiro em jogo." },
          { title: "Prova", text: "Competições reais, jornadas atualizadas e classificação por liga." },
        ],
        primaryLabel: "Visitar Trumuno Footy",
        secondaryLabel: "Contactar para parceria ou campanha",
      },
      "audio-cleaner": {
        name: "Audio Cleaner",
        valueProp: "Limpeza de ruído e preparação de áudio para criadores e profissionais.",
        seo: { title: "Audio Cleaner", description: "Limpeza de ruído e preparação de áudio e vídeo para publicação. Em desenvolvimento." },
        heroTitle: "Áudio limpo sem perder tempo",
        description:
          "O Audio Cleaner vai ajudar criadores e profissionais a reduzir ruído, equilibrar níveis e preparar ficheiros de áudio ou vídeo para publicação.",
        sections: [
          { title: "O problema", text: "Ruído, eco e níveis inconsistentes reduzem a qualidade de entrevistas, podcasts, vídeos e gravações." },
          { title: "A solução", text: "Carregar, processar, ouvir o resultado e descarregar o ficheiro preparado." },
          { title: "Para quem", items: ["Criadores", "Podcasters", "Jornalistas", "Equipas remotas", "Pequenos negócios"] },
          { title: "Funcionalidades", items: ["Limpeza automática", "Processamento em segundo plano", "Simulação de ambientes sonoros"] },
        ],
        notice: {
          title: "Expectativas realistas",
          text: "O Audio Cleaner vai reduzir significativamente o ruído, mas nenhuma ferramenta remove todo o ruído de todas as gravações.",
        },
        primaryLabel: "Quero saber mais",
      },
      moambeira: {
        name: "MOAMBEIRA",
        valueProp: "Marketplace que liga compradores a viajantes para o transporte acordado de produtos legais entre regiões.",
        seo: { title: "MOAMBEIRA", description: "Produtos locais entregues através de viagens reais. Em desenvolvimento." },
        heroTitle: "Produtos locais entregues através de viagens reais",
        description:
          "A MOAMBEIRA será um marketplace onde uma pessoa solicita um produto legal disponível noutra região e pode negociar a entrega com um viajante que se deslocará até ao destino.",
        sections: [],
        flow: {
          title: "Fluxo central",
          steps: [
            { title: "Pedido", text: "O comprador publica o pedido com produto, origem, destino e prazo." },
            { title: "Propostas", text: "Viajantes elegíveis apresentam disponibilidade e proposta." },
            { title: "Acordo", text: "As partes acordam preço, detalhes e condições." },
            { title: "Pagamento", text: "O comprador efetua o pagamento pela plataforma." },
            { title: "Entrega", text: "A entrega é confirmada e a plataforma aplica a comissão prevista." },
          ],
        },
        notice: {
          title: "Confiança e conformidade",
          text: "As regras sobre produtos proibidos, alfândega, declarações, identidade, pagamentos, cancelamentos, disputas e responsabilidade serão publicadas e validadas juridicamente antes do lançamento em cada mercado.",
        },
        primaryLabel: "Entrar na lista de interesse",
        secondaryLabel: "Propor parceria logística",
      },
      rh: {
        name: "RH",
        valueProp: "Plataforma para automatizar tarefas de recursos humanos, incluindo OCR e funcionalidades de IA.",
        seo: { title: "RH", description: "Operações de recursos humanos com menos trabalho manual. Em desenvolvimento." },
        heroTitle: "Operações de recursos humanos com menos trabalho manual",
        description:
          "RH será uma plataforma licenciada para empresas, com módulos que automatizam processos de recursos humanos e organizam a informação num único sistema.",
        sections: [
          { title: "Colaboradores", text: "Perfis, documentos, contratos, histórico e permissões." },
          { title: "Presenças e horários", text: "Registo, validação, turnos, ausências e relatórios." },
          { title: "Recrutamento", text: "Candidaturas, documentos, triagem e acompanhamento." },
          { title: "Documentos e OCR", text: "Conversão de imagem para texto, extração de campos e arquivo pesquisável." },
          { title: "Fluxos e aprovações", text: "Pedidos, validações, notificações e auditoria." },
          { title: "Relatórios", text: "Indicadores, exportações e visão por unidade ou empresa." },
        ],
        notice: {
          title: "Pensado para o contexto local",
          text: "Implementação, formação, suporte, alojamento e proteção de dados adaptados a cada mercado, incluindo cenários de conectividade limitada.",
        },
        primaryLabel: "Solicitar demonstração futura",
      },
    },
  },

  work: {
    seo: {
      title: "Trabalhos",
      description: "Projetos desenvolvidos ou geridos pela Servus para parceiros: IBEX, Fenix Academy e Urolundo.",
    },
    title: "Soluções para os nossos parceiros",
    intro:
      "Experiência da Servus em projetos de outras organizações. Os negócios pertencem aos parceiros; cada caso indica o desafio e a nossa contribuição.",
    labels: {
      context: "Contexto do parceiro",
      challenge: "Problema ou oportunidade",
      responsibility: "Responsabilidade da Servus",
      solution: "Solução implementada",
      status: "Estado atual",
      outcome: "Resultado ou próximo passo",
    },
    cta: { title: "Tem um projeto semelhante?", text: "Fale connosco sobre o seu contexto." },
    items: {
      ibex: {
        partner: "IBEX",
        context: "Clube de hip hop em Roppongi, Tóquio.",
        seo: { title: "IBEX — Trabalho Servus", description: "Presença digital para um clube de hip hop em Roppongi, Tóquio." },
        challenge: "A confirmar com o parceiro.",
        responsibility: "Website, conteúdo, calendário, reservas ou gestão digital, conforme o âmbito aprovado.",
        solution: "A detalhar após aprovação do parceiro.",
        status: "A confirmar.",
        outcome: "A publicar com autorização do parceiro.",
      },
      "fenix-academy": {
        partner: "Fenix Academy",
        context: "Academia com cursos certificados em Angola.",
        seo: { title: "Fenix Academy — Trabalho Servus", description: "Plataforma institucional e catálogo de cursos para uma academia em Angola." },
        challenge: "A confirmar com o parceiro.",
        responsibility: "Plataforma institucional, catálogo de cursos, inscrições e gestão digital, conforme o âmbito aprovado.",
        solution: "A detalhar após aprovação do parceiro.",
        status: "A confirmar.",
        outcome: "A publicar com autorização do parceiro.",
      },
      urolundo: {
        partner: "Urolundo",
        context: "Clínica de urologia em Angola.",
        seo: {
          title: "Urolundo — Trabalho Servus",
          description: "Plataforma de gestão clínica para uma clínica de urologia em Angola.",
        },
        challenge: "Organizar horários, operações clínicas e o acompanhamento de atividades de pacientes e médicos.",
        responsibility:
          "Plataforma de gestão clínica que organiza agendas, atividades de médicos e acompanhamento operacional dos pacientes.",
        scope: ["Agendamentos", "Gestão de médicos", "Acompanhamento de pacientes"],
        solution: "A detalhar após aprovação do parceiro. Nenhum dado de pacientes é publicado.",
        status: "A confirmar.",
        outcome: "A publicar com autorização do parceiro.",
      },
    },
  },

  partnerships: {
    seo: {
      title: "Parcerias",
      description: "Modelos de colaboração com a Servus: desenvolvimento, produto conjunto, distribuição, integração e campanhas.",
    },
    title: "Vamos construir a oportunidade certa em conjunto",
    intro:
      "Colaboramos com empresas que trazem tecnologia, distribuição, conhecimento de mercado, investimento, conteúdo ou acesso a uma comunidade. Escolha o modelo mais próximo da sua ideia.",
    modelsTitle: "Modelos de colaboração",
    labels: { example: "Exemplo", nextAction: "Próxima ação" },
    models: [
      { name: "Desenvolvimento para parceiro", example: "Website, aplicação ou sistema de gestão.", nextAction: "Pedido de reunião" },
      { name: "Produto conjunto", example: "Solução criada com conhecimento ou acesso do parceiro.", nextAction: "Proposta de parceria" },
      { name: "Distribuição e vendas", example: "Parceiro comercializa um produto Servus num mercado.", nextAction: "Conversa comercial" },
      { name: "Integração tecnológica", example: "Serviço externo integrado num produto ou projeto.", nextAction: "Avaliação técnica" },
      { name: "Campanha ou comunidade", example: "Ações com Trumuno Footy, eventos ou criadores.", nextAction: "Briefing de campanha" },
    ],
    formTitle: "Propor uma parceria",
  },

  contact: {
    seo: { title: "Contactos", description: "Peça um serviço, proponha uma parceria, solicite uma demonstração ou fale connosco." },
    title: "Fale com a Servus",
    intro: "Escolha o tipo de pedido para chegar diretamente à pessoa certa.",
    directTitle: "Prefere email?",
    directText: "Escreva-nos para",
    practices: [
      "Confirmamos a receção imediatamente, com uma referência.",
      "Não pedimos documentos nem dados sensíveis no primeiro contacto.",
      "Usamos os seus dados apenas para responder ao pedido.",
    ],
  },

  privacy: {
    seo: { title: "Política de privacidade", description: "Como a Servus trata os dados enviados através deste website." },
    title: "Política de privacidade",
    body: [
      "Este texto é provisório e será substituído pela política aprovada pelo departamento jurídico antes do lançamento.",
      "Os dados enviados através dos formulários são usados apenas para responder ao pedido e são encaminhados para a equipa responsável.",
      "Não pedimos documentos nem dados sensíveis no primeiro contacto. Pode pedir o acesso, a correção ou a eliminação dos seus dados através do contacto geral.",
    ],
  },
};

export default pt;
