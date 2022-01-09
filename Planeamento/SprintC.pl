% + ------------------------------------------------------------------------------------------------------- +

:-consult("baseConhecimento.pl").
:-consult("SprintB.pl").

% + ------------------------------------------------------------------------------------------------------- +

:-dynamic listaAux/1.
:-dynamic listaAuxiliar2/1.
:-dynamic numeroMaximoWorkblocks/2.
:-dynamic numeroExistenteWorkblocks/2.
:-dynamic tarefas/1.
:-dynamic horarioMotorista/1.
:-dynamic listaPenalizacao/1.
:-dynamic horarioMotoristaPenalizado/1.

% + ------------------------------------------------------------------------------------------------------- +

% Conta o número de ocorrência de um elemento numa Lista

count(L, E, N) :-
    include(=(E), L, L2), length(L2, N).

% + ------------------------------------------------------------------------------------------------------- + 

% Parametrização.

% Vehicle Duty
% Geracoes.
% Populacao.
% Prob_Cruzamento.
% Prob_Mutacao.

%vd(12).
%geracoes(5).
%populacao(5).
%prob_cruzamento(0.5).
%prob_mutacao(0.25).
%tarefas(13).

inicializa:-
	 write('Vehicle Duty: ' ),read(VD),
	(retract(vd(_));true), asserta(vd(VD)),
	write('Numero de novas Geracoes: '),read(NG),
	(retract(geracoes(_));true), asserta(geracoes(NG)),
	write('Dimensao da Populacao: '),read(DP),
	(retract(populacao(_));true), asserta(populacao(DP)),
	write('Probabilidade de Cruzamento (%):'), read(P1),
	PC is P1/100,
	(retract(prob_cruzamento(_));true),	asserta(prob_cruzamento(PC)),
	write('Probabilidade de Mutacao (%):'), read(P2),
	PM is P2/100,
	(retract(prob_mutacao(_));true), asserta(prob_mutacao(PM)).

% + ------------------------------------------------------------------------------------------------------- + 

% Predicado Inicial

gera:-
	% inicializa,
	gera_populacao(Pop),
    guardaReal(Pop),
    horarioMotoristaPenalizado(M),
	ordena_populacao(M,PopOrd),
	geracoes(NG),
	gera_geracao(0,NG,PopOrd).

% Predicado Inicial para SPA

geraComParametros(VD,NG,PS,CP,MP):-
	(retract(vd(_)),!;true), asserta(vd(VD)),
	(retract(geracoes(_)),!;true), asserta(geracoes(NG)),
	(retract(populacao(_)),!;true), asserta(populacao(PS)),
	PC is CP/100,
	(retract(prob_cruzamento(_)),!;true),	asserta(prob_cruzamento(PC)),
	PM is MP/100,
	(retract(prob_mutacao(_)),!;true), asserta(prob_mutacao(PM)),
	gera_populacao(Pop),
	guardaReal(Pop),
	horarioMotoristaPenalizado(M),
	ordena_populacao(M,PopOrd),
	gera_geracao(0,NG,PopOrd).

gera_populacao(Pop):-
    retractall(numeroMaximoWorkblocks(_,_)),
	populacao(TamPop),
	vd(EsteVehicleDuty), vehicleduty(EsteVehicleDuty,ListaDesteVehicleDuty),
	length(ListaDesteVehicleDuty,TamanhoDaLista),
	(retract(tarefas(_)),!;true), asserta(tarefas(TamanhoDaLista)),
	lista_motoristas_nworkblocks(EsteVehicleDuty,ListaDeWorkblocks),
	retractall(listaMotoristas(_)), asserta(listaMotoristas([])),
	geraListaDeMotoristas(ListaDeWorkblocks),
	geraX, listaAuxiliar2(Ind0),
	gera_populacao(TamPop,Ind0,TamanhoDaLista,Pop).

gera_populacao(0,_,_,[]):-!.
gera_populacao(TamPop,ListaTarefas,NumT,[Ind|Resto]):-
	TamPop1 is TamPop-1,
	gera_populacao(TamPop1,ListaTarefas,NumT,Resto),
	gera_individuo(ListaTarefas,NumT,Ind),
	not(member(Ind,Resto)),!.
gera_populacao(TamPop,ListaTarefas,NumT,L):-
	gera_populacao(TamPop,ListaTarefas,NumT,L).

% + ------------------------------------------------------------------------------------------------------- +

% Preenche os factos dinâmicos numeroMaximoWorkblocks e listaMotoristas
% Chamado logo no começo da execucao do AG

geraListaDeMotoristas([]):-!.
geraListaDeMotoristas([(M,W)|ListaDeWorkblocks]):-
        (retract(listaMotoristas(LM));true),!,
	asserta(listaMotoristas([M|LM])),
	asserta(numeroMaximoWorkblocks(M,W)),
	geraListaDeMotoristas(ListaDeWorkblocks).

% Cria uma lista de qualquer tamanho selecionando elementos
% randomicamente de uma lista

auxiliarDeMotoristas(Lista, NumeroMaximo):-
	(retract(listaMotoristasAux(_)); true),
	random_permutation(Lista,AuxiliarLista),
	!,nth1(1,AuxiliarLista,Elemento),
	asserta(listaMotoristasAux([Elemento|[]])),
	auxiliarDeMotoristas1(Lista,NumeroMaximo,1).
auxiliarDeMotoristas1(_,N,N):-!.
auxiliarDeMotoristas1(Lista,NumeroMaximo,NumeroAtual):-
	random_permutation(Lista,AuxiliarLista),
	!,nth1(1,AuxiliarLista,Elemento),
	retract(listaMotoristasAux(ElementoAnterior)),
	asserta(listaMotoristasAux([Elemento|ElementoAnterior])),
	NumeroAtual1 is NumeroAtual+1,
	auxiliarDeMotoristas1(Lista,NumeroMaximo,NumeroAtual1).

% + ------------------------------------------------------------------------------------------------------- +

% Gera um individuo para a primeira geracao
% Garante que tenha todos os genes na quantidade máxima permitida

geraX:-
        findall((Motorista,NumeroMaximoDoMotorista),numeroMaximoWorkblocks(Motorista,NumeroMaximoDoMotorista),T),
        (retractall(listaAuxiliar2(_)),!; true),
        asserta(listaAuxiliar2([])),
        geraX1(T).

geraX1([]):-!.
geraX1([(Motorista,NumeroMaximoWorkblocks)|RestoDaLista]):-
        adicionaMotorista(Motorista,NumeroMaximoWorkblocks),
        geraX1(RestoDaLista).

adicionaMotorista(_,0):-!.
adicionaMotorista(Motorista,NumeroWorkblocks):-
        retract(listaAuxiliar2(L)),
        asserta(listaAuxiliar2(([Motorista|L]))),
        NumeroWorkblocks1 is (NumeroWorkblocks - 1),
        adicionaMotorista(Motorista,NumeroWorkblocks1).

% + ------------------------------------------------------------------------------------------------------- +

% Gera um individuo
% Gera uma lista aleat�ria considerando os genes conhecidos e o tamanho da cadeia de DNA do ind�viduo.

gera_individuo([G],1,[G]):-!.
gera_individuo(ListaTarefas,NumT,[G|Resto]):-
	NumTemp is NumT + 1, % To use with random
	random(1,NumTemp,N),
	retira(N,ListaTarefas,G,NovaLista),
	NumT1 is NumT-1,
	gera_individuo(NovaLista,NumT1,Resto).

retira(1,[G|Resto],G,Resto).
retira(N,[G1|Resto],G,[G1|Resto1]):-
	N1 is N-1,
	retira(N1,Resto,G,Resto1).


ordena_populacao(PopAv,PopAvOrd):-
	bsort(PopAv,PopAvOrd).

bsort([X],[X]):-!.
bsort([X|Xs],Ys):-
	bsort(Xs,Zs),
	btroca([X|Zs],Ys).
btroca([X],[X]):-!.
btroca([X*VX,Y*VY|L1],[Y*VY|L2]):-
	VX>VY,!,
	btroca([X*VX|L1],L2).
btroca([X|L1],[X|L2]):-btroca(L1,L2).

% O que realmente importa

gera_geracao(G,G,Pop):-!,
        % write('Gera��o '), write(G), write(':'), nl, write(Pop), nl,
        melhor_individuo(Pop).
gera_geracao(N,G,Pop):-
	% write('Gera��o '), write(N), write(':'), nl, write(Pop), nl,
	%(retract(p(_));true), asserta(p(N)),
	random_permutation(Pop,PopulacaoPermutada),
	cruzamento(PopulacaoPermutada,NPop1),
	mutacao(NPop1,NPop),
	% avalia_populacao(NPop1,NPopAv),
	guardaReal(NPop),
	horarioMotoristaPenalizado(M),
	ordena_populacao(M,PopOrd),
	N1 is N+1,
	append(Pop,PopOrd,ListaDaGeracaoAnteriorComANova),
	length(ListaDaGeracaoAnteriorComANova,TamanhoETal),
	QuantidadeDeMelhoresIndividuos is TamanhoETal/2,
	junta_geracoes(ListaDaGeracaoAnteriorComANova,ListaOrdenadaCrescentemente,QuantidadeDeMelhoresIndividuos),
	append(ListaOrdenadaCrescentemente,ListaDaGeracaoAnteriorComANova,AuxProximaGeracao),
	sort(AuxProximaGeracao,AuxProximaGeracaoSemRepetidos),
	ordena_populacao(AuxProximaGeracaoSemRepetidos,ProximaGeracaoSemRepetidos),
	ProximaGeracaoSemRepetidos \== Pop,
	(retract(p(_)),!;true), asserta(p(G)),
	gera_geracao(N1,G,ProximaGeracaoSemRepetidos).

melhor_individuo([X|_]):- %nl, write('Melhor Solucao:'), write(X), nl,
 (retract(melhor(_)),!;true), asserta(melhor(X)), !.

junta_geracoes(AmbasAsPopulacoes,SubListaSemHs,NumeroElementos):-
       ordena_populacao(AmbasAsPopulacoes,AmbasAsPopulacoesOrdemCrescente),
       sublista(AmbasAsPopulacoesOrdemCrescente,1,NumeroElementos,SubListaFormada),
       delete(SubListaFormada,h,SubListaSemHs).

% + ------------------------------------------------------------------------------------------------------- +

gerar_pontos_cruzamento(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).
gerar_pontos_cruzamento1(P1,P2):-
	tarefas(N),
	NTemp is N+1,
	random(1,NTemp,P11),
	random(1,NTemp,P21),
	P11\==P21,!,
	((P11<P21,!,P1=P11,P2=P21);P1=P21,P2=P11).
gerar_pontos_cruzamento1(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).

% + ------------------------------------------------------------------------------------------------------- +

% Pega numa população e cruza os individuos dessa mesma população

cruzamento([],[]).
cruzamento([Ind*_],[Ind]).
cruzamento([Ind1*_,Ind2*_|Resto],[NInd1,NInd2|Resto1]):-
	gerar_pontos_cruzamento(P1,P2),
	prob_cruzamento(Pcruz),	random(0.0,1.0,Pc),
	((
	Pc =< Pcruz,!,
        cruzar(Ind1,Ind2,P1,P2,NInd1),
	cruzar(Ind2,Ind1,P1,P2,NInd2))
	;
	(NInd1=Ind1,NInd2=Ind2
        )),
	cruzamento(Resto,Resto1).

preencheh([],[]).
preencheh([_|R1],[h|R2]):-
	preencheh(R1,R2).

% + ------------------------------------------------------------------------------------------------------- +

sublista(L1,I1,I2,L):-
	I1 < I2,!,
	sublista1(L1,I1,I2,L).

sublista(L1,I1,I2,L):-
	sublista1(L1,I2,I1,L).

sublista1([X|R1],1,1,[X|H]):-!,
	preencheh(R1,H).

sublista1([X|R1],1,N2,[X|R2]):-!,
	N3 is N2 - 1,
	sublista1(R1,1,N3,R2).

sublista1([_|R1],N1,N2,[h|R2]):-
	N3 is N1 - 1,
	N4 is N2 - 1,
	sublista1(R1,N3,N4,R2).

% + ------------------------------------------------------------------------------------------------------- +

rotate_right(L,K,L1):-
	tarefas(N),
	T is N - K,
	rr(T,L,L1).

rr(0,L,L):-!.

rr(N,[X|R],R2):-
	N1 is N - 1,
	append(R,[X],R1),
	rr(N1,R1,R2).

% + ------------------------------------------------------------------------------------------------------- +

insere([],L,_,_,L):-!.
insere(_,L,N,N,L):-!.
insere([X|R], L, N, M, L2):-
        numeroMaximoWorkblocks(X,NumeroMaximoX),
	numeroExistenteWorkblocks(X,NumeroExistenteX),
        NumeroExistenteX1 is NumeroExistenteX + 1,
	NumeroMaximoX >= NumeroExistenteX1,
	insere1(X,N,L,L1),
        retract(numeroExistenteWorkblocks(X,NumeroExistenteX)),
	asserta(numeroExistenteWorkblocks(X,NumeroExistenteX1)),!,
        M1 is M-1,
        insere(R,L1,N,M1,L2).
insere([_|R], L, N, M, L2):-
        insere(R,L,N,M,L2).

% + ------------------------------------------------------------------------------------------------------- +

% Predicado Auxiliar que Insere um Elemento numa dada posi��o da Lista

insere1(X,1,L,[X|L]):-!.
insere1(X,N,[Y|L],[Y|L1]):-
	N1 is N-1,
	insere1(X,N1,L,L1).

% + ------------------------------------------------------------------------------------------------------- +

% Cruza 2 individuos

cruzar(Individuo1,Individuo2,P1,P2,NInd11):-
	sublista(Individuo1,P1,P2,Sub1),
	tarefas(NumT),
	R is NumT-P2,
	rotate_right(Individuo2,R,Sub2),
        validaAEntradaDeMotoristas(Sub1),
        delete(Sub1,h,Sub11),
        P3 is P2-P1+1,
	insere(Sub2,Sub11,P3,NumT,NInd10),
        cruzarValidador(NInd10,NumT),
        individuo(NInd11).

% + ------------------------------------------------------------------------------------------------------- +

% Predicado auxiliar do cruzar que trabalha a poss�vel lista gerada

cruzarValidador(Lista,NumeroMaximo):-
		 length(Lista,TamanhoDaLista),
		 TamanhoDaLista < NumeroMaximo,
		 findall((NumeroCorrespondenteAux,Motorista),
                 (numeroExistenteWorkblocks(Motorista,NumeroCorrespondente),
                 numeroMaximoWorkblocks(Motorista, NumeroMaximoCorrespondente),
                 NumeroMaximoCorrespondente > NumeroCorrespondente,
                 NumeroCorrespondenteAux is NumeroMaximoCorrespondente - NumeroCorrespondente),
                 ListaAcumuladora),
                 !, sort(ListaAcumuladora, ListaOrdenada),
		 appendAux(ListaOrdenada,Lista,TamanhoDaLista,NumeroMaximo).
cruzarValidador(L,_):- retractall(individuo(_)), random_permutation(L,LL), asserta(individuo(LL)).

appendAux([],R,_,_):-!,retractall(individuo(_)), random_permutation(R,RR),asserta(individuo(RR)).
appendAux(_,R,N,N):-!,retractall(individuo(_)), random_permutation(R,RR), asserta(individuo(RR)).
appendAux([(N,Motorista)|RestoListaOrdenada],Lista,NumeroAtual,NumeroMaximo):-
		findall(Motorista, between(1,N,_), ListaResultadoAuxiliar),
                append(Lista,ListaResultadoAuxiliar,ListaResultado),
		NumeroAtual1 is NumeroAtual + N,
		appendAux(RestoListaOrdenada,ListaResultado,NumeroAtual1,NumeroMaximo).
appendAux(_,_,_,_).

% + ------------------------------------------------------------------------------------------------------- +

% Predicado auxiliar do cruzar usado aquando do Cruzamento.

validaAEntradaDeMotoristas(Lista):-
	(retractall(numeroExistenteWorkblocks(_,_));true),
	listaMotoristas(ListaDeMotoristas),
	validaAEntradaDeMotoristas1(Lista,ListaDeMotoristas),!.

validaAEntradaDeMotoristas1(_,[]):-!.
validaAEntradaDeMotoristas1(Lista,[Motorista|Resto]):-
	count(Lista,Motorista,NumeroExistente),
	asserta(numeroExistenteWorkblocks(Motorista,NumeroExistente)),
	validaAEntradaDeMotoristas1(Lista,Resto).

% + ------------------------------------------------------------------------------------------------------- +

% Criação de Agendas de Horários bem como cálculo a respeito das Hard Constraints.

guardaReal(L):-
        guardaReal(L,[]),!,true.

guardaReal([],L):-reverse(L,LL), (retractall(horarioMotoristaPenalizado(_));true), asserta(horarioMotoristaPenalizado(LL)).
guardaReal([Ind|Populacao],PopulacaoResultado):-
        guardaDigital(Ind),
		penalizacoes(IndPenalizado),
		somaPenalizacoes(IndPenalizado, Soma),
        guardaReal(Populacao,[Ind*Soma|PopulacaoResultado]).

% + ------------------------------------------------------------------------------------------------------- +

somaPenalizacoes([],0):-!.
somaPenalizacoes([(Valor,_)|Lista],Soma):-
	somaPenalizacoes(Lista,Soma1),
	Soma is Soma1+Valor.

% + ------------------------------------------------------------------------------------------------------- +

% Criação de Agendas de Horários.

guardaDigital(Lista):-
	% Limpamos a pr�via base de conhecimento, caso exista.
	(retractall(horarioMotorista(_));true),
	% Recolhemos a lista de Workblocks do Vehicle Duty correspondente.
	vd(VehicleDutyCorrespondente),vehicleduty(VehicleDutyCorrespondente,ListaWorkblocks),
	% Chamamos o m�todo de real an�lise com as duas listas.
	asserta(horarioMotorista([])),
	guardaDigital2(Lista,ListaWorkblocks),!,
	condensadorDigital.

guardaDigital2([],_):-!.
guardaDigital2(_,[]):-!.
guardaDigital2([X|Lista],[Y|ListaWorkblocks]):-
	% Recolhemos o Workblock correspondente
	workblock(Y,_,LimiteInferior,LimiteSuperior),
	retract(horarioMotorista(ListaAnterior)),
	asserta(horarioMotorista([(LimiteInferior,LimiteSuperior,X)|ListaAnterior])),
	% Chamamos novamente o m�todo de modo a percorrermos toda a lista
	guardaDigital2(Lista,ListaWorkblocks),!.

condensadorDigital:-
	% Recolhemos a lista previamente populada
        retract(horarioMotorista(Lista)),
	% Ordenamos a mesma, dando prioridade ao LimiteInferior de cada Workblock
	sort(Lista,ListaOrdenada),
	% Chamamos o predicado auxiliar que ir� condensar tripletos consecutivos
	condensadorDigitalE(ListaOrdenada).

elimina([],_,[]):-!.
elimina([X|R1],L,[X|R2]):-
	not(member(X,L)),!,
	elimina(R1,L,R2).
elimina([_|R1],L,R2):-
	elimina(R1,L,R2).

condensadorDigitalE(Lista):-
   (retractall(horarioMotorista(_));true),
   (retractall(listaAux(_));true),
   asserta(listaAux([])),
   asserta(horarioMotorista([])),
   condensadorDigital1(Lista).

condensadorDigital1([]):-!.
condensadorDigital1([(LimiteInferior,LimiteSuperior,Elemento)|Lista]):-
   condensadorDigital2((LimiteInferior,LimiteSuperior,Elemento),Lista),
   retract(listaAux(X)),
   elimina(Lista,X,ListaX),
   asserta(listaAux([])),
   condensadorDigital1(ListaX).

condensadorDigital2(L,[]):-
   retract(horarioMotorista(LL)),
   asserta(horarioMotorista(([L|LL]))).
condensadorDigital2((LimiteInferior,LimiteSuperior,Elemento),[(LimiteInferior1,LimiteSuperior1,Elemento1)|Lista]):-
   (Elemento == Elemento1, LimiteSuperior ==  LimiteInferior1),
   retract(listaAux(ListaAnterior)),
   asserta(listaAux(([(LimiteInferior1,LimiteSuperior1,Elemento1)|ListaAnterior]))),
   condensadorDigital2((LimiteInferior,LimiteSuperior1,Elemento),Lista).
condensadorDigital2((LimiteInferior,LimiteSuperior,Elemento),[_|Lista]):-
   condensadorDigital2((LimiteInferior,LimiteSuperior,Elemento),Lista).

% + ------------------------------------------------------------------------------------------------------- +

% CONSTRAINTS APLICADAS AOS INDIVIDUOS

penalizacoes(ListaX):-
        horarioMotorista(M),
        (retractall(listaAux(_));true),
        asserta(listaAux([])),
        (retractall(listaPenalizacao(_));true),
        asserta(listaPenalizacao([])),
        penaliza4Horas(M,ListaResultado),
        penalizaIntervalos(M,ListaResultado1),
        append(ListaResultado,ListaResultado1,ListaResultado2),sort(ListaResultado2,ListaResultado3),
        % As penaliza��es devem ser representadas para cada indiv�duo e n�o para cada motorista (gene)
        concatPenalizacoes(ListaResultado3,ListaX).

concatPenalizacoes([],[]):-!.
concatPenalizacoes([(Custo,Motorista)|Lista],[Y|ListaResultado]):-
       member((_,Motorista),Lista),
       concatPenalizacoes2((Custo,Motorista),Lista),
       retract(listaAux(Y)),
       retract(listaPenalizacao(L)),
       asserta(listaAux([])),
       asserta(listaPenalizacao([])),
       elimina(Lista,L,ListaL),
       concatPenalizacoes(ListaL,ListaResultado).
concatPenalizacoes([(Custo,Motorista)|Lista],[(Custo,Motorista)|ListaResultado]):-
       concatPenalizacoes(Lista,ListaResultado).

concatPenalizacoes2(_,[]):-!.
concatPenalizacoes2((Custo,Motorista),[(Custo1,Motorista)|Lista]):-
      CustoX is Custo+Custo1,
      retract(listaAux(_)),
      retract(listaPenalizacao(ListaPenalizacoes)),
      asserta(listaPenalizacao(([(Custo1,Motorista)|ListaPenalizacoes]))),
      asserta(listaAux((CustoX,Motorista))),
      concatPenalizacoes2((CustoX,Motorista),Lista).
concatPenalizacoes2((Custo,Motorista),[_|Lista]):-
      concatPenalizacoes2((Custo,Motorista),Lista).

% Penalizamos fortemente um motorista que trabalhe mais que 14400 segundos (4 horas) de forma consecutiva.

penaliza4Horas([],[]):-!.
penaliza4Horas([(LimiteInferior,LimiteSuperior,Motorista)|Lista],[(Valor,Motorista)|ListaResultado]):-
    TempoTrabalho is LimiteSuperior - LimiteInferior,
    (TempoTrabalho > 14440),Valor is (TempoTrabalho - 14440)*10,
    penaliza4Horas(Lista,ListaResultado).
penaliza4Horas([(_,_,Motorista)|Lista],[(0,Motorista)|ListaResultado]):-
         penaliza4Horas(Lista,ListaResultado).

% Penalizamos fortemente um motorista que n�o realize uma pausa de, pelo menos, 3600 segundos (1 hora) após um bloco de 14400 segundos (4 horas) de trabalho.

penalizaIntervalos([X|Lista],ListaResultado):-
        penalizaIntervalos1(X,Lista,ListaResultado).
penalizaIntervalos1(_,[],[]):-!.
penalizaIntervalos1((LimiteInferior,LimiteSuperior,Motorista),[(LimiteInferior1,LimiteSuperior1,Motorista1)|Lista],[(Valor,Motorista)|ListaResultado]):-
    (Motorista == Motorista1),
    Tempo is LimiteSuperior - LimiteInferior,
    Intervalo is LimiteInferior1 - LimiteSuperior,
    (Tempo>= 14440, Intervalo<3600),
    Valor is (Intervalo*8),
    penalizaIntervalos1((LimiteInferior1,LimiteSuperior1,Motorista1),Lista,ListaResultado).
penalizaIntervalos1((_,_,Motorista),[(LimiteInferior1,LimiteSuperior1,Motorista1)|Lista],[(0,Motorista)|ListaResultado]):-
    penalizaIntervalos1((LimiteInferior1,LimiteSuperior1,Motorista1),Lista,ListaResultado).


% + ------------------------------------------------------------------------------------------------------- +

% Mutação.

mutacao([],[]).
mutacao([Ind|Rest],[NInd|Rest1]):-
	prob_mutacao(Pmut),
	random(0.0,1.0,Pm),
	((Pm < Pmut,!,mutacao1(Ind,NInd));NInd = Ind),
	mutacao(Rest,Rest1).

mutacao1(Ind,NInd):-
	gerar_pontos_cruzamento(P1,P2),
	mutacao22(Ind,P1,P2,NInd).

mutacao22([G1|Ind],1,P2,[G2|NInd]):-
	!, P21 is P2-1,
	mutacao23(G1,P21,Ind,G2,NInd).
mutacao22([G|Ind],P1,P2,[G|NInd]):-
	P11 is P1-1, P21 is P2-1,
	mutacao22(Ind,P11,P21,NInd).

mutacao23(G1,1,[G2|Ind],G2,[G1|Ind]):-!.
mutacao23(G1,P,[G|Ind],G2,[G|NInd]):-
	P1 is P-1,
	mutacao23(G1,P1,Ind,G2,NInd).
	
% + ------------------------------------------------------------------------------------------------------- +