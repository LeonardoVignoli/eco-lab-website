document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-gallery]').forEach(gallery => {
    const items = [...gallery.querySelectorAll('.gallery-item')];
    const dialog = gallery.querySelector('.gallery-lightbox');
    const image = dialog.querySelector('img');
    const caption = dialog.querySelector('figcaption');
    let currentIndex = 0;

    const showImage = index => {
      currentIndex = (index + items.length) % items.length;
      image.src = items[currentIndex].querySelector('img').src;
      caption.textContent = `${currentIndex + 1} / ${items.length}`;
    };

    const closeDialog = () => {
      dialog.close();
      document.documentElement.classList.remove('gallery-open');
    };

    items.forEach((item, index) => {
      item.addEventListener('click', () => {
        showImage(index);
        dialog.showModal();
        document.documentElement.classList.add('gallery-open');
      });
    });

    dialog.querySelector('.gallery-lightbox-close').addEventListener('click', closeDialog);
    dialog.querySelector('.gallery-lightbox-prev').addEventListener('click', () => showImage(currentIndex - 1));
    dialog.querySelector('.gallery-lightbox-next').addEventListener('click', () => showImage(currentIndex + 1));

    dialog.addEventListener('click', event => {
      if (event.target === dialog) closeDialog();
    });

    dialog.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') showImage(currentIndex - 1);
      if (event.key === 'ArrowRight') showImage(currentIndex + 1);
    });

    dialog.addEventListener('close', () => document.documentElement.classList.remove('gallery-open'));
  });
});
