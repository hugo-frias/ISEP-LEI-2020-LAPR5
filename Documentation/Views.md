## Contents
- [Views](#views)
	- [Introduction](#introduction)
	- [Nível 1](#nível-1)
		- [Vista Lógica](#vista-lógica)
		- [Vista de Processos](#vista-de-processos)
			- [SSD US2](#ssd-us1)
			- [SSD US13](#ssd-us13)
			- [SSD US19](#ssd-us19)
	- [Nível 2](#nível-2)
		- [Vista Lógica](#vista-lógica-1)
		- [Vista de Processos](#vista-de-processos-1)
			- [SSD US2](#sd-us2)
			- [SSD US13](#sd-us13)
			- [SSD US19](#sd-us19)
		- [Vista de Implementação](#vista-de-implementação)
		- [Vista Física](#vista-física)
	- [Nível 3 (MDR)](#nível-3-mdr)
		- [Vista Lógica](#vista-lógica-2)
		- [Vista de Processos](#vista-de-processos-2)
			- [SD US01](#sd-us01)
			- [(outros SSD arquiteturalmente relevantes)](#outros-ssd-arquiteturalmente-relevantes-2)
		- [Vista de Implementação](#vista-de-implementação-1)
		- [Vista Física](#vista-física-1)
	- [Nível 3 (UI)](#nível-3-ui)
		- [Vista Lógica](#vista-lógica-3)
		- [Vista de Processos](#vista-de-processos-3)
		- [Vista de Implementação](#vista-de-implementação-2)
		- [Vista Física](#vista-física-2)
	- [Nível 3 (MDV)](#nível-3-mdv)
		- [Vista Lógica](#vista-lógica-4)
		- [Vista de Processos](#vista-de-processos-4)
		- [Vista de Implementação](#vista-de-implementação-3)
		- [Vista Física](#vista-física-3)


# Views

## Introduction
Será adotada a combinação de dois modelos de representação arquitetural: C4 e 4+1.

O Modelo de Vistas 4+1 [[Krutchen-1995]](References.md#Kruchten-1995) propõe a descrição do sistema através de vistas complementares permitindo assim analisar separadamente os requisitos dos vários stakeholders do software, tais como utilizadores, administradores de sistemas, project managers, arquitetos e programadores. As vistas são deste modo definidas da seguinte forma:

- Vista lógica: relativa aos aspetos do software visando responder aos desafios do negócio;
- Vista de processos: relativa ao fluxo de processos ou interações no sistema;
- Vista de desenvolvimento: relativa à organização do software no seu ambiente de desenvolvimento;
- Vista física: relativa ao mapeamento dos vários componentes do software em hardware, i.e. onde é executado o software;
- Vista de cenários: relativa à associação de processos de negócio com atores capazes de os espoletar.

O Modelo C4 [[Brown-2020]](References.md#Brown-2020)[[C4-2020]](References.md#C4-2020) defende a descrição do software através de quatro níveis de abstração: sistema, contentor, componente e código. Cada nível adota uma granularidade mais fina que o nível que o antecede, dando assim acesso a mais detalhe de uma parte mais pequena do sistema. Estes níveis podem ser equiparáveis a mapas, e.g. a vista de sistema corresponde ao globo, a vista de contentor corresponde ao mapa de cada continente, a vista de componentes ao mapa de cada país e a vista de código ao mapa de estradas e bairros de cada cidade.
Diferentes níveis permitem contar histórias diferentes a audiências distintas.

Os níveis encontram-se definidos da seguinte forma:
- Nível 1: Descrição (enquadramento) do sistema como um todo;
- Nível 2: Descrição de contentores do sistema;
- Nível 3: Descrição de componentes dos contentores;
- Nível 4: Descrição do código ou partes mais pequenas dos componentes (e como tal, não será abordado neste DAS/SAD).

Pode-se dizer que estes dois modelos se expandem ao longo de eixos distintos, sendo que o Modelo C4 apresenta o sistema com diferentes níveis de detalhe e o Modelo de Vista 4+1 apresenta o sistema de diferentes perspetivas. Ao combinar os dois modelos torna-se possível representar o sistema de diversas perspetivas, cada uma com vários níveis de detalhe.

Para modelar/representar visualmente, tanto o que foi implementado como as ideias e alternativas consideradas, recorre-se à Unified Modeling Language (UML) [[UML-2020]](References.md#UML-2020) [[UMLDiagrams-2020]](References.md#UMLDiagrams-2020).

## Nível 1
### Vista Lógica

![N1-VL](diagramas/nivel1/N1-VL.png)

### Vista de Processos
#### SSD US2
![N1-VP-US2](diagramas/nivel1/N1-VP-US2.png)

#### SSD US13
![N1-VP-US13](diagramas/nivel2/N2-VP-US13.svg)

#### SSD US19
![N1-VP-US19](diagramas/nivel2/N2-VP-US19.svg)

Para além destes 3 existem mais exemplos que não colocamos neste documento para não ser muito extenso, sendo possível aceder aos restantes.

## Nível 2
### Vista Lógica

![N2-VL](diagramas/nivel2/N2-VL.png)

### Vista de Processos

#### SSD US2
![N2-VP-US2](diagramas/nivel2/N2-VP-US2.png)

#### SSD US13
![N2-VP-US13](diagramas/nivel2/N2-VP-US13.svg)

#### SSD US19
![N2-VP-US19](diagramas/nivel2/N2-VP-US19.svg)

Para além destes 3 existem mais exemplos que não colocamos neste documento para não ser muito extenso, sendo possível aceder aos restantes.


### Vista de Implementação
![N2-VI](diagramas/nivel2/N2-VI.svg)

### Vista Física

![N2-VF](diagramas/nivel2/N2-VF.svg)


## Nível 3 (MDR)
### Vista Lógica
Alternativa baseada numa arquitetura por camadas sobrepostas:
![N3-VL-MDR-alt1](diagramas/nivel3/MDR/N3-VL-MDR-alt1.png)

Alternativa baseada numa arquitetura por camadas concêntricas (Onion):
![N3-VL-MDR-alt2](diagramas/nivel3/MDR/N3-VL-MDR-alt2.png)

A alternativa Onion será a adotada.

### Vista de Processos

#### SD US3
![N3-VP-U3](diagramas/nivel3/MDR/N3-VP-US3.png)

#### SD US6
![N3-VP-US6](diagramas/nivel3/MDR/N3-VP-US6.png)

#### SD US9
![N3-VP-US9](diagramas/nivel3/MDR/N3-VP-US9.png)

Para além destes 3 existem mais exemplos que não colocamos neste documento para não ser muito extenso, sendo possível aceder aos restantes.




### Vista de Implementação
![N3-VI-MDR](diagramas/nivel3/MDR/N3-VI.svg)


### Vista Física

Por agora, não existe necessidade de ser representada.

## Nível 3 (UI)
### Vista Lógica
![N3-VL-SPA](diagramas/nivel3/SPA/N3-VL.png)

### Vista de Processos
#### SD US2
![N2-VP-US2](diagramas/nivel3/SPA/N3-VP-US2.png)

#### SD US13
![N2-VP-US13](diagramas/nivel3/SPA/N3-VP-US4.png)

#### SD US19
![N2-VP-US19](diagramas/nivel3/SPA/N3-VP-US6.png)

Para além destes 3 existem mais exemplos que não colocamos neste documento para não ser muito extenso, sendo possível aceder aos restantes.

### Vista de Implementação
TBD

### Vista Física

Por agora, não existe necessidade de ser representada.

## Nível 3 (MDV)
### Vista Lógica
![N3-VL-MDV](diagramas/nivel3/MDV/N3-VL.png)

### Vista de Processos
#### SD US2
![N3-VP-U11](diagramas/nivel3/MDV/N3-VP-US11.svg)

#### SD US13
![N3-VP-US13](diagramas/nivel3/MDV/N3-VP-US13.svg)

#### SD US19
![N3-VP-US19](diagramas/nivel3/MDV/N3-VP-US20.svg)

Para além destes 3 existem mais exemplos que não colocamos neste documento para não ser muito extenso, sendo possível aceder aos restantes.

### Vista de Implementação
![N3-VI-MDV](diagramas/nivel3/MDV/N3-VI.svg)

### Vista Física

Por agora, não existe necessidade de ser representada.
