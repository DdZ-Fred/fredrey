export default {
  superpowers: [
    {
      name: 'HTML/CSS',
      provider: 'devicons',
      icon: 'html5',
      strength: 4,
      comment: 'HTML is fine, that being said, I\'m not an expert ' +
        'in CSS even though I usually get the job done anyway',
    },
    {
      name: 'JavaScript/ES6',
      provider: 'devicons',
      icon: 'javascript_badge',
      strength: 3,
      comment: 'Trying as much as I can to write ' +
        '<a href="https://github.com/airbnb/javascript/" target="_blank">Airbnb-style</a> code',
    },
    {
      name: 'ESLint',
      provider: 'svg',
      icon: 'eslint',
      strength: 4,
      comment: 'Because writing good and consistent code is important. ' +
      'I use the <a href="https://www.npmjs.com/package/eslint-config-airbnb-base">airbnb-base</a> config',
    },
    {
      name: 'NodeJS',
      provider: 'devicons',
      icon: 'nodejs_small',
      strength: 3,
      comment: 'Experience with:<br />' +
                '<strong>npm</strong> / ' +
                '<strong>globals</strong> / ' +
                '<strong>module locals</strong><br />' +
                'Small experience with native modules',
    },
    {
      name: 'React',
      provider: 'devicons',
      icon: 'react',
      strength: 3,
      comment: '...React is magic ?',
    },
    {
      name: 'Meteor',
      provider: 'devicons',
      icon: 'meteor',
      strength: 4,
      comment: 'Meteor is definitely the most magical!',
    },
    {
      name: 'MongoDB',
      provider: 'devicons',
      icon: 'mongodb',
      strength: 3,
      comment: `Used a lot with Meteor and NodeJS/Express apps.
                <br />Had been using Mongoose as well.`,
    },
    {
      name: 'Webpack',
      provider: 'svg',
      icon: 'webpack',
      strength: 3,
      comment: `Its use is quite new to me but I know the most common config properties.
                <br />Has always been used with Babel so far.`,
    },

  ],
  gitProfiles: [
    {
      name: 'GitHub',
      url: 'https://github.com/DdZ-Fred',
      provider: 'semantic',
      // Semantic UI: OR 'github alternate' OR 'github square'
      icon: 'github',
    },
    {
      name: 'BitBucket',
      url: 'https://bitbucket.org/DdZ-Fred',
      provider: 'semantic',
      // Semantic UI: OR 'bitbucket square'
      icon: 'bitbucket',
    },
  ],
  contact: {
    formModalOpened: false,
    innerModalType: 'failure',
    innerModalContent: 'Your message has been sent! ' +
      'I will answer as soon as I can!',
  },
  footerLinks: [
    {
      title: 'AboutMe',
      anchor: 'aboutMe',
      icon: '',
    },
    {
      title: 'Superpowers',
      anchor: 'superpowers',
      icon: '',
    },
    {
      title: 'Works',
      anchor: 'works',
      icon: '',
    },
    {
      title: 'Contact',
      anchor: 'contact',
      icon: '',
    },
    {
      title: 'Top',
      anchor: 'header',
      icon: 'pointing up',
    },
  ],
};
