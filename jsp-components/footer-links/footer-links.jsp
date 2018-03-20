<div class="footer-links">
  <c:forEach var="htmlWebpackPlugin.options.page.footerLink" items="htmlWebpackPlugin.options.page.footerLinks">
    <div class="footer-links-wrapper">
      <h6 class="footer-links__heading">${htmlWebpackPlugin.options.page.footerLink.heading}</h6>
      <ul class="footer-links__list">
        <c:forEach var="linksArr" items="linksArr">
          <li class="footer-links__list-item">
            <a href="${htmlWebpackPlugin.options.page.footerLink.url}" class="footer-links__list-link">${htmlWebpackPlugin.options.page.footerLink.text}</a>
          </li>
        </c:forEach>
      </ul>
    </div>
  </c:forEach>
</div>