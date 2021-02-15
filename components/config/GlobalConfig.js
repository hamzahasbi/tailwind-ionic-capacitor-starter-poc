export const GlobalConfig = {
    frontendURL: `http://localhost:3000/`,
    backendURL: 'https://backend.void.fr/',
    languages: {
      defaultLanguage: 'fr',
      languages: ['fr', 'ar'],
      locales: ['fr-FR', 'ar-MA'],
      languageLabels: [
        {
          code: 'fr',
          label: 'Français',
        },
        {
          code: 'ar',
          label: 'العربية',
        },
      ],
      languageIcon: {
        'fr-FR': '🇧🇷',
        'en-US': '🇺🇸',
      },
    },
    api: {
      authorization: null,
    },
};