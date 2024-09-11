module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    'node_modules',
    'dist',
    'old',
    '^.+\\.stories.js$',
    '^.+\\.styl$',
  ],
};
