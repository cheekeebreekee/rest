<section class="main-slider">
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <c:forEach var="htmlWebpackPlugin.options.page.sliderItem" items="htmlWebpackPlugin.options.page.sliderItems">
        <div class="swiper-slide">
          <%-- <div class="swiper-slide-wrapper"> --%>
          <%-- <picture> --%>
            {{!-- <source srcset="https://storage.googleapis.com/srcset/resized-images/mobile/2550x600-ne.jpg 480w,
              https://storage.googleapis.com/srcset/resized-images/tablet/2550x600-ne.jpg 960w,
              https://storage.googleapis.com/srcset/resized-images/desktop/2550x600-ne.jpg 2560w"
              sizes="(min-width: 960px) 2560px, (min-width: 600px) 960px, 480px"> --}}
            <img src="${htmlWebpackPlugin.options.page.sliderItem.image.desktop}" alt="image" width="100%">
          <%-- </picture> --%>
            <div class="container">
              <article class="main-slider__content">
                <h3 class="main-slider__heading">${htmlWebpackPlugin.options.page.sliderItem.content.heading}</h3>
                <p class="main-slider__description">${htmlWebpackPlugin.options.page.sliderItem.content.description}</p>
                  <c:if test="${content.ctaButton}">
                    <div class="cta-btn-wrapper">
                      {{> ../cta-button/cta-button.hbs text=content.ctaButton.text url=content.ctaButton.url}}
                    </div>
                  </c:if>
                  <c:if test="${content.videoButton}">
                    <div class="cta-btn-wrapper">
                      {{> ../video-button/video-button.hbs text=content.videoButton.text url=content.videoButton.url}}
                    </div>
                  </c:if>
              </article >

            </div>
            <article class="main-slider__content main-slider__content--mobile">
              <p class="main-slider__description">${htmlWebpackPlugin.options.page.sliderItem.content.description}</p>
                <c:if test="${content.ctaButton}">
                  <%-- <div class="cta-btn-wrapper"> --%>
                    {{> ../cta-button/cta-button.hbs text=content.ctaButton.text url=content.ctaButton.url}}
                  <%-- </div> --%>
                </c:if>
                <c:if test="${content.videoButton}">
                  <%-- <div class="cta-btn-wrapper"> --%>
                    {{> ../video-button/video-button.hbs text=content.videoButton.text url=content.videoButton.url}}
                  <%-- </div> --%>
                </c:if>
            </article>
          <%-- </div> --%>
          <%-- TO DELETE --%>
          {{> ../slider-video-btn/slider-video-btn.hbs url=videoUrl}}
        </div>
      </c:forEach>
    </div>
    <div class="swiper-pagination"></div>
    {{> ../_base/slider-controls.hbs additionalClasses="" iconWidth=23 iconHeight=40 iconIdLeft="arrow-big-left-white" iconIdRight="arrow-big-right-white"}}
  </div>
</section>