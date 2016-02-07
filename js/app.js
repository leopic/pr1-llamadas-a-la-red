angular.module('proyectoUno', [])
    /**
     * Servicio de tipo `value`, retorna un solo valor, útil para almacenar valores repetidos
     * en varios lugares de nuestra aplicación.
     */
    .value('URLBase', 'http://leo.cr/projects/cenfo/pr1/')
    /**
     * Servicio que interactúa con el back-end donde están almacenado los datos.
     */
    .service('ProyectoUnoService', ['$http', 'URLBase', function($http, URLBase) {
        var METODOS = {
            DELETE: 'DELETE',
            GET: 'GET',
            POST: 'POST',
            PUT: 'PUT'
        };

        /**
         * Realiza una petición `get` y trae una lista de amigos.
         * @returns {*}
         */
        var obtener = function() {
            var url = URLBase + 'datos.json';

            return $http({
                method: METODOS.GET,
                url: url
            });
        };

        return {
            obtener: obtener
        }
    }])
    /**
     * Encargado de la única vista de la aplicación.
     */
    .controller('ProyectoUnoController',
        ['$scope', 'ProyectoUnoService', function ($scope, ProyectoUnoService) {
            $scope.init = function() {
                ProyectoUnoService.obtener().then(function(respuesta) {
                    $scope.usuarios = respuesta.data;
                }, function(razon) {
                    $scope.error = razon;
                });
            };

            $scope.init();
        }])
;
