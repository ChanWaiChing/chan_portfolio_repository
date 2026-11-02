# Portfolio card languages

All 89 portfolio cards use the site's selected language for their titles, descriptions, category and industry labels, date wording, buttons, confidentiality labels, draft notices, and preview labels. Japanese remains the default when no language preference is saved. Source brand names remain recognizable within localized project titles.

- `lib/project-card-copy.json`: title translations for all projects and additional description translations for Japan-market entries.
- `lib/global-project-copy.json`: global project overviews and contribution translations.
- `lib/project-period.ts`: translates date labels, month wording and country names while retaining the recorded numerical values and precision.
- `lib/catalog-localization.ts`: composes the localized display record without changing the source data.

Counts and recorded numeric values are preserved. Technology, skill, programming-language, framework and suggested-stack values are passed through unchanged; their interface labels follow the selected language. Original project titles remain searchable alongside localized text. Existing saved language preferences continue to be respected.

`tests/portfolio-card-language.spec.ts` checks translation coverage, numeric and technology invariants, Japanese default behavior, card rendering in both markets in all four languages, and preference persistence on desktop and mobile.
