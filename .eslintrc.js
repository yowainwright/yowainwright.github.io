module.exports = {
  extends: [
    'dollarshaveclub/react',
    'plugin:jsx-a11y/recommended',
    // 'plugin:jsx-a11y/strict'
  ],
  "globals": {
    "__dirname": true,
    "describe": true,
    "expect": true,
    "graphql": true,
    "jest": true,
    "it": true,
    "shallow": true,
  },
  'plugins': [
    'eslint-plugin-jsx-a11y'
  ],
  'rules': {
    'jsx-a11y/label-has-for': [2, {
      'components': ['Label'],
      'required': {
        'every': ['id']
      },
      'allowChildren': false,
    }],
  }
};
