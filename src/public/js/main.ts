import { settings } from './particles-config';

// Declaração para o particlesJS como propriedade global
declare global {
  interface Window {
    particlesJS: (id: string, config: any) => void;
  }
}

// Classe para o efeito de digitação
class TypeWriter {
  element: HTMLElement;
  text: string;
  speed: number;
  wait: number;
  isDeleting: boolean;
  idx: number;
  
  constructor(el: HTMLElement, waitTime = 3000, speed = 100) {
    this.element = el;
    this.text = '';
    this.speed = speed;
    this.wait = waitTime;
    this.isDeleting = false;
    this.idx = 0;
    
    if (this.element) {
      this.text = this.element.getAttribute('data-text') || '';
      this.speed = parseInt(this.element.getAttribute('data-speed') || `${speed}`);
      this.wait = parseInt(this.element.getAttribute('data-wait') || `${waitTime}`);
      this.type();
    } else {
      console.error('Elemento para TypeWriter não encontrado');
    }
  }
  
  type() {
    if (!this.element) {
      console.error('Elemento para TypeWriter é nulo');
      return;
    }
    
    // Texto atual a ser digitado
    const fullText = this.text;
    
    // Verifica se está deletando o texto
    if (this.isDeleting) {
      // Remove caracteres
      this.element.innerText = fullText.substring(0, this.element.innerText.length - 1);
    } else {
      // Adiciona caracteres
      this.element.innerText = fullText.substring(0, this.element.innerText.length + 1);
    }
    
    // Velocidade de digitação (mais rápido para deletar)
    let typeSpeed = this.speed;
    if (this.isDeleting) {
      typeSpeed /= 2;
    }
    
    // Verifica se o texto foi totalmente digitado ou deletado
    if (!this.isDeleting && this.element.innerText === fullText) {
      // Pausa no final
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.element.innerText === '') {
      this.isDeleting = false;
      this.idx++;
      typeSpeed = 500;
    }
    
    setTimeout(() => this.type(), typeSpeed);
  }
}

window.addEventListener('DOMContentLoaded', function() {
  // Elementos DOM
  const preloader = document.getElementById('preloader');
  const header = document.querySelector('header') as HTMLElement;
  
  // Efeito de digitação
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    new TypeWriter(typingElement);
  } else {
    console.warn('Elemento para digitação não encontrado');
  }

  // Inicializar particles.js se disponível
  if (typeof window.particlesJS === 'function') {
    try {
      window.particlesJS('particles-js', settings);
    } catch (error) {
      console.error('Erro ao inicializar particles.js:', error);
    }
  } else {
    console.warn('particlesJS não está disponível. Verifique se a biblioteca foi carregada.');
  }

  // Função para remover o preloader
  function hidePreloader() {
    if (preloader) {
      setTimeout(function() {
        preloader.classList.add('hidden');
        setTimeout(function() {
          if (preloader) {
            preloader.style.display = 'none';
          }
        }, 500);
      }, 1500);

      // Adicionar classe 'scrolled' ao header quando a página é rolada
      window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });
    }
  }

  // Iniciar o processo de esconder o preloader quando a página carregar
  window.addEventListener('load', function() {
    hidePreloader();
  });

  // Fallback: esconder o preloader após 3 segundos se o evento load não disparar
  setTimeout(function() {
    hidePreloader();
  }, 3000);
});