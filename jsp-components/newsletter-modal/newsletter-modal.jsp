<section class="popup">
  <header class="popup__header">
    <figure class="icon popup__header-logo">
      <svg class="icon" width="128" height="30" viewBox="0 0 128 30">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#logo-schneider"></use>
      </svg>
    </figure>
    <button aria-label="Close" type="button" class="close-button popup__close-button js-close-popup">
      <svg class="icon" width="20" height="20" viewBox="0 0 20 20">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#close-button"></use>
      </svg>
    </button>
  </header>
  <div class="popup__content">
    <h2 class="h2 popup__content-heading">${htmlWebpackPlugin.options.page.newsLetter.title}</h2>
    <p class="popup__content-message">${htmlWebpackPlugin.options.page.newsLetter.body}</p>
  </div>
</section>