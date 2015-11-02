module.exports = function(){
  return {
    require: 'ngModel',
    scope: {
      equal: '='
    },
    link: function(scope, element, attributes, ngModel) {
      ngModel.$validators.equal = function(modelValue) {
        return modelValue == scope.equal
      }
      scope.$watch('equal', function() {
        if( ngModel.$viewValue )
          ngModel.$validate()
      })
    }
  }
}
