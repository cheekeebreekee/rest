<c:forEach var="htmlWebpackPlugin.options.page.og" items="htmlWebpackPlugin.options.page.og">
  <meta property="og:${htmlWebpackPlugin.options.page.og.type}" content="${htmlWebpackPlugin.options.page.og.content}" />
</c:forEach>
