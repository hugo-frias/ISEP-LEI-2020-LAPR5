:-consult("baseConhecimento.pl").
:-consult("SprintC.pl").
:-consult("SprintD.pl").

:- use_module(library(http/http_cors)).
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_client)).

:- use_module(library(http/http_json)).
:- use_module(library(http/http_open)).
:- use_module(library(http/json)).
:- use_module(library(http/json_convert)).

porta(80).

jsonType("Content-type: application/json~n~n").

%Cors
:- set_setting(http:cors, [*]).

% HTTP Server

:- use_module(library(http/http_server)).

:- initialization
    (retract(cors_configuration(_));true), asserta(cors_configuration(12)),
	porta(P),
	http_server([port(P)]).

stop:-
	porta(P),
	http_stop_server(P,_).

server:-
	(retract(cors_configuration(_));true), asserta(cors_configuration(12)),
	porta(Port),
	http_server(http_dispatch, [port(Port)]).


:- http_handler(root(.),
                http_redirect(moved, location_by_id(server_answer)),
                []).

:- http_handler(root(home), server_answer, []).
:- http_handler('/trips', server_answer_trips, []).
:- http_handler('/api/ag', trip, []).
:- http_handler('/api/dd', driverduty, []).


trip(Request):-
	cors_enable(Request, [methods([get])]),
	http_parameters(Request, [vehicleDuty(VD,[integer]), numberGenerations(NG,[integer]), populationSize(PS,[integer]), crossingProbability(CP,[integer]), mutationProbability(MP,[integer])]),
	geraComParametros(VD,NG,PS,CP,MP),
	melhor((X*L)),
	Res=json([penalty=L,solution=X]),
	reply_json(Res).

driverduty(Request):-
	cors_enable(Request, [methods([get])]),
	escalonamentoMotoristas,
	showResult(Lista),
	reply_json(Lista).

showResult(Lista):-
	findall(Res,(driverduty(DriverID,WorkBlocks), Res = json([driver=DriverID,workBlocksList=WorkBlocks])),Lista).

server_answer(_Request) :-
    Term = json([content = 'Teste', subject = 'LAPR5', isWorking = 'Yes, sir.']),
    reply_json_dict(Term).

server_answer_trips(_Request) :-
    Term = json([content = 'Trips', subject = 'ARQSI', isWorking = 'Yes, sir.']),
    reply_json_dict(Term).

% HTTP Post

http_post(IP,Information):-
    Term = json([content = Information]),
    write(Term),nl,
    http_post(IP, json(Term) , Reply, [json_object(dict)]),
    write(Reply),nl,
    write('Source:'), write(Reply.source), nl,
    write('Destination:'), write(Reply.destination), nl.

% HTTP Get

http_get(IP, Data):-
    http_get(IP,Data,[json_object(dict)]),
    nl,show_records(Data),nl.

% Print records of data

show_records([]).
show_records([A|B]) :-
  nl,write(A),nl,
  show_records(B).