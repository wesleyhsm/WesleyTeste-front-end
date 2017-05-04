angular.module("listaFuncionario").controller("listaFuncionarioCtrl", function ($scope, funcionariosAPI, serialGenerator) {
	$scope.app = "Lista Funcionario";
	$scope.funcionarios = [];
	
	var carregarFuncionarios = function () {
		funcionariosAPI.getFuncionarios().success(function (data) {
			data.forEach(function (item) {
				item.serial = serialGenerator.generate();
			});
			$scope.funcionarios = data;
		}).error(function (data, status) {
			$scope.message = "Aconteceu um problema: " + data;
		});
	};
		
	$scope.adicionarFuncionario = function (funcionario) {
		funcionario.serial = serialGenerator.generate();
		funcionario.data = new Date();
		funcionariosAPI.saveFuncionarios(funcionario).success(function (data) {
			delete $scope.funcionario;
			$scope.funcionarioForm.$setPristine();
			carregarFuncionarios();
		});
	};
	
	$scope.apagarFuncionarios = function (funcionarios) {
		$scope.funcionarios = funcionarios.filter(function (funcionario) {
			if (!funcionario.selecionado) return funcionario;
		});
	};
	
	$scope.isFuncionarioSelecionado = function (funcionarios) {
		return funcionarios.some(function (funcionario) {
			return funcionario.selecionado;
		});
	};
	
	$scope.ordenarPor = function (campo) {
		$scope.criterioDeOrdenacao = campo;
		$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
	};
	
	carregarFuncionarios();	
});