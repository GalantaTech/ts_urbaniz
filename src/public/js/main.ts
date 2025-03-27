import { settings } from './particles-config';

// Declaração para o particlesJS como propriedade global
declare global {
  interface Window {
    particlesJS: (id: string, config: any) => void;
  }
}

/**
 * Classe para criar efeito de digitação
 */
class TypeWriter {
  element: HTMLElement | null;
  words: string[];
  wait: number;
  txt: string = '';
  wordIndex: number = 0;
  isDeleting: boolean = false;
  
  constructor(selector: string, words: string[] = ['Soluções urbanas inovadoras para um futuro sustentável'], wait: number = 3000) {
    this.element = document.getElementById(selector);
    this.words = words;
    this.wait = wait;
    
    if (this.element) {
      this.type();
    } else {
      console.warn(`Elemento com ID "${selector}" não encontrado para efeito de digitação`);
    }
  }
  
  type() {
    if (!this.element) {
      console.warn('Elemento para TypeWriter não encontrado');
      return;
    }
    
    // Palavra atual
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];
    
    // Verifica se está em modo de exclusão
    if (this.isDeleting) {
      // Remove caracteres
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Adiciona caracteres
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    
    // Insere o texto no elemento
    this.element.innerHTML = this.txt;
    
    // Velocidade inicial para digitar
    let typeSpeed = 100;
    
    if (this.isDeleting) {
      // Mais rápido quando deleta
      typeSpeed /= 2;
    }
    
    // Se a palavra está completa
    if (!this.isDeleting && this.txt === fullTxt) {
      // Fazer uma pausa no final
      typeSpeed = this.wait;
      // Definir excluir para true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // Mover para a próxima palavra
      this.wordIndex++;
      // Pequena pausa antes de começar a digitar
      typeSpeed = 500;
    }
    
    setTimeout(() => this.type(), typeSpeed);
  }
}

/**
 * Função para lidar com o scroll da barra de navegação
 */
function handleNavbarScroll() {
  const navbar = document.getElementById('navbar');
  
  if (!navbar) {
    console.warn('Elemento navbar não encontrado');
    return;
  }
  
  const scrollTop = window.scrollY;
  
  if (scrollTop > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

/**
 * Função para alternar menu móvel
 */
function toggleMobileMenu() {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (!navToggle || !navLinks) {
    console.warn('Elementos de navegação móvel não encontrados');
    return;
  }
  
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animação para o botão de menu
    const spans = navToggle.querySelectorAll('span');
    spans.forEach(span => span.classList.toggle('active'));
  });
}

/**
 * Função para inicializar particles.js
 */
function initParticles() {
  if (typeof window.particlesJS === 'function') {
    try {
      window.particlesJS('particles-js', settings);
    } catch (error) {
      console.error('Erro ao inicializar particles.js:', error);
    }
  } else {
    console.warn('particlesJS não está disponível. Verifique se a biblioteca foi carregada.');
  }
}

/**
 * Função para esconder o preloader
 */
function hidePreloader() {
  const preloader = document.getElementById('preloader');
  
  if (!preloader) {
    console.warn('Preloader não encontrado');
    return;
  }
  
  setTimeout(() => {
    preloader.classList.add('hidden');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }, 1500);
}

/**
 * Função para suavizar scrolling para links internos
 */
function smoothScrolling() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const href = this.getAttribute('href');
      if (!href) return;
      
      // Destacar link ativo
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      
      // Scroll para a seção
      const targetElement = document.querySelector(href) as HTMLElement;
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
        
        // Fechar menu móvel se aberto
        const navLinks = document.getElementById('navLinks');
        if (navLinks?.classList.contains('active')) {
          navLinks.classList.remove('active');
          
          // Resetar animação do botão
          const navToggle = document.getElementById('navToggle');
          const spans = navToggle?.querySelectorAll('span');
          spans?.forEach(span => span.classList.remove('active'));
        }
      }
    });
  });
}

/**
 * Função para destacar a seção atual no scroll
 */
function highlightCurrentSection() {
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionElement = section as HTMLElement;
      const sectionTop = sectionElement.offsetTop;
      const sectionHeight = sectionElement.clientHeight;
      
      if (window.scrollY >= sectionTop - 200) {
        current = sectionElement.getAttribute('id') || '';
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && href.includes(current)) {
        link.classList.add('active');
      }
    });
  });
}

/**
 * Inicialização quando o DOM estiver carregado
 */
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar efeito de digitação
  new TypeWriter('typing-text');
  
  // Inicializar particles.js
  initParticles();
  
  // Configurar comportamento da navbar no scroll
  window.addEventListener('scroll', handleNavbarScroll);
  
  // Configurar menu móvel
  toggleMobileMenu();
  
  // Configurar navegação suave
  smoothScrolling();
  
  // Destacar seção atual
  highlightCurrentSection();
  
  // Esconder preloader quando a página carregar completamente
  window.addEventListener('load', hidePreloader);
  
  // Fallback para esconder o preloader se o evento load não disparar
  setTimeout(hidePreloader, 3000);
});