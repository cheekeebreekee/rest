<div class="copyright-bar">
  <div class="container">
    <div class="copyright-bar-wrapper">
      <ul class="copyright-bar__list">
        <c:forEach var="htmlWebpackPlugin.options.page.footerBottomBar.navigationLink" items="htmlWebpackPlugin.options.page.footerBottomBar.navigationLinks">
          <li class="copyright-bar__list-item">
            <a href="${htmlWebpackPlugin.options.page.footerBottomBar.navigationLink.url}" class="copyright-bar__list-link">${htmlWebpackPlugin.options.page.footerBottomBar.navigationLink.text}</a>
          </li>
        </c:forEach>
      </ul>
      <p class="copyright-bar__copyright">
        <a href="${htmlWebpackPlugin.options.page.footerBottomBar.navigationLink.htmlWebpackPlugin.options.page.footerBottomBar.footerLinkText.url}" class="copyright-bar__main-link">${htmlWebpackPlugin.options.page.footerBottomBar.navigationLink.htmlWebpackPlugin.options.page.footerBottomBar.footerLinkText.text}</a>
      </p>
    </div>
  </div>
</div>