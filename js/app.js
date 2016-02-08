angular.module('proyectoUno', [
        'ngResource'
    ])
    /**
     * Servicio de tipo `value`, retorna un solo valor, útil para almacenar valores repetidos
     * en varios lugares de nuestra aplicación.
     */
    .value('URLBase', 'http://leo.cr/projects/cenfo/pr1/')
    /**
     * Servicio que interactúa con el back-end donde están almacenados los datos.
     */
    .service('ProyectoUnoService', ['$resource', 'URLBase', function($resource, URLBase) {
        var METODOS = {
            DELETE: 'DELETE',
            GET: 'GET',
            POST: 'POST',
            PUT: 'PUT'
        };

        /**
         * Usa parámetros parecidos
         */
        return $resource(URLBase + ':accion', {}, {
            obtener: {
                isArray: true,
                method: METODOS.GET,
                params: {
                    accion: 'datos.json'
                }
            }
        });
    }])
    /**
     * Encargado de la única vista de la aplicación.
     */
    .controller('ProyectoUnoController',
        ['$scope', 'ProyectoUnoService', function ($scope, ProyectoUnoService) {
            $scope.init = function() {
                ProyectoUnoService.obtener(function(respuesta) {
                    $scope.usuarios = respuesta;
                }, function(razon) {
                    $scope.error = razon;
                });
            };

            $scope.init();
        }])
;
