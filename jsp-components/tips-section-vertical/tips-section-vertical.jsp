<section class="se-tips-vertical">
  <c:forEach var="htmlWebpackPlugin.options.page.tipsVertical" items="htmlWebpackPlugin.options.page.tipsVertical">
  <div class="se-tips-vertical__item">
    <c:if test="${linksOnly}">
      <h5 class="se-tips-vertical__heading">${htmlWebpackPlugin.options.page.tipsVertical.heading}</h5>
      <ul class="se-tips-vertical__links">
        <c:forEach var="link" items="links">
          <li>{{> ../_base/hyperlink.hbs
            className='se-btn-link se-btn-link__arrow js-tips-link-arrow'
            linkText=text
            url=url
          }}</li>
        </c:forEach>
      </ul>
    ${htmlWebpackPlugin.options.page.tipsVertical.else}
      <figure class="se-tips-vertical__figure">
        <img src="${htmlWebpackPlugin.options.page.tipsVertical.imageUrl}" alt="" class="se-tips-vertical__img">
      </figure>
      <h5 class="se-tips-vertical__heading">${htmlWebpackPlugin.options.page.tipsVertical.heading}</h5>
      <p class="se-tips-vertical__description">${htmlWebpackPlugin.options.page.tipsVertical.description}</p>
      <!-- <a></a> tag -->
      {{> ../_base/hyperlink.hbs
        className='se-btn-link se-btn-link__arrow js-tips-link-arrow'
        linkText=ctaButton.text
        url=ctaButton.url
      }}
      </c:if>
  </div>
  </c:forEach>
</section>
