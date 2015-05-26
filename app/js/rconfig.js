/*Require JS configuration*/
/*global require*/
require.config({
  baseUrl: 'js',
  paths: {
    angular: 'vendor/angular.min',
    jquery: 'vendor/jquery.min',
    bootstrap: 'vendor/bootstrap.min'
  },
  shim: {
    angular: {
      deps: ['jquery'],
      exports: 'angular'
    },
    bootstrap: {
      deps: ['angular'],
      exports: 'angular'
    }
  }
});