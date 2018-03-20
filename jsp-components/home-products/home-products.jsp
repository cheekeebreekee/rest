<section class="home-products">
  <div class="home-products__heading-wrapper">
    <h3 class="home-products__heading">${htmlWebpackPlugin.options.page.homeProducts.sliderItem.htmlWebpackPlugin.options.page.homeProducts.heading}</h3>
    {{> ../cta-link/cta-link.hbs text=htmlWebpackPlugin.options.page.homeProducts.ctaLink.text url=htmlWebpackPlugin.options.page.homeProducts.ctaLink.url}}
  </div>
  <div class="swiper-container home-products__slider-wrapper">
    <div class="swiper-wrapper home-products__slider">
      <c:forEach var="htmlWebpackPlugin.options.page.homeProducts.sliderItem" items="htmlWebpackPlugin.options.page.homeProducts.sliderItems">
        <div class="swiper-slide">
          <a href="${htmlWebpackPlugin.options.page.homeProducts.sliderItem.linkUrl}" target="_blank" class="home-products__slider-item">
            <figure class="home-products__slider-wrapper">
              <img src="${htmlWebpackPlugin.options.page.homeProducts.sliderItem.imageUrl}" alt="" class="home-products__slider-image">
              <figcaption class="home-products__slider-item-name">${htmlWebpackPlugin.options.page.homeProducts.sliderItem.name}</figcaption>
            </figure>
          </a>
        </div>
      </c:forEach>
    </div>
    {{> ../_base/slider-controls.hbs additionalClasses="" iconWidth=11 iconHeight=20 iconIdLeft="arrow-big-left-white" iconIdRight="arrow-big-right-white"}}
  </div>
</section>