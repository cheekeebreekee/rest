<section class="cookie-notification js-cookie-notification">
  <article class="cookie-notification__wrapper">
    <!-- <p></p> tag  -->
    {{> ../_base/paragraph.hbs
      paragraphText=htmlWebpackPlugin.options.page.cookieMessage.paragraph
    }}
    <!-- <a></a> tag -->
    {{> ../_base/hyperlink.hbs
      className='se-btn-primary js-close-notification'
      linkText=htmlWebpackPlugin.options.page.cookieMessage.confirmationLink
    }}
  </article>
</section>
