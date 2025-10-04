document.addEventListener('DOMContentLoaded', () => {
    // Lógica do formulário de contato
    const FORMSPREE_CONTACT_URL = 'https://formspree.io/f/xanpenpj'; // link para enviar o formulário atraves do formspree
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Cria o objeto FormData com os dados do formulário
    const formData = new FormData(contactForm);

    formMessage.textContent = 'Enviando...';
    formMessage.style.color = '#333'; 

    try {
        const response = await fetch(FORMSPREE_CONTACT_URL, {
            method: 'POST',
            body: formData, // Envia o FormData diretamente (melhor para Formspree)
            headers: {
                // Não precisamos de Content-Type: application/json quando usamos FormData
                'Accept': 'application/json' 
            }
        });

        if (response.ok) {
            formMessage.textContent = 'Mensagem enviada com sucesso! Em breve entrarei em contato.';
            formMessage.style.color = '#4CAF50';
            contactForm.reset();
        } else {
            // Tenta obter a mensagem de erro do Formspree
            const data = await response.json();
            formMessage.textContent = data.error || 'Falha ao enviar. Tente novamente.';
            formMessage.style.color = '#ff6347';
        }
    } catch (error) {
        formMessage.textContent = 'Erro de rede. Verifique sua conexão.';
        formMessage.style.color = '#ff6347';
        console.error('Fetch Error:', error);
    }
});

    // LÓGICA DE ANIMAÇÃO DE ENTRADA
    const fadeInSections = document.querySelectorAll('.fade-in-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.2 // A animação será ativada quando 20% da seção estiver visível
    });

    fadeInSections.forEach(section => {
        observer.observe(section);
    });


    // Lógica do menu hambúrguer
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mainNav = document.querySelector('.main-nav');

    hamburgerMenu.addEventListener('click', () => {
        mainNav.classList.toggle('open');
    });

    // NOVA LÓGICA: ATIVAR MENU NA SEÇÃO CORRETA
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.main-nav a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });
        
        if (current === 'contato' && (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
            current = 'contato';
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

     // LÓGICA DO MODAL
    const modal = document.getElementById('service-modal');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    const serviceBtns = document.querySelectorAll('.service-btn');

    const serviceDetails = {
    // -------------------------------------------------------------------
    // SERVIÇO 1: GALERIA INTERATIVA (Novo Serviço)
    // -------------------------------------------------------------------
    1: {
        title: "Pacotes de Galeria Interativa para Eventos",
        description: "Solução Full-Stack para coletar fotos e vídeos dos convidados em tempo real, eliminando a dependência de aplicativos e redes sociais. Serviço Único no mercado.",
        packages: [
            { 
                name: "Pacote Entrada ($ )", 
                price: "Site simples com 1 pagina com identificação dos noivos, local e data do casamento, card qr code..", 
                details: "Botão/link para envio de fotos/vídeos(grupo de whatsaap ou google, drive) -30 dias." 
            },
            { 
                name: "Pacote Intermediário ($ )", 
                price: "Melhor experiência de usuário. 15 GB de Armazenamento / 60 Dias de serviço..", 
                details: "Inclui a Galeria e Paginação, mais Carrossel/Lightbox e Design Personalizado (cores e fontes). Card qr code." 
            },
            { 
                name: "Pacote Premium ($ )", 
                price: "25 GB de Armazenamento / 90 Dias de serviço..", 
                details: "Todos os recursos do plano intermediário, mas Site exclusivo com design 100% personalizado. convite digital +card qr code, ais Backup Offline de todas as mídias." 
            }
        ]
    },
    // -------------------------------------------------------------------
    // SERVIÇO 2: LANDING PAGES PROFISSIONAIS
    // -------------------------------------------------------------------
    2: {
        title: "Pacotes de Landing Pages de Alta Conversão",
        description: "Criação de páginas focadas em performance e Retorno Sobre Investimento (ROI), garantindo que seu projeto digital alcance o público certo.",
        packages: [
            { 
                name: "Pacote Entrada (Quick Launch - $ )", 
                price: "Foco em Captação de Leads.Template Otimizado / 1 Seção (Hero, CTA).", 
                details: "Responsivo, Formulário de Contato básico. Foco em velocidade." 
            },
            { 
                name: "Pacote Intermediário ($ )", 
                price: "Foco em Otimização e Remarketing.Design 100% Customizado / Até 4 Seções (Depoimentos, Vantagens).", 
                details: "Design Customizado, SEO Básico e Integração com Pixel (Google/Facebook Ads)." 
            },
            { 
                name: "Pacote Premium ($ )", 
                price: "Design Customizado com Animações e Páginas de Agradecimento.", 
                details: "SEO Avançado, Otimização Máxima e Integração com E-mail Marketing (Mailchimp/ActiveCampaign) e Pagamento." 
            }
        ]
    },
    // -------------------------------------------------------------------
    // SERVIÇO 3: SITES INSTITUCIONAIS E PORTFÓLIOS
    // -------------------------------------------------------------------
    3: {
        title: "Pacotes de Sites Institucionais e Portfólios",
        description: "Desenvolvimento de sites profissionais para pequenas empresas e freelancers. Construa credibilidade e expanda sua presença digital.",
        packages: [
            { 
                name: "Pacote Entrada ($ )", 
                price: "Presença Digital Imediata.", 
                details: "1 Página (Cartão de Visitas Digital) com Formulário de Contato." 
            },
            { 
                name: "Pacote Intermediário ($ )", 
                price: "Atração e Expansão.SEO Básico, Treinamento de Uso e 30 dias de suporte.", 
                details: "Até 5 Páginas (Serviços, Sobre, Contato..) com Galeria de Projetos e Chat Widget(WhatsApp/Live Chat)." 
            },
            { 
                name: "Pacote Premium ($ )", 
                price: "Autonomia e Otimização Total.SEO Avançado, Painel de Administração Simples (para editar textos) e 3 Meses de Suporte e Manutenção Proativa.", 
                details: "Ilimitadas (Com Blog e Suporte a E-commerce)." 
            }
        ]
    }
};


    function openModal(serviceId) {
        const details = serviceDetails[serviceId];
        if (!details) return;

        document.getElementById('modal-title').textContent = details.title;
        document.getElementById('modal-description').textContent = details.description;

        const packagesContainer = document.getElementById('modal-packages');
        packagesContainer.innerHTML = '<h4>Pacotes e Detalhes</h4><ul class="package-list">' + 
    details.packages.map(p => `
        <li>
            <strong>${p.name}</strong> 
            <p class="package-price">${p.price}</p>
            <p class="package-details">${p.details}</p>
        </li>
    `).join('') +
    '</ul>';
        
        modal.classList.add('is-visible');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('is-visible');
        document.body.style.overflow = '';
    }

    serviceBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const serviceId = btn.getAttribute('data-service-id');
            openModal(serviceId);
        });
    });

    modalCloseBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});