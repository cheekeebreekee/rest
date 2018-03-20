<a
  <c:if test="${className}">
    class="se-btn ${className}"
  </c:if>
  <c:if test="${url}">
  href="${url}"
  ${else}
    href="#"
  </c:if>>
  ${linkText}
</a>
