import { settings } from './particles-config';

// Declaração para definir o particlesJS como uma propriedade global
declare global {
  interface Window {
    particlesJS: (id: string, config: any) => void;
  }
}

window.addEventListener('DOMContentLoaded', function() {
  // Elementos DOM
  const preloader = document.getElementById('preloader');
  const header = document.querySelector('header') as HTMLElement;

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