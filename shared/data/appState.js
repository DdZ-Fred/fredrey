// TODO:40 Re-Add AboutMe data in footerLinks state
export default {
  superpowers: [
    {
      name: 'HTML/CSS',
      provider: 'devicons',
      icon: 'html5',
      strength: 4,
      comment: 'HTML is ok and I can manage CSS. Though, I often go on ' +
        '<a title="Mozilla Developer Network" href="https://developer.mozilla.org/en-US/" ' +
        'target="_blank">MDN</a>' +
        ' when I need to learn about something that will help me solve a problem (...same with JS)',
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
      comment: 'Started working with React last year and now can\'t see myself working without it!',
    },
    {
      name: 'Meteor',
      provider: 'devicons',
      icon: 'meteor',
      strength: 4,
      comment: 'Have been using it for a little less than a year! ' +
        'Please check my cosyquiz project on Bitbucket!',
    },
    {
      name: 'MongoDB',
      provider: 'devicons',
      icon: 'mongodb',
      strength: 3,
      comment: 'Used a lot with Meteor and NodeJS/Express apps.',
    },
    {
      name: 'Webpack',
      provider: 'svg',
      icon: 'webpack',
      strength: 3,
      comment: `Its use is quite new to me but I know the most common config properties.
        <br />It has always been used with Babel so far.`,
    },

  ],
  gitProfiles: [
    {
      name: 'GitHub',
      url: 'https://github.com/DdZ-Fred',
      // Semantic UI: OR 'github alternate' OR 'github square'
      icon: 'github',
    },
    {
      name: 'BitBucket',
      url: 'https://bitbucket.org/DdZ-Fred',
      // Semantic UI: OR 'bitbucket square'
      icon: 'bitbucket',
    },
  ],
  contact: {
    formModalOpened: false,
    innerModalType: 'success',
    innerModalContent: 'Your message has been sent! ' +
      'I will answer as soon as I can!',
  },
  footerLinks: [
    // {
    //   title: 'AboutMe',
    //   anchor: 'aboutMe',
    //   icon: '',
    // },
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
