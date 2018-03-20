<section class="mm js-mm">
  <div class="mm-wrapper">
    <c:forEach var="htmlWebpackPlugin.options.page.megaMenu" items="htmlWebpackPlugin.options.page.megaMenu">
      <div class="mm-item js-mm-item">
        <h4 class="mm-item__title">${htmlWebpackPlugin.options.page.megaMenu.title}</h4>
        <div class="mm-item__body">
          <a href="#" class="mm-item__link js-mm-item-link">
            ${htmlWebpackPlugin.options.page.megaMenu.mainLink}
            {{> mega-menu-icons/mega-menu-double-chevron.hbs}}
          </a>
          <div class="mm-categories">
            <c:forEach var="categorie" items="categories">
            <div class="mm-cat js-mm-cat">
              <div class="mm-cat__content">
                <a href="#" class="mm-cat__title">
                  ${htmlWebpackPlugin.options.page.megaMenu.name}
                  {{> mega-menu-icons/mega-menu-plus.hbs}}
                </a>
                <c:if test="${links}">
                  <div class="mm-cat__links">
                    <c:forEach var="link" items="links">
                      <a href="#" class="mm-cat__link">
                        ${htmlWebpackPlugin.options.page.megaMenu.this}
                        {{> mega-menu-icons/mega-menu-single-chevron.hbs}}
                      </a>
                    </c:forEach>
                    <a href="#" class="mm-cat__link mm-cat__link--expand mm-cat__link--all-links js-expand-cat">
                      ${htmlWebpackPlugin.options.page.megaMenu.lastLink}
                      {{> mega-menu-icons/mega-menu-double-chevron.hbs}}
                    </a>
                  </div>
                </c:if>
              </div>
            </div>
            </c:forEach>
          </div>
        </div>
      </div>
    </c:forEach>
  </div>
  <div class="metabar mm-metabar">
    <div class="container">
      <ul class="metabar-user-links">
        <c:forEach var="htmlWebpackPlugin.options.page.metabarLink" items="htmlWebpackPlugin.options.page.metabarLinks">
          <li class="metabar-user-links__item">
            <a href="#" class="metabar-user-link">
              <div class="metabar-user-link__icon-wrapper">
                <figure class="icon metabar-user-link__icon">
                  <svg class="icon" width="${htmlWebpackPlugin.options.page.megaMenu.icon.width}" height="${htmlWebpackPlugin.options.page.megaMenu.icon.height}" viewBox="0 0 ${htmlWebpackPlugin.options.page.megaMenu.icon.width} ${htmlWebpackPlugin.options.page.megaMenu.icon.height}">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#${htmlWebpackPlugin.options.page.megaMenu.icon.id}"></use>
                  </svg>
                </figure>
              </div>
              <span class="metabar-user-link__title">${htmlWebpackPlugin.options.page.megaMenu.name}</span>
            </a>
          </li>
        </c:forEach>
      </ul>
      <div class="metabar-info">
        <a href="#" class="metabar-stock stock">
          <div class="stock-icon-wrapper">
            {{> mega-menu-icons/mega-menu-metabar-stock.hbs}}
          </div>
          <span class="stock-content">
            <strong class="stock-value">€123.4</strong>
            <span class="stock-growth">0.6 %</span>
          </span>
        </a>
        <a href="#" class="metabar-country-selector country-selector-toggler js-open-country-select">
          <img class="country-selector-toggler__flag-icon" src="../svg-sprite/flags/flag_ru.svg" alt="">
          <div class="country-selector-toggler__title">Global (EN)</div>
          <span class="caret-down"></span>
        </a>
      </div>
    </div>
  </div>
</section>
