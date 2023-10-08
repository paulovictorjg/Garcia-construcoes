// Seleciona todas as imagens na galeria
const imagens = document.querySelectorAll('.galeria-imagem');

// Adiciona um ouvinte de evento a cada imagem
imagens.forEach((imagem) => {
  imagem.addEventListener('click', (evento) => {
    // Quando a imagem é clicada, altera o estilo para preencher a tela
    evento.target.style.position = 'fixed';
    evento.target.style.width = '100%';
    evento.target.style.height = '100%';
    evento.target.style.objectFit = 'cover';
    evento.target.style.zIndex = '999';
  });
});

// Fecha a visualização em tela cheia ao clicar novamente na imagem
document.body.addEventListener('click', (evento) => {
  if (evento.target.style.position === 'fixed') {
    evento.target.style.position = '';
    evento.target.style.width = '';
    evento.target.style.height = '';
    evento.target.style.objectFit = '';
    evento.target.style.zIndex = '';
  }
});