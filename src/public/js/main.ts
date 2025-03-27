// TypeWriter Class
class TypeWriter {
  element: HTMLElement;
  words: string[];
  txt: string;
  wordIndex: number;
  wait: number;
  isDeleting: boolean;

  constructor(element: HTMLElement, words: string[], wait: number = 3000) {
    this.element = element;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait.toString(), 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Verificar se o elemento existe antes de continuar
    if (!this.element) {
      console.warn('TypeWriter: elemento não encontrado');
      return;
    }

    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.element.innerHTML = `<span class="txt">${this.txt}</span>`;

    let typeSpeed = 100;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Animação de elementos ao rolar
const animateOnScroll = (): void => {
  const elements = document.querySelectorAll('.animate-on-scroll');

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight * 0.8) {
      element.classList.add('visible');
    }
  });
};

// Navbar transparente/sólida ao rolar
const handleNavbarScroll = (): void => {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
};

// Animação de números (contagem progressiva)
const animateNumbers = (): void => {
  const numberElements = document.querySelectorAll('.number-counter');

  numberElements.forEach((element) => {
    const target = parseInt(element.getAttribute('data-target') || '0');
    const duration = 2000; // 2 segundos
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateNumber = (): void => {
      current += increment;
      if (current < target) {
        element.textContent = Math.round(current).toString();
        requestAnimationFrame(updateNumber);
      } else {
        element.textContent = target.toString();
      }
    };

    updateNumber();
  });
};

// Animação de barras de progresso
const animateProgressBars = (): void => {
  const progressBars = document.querySelectorAll<HTMLElement>('.progress-bar');

  progressBars.forEach((bar) => {
    const progress = bar.getAttribute('data-progress') || '0';
    bar.style.setProperty('--progress', `${progress}%`);
  });
};

// Parallax suave
const parallax = (): void => {
  const elements = document.querySelectorAll<HTMLElement>('.parallax');

  elements.forEach((element) => {
    const speed = parseFloat(element.getAttribute('data-speed') || '0.5');
    const yPos = -(window.scrollY * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
};

// Preloader
const handlePreloader = (): void => {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hidden');
      // Remover completamente após a transição
      setTimeout(() => {
        preloader.remove();
      }, 500);
    }, 1500);
  }
};

// Carrossel de processo
const handleProcessCarousel = (): void => {
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const slides = document.querySelectorAll('.process-slide');
  const indicators = document.querySelectorAll('.carousel-indicator');
  
  if (!slides.length || !indicators.length) return;
  
  let currentSlide = 0;
  
  const goToSlide = (index: number): void => {
    // Remover classe ativa de todos os slides e indicadores
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Adicionar classe ativa ao slide atual e indicador
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    
    currentSlide = index;
  };
  
  // Event listeners para os botões
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const newIndex = currentSlide <= 0 ? slides.length - 1 : currentSlide - 1;
      goToSlide(newIndex);
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const newIndex = currentSlide >= slides.length - 1 ? 0 : currentSlide + 1;
      goToSlide(newIndex);
    });
  }
  
  // Event listeners para os indicadores
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      goToSlide(index);
    });
  });
};

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar o preloader
  handlePreloader();
  
  // Inicializar o efeito de digitação
  const typeWriterElement = document.querySelector('.type-writer');
  if (typeWriterElement instanceof HTMLElement) {
    try {
      new TypeWriter(typeWriterElement, [
        'Construção do Futuro',
        'Inovação Sustentável',
        'Tecnologia Avançada'
      ], 3000);
    } catch (e) {
      console.error('Erro ao inicializar o TypeWriter:', e);
    }
  }
  
  // Rolagem suave para links de navegação
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(this: HTMLAnchorElement, e: Event) {
      e.preventDefault();
      const href = this.getAttribute('href') || '';
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - 70,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Inicializar o carrossel
  handleProcessCarousel();
  
  // Efeito de hover nos cards
  const cards = document.querySelectorAll<HTMLElement>('.benefit-card, .material-card, .tech-feature');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });
  });
  
  // Inicializar animações
  animateOnScroll();
  animateNumbers();
  animateProgressBars();
  
  // Formulário de Newsletter
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput instanceof HTMLInputElement) {
        const email = emailInput.value;
        
        // Aqui você pode adicionar a lógica para enviar o email para seu backend
        console.log('Email cadastrado:', email);
        
        // Feedback visual
        const button = newsletterForm.querySelector('button');
        if (button instanceof HTMLButtonElement) {
          const originalText = button.textContent;
          button.textContent = 'Enviado!';
          button.disabled = true;
          
          setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            if (emailInput) emailInput.value = '';
          }, 3000);
        }
      }
    });
  }
  
  // Formulário de Contato
  const contactForm = document.querySelector('.contact-form');
  if (contactForm instanceof HTMLFormElement) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Aqui você pode adicionar a lógica para enviar os dados do formulário
      console.log('Formulário enviado');
      
      // Feedback visual
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn instanceof HTMLButtonElement) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Mensagem Enviada!';
        submitBtn.classList.add('success');
        submitBtn.disabled = true;
        
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.classList.remove('success');
          submitBtn.disabled = false;
          contactForm.reset();
        }, 3000);
      }
    });
  }
});

// Event Listeners
window.addEventListener('scroll', () => {
  handleNavbarScroll();
  animateOnScroll();
  parallax();
});

window.addEventListener('load', () => {
  animateOnScroll();
});