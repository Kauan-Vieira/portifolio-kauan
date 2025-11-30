document.addEventListener('DOMContentLoaded', () => {

    // 1. MENU MOBILE (HAMBÚRGUER)
    const menuIcon = document.querySelector('.menu-mobile-icon');
    const menuLista = document.querySelector('.menu-lista');
    const menuLinks = document.querySelectorAll('.menu-lista a');

    // Função para alternar o menu
    menuIcon.addEventListener('click', () => {
        // Alterna a classe 'ativo' definida no CSS
        menuLista.classList.toggle('ativo');

        // Acessibilidade: atualiza o ícone 
        if (menuLista.classList.contains('ativo')) {
            menuIcon.textContent = '✖'; // Vira um X
        } else {
            menuIcon.textContent = '☰'; // Volta a ser hambúrguer
        }
    });

    // UX: Fechar o menu automaticamente ao clicar em um link
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuLista.classList.remove('ativo');
            menuIcon.textContent = '☰';
        });
    });

    // 2. TEMA CLARO / ESCURO (COM MEMÓRIA)
    const btnTema = document.getElementById('btn-tema');
    const body = document.body;

    // Verifica se o usuário já tinha escolhido um tema antes
    const temaSalvo = localStorage.getItem('temaPreferido');

    // Se tinha salvo 'dark', aplica imediatamente
    if (temaSalvo === 'dark') {
        body.classList.add('dark-mode');
        btnTema.textContent = '☀️';
    }

    btnTema.addEventListener('click', () => {
        // Alterna a classe no body
        body.classList.toggle('dark-mode');

        // Verifica qual estado ficou ativo para salvar e mudar o ícone
        const isDark = body.classList.contains('dark-mode');

        if (isDark) {
            btnTema.textContent = '☀️';
            localStorage.setItem('temaPreferido', 'dark'); // Salva na memória do navegador
        } else {
            btnTema.textContent = '🌙';
            localStorage.setItem('temaPreferido', 'light');
        }
    });

    // 3. VALIDAÇÃO DE FORMULÁRIO E ENVIO
    const form = document.getElementById('form-contato');

    form.addEventListener('submit', (event) => {
        // Impede o comportamento padrão de recarregar a página
        event.preventDefault();

        // Captura os valores dos campos removendo espaços em branco nas pontas
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();

        // Validação 1: Campos Vazios [cite: 58]
        if (!nome || !email || !mensagem) {
            alert('Erro: Por favor, preencha todos os campos obrigatórios.');
            return; // Para a execução aqui
        }

        // Validação 2: Formato de E-mail (Regex) 
        // Expressão regular padrão para validar e-mails
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            alert('Erro: Por favor, insira um endereço de e-mail válido (ex: nome@dominio.com).');
            return;
        }

        // Se passou por tudo, simula o envio [cite: 60]
        console.log('Dados prontos para envio:', { nome, email, mensagem });

        // Feedback visual para o usuário
        alert(`Sucesso! Obrigado, ${nome}. Sua mensagem foi enviada.`);

        // Limpa o formulário
        form.reset();
    });

});