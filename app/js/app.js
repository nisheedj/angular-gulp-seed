/*!
 * Bootstrap - depends on angular, which depends on jquey
 */
define(['bootstrap', './modules', './components'], function(angular) {
  'use strict';
  return angular.module('app', ['app.controllers', 'app.directives', 'app.filters', 'app.services']);
});