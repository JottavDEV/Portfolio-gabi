document.addEventListener('DOMContentLoaded', () => {
  const janelaBoasVindas = document.getElementById('janela-boas-vindas');
  const botaoFecharBoasVindas = document.getElementById('botao-fechar-boas-vindas');

  const painelAvaliacao = document.getElementById('painel-avaliacao');
  const botaoEstrelaAvaliacao = document.getElementById('botao-estrela-avaliacao');
  const conteudoAvaliacao = document.getElementById('conteudo-avaliacao');
  const botaoMinimizarAvaliacao = document.getElementById('botao-minimizar-avaliacao');
  const mensagemAvaliacao = document.getElementById('mensagem-avaliacao');
  const estrelas = document.querySelectorAll('.estrela');
  const rodape = document.querySelector('.rodape');

  const botaoMenu = document.querySelector('.botao-menu');
  const linksMenu = document.querySelector('.links-menu');

  let notaSelecionada = 0;
  let avaliacaoJaAbriuPorScroll = false;

  // 1. Boas-vindas aparecem primeiro
  setTimeout(() => {
    janelaBoasVindas.classList.remove('escondido');
    document.body.style.overflow = 'hidden';
  }, 500);

  function fecharBoasVindas() {
    janelaBoasVindas.classList.add('escondido');
    document.body.style.overflow = '';
    painelAvaliacao.classList.remove('escondido');
  }

  function abrirAvaliacao() {
    painelAvaliacao.classList.add('aberto');
    painelAvaliacao.classList.remove('minimizado');
    conteudoAvaliacao.classList.remove('escondido');
  }

  function minimizarAvaliacao() {
    painelAvaliacao.classList.remove('aberto');
    painelAvaliacao.classList.add('minimizado');
    conteudoAvaliacao.classList.add('escondido');
  }

  botaoFecharBoasVindas.addEventListener('click', fecharBoasVindas);
  janelaBoasVindas.querySelector('.fundo-janela').addEventListener('click', fecharBoasVindas);

  // Avaliação: abre ao clicar na estrela
  botaoEstrelaAvaliacao.addEventListener('click', () => {
    if (painelAvaliacao.classList.contains('aberto')) {
      minimizarAvaliacao();
    } else {
      abrirAvaliacao();
    }
  });

  botaoMinimizarAvaliacao.addEventListener('click', minimizarAvaliacao);

  // 3. Avaliação: abre ao chegar ao final da página
  const observadorRodape = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting && !avaliacaoJaAbriuPorScroll && !painelAvaliacao.classList.contains('escondido')) {
          avaliacaoJaAbriuPorScroll = true;
          abrirAvaliacao();
        }
      });
    },
    { threshold: 0.5 }
  );

  if (rodape) {
    observadorRodape.observe(rodape);
  }

  // Estrelas de 1 a 5
  estrelas.forEach((estrela) => {
    estrela.addEventListener('mouseenter', () => destacarEstrelas(parseInt(estrela.dataset.nota, 10)));
    estrela.addEventListener('mouseleave', () => destacarEstrelas(notaSelecionada));

    estrela.addEventListener('click', () => {
      notaSelecionada = parseInt(estrela.dataset.nota, 10);
      destacarEstrelas(notaSelecionada);

      const mensagens = {
        1: 'Obrigada pelo feedback! Vou melhorar. 💪',
        2: 'Obrigada! Cada sugestão me ajuda a crescer.',
        3: 'Legal! Obrigada por avaliar. 😊',
        4: 'Que bom que gostou! Muito obrigada! 🌸',
        5: 'Uau, 5 estrelas! Você fez meu dia! ⭐✨',
      };

      mensagemAvaliacao.textContent = mensagens[notaSelecionada];
    });
  });

  function destacarEstrelas(quantidade) {
    estrelas.forEach((estrela) => {
      const nota = parseInt(estrela.dataset.nota, 10);
      estrela.classList.toggle('ativo', nota <= quantidade);
    });
  }

  // Menu no celular
  botaoMenu.addEventListener('click', () => {
    const menuAberto = linksMenu.classList.toggle('aberto');
    botaoMenu.setAttribute('aria-expanded', menuAberto);
  });

  linksMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => linksMenu.classList.remove('aberto'));
  });

  // Animação das barras de progresso ao rolar a página
  const barrasPreenchidas = document.querySelectorAll('.barra-preenchida');
  const observadorBarras = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          const largura = entrada.target.style.width;
          entrada.target.style.width = '0';
          requestAnimationFrame(() => {
            entrada.target.style.width = largura;
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  barrasPreenchidas.forEach((barra) => observadorBarras.observe(barra));
});
