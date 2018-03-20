<section class="se-tips">
  <c:forEach var="htmlWebpackPlugin.options.page.tip" items="htmlWebpackPlugin.options.page.tips">
    <div class="se-tips__item">
      <h5 class="se-tips__heading">${htmlWebpackPlugin.options.page.tip.heading}</h5>
      <figure class="se-tips__figure">
        <img src="${htmlWebpackPlugin.options.page.tip.imageUrl}" alt="" class="se-tips__img">
      </figure>
      <p class="se-tips__description">${htmlWebpackPlugin.options.page.tip.description}</p>
      <!-- <a></a> tag -->
      {{> ../_base/hyperlink.hbs
        className='se-btn-primary js-tips-description'
        linkText=ctaButton.text
        url=ctaButton.url
      }}
    </div>
  </c:forEach>
</section>
