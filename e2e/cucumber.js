module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['steps/**/*.ts'],
    paths: ['features/**/*.feature'],
    format: ['progress', 'html:reports/cucumber-report.html'],
    publishQuiet: true,
  },
};
