require('angular/angular.min')
require('angular-mocks')
require('.')
describe('equal', function () {
  var $compile
    , $rootScope

  var model1Key = 'model1'
    , model2Key = 'model2'

  beforeEach(angular.mock.module('angular-equal-directive'))
  beforeEach(inject(function($injector){
    $compile = $injector.get('$compile')
    $rootScope = $injector.get('$rootScope')
  }))

  it('does not compare empty values', function () {
    writeModel('','')

    var element = createFormWith($rootScope, model1Key, model2Key)

    $rootScope.$digest()
    expect( Object.keys($rootScope.MyForm.$error).length ).to.equal( 0 )
    expect( $rootScope.MyForm[model2Key].$error ).to.deep.equal( {} )
  })

  it('writes equal error when values are not the same', function () {
    writeModel('foo','bar')

    var element = createFormWith($rootScope, model1Key, model2Key)

    $rootScope.$digest()
    expect( Object.keys($rootScope.MyForm.$error).length ).to.equal( 1 )
    expect( $rootScope.MyForm[model2Key].$error ).to.deep.equal( {
      equal: true
    } )
  })
  it('compares the same values and does not write error', function () {
    writeModel('foo','foo')

    var element = createFormWith($rootScope, model1Key, model2Key)

    $rootScope.$digest()
    expect( Object.keys($rootScope.MyForm.$error).length ).to.equal( 0 )
    expect( $rootScope.MyForm[model2Key].$error ).to.deep.equal( {} )
  })






  function writeModel(model1, model2){
    $rootScope.model1 = model1
    $rootScope.model2 = model2
  }

  function createFormWith(scope, model1Key, model2Key) {
    return $compile([
      '<form name="MyForm">',
        '<input name="password" type="text" ng-model="'+ model1Key +'"></input>',
        '<input equal="'+ model1Key +'" name="'+ model2Key +'" type="text" ng-model="'+ model2Key +'"></input>',
      '</form>'
    ].join(''))(scope)
  }

})
