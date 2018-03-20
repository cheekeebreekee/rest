<section class="simple-slider">
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <c:forEach var="htmlWebpackPlugin.options.page.simpleSlider" items="htmlWebpackPlugin.options.page.simpleSlider">
        <div class="swiper-slide">
          <div class="simple-slider__content">
            <h3 class="simple-slider__heading">${htmlWebpackPlugin.options.page.simpleSlider.heading}</h3>
            <c:if test="${description}">
              <p class="simple-slider__description">${htmlWebpackPlugin.options.page.simpleSlider.description}</p>
            </c:if>
            <div class="cta-btn-wrapper">
              {{> ../cta-link/cta-link.hbs text=ctaLink.text url=ctaLink.url}}
            </div>
          </div>
          <img class="simple-slider__img" src="${htmlWebpackPlugin.options.page.simpleSlider.imageUrl}" alt="">
        </div>
      </c:forEach>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</section>