# Global project descriptions

All 47 global projects have Japanese, Simplified Chinese, and Cantonese translations for their overview and contribution text in `lib/global-project-copy.json`. English uses the original source text from `lib/projects.ts`.

`localizeProject` selects these fields by stable project ID and the current site language. Portfolio cards and detail panels use the same localized record. Market selection controls the project collection independently of display language. The original source records, links, draft-copy markers, and confidentiality qualifications are preserved.

Translations were written locally. No project text was sent to an external translation service.

Validation is in `tests/global-project-language.spec.ts`: complete translation coverage for every global entry; Japanese card and detail content for all 47 projects; switching among all four languages; and persistence after reload. Browser tests run at desktop and mobile widths.
