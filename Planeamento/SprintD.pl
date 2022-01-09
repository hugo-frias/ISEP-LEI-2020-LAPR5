% + ------------------------------------------------------------------------------------------------------- +

:-consult("baseConhecimento.pl").
:-consult("SprintC.pl").

% + ------------------------------------------------------------------------------------------------------- +

% Predicado Inicial do SprintD.

escalonamentoMotoristas:-
	obterCargaSistema(CargaSistema),
	obterCapacidadeSistema(CapacidadeSistema),
	compararCapacidadeCargaSistema(CapacidadeSistema,CargaSistema),
	criarTuples,
	associarMotoristas,
	gerarDriverDuties.

% Predicado que, antes de se proceder ao escalonamento de Drivers propriamente dito, verifica se a CapacidadeSistema é maior que a CargaSistema.

escalonamentoMotoristas:-
	(retractall(lista_log_erros(_));true),
	Erro = "A capacidade do sistema tem que ser maior que a carga do sistema",
	asserta(lista_log_erros([Erro|[]])).

% + ------------------------------------------------------------------------------------------------------- +

% Predicado auxiliar do escalonamentoMotoristas.
% Função: Calcular a CargaSistema.

obterCargaSistema(CargaSistema):-
    retractall(auxiliarDeCargaSistema(_)),
    asserta(auxiliarDeCargaSistema(0)),
    findall(_, (rangehvd(_,X1,X2), Diferenca is X2-X1, auxiliarDeCargaSistema(Aux), retractall(auxiliarDeCargaSistema(_)), Valor is Diferenca+Aux, asserta(auxiliarDeCargaSistema(Valor))), _),
    auxiliarDeCargaSistema(CargaSistema).

% Predicado auxiliar do escalonamentoMotoristas.
% Função: Calcular a CapacidadeSistema.

obterCapacidadeSistema(CapacidadeSistema):-
    retractall(auxiliarDeCapacidadeSistema(_)),
    asserta(auxiliarDeCapacidadeSistema(0)),
    findall(_, (horariomotorista(_,_,_,L,_), auxiliarDeCapacidadeSistema(Aux), retractall(auxiliarDeCapacidadeSistema(_)), Valor is L+Aux, asserta(auxiliarDeCapacidadeSistema(Valor))), _),
    auxiliarDeCapacidadeSistema(CapacidadeSistema).

% Predicado auxiliar do escalonamentoMotoristas.
% Função: Comparar a CapacidadeSistema com a CargaSistema.

compararCapacidadeCargaSistema(CapacidadeSistema, CargaSistema):-
	CapacidadeSistema > CargaSistema.

% + ------------------------------------------------------------------------------------------------------- +

% Predicado auxiliar do escalonamentoMotoristas.
% Função: Preencher o facto dinâmico t/1.

criarTuples:-
	(retractall(t(_,_,_,_));true),
	findall(_,(horariomotorista(Motorista,HorarioInicial,HorarioFinal,DuracaoBloco,ListaDuracaoBlocos),
	length(ListaDuracaoBlocos,Tamanho), 
	Diferenca is (HorarioFinal - HorarioInicial - DuracaoBloco) / Tamanho,
	criarTuples1(HorarioInicial,Diferenca,ListaDuracaoBlocos,Motorista)
	),_).

% Predicado auxiliar do criarTuples.
% Função: Realizar uma entrada individual no facto dinâmico t/1.

criarTuples1(_,_,[],_):-!.
criarTuples1(HorarioInicial,Diferenca,[Elemento|ListaDuracaoBlocos],Motorista):-
	HorarioFinal is HorarioInicial+Diferenca+Elemento,
	asserta(t(HorarioInicial,HorarioFinal,Elemento,Motorista)),
	criarTuples1(HorarioFinal,Diferenca,ListaDuracaoBlocos,Motorista).

% Predicado auxiliar do escalonamentoMotoristas.
% Função: Preencher o facto dinâmico lista_motoristas_nworkblocks/2.

% + ------------------------------------------------------------------------------------------------------- +

associarMotoristas:-
	findall((HorarioInicial,VehicleDuty),rangehvd(VehicleDuty,HorarioInicial,_),ListaHorariosVehicleDuty),
	sort(ListaHorariosVehicleDuty,ListaOrdenadaHorariosVehicleDuty),
	findall((InicioTrabalhoBlocoMotorista,FimTrabalhoBlocoMotorista,DuracaoMaximaBlocoMotorista,Motorista),t(InicioTrabalhoBlocoMotorista,FimTrabalhoBlocoMotorista,DuracaoMaximaBlocoMotorista,Motorista),ListaTuples),
	sort(ListaTuples,ListaTuplesOrdenada),
	(retractall(lista_motoristas_nworkblocks_aux(_,_)); true),
	(retractall(lista_motoristas_nworkblocks(_,_)); true),
	obterMaiorWorkBlockVehicleDuty(ListaOrdenadaHorariosVehicleDuty),
	gerarListaMotoristasNWorkBlocks(ListaOrdenadaHorariosVehicleDuty),
	associarMotoristas1(ListaOrdenadaHorariosVehicleDuty, ListaTuplesOrdenada),
	condensadorMotoristas.
	
% Predicado auxiliar do associarMotoristas.
% Função: Associar Tuples (Drivers) a VehicleDuties, atribuindo-lhes WorkBlocks dos mesmos.
% Observação: Se um Tuple (Driver) não se mostrar capaz de preencher nenhuma lacuna nos WorkBlocks de todos os VehicleDuties, o mesmo é retirado da lista de Tuples. 

associarMotoristas1([],_):-!.
associarMotoristas1(_,[]):-!.
associarMotoristas1(ListaOrdenadaHorariosVehicleDuty, ListaTuplesOrdenada):-
	associarMotoristas2(ListaOrdenadaHorariosVehicleDuty, ListaTuplesOrdenada, ListaTuplesAtribuidos),
	((ListaTuplesAtribuidos = [], nth1(1,ListaTuplesOrdenada,PrimeiroElemento), delete(ListaTuplesOrdenada, PrimeiroElemento, NovaListaTuples));
	subtract(ListaTuplesOrdenada, ListaTuplesAtribuidos, NovaListaTuples)),
	verificarAssociacaoMotoristas(ListaOrdenadaHorariosVehicleDuty,ListaResultado),
	associarMotoristas1(ListaResultado,NovaListaTuples).

% Predicado auxiliar do associarMotoristas1.
% Função: Tentar associar um Tuple (Driver) a um VehicleDuties, atribuindo-lhe WorkBlocks do mesmo. 

associarMotoristas2([],_,[]):-!.
associarMotoristas2([(_,VehicleDuty)|ListaOrdenadaHorariosVehicleDuty], [(_,_,TempoTrabalho,Motorista)| ListaTuplesOrdenada], [(_,_,TempoTrabalho,Motorista)| ListaTuplesAtribuidos]):-
	maiorWorkBlockVehicleDuty(VehicleDuty,DuracaoMaior),
	NumeroWorkBlocks is (TempoTrabalho / DuracaoMaior),
	verificar(VehicleDuty,NumeroWorkBlocks),
	retract(lista_motoristas_nworkblocks_aux(VehicleDuty,ListaMotoristas)),
	asserta(lista_motoristas_nworkblocks_aux(VehicleDuty,[(Motorista,NumeroWorkBlocks)|ListaMotoristas])),
	associarMotoristas2(ListaOrdenadaHorariosVehicleDuty,ListaTuplesOrdenada,ListaTuplesAtribuidos).
associarMotoristas2([(_,_)|ListaOrdenadaHorariosVehicleDuty],ListaTuplesOrdenada,ListaTuplesAtribuidos):-
	associarMotoristas2(ListaOrdenadaHorariosVehicleDuty,ListaTuplesOrdenada,ListaTuplesAtribuidos).

% Predicado auxiliar do associarMotoristas.
% Função: Agregar todos os Workblocks de um determinado Driver numa só posição da lista (2º argumento do facto dinâmico lista_motoristas_nworkblocks/2).

condensadorMotoristas:-
	findall(_,
		(retract(lista_motoristas_nworkblocks_aux(VehicleDuty,ListaWorkBlocks)),
		condensadorMotoristas1(VehicleDuty,ListaWorkBlocks)
	),_).
	
	
% Predicado auxiliar do condensadorMotoristas.
% Função: Fazer a agregação individual de um Driver.

condensadorMotoristas1(_,[]):-!.
condensadorMotoristas1(VehicleDuty,[(Motorista,Numero)|ListaWorkBlocks]):-
	findall((Motorista,Valor),(member((Motorista,Valor),ListaWorkBlocks)),Lista),
	condensadorMotoristas2([(Motorista,Numero)|Lista],Total),
	subtract(ListaWorkBlocks,Lista,NovaLista),
	retract(lista_motoristas_nworkblocks(VehicleDuty,ListaAux)),
	asserta(lista_motoristas_nworkblocks(VehicleDuty,[(Motorista,Total)|ListaAux])),
	condensadorMotoristas1(VehicleDuty,NovaLista).

% Predicado auxiliar do condensadorMotoristas1  que irá calcular o Total de Workblocks de um determinado Driver, naquele VehicleDuty específico.

condensadorMotoristas2([],0):-!.
condensadorMotoristas2([(_,Valor)|Lista],Total):-
	condensadorMotoristas2(Lista,Total1),
	Total is Total1+Valor.

% Predicado auxiliar do associarMotoristas.
% Função: Obter o maior WorkBlock da lista de WorkBlocks de cada VehicleDuty.

obterMaiorWorkBlockVehicleDuty([]):-!.
obterMaiorWorkBlockVehicleDuty([(_,VehicleDuty)| ListaHorariosVehicleDuty]):-
	vehicleduty(VehicleDuty,ListaWorkBlocks),
	obterMaiorWorkBlockVehicleDuty1(ListaWorkBlocks,VehicleDuty,DuracaoMaior),
	asserta(maiorWorkBlockVehicleDuty(VehicleDuty,DuracaoMaior)),
	obterMaiorWorkBlockVehicleDuty(ListaHorariosVehicleDuty).

% Predicado auxiliar do obterMaiorWorkBlockVehicleDuty.
% Função: Obter o maior WorkBlock da lista de WorkBlocks de um VehicleDuty.

obterMaiorWorkBlockVehicleDuty1([],_,0):-!.
obterMaiorWorkBlockVehicleDuty1([WorkBlockId|ListaWorkBlocks],VehicleDuty,DuracaoMaior):-
	workblock(WorkBlockId,_,Inicio,Fim),
	Diferenca is Fim - Inicio,
	obterMaiorWorkBlockVehicleDuty1(ListaWorkBlocks,VehicleDuty,DuracaoMaior1),
	((DuracaoMaior1 < Diferenca,!,DuracaoMaior is Diferenca);DuracaoMaior is DuracaoMaior1).

% Predicado auxiliar do associarMotoristas.
% Função: Inicializar os factos dinâmicos lista_motoristas_nworkblocks_aux/2 e lista_motoristas_nworkblocks/2, agregando uma lista vazia a cada VehicleDuty que posteriormente será preenchida.

gerarListaMotoristasNWorkBlocks([]):-!.
gerarListaMotoristasNWorkBlocks([(_, VehicleDuty)|ListaOrdenadaHorariosVehicleDuty]):-
	asserta(lista_motoristas_nworkblocks_aux(VehicleDuty,[])),
	asserta(lista_motoristas_nworkblocks(VehicleDuty,[])),
	gerarListaMotoristasNWorkBlocks(ListaOrdenadaHorariosVehicleDuty).

% Predicado auxiliar do associarMotoristas2.
% Função: Verifica se o número de WorkBlocks gerado por um Tuple pode ser atribuído a um determinado VehicleDuty.

verificar(VehicleDuty, NumeroWorkBlocks):-
	lista_motoristas_nworkblocks_aux(VehicleDuty,ListaMotoristas),
	contarNumeroWorkBlocksAtribuidos(ListaMotoristas,Total),
	vehicleduty(VehicleDuty,ListaWorkBlocks),
	length(ListaWorkBlocks,TamanhoListaWorkBlocks),
	Soma is NumeroWorkBlocks + Total,
	TamanhoListaWorkBlocks >= Soma.

% Predicado auxiliar do associarMotoristas1.
% Função: Após cada execução do associarMotoristas1, o mesmo verifica quais os VehicleDuties que já têm todos os seus WorkBlocks associados a Drivers.

verificarAssociacaoMotoristas([],[]):-!.
verificarAssociacaoMotoristas([(HorarioInicio,VehicleDuty)|ListaOrdenadaHorariosVehicleDuty],[(HorarioInicio1,VehicleDuty1)|ListaResultado]):-
	lista_motoristas_nworkblocks_aux(VehicleDuty,ListaMotoristas),
	contarNumeroWorkBlocksAtribuidos(ListaMotoristas,Total),
	vehicleduty(VehicleDuty,ListaWorkBlocks),
	length(ListaWorkBlocks,TamanhoListaWorkBlocks),
	Total < TamanhoListaWorkBlocks,
	HorarioInicio1 is HorarioInicio,
	VehicleDuty1 is VehicleDuty,
	verificarAssociacaoMotoristas(ListaOrdenadaHorariosVehicleDuty,ListaResultado).
verificarAssociacaoMotoristas([(_,_)|ListaOrdenadaHorariosVehicleDuty], ListaResultado):-
	verificarAssociacaoMotoristas(ListaOrdenadaHorariosVehicleDuty,ListaResultado).

% Predicado auxiliar do verifica e do verificarAssociacaoMotoristas.
% Função: Calcular o número de WorkBlocks de um VehicleDuty que já têm correspondência a Drivers.

contarNumeroWorkBlocksAtribuidos([],0):-!.
contarNumeroWorkBlocksAtribuidos([(_,NumeroWorkBlocks)|ListaMotoristas],Total):-
	contarNumeroWorkBlocksAtribuidos(ListaMotoristas,Total1),
	Total is Total1 + NumeroWorkBlocks.

% + ------------------------------------------------------------------------------------------------------- +

% Predicado auxiliar do escalonamentoMotoristas.
% Função: Percorrer as entradas do facto dinâmico lista_motoristas_nworkblocks/2 e preencher o facto dinâmico driverduty/2.

gerarDriverDuties:-
	NumeroGeracoes is 5,
	TamanhoPopulacao is 10,
	ProbabilidadeCruzamento is 50,
	ProbabilidadeMutacao is 10,
	(retractall(driverduty(_,_)),!;true),
	findall((VehicleDuty),
		(lista_motoristas_nworkblocks(VehicleDuty,_)
	),ListaVehicleDuties),
	gerarDriverDuties1(NumeroGeracoes,TamanhoPopulacao,ProbabilidadeCruzamento,ProbabilidadeMutacao,ListaVehicleDuties).

% Predicado auxiliar do gerarDriverDuties.
% Função: Chamar o Algoritmo Genético recursivamente para cada entrada do facto vehicleduty e posteriormente ir atualizando as entradas do facto dinâmico driverduty/2.

gerarDriverDuties1(_,_,_,_,[]):-!.
gerarDriverDuties1(NumeroGeracoes,TamanhoPopulacao,ProbabilidadeCruzamento,ProbabilidadeMutacao,[VehicleDuty|ListaVehicleDuties]):-
	geraComParametros(VehicleDuty,NumeroGeracoes,TamanhoPopulacao,ProbabilidadeCruzamento,ProbabilidadeMutacao),
	melhor((Individuo*_)),
	vehicleduty(VehicleDuty,ListaWorkBlocks),
	gerarDriverDuties2(ListaWorkBlocks,Individuo),
	gerarDriverDuties1(NumeroGeracoes,TamanhoPopulacao,ProbabilidadeCruzamento,ProbabilidadeMutacao,ListaVehicleDuties).

% Predicado auxiliar do gerarDriverDuties2.
% Função: Preenche o facto dinâmico driverduty/2 levando em consideração os melhores indivíduos gerados pelo Algoritmo Genético.

gerarDriverDuties2([],_):-!.
gerarDriverDuties2([WorkBlock|ListaWorkBlocks], [Motorista|Individuo]):-
	retract(driverduty(Motorista,Lista)),
	asserta(driverduty(Motorista,([WorkBlock|Lista]))),
	gerarDriverDuties2(ListaWorkBlocks,Individuo),!.
gerarDriverDuties2([WorkBlock|ListaWorkBlocks], [Motorista|Individuo]):-
	Lista = [],
	asserta(driverduty(Motorista,([WorkBlock|Lista]))),
	gerarDriverDuties2(ListaWorkBlocks,Individuo).
	
% + ------------------------------------------------------------------------------------------------------- +