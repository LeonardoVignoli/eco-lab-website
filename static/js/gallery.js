document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.gallery-wrapper');
  
  containers.forEach(wrapper => {
    const container = wrapper.querySelector('.gallery-container');
    const btnLeft = wrapper.querySelector('.gallery-button.left');
    const btnRight = wrapper.querySelector('.gallery-button.right');
    
    btnLeft.addEventListener('click', () => {
      container.scrollBy({ left: -200, behavior: 'smooth' });
    });
    btnRight.addEventListener('click', () => {
      container.scrollBy({ left: 200, behavior: 'smooth' });
    });
  });
});
