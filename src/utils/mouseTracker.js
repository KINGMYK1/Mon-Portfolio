// Script pour suivre la position de la souris sur les cartes de projet

export function initMouseTracking() {
  document.addEventListener('DOMContentLoaded', () => {
    const projectBoxes = document.querySelectorAll('.project-box');
    
    projectBoxes.forEach(box => {
      box.addEventListener('mousemove', e => {
        const rect = box.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        box.style.setProperty('--mouse-x', `${x}px`);
        box.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  });
}