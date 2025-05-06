
document.addEventListener("DOMContentLoaded", () => {
    // Initialize ScrollTrigger
  ScrollTrigger.config({
    // Improve performance by reducing refresh rate
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    // Prevent scroll jank
    ignoreMobileResize: true
  });
    gsap.registerPlugin(ScrollTrigger)



    // Animações existentes
    gsap.from("#menu", {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    })

  

    // Dados dos projetos
    const projects = [
    {
        id: 1,
        title: "Elden ring repository",
        description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus aliquam accusamus ex, labore sapiente eveniet quasi laboriosam? Architecto, voluptatum, voluptas ad ullam necessitatibus similique, ipsum consectetur alias tempora dolorum ex?",
        image: "/source/elden ring repository.png",
    },
    {
        id: 2,
        title: "Travel",
        description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus aliquam accusamus ex, labore sapiente eveniet quasi laboriosam? Architecto, voluptatum, voluptas ad ullam necessitatibus similique, ipsum consectetur alias tempora dolorum ex?",
        image: "/source/travel.png",
    },
    {
        id: 3,
        title: "SeiorMente",
        description:
        "Um site de comércio eletrônico completo com sistema de pagamento integrado e gerenciamento de produtos.",
        image: "/source/seniormente.png", // Substitua pela imagem real
    },
    {
        id: 4,
        title: "Blog Pessoal",
        description:
        "Blog com sistema de gerenciamento de conteúdo personalizado e design responsivo para compartilhar ideias e projetos.",
        image: "/source/adote.png", // Substitua pela imagem real
    },
    {
        id: 5,
        title: "Blog Pessoal",
        description:
        "Blog com sistema de gerenciamento de conteúdo personalizado e design responsivo para compartilhar ideias e projetos.",
        image: "/source/lydiastyles.png", // Substitua pela imagem real
    },
    {
        id: 6,
        title: "Blog Pessoal",
        description:
        "Blog com sistema de gerenciamento de conteúdo personalizado e design responsivo para compartilhar ideias e projetos.",
        image: "/source/curso.png", // Substitua pela imagem real
    },
    ]

    // Elementos DOM para o slider
    let projectImagesContainer
    let projectTitle
    let projectDescription

    // Função para criar os cartões do slider
    function createProjectCards() {
        // Limpa o container do slider
        projectSlider.innerHTML = ""
    
        // Cria um cartão para cada projeto
        projects.forEach((project, index) => {
        const card = document.createElement("div")
        card.classList.add("project-card")
        card.dataset.index = index
    
        // Define a posição e estilo do cartão com base no índice
        if (index === 0) {
            // Cartão ativo (em foco)
            card.style.transform = "translateY(0) scale(1)"
            card.style.zIndex = projects.length
            card.style.opacity = 1
        } else {
            // Cartões em segundo plano (empilhados acima)
            const offset = -20 * index
            card.style.transform = `translateY(${offset}px) scale(${1 - index * 0.04})`
            card.style.zIndex = projects.length - index
            card.style.opacity = 1 - index * 0.2
        }
    
        // Adiciona a imagem ao cartão
        const img = document.createElement("img")
        img.src = project.image
        card.appendChild(img)
    
        // Adiciona o título ao cartão
        // const titleElement = document.createElement("div")
        //titleElement.classList.add("project-card-title")
        //titleElement.textContent = project.title
        //card.appendChild(titleElement)
    
        // Adiciona evento de clique
        card.addEventListener("click", () => {
            rotateProjects()
        })
    
        // Adiciona o cartão ao slider
        projectSlider.appendChild(card)
        })
    
        // Atualiza o conteúdo de informações
        updateProjectInfo()
    }
    
    // Função para rotacionar os projetos
    function rotateProjects() {
        // Obtém todos os cartões
        const cards = document.querySelectorAll(".project-card")
    
        // Anima a saída do primeiro cartão
        gsap.to(cards[0], {
        y: "100%",
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
            // Move o primeiro projeto para o final do array
            const firstProject = projects.shift()
            projects.push(firstProject)
    
            // Recria os cartões
            createProjectCards()
    
            // Anima a entrada dos novos cartões
            const newCards = document.querySelectorAll(".project-card")
            gsap.fromTo(
            newCards,
            { y: "-30%", opacity: 1 },
            {
                y: (i) => (i === 0 ? "0%" : `-${20 * i}px`),
                opacity: (i) => 1.2 - i * 0.2,
                scale: (i) => 1 - i * 0.05,
                duration: 0.4,
                stagger: 0.1,
                ease: "power3.inOut",
            },
            )
        },
        })
    
        // Anima os outros cartões
        gsap.to(cards, {
        y: (i) => (i === 0 ? "100%" : `-${20 * (i - 1)}px`),
        scale: (i) => (i === 0 ? 0.8 : 1 - (i - 1) * 0.05),
        opacity: (i) => (i === 0 ? 0 : 1 - (i - 1) * 0.2),
        zIndex: (i) => (i === 0 ? 1 : projects.length - (i - 1)),
        duration: 0.5,
        ease: "power2.inOut",
        })
    }
    
    // Função para atualizar as informações do projeto
    function updateProjectInfo() {
        const currentProject = projects[0]
    
        // Anima a atualização do título e descrição
        gsap.fromTo(
        [projectTitle, projectDescription],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        )
    
        projectTitle.textContent = currentProject.title
        projectDescription.textContent = currentProject.description
    }
    
    // Inicializa o slider quando o DOM estiver carregado
    
        // Inicializa as referências aos elementos DOM
        projectSlider = document.querySelector(".project-slider")
        projectTitle = document.getElementById("project-title")
        projectDescription = document.getElementById("project-description")
    
        // Verifica se os elementos existem antes de inicializar
        if (projectSlider && projectTitle && projectDescription) {
        createProjectCards()
    
        // Animação para a seção de projetos
        gsap.from(".projects", {
            opacity: 0,
            y: 90,
            duration: 2,
            scrollTrigger: {
            trigger: ".work",
            start: "top 60%",
            end: "bottom 40%",
            toggleActions: "play none none none",
            },
        })
        } else {
        console.error("Elementos do slider não encontrados no DOM")
        }
  })
  
