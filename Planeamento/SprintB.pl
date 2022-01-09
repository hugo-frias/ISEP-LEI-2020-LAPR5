:-consult("baseConhecimento.pl").

:-dynamic liga/3.

gera_ligacoes:-
	retractall(liga(_,_,_)),
	findall(_, ((no(_,No1,t,f,_,_);no(_,No1,f,t,_,_)), (no(_,No2,t,f,_,_);no(_,No2,f,t,_,_)), No1\==No2, linha(_,N,LNos,_,_), ordem_membros(No1,No2,LNos), assertz(liga(No1,No2,N)) ),_).

ordem_membros(No1,No2,[No1|L]):-
	member(No2,L),!.
ordem_membros(No1,No2,[_|L]):-
	ordem_membros(No1,No2,L).


:- dynamic melhor_sol_ntrocas/2.

% Slide 15

plan_mud_mot1(Noi,Nof,LCaminho_menostrocas):-
	get_time(Ti),
	(melhor_caminho(Noi,Nof);true),
	retract(melhor_sol_ntrocas(LCaminho_menostrocas,_)),
	get_time(Tf),
	TSol is Tf-Ti,
	write('Tempo de geracao da solucao:'),write(TSol),nl.

melhor_caminho(Noi,Nof):-
	asserta(melhor_sol_ntrocas(_,10000)),
	caminho(Noi,Nof,LCaminho),
	atualiza_melhor(LCaminho),
	fail.

atualiza_melhor(LCaminho):-
	melhor_sol_ntrocas(_,N),
	length(LCaminho,C),
	C<N,retract(melhor_sol_ntrocas(_,_)),
	asserta(melhor_sol_ntrocas(LCaminho,C)).


caminho(Noi,Nof,LCaminho):-
	caminho(Noi,Nof,[],LCaminho).

caminho(No,No,Lusadas,Lfinal):-
	reverse(Lusadas,Lfinal).

caminho(No1,Nof,Lusadas,Lfinal):-
	liga(No1,No2,N),
	\+member((_,_,N),Lusadas),
	\+member((No2,_,_),Lusadas),
	\+member((_,No2,_),Lusadas),
	caminho(No2,Nof,[(No1,No2,N)|Lusadas],Lfinal).


menor_ntrocas(Noi,Nof,LCaminho_menostrocas):-
	findall(LCaminho,caminho(Noi,Nof,LCaminho),LLCaminho),
	menor(LLCaminho,LCaminho_menostrocas).

menor([H],H):-!.
menor([H|T],Hmenor):-
	menor(T,L1),
	length(H,C),
	length(L1,C1),
	((C<C1,!,Hmenor=H);Hmenor=L1).

% Slide 11

plan_mud_mot(Noi,Nof,LCaminho_menostrocas):-
	get_time(Ti),
	findall(LCaminho,caminho(Noi,Nof,LCaminho),LLCaminho),
	menor(LLCaminho,LCaminho_menostrocas),
	get_time(Tf),
	length(LLCaminho,NSol),
	TSol is Tf-Ti,
	write('Numero de Solucoes:'),write(NSol),nl,
	write('Tempo de geracao da solucao:'),write(TSol),nl.


:- dynamic horarioMinimizado/2.

mycompare(<,[A1|_],[A2|_]) :- A1 < A2.
mycompare(>, _, _).

gera_horarios:-
    retractall(horarioMinimizado(_,_)),
    findall(L,horario(L,_),LL),
    sort(LL,LLL),
    !, gera_aux(LLL).

gera_aux([]).
gera_aux([X|LL]):-
    findall(T,horario(X,T),ListaHorariosT),
    predsort(mycompare, ListaHorariosT, ListaOrdenada),
    assertz(horarioMinimizado(X,ListaOrdenada),_),
        !, gera_aux(LL).


% Adaptação do gerador de soluções minimização de horário

:-dynamic ligaAux/2.

gera_ligacoes_horario(Hin,Noi,Nof):-
    retractall(ligaAux(_,_)),
    asserta(ligaAux(0,1000000)),
    findall(_,(linha(_,NL,CL,_,_), ordem_membros(Noi,Nof,CL), nth1(PosNo,CL,Noi), horarioMinimizado(NL,H), verificaHorario(Hin,H,PosNo,Hor), ligaAux(_,Aux), Hor<Aux, retractall(ligaAux(_,_)), asserta(ligaAux(NL,Hor))),_), write('Done').

verificaHorario(_,[],_,1000000).
verificaHorario(Hi,[X|_],PosNo,Hor):-
    nth1(PosNo,X,E),
    E >= Hi,
    Hor is E.
verificaHorario(Hi,[_|H],PosNo,Hor):-
    verificaHorario(Hi,H,PosNo,Hor).

% https://stackoverflow.com/a/16427305
% Forms a sublist between index M and index N, inclusively.

sublist([],0,0,[]).
sublist([A],0,0,[A|_]).
sublist(S,M,N,[_A|B]):-
	M>0,
	M=<N,
	sublist(S,M-1,N-1,B).
sublist(S,M,N,[A|B]):-
	0 is M,
	M=<N,
	N2 is N-1,
	S=[A|D],
	sublist(D,0,N2,B),!.

plan_mud_mot_horarios(Noi,Nof,HorarioInicial,Caminho):-
	get_time(Ti),
	gera_ligacoes_horario(HorarioInicial,Noi,Nof),
	ligaAux(NL,H),
	linha(_,NL,LNos,_,_),
	nth0(PosNoi,LNos,Noi),
	nth0(PosNof,LNos,Nof),
	sublist(Caminho,PosNoi,PosNof,LNos),
	get_time(Tf),
	TSol is Tf-Ti,!,
	write('Tempo de geracao da solucao:'),write(TSol),nl,
	write('Linha:'),write(NL),write('.Posição do Nó Inicial:'),write(PosNoi),write('.Posição do Nó Final:'),write(PosNof),write('.'), nl,
	write('Horário de Entrada no Nó Inicial:'),write(H),write('.'),nl.

% A-Star

:- dynamic mm/2.
:- dynamic nSOl/1.

aStar(Orig,Dest,Cam,HorarioInicial,Custo):-
    asserta(nSol(0)),
    retractall(mm(_,_)),
    asserta(mm(Orig,HorarioInicial)),
    aStar2(Dest,[(_,0,[Orig])],Cam,Custo),!.

aStar2(Dest,[(_,Custo,[Dest|T])|_],Cam,Custo):-
    reverse([Dest|T],Cam),
    nSol(NumeroSolucoes),
    write('Número de Soluções: '),write(NumeroSolucoes),write('.'),
    retractall(mm(_,_)).

aStar2(Dest,[(_,Ca,LA)|Outros],Cam,Custo):-
    write(LA),
    LA=[Act|_],
    mm(Act,HorarioInicial),
    findall((CEX,CaX,[X|LA]),(
    Dest\==Act,
    liga(Act,X,NL),
    linha(_,NL,CaminhoDaLinha,_,_),
    nth1(PosicaoDoAct,CaminhoDaLinha,Act),
    horarioMinimizado(NL,HorariosDaLinha),
    verificaHorario(HorarioInicial,HorariosDaLinha,PosicaoDoAct,HorarioMaisProximo),
    HorarioMaisProximo<100000,
    nth1(PosicaoDoX,CaminhoDaLinha,X),
    verificaHorario(HorarioMaisProximo,HorariosDaLinha,PosicaoDoX,HorarioXPretendido),
    HorarioXPretendido<100000,
    CustoX is HorarioXPretendido - HorarioInicial,
    \+ member(X,LA),
    CaX is CustoX + Ca, estimativa(X, Dest, NL, Estimativa),
    CEX is CaX + Estimativa,
    asserta(mm(X,HorarioXPretendido)),
    retract(nSol(NS)),
    NS1 is NS+1,
    asserta(nSol(NS1))), Novos),
    append(Outros,Novos,Todos),
    write('Novos='),write(Novos),nl,
    sort(Todos,TodosOrd),
    write('TodosOrd='),write(TodosOrd),nl,
    aStar2(Dest,TodosOrd,Cam,Custo).

estimativa(N,N,_,0):-!.
estimativa(NoAtual,NoDestino, NumeroLinha, Estimativa):-
    no(_,NoAtual,_,_,X1,Y1),
    no(_,NoDestino,_,_,X2,Y2),
    DistanciaEstimativa is sqrt((X1-X2)^2 + (Y1-Y2)^2),
    linha(_,NumeroLinha,_,TempoLinha,DistanciaLinha),
	TempoLinhaSegundos is TempoLinha*60,
    VelocidadeMedia is DistanciaLinha/TempoLinhaSegundos,
    Estimativa is DistanciaEstimativa/VelocidadeMedia.
	
plan_mud_mot_astar(Noi,Nof,HorarioInicial,Caminho):-
	get_time(Ti),
	aStar(Noi, Nof, Caminho, HorarioInicial, Custo),
	get_time(Tf),
	TSol is Tf-Ti,!,
	write('Tempo de geracao da solucao:'),write(TSol),nl,
	write('Custo: '),write(Custo),nl.
	
% Best First Search (BestFS)


bestfs(Orig,Dest,Cam,HorarioInicial,Custo):-
    asserta(nSol(0)),
    retractall(mm(_,_)),
    asserta(mm(Orig,HorarioInicial)),
    bestfs2(Dest,(0,[Orig]),Cam,Custo),!.

bestfs2(Dest,(Custo,[Dest|T]),Cam,Custo):-
	!, reverse([Dest|T],Cam),
	nSol(NumeroSolucoes),
	write('Número de Soluções: '),write(NumeroSolucoes),write('.'),
	retractall(mm(_,_)).

bestfs2(Dest,(Ca,LA),Cam,Custo):-
    LA=[Act|_],
    mm(Act,HorarioInicial),
    findall((EstX,CaX,[X|LA]),(
    liga(Act,X,NL),
    linha(_,NL,CaminhoDaLinha,_,_),
    nth1(PosicaoDoAct,CaminhoDaLinha,Act),
    horarioMinimizado(NL,HorariosDaLinha),
    verificaHorario(HorarioInicial,HorariosDaLinha,PosicaoDoAct,HorarioMaisProximo),
    HorarioMaisProximo<100000,
    nth1(PosicaoDoX,CaminhoDaLinha,X),
    verificaHorario(HorarioMaisProximo,HorariosDaLinha,PosicaoDoX,HorarioXPretendido),
    HorarioXPretendido<100000,
    CustoX is HorarioXPretendido - HorarioInicial,
    \+member(X,LA),
    estimativa(X,Dest,NL,EstX),
    CaX is Ca+CustoX,
    asserta(mm(X,HorarioXPretendido)),
    retract(nSol(NS)),
    NS1 is NS+1,
    asserta(nSol(NS1)))
    ,Novos),
    sort(Novos,NovosOrd),
    NovosOrd = [(_,CM,Melhor)|_],
    bestfs2(Dest,(CM,Melhor),Cam,Custo).
	
plan_mud_mot_bestfs(Noi,Nof,HorarioInicial,Caminho):-
	get_time(Ti),
	bestfs(Noi, Nof, Caminho, HorarioInicial, Custo),
	get_time(Tf),
	TSol is Tf-Ti,!,
	write('Tempo de geracao da solucao:'),write(TSol),nl,
	write('Custo: '),write(Custo),nl.