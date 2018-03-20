<section class="country-dd js-country-dd">
	<div class="country-dd-info js-country-dd-info">
		<div class="container">
      <div class="country-dd-info__content">
        <img class="country-dd__flag-icon icon" width="26" height="26" src="//www.schneider-electric.by/ru/assets-re1/svg_flags/flag_by.svg" alt="">
        <div class="country-dd-info__welcome <c:if test="${isRedirected}">is-redirected</c:if>">
          <h2 class="country-dd__heading">${htmlWebpackPlugin.options.page.countrySelect.heading}</h2>
          <p class="country-dd__description country-dd__description--common">${htmlWebpackPlugin.options.page.countrySelect.description.common.subheading}</p>
          <p class="country-dd__description country-dd__description--redirected">${htmlWebpackPlugin.options.page.countrySelect.description.redirected.subheading}</p>
          <div class="country-dd__buttons">
            <button type="button" class="country-dd__main-action-button js-choose-country">${htmlWebpackPlugin.options.page.countrySelect.description.common.mainActionButton}</button>
            <button type="button" class="country-dd__additional-action-button js-confirm-region">${htmlWebpackPlugin.options.page.countrySelect.description.common.additionalActionButton}</button>
            <button type="button" class="country-dd__main-action-button country-dd__main-action-button--redirected js-stay-country">${htmlWebpackPlugin.options.page.countrySelect.description.redirected.mainActionButton}</button>
            <button type="button" class="country-dd__additional-action-button country-dd__additional-action-button--redirected js-choose-country">
              <svg class="icon country-dd__additional-action-button__icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 120 120"><path fill="currentColor" d="M60 10c24.8-.6 47.8 20 49.7 45 3 23.6-13.6 47.5-36.7 53.2-21.8 6.3-46.8-4.4-57-24.6C4 62.4 10.6 33 30.7 19.3 39 13.3 49.5 10 60 10zm17.8 34c-4 2.2 5-5 7.5-1.4 5.2-2.3 3.5-6-1-6C83 32 81 31.8 77.7 34c1.2-1.6-6.6-8-7.8-3.3-1 3 2 5-2 7.3 2 4.6-4 2.4-4-1.2-5-1.2-13-2.3-7.8-8.6 3-.5 5.3-4.2 8.5-3.7.3-3.8-3-3-4.6-.2-1.6-3.3-4-.8-5.3-4.5-5.5-1-1.2 4-.3 3.2-2 1.4-1 3.2-2.2.4-4 .8-6 0-7-2.8-4 1.3-8.3 3.8-2 1.2 3.3 0 2.2 1.8-.8 2 .8 1.7-5.6-2.3-7.2 1.8-4 3.2-15 10.8-9.4 14.5 2 3 6 5 2.7 6 0 5 0 11 5.4 14 2 2 6 12 6 8-2.5-3-3-9 0-3 4 3 4 9 9 12 6.2 2.4 12 3.8 16 9.5 0-1 3.2 3.5 3-1-6.4 1-1-9-7-7-2.7 1.3 3.2-9.5-2.7-4.3-4.7 7.3-9.6-7.6-4-9.4-1-1.3 3.3 1 4.6-1 5-.5 7 2 9 5 1.7-4-4-7.6 2.4-9 2.8-3-1-5.5 3.3-6.5 2.6-2 5.7-5 8.7-6.7-3.5-2 2-2.4-2-3h-1l-1 .5zm-10.6 57c8-1.3 19.4-6.7 22-12.6-3-2-6.4-4.7-9.6-4.4-3.4-4-5 3.3-4.6-1.8-5 2.4-6.4 3.4-5 9.3-3.3 3.3-2.3 5.6-2.8 9.4z"/></svg>${htmlWebpackPlugin.options.page.countrySelect.description.redirected.additionalActionButton}</button>
          </div>
        </div>
      </div>
		</div>
		<button aria-label="Close" type="button" class="close-button country-dd__close-button js-close-country-dd">
			<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 19 19">
        <path fill="currentColor" fill-rule="evenodd" d="M13.1 13.1c-.28.28-.74.28-1.02 0l-2.7-2.68-2.8 2.8c-.28.3-.74.3-1.02 0-.28-.27-.28-.73 0-1l2.8-2.83L5.7 6.7c-.3-.27-.3-.73 0-1 .27-.3.73-.3 1 0l2.7 2.67 2.55-2.55c.28-.3.74-.3 1.02 0 .28.28.28.73 0 1.02L10.42 9.4l2.68 2.68c.28.28.28.74 0 1.02m2.94-10.35c-3.66-3.67-9.63-3.67-13.3 0-3.66 3.66-3.66 9.62 0 13.3 3.67 3.65 9.63 3.65 13.3 0 3.66-3.68 3.66-9.64 0-13.3"/>
      </svg>
		</button>
	</div>
  {{> ./country-select-countries/country-select-countries}}
</section>