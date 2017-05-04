angular.module("listaFuncionario").factory("funcionariosAPI", function ($http, config) {
	var _getFuncionarios = function () {
		return $http.get(config.baseUrl + "/funcionario");
	};

	var _saveFuncionario = function (funcionario) {
		return $http.post(config.baseUrl + "/funcionario", funcionario);
	};

	return {
		getFuncionarios: _getFuncionarios,
		saveFuncionarios: _saveFuncionario
	};
});