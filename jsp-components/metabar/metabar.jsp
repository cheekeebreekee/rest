<section class="metabar js-metabar">
  <div class="se-block">
    <div class="metabar-inner">
      <c:if test="${htmlWebpackPlugin.options.page.metabar.start}">
        <div class="metabar__items metabar__items--start">
          <c:forEach var="htmlWebpackPlugin.options.page.metabar.start" items="htmlWebpackPlugin.options.page.metabar.start">
            <div class="metabar-item metabar-item--located-start js-metabar-item"></div>
          </c:forEach>
        </div>
      </c:if>
      <c:if test="${htmlWebpackPlugin.options.page.metabar.end}">
        <div class="metabar__items metabar__items--end">
          <c:forEach var="htmlWebpackPlugin.options.page.metabar.end" items="htmlWebpackPlugin.options.page.metabar.end">
            <div class="metabar-item js-metabar-item">
              <c:if test="${countrySelect}">
                <button type="button" class="metabar-item__element metabar-item__country-select js-open-country-select">
                  <img class="icon metabar-item__flag-icon" src="//www.schneider-electric.by/ru/assets-re1/svg_flags/flag_${htmlWebpackPlugin.options.page.metabar.start.country.code}.svg" width="16" height="16" alt="">
                  <span class="metabar-item__title">${htmlWebpackPlugin.options.page.metabar.start.country.code}/${htmlWebpackPlugin.options.page.metabar.start.country.language} ${htmlWebpackPlugin.options.page.metabar.start.country.name} ${htmlWebpackPlugin.options.page.metabar.start.country.title}</span>
                  <span class="metabar-item__caret--down"></span>
                </button>
              </c:if>
            </div>
          </c:forEach>
        </div>
      </c:if>
    </div>
  </div>
</section>