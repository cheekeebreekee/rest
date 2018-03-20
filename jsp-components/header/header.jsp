<section class="header-wrapper js-header-wrapper">
  <header class="header js-header">
    <div class="header-main-content js-header-content">
      <div class="se-block">
        <div class="header-content">
          <a href="/" class="logo">
            <img src="/images/logo-se.svg" class="main-logo-icon" width="215" height="45" alt="Schneider electric logo">
          </a>
          <div class="menu-wrapper">
            {{> ../menu-btn/menu-btn.hbs}}
            <div class="mobile-overlay"></div>
            {{> ../mega-menu/mega-menu.hbs}}
          </div>
        </div>

      </div>
    </div>
    {{> ../metabar/metabar.hbs}}
    {{!-- {{> ../country-select/country-select.hbs}} --}}
  </header>
</section>
