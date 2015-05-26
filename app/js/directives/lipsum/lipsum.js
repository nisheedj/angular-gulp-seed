define(['../module'], function(module) {
  'use strict';
  module.directive('lipsum', [

    function() {
      return {
        restrict: 'E',
        replace: true,
        template: '<pre></pre>',
        link: function(scope, element, attr) {
          element.append('Lorem ipsum dolor sit amet, consectetur adipisicing elit,\nsed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\nquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo');
        }
      };
    }
  ]);
});