# Méthode

## Source 

Le calculateur se base sur le modèle paramétrique développé pour l'ADEME par Tide, Hubblo et TND, dans le cadre de travaux de recherches publié en 2025 (Falk et al., 2025). Le modèle est issue d'ne collecte de donnée extensive incluant le démontage d'une dizaine de carte graphique graphique ainsi que la réalisation d'un dizaine d'analyse élémentaires. Le détail des données peut-être retrouvé dans les documents suivants.

> [Rapport ADEME](TBD)
> [Papier de recherche](https://arxiv.org/abs/2509.00093)
> [Supplementary Material](https://github.com/sophia-falk/more-than-carbon)


## Objectif 

L’objectif de ce modèle paramétrique est de proposer un cadre quantitatif simplifié permettant d'évaluer les impacts environnementaux dits « embarqués » (extraction et transformation des matières premières, fabrication, distribution et fin de vie) des cartes graphiques. Sur la base de l’analyse de sept cartes graphiques effectuée dans le cadre d'un projet de recherche (ADEME, 2026 ; Falk et al., 2025), nous avons identifié les paramètres clés qui, d'une part, dimensionnent les impacts environnementaux de la carte et qui, d'autre part, peuvent être récupérés de manière relativement simple, sans avoir à effectuer une collecte extensive, comme celle produite dans le cadre de cette recherche.

Concernant les impacts amont (extraction et transformation des matières premières, ainsi que fabrication), les impacts sont traités à une échelle « composant » afin de distinguer les caractéristiques spécifiques de chacun d'entre eux. Les impacts de la distribution et de la fin de vie sont traités à l’échelle « équipement », en considérant que ces étapes adviennent sur la carte assemblée.

Les données et la méthode employée sont détaillées dans les sections suivantes.s.

## Paramètres

Les paramètres clés identifiés sont détaillés dans le tableau suivant. Des valeurs par défaut sont proposées lorsque la donnée n’est pas généralement disponible publiquement.

|      Paramètre                          |     Valeur par défaut                            |     Commentaire                                                      |
|-----------------------------------------|--------------------------------------------------|----------------------------------------------------------------------|
|     Poids de la carte                   |     Cette information devrait être   publique    |     Est généralement documenté dans   la fiche produit               |
|     Part du poids du radiateur          |     53%                                          |                                                                      |
|     Surface of the electronic card      |     Surface de la carte graphique                |                                                                      |
|     Quantité de mémoire vidéo (VRAM)    |     Cette information devrait être   publique    |     Est généralement documenté dans https://www.techpowerup.com/     |
|     Nombre de puce VRAM                 |     Cette information devrait être   publique    |     Est généralement documenté dans https://www.techpowerup.com/     |
|     Surface de la puce GPU              |     Cette information devrait être   publique    |     Est généralement documenté dans https://www.techpowerup.com/     |
|     Distance de transport - avion       |     9 908 km                                    |     Distance entre Shenzhen et Paris                                 |
|     Distance de transport - camion      |     1 000 km                                     |     Distance par défaut intracontinentale                            |
|     Distance de transport - bateau      |     0 km                                         |                                                                      |

Tableau 1 - Paramètres du modèle


## Modélisation par composant

### Fabrication

Les impacts de la fabrication des cartes sont calculés comme la somme des impacts des composants suivants.

#### Boitier

Les impacts du boitier sont modélisés à travers un ratio poids basés sur les impacts moyen par kilogramme des boitiers des cartes analysées dans le cadre du projet de recherche. Les impacts par kg de boitier sont reportés dans le Tableau 2.

#### Radiateur

Les impacts du radiateur sont modélisés à travers un ratio poids basés sur les impacts moyen par kilogramme des radiateurs des cartes analysées dans le cadre du projet de recherche. En moyenne le radiateur correspond à 53% du poids total de la carte. Les impacts par kg de radiateur sont reportés dans le Tableau 2.

#### Circuit imprimé sans le GPU et la VRAM

Les impacts du circuit imprimé peuplé de composant électronique et numérique hors puces GPU et VRAM sont modélisés à travers un ratio surface basés sur les impacts moyen par cm2 des circuits imprimés des cartes analysées dans le cadre du projet de recherche. Les impacts par cm2 de circuit imprimé sont reportés dans le Tableau 2.

#### GPU

Les impacts de la puce GPU sont modélisés à l'aide d'un ratio de surface basé sur la moyenne des impacts par mm2 des cartes analysées dans le cadre du projet de recherche, incluant les surfaces de perte. La surface totale, incluant les pertes, est calculée sur la base de la surface des puces fournis en paramètr,. 

		La fabrication des puces est un processus complexe, a fortiori pour les puces les plus technologiquement avancées et les plus grosses.
		Ces pertes sont de trois natures :
			Pertes de bords, liées aux puces touchant le bord du wafer et donc incomplètes (en jaune sur la figure ci-dessous)
			Les pertes de découpe (kerf), liées à l’épaisseur de la découpe des puces (en gris sur la figure ci-dessous)
			Les pertes liées aux défauts (poussières, erreurs lors du processus de fabrication) (en rouge sur la figure ci-dessous)
 
		Au global, la prise en compte de l’ensemble des pertes entraine un rendement (appelé yield) pour les différentes puces en fonction notamment de leurs dimensions. Le calcul de ce rendement peut être modélisé à l’aide de différents modèles, en l’absence de données primaire de la part du fabricant.

Dans le cadre de ce modèle, les pertes sont compatbilisé à l'iade du modèle de Murphy avec un taux de défauts de 0,1 par cm²

Les impacts par mm2 de puce GPU, perte incluse, sont reportés dans le Tableau 2.

#### VRAM

Les impacts de la VRAM sont modélisés à l'aide d'un ratio de surface basé sur la moyenne des impacts par mm2 des VRAM des 7 cartes analysées, incluant les surfaces de perte. La surface totale, incluant les pertes, est calculée sur la base de la surface des puces fournis en paramètre, selon l'approche détaillée dans la section 4.1.5. Les impacts par mm2 de VRAM, perte incluse, sont reportés dans le Tableau 2.

#### Transport amont

Les impacts du transport amont, c’est-à-dire de l’ensemble du transport effectué dans le cadre du processus de fabrication jusqu’à l’assemblage de la carte sont modélisées à l’aide d’un ratio poids basés sur les impacts moyen par kilogramme des 7 cartes analysées. Les impacts par kg de carte, sont reportés dans le Tableau 2.

#### Distribution

Les impacts de la distribution de la carte depuis l’usine d’assemblage jusqu’au lieu d’utilisation sont calculés comme la somme des impacts du transport par voie aérienne, maritime et routière sur la base de ratio exprimés en kg/km. Les impacts par kg/km pour chaque mode de transport issue de la base de données EIME sont reportés dans le Tableau 2. Par défaut une distance de 19 000 km en avion auquel on ajoute 1000 km en camion sont considéré.

#### Usage

Les impacts à l’usage ne sont pas pris en compte dans le modèle paramétrique. Ils peuvent néanmoins être évalués en prenant en compte la consommation des cartes sur leur cycle de vie, ainsi que le mix électrique de la région dans laquelle la carte est utilisée. La consommation électrique peut être établie sur la base d'une consommation moyenne issue de benchmarks ou de mesures, ou encore sur la base des consommations maximales théoriques (TDP) indiquées par le constructeur.

#### Fin de vie

Les impacts de la fin de vie de la carte sont modélisés à travers un ratio poids basés sur les impacts moyen de la fin de vie par kilogramme de carte pour les 7 cartes analysées. Les impacts de la fin de vie par kg de carte sont reportés dans le Tableau 2. 


| Name | Unité | PEF-AP (mol H+ eq.) | PEF-GWP (kg CO2 eq.) | PEF-CTUe (CTUe) | PEF-PM (Disease occurrence) | PEF-Epf (kg P eq.) | PEF-Epm (kg N eq.) | PEF-Ept (mol N eq.) | PEF-CTUh-c (CTUh) | PEF-CTUh-nc (CTUh) | PEF-IR (kBq U235 eq.) | PEF-LU (No dimension) | PEF-ODP (kg CFC-11 eq.) | PEF-POCP (kg NMVOC eq.) | PEF-ADPf (MJ) | PEF-ADPe (kg SB eq.) | PEF-WU (m3 eq.) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Boîtier | 1kg de Boîtier | 7,28E-02 | 7,82E+00 | 4,04E+02 | 4,57E-07 | 1,72E-04 | 6,95E-02 | 6,32E-03 | 2,00E-06 | 3,03E-06 | 3,41E+01 | 7,62E-01 | 1,21E-06 | 2,49E-02 | 2,20E+02 | 4,96E-04 | 4,32E+00 |
| Radiateur | 1kg de radiateur | 2,18E-01 | 5,74E+00 | 4,20E+02 | 1,36E-06 | 1,50E-03 | 6,04E-02 | 5,22E-03 | 2,15E-05 | 2,78E-06 | 3,25E+02 | 3,54E+00 | 1,15E-06 | 2,99E-02 | 8,50E+01 | 1,87E-03 | 1,05E+01 |
| PCB | 1 cm2 de PCB | 5,76E-04 | 7,30E-02 | 1,03E+00 | 3,12E-09 | 2,38E-07 | 5,51E-04 | 5,17E-05 | 4,83E-09 | 2,91E-09 | 1,06E-01 | 2,55E-04 | 1,62E-08 | 1,91E-04 | 9,99E-01 | 2,13E-05 | 3,15E-02 |
| GPU | 1 mm2 de puce GPU | 2,40E-04 | 4,32E-02 | 5,52E-01 | 1,32E-09 | 1,35E-07 | 2,99E-04 | 2,87E-05 | 1,63E-10 | 2,65E-10 | 2,67E-03 | 1,72E-04 | 1,89E-08 | 9,40E-05 | 5,65E-01 | 1,94E-07 | 1,50E-02 |
| VRAM | 1 mm2 de puce VRAL | 1,90E-04 | 3,45E-02 | 4,40E-01 | 1,05E-09 | 1,07E-07 | 2,38E-04 | 2,29E-05 | 3,23E-12 | 1,87E-10 | 2,89E-04 | 1,37E-04 | 1,50E-08 | 7,48E-05 | 4,50E-01 | 9,51E-10 | 1,33E-02 |
| Transport amont | 1kg de carte | 1,74E-03 | 2,61E-01 | 1,76E-01 | 1,50E-08 | 9,78E-08 | 9,01E-03 | 8,22E-04 | 4,66E-12 | 5,77E-10 | 6,35E-04 | 0,00E+00 | 4,00E-10 | 2,28E-03 | 3,64E+00 | 1,03E-08 | 9,90E-04 |
| Transport - camion | 1 kg.km | 3,19E-07 | 5,04E-05 | 3,39E-05 | 2,59E-12 | 1,89E-11 | 1,50E-07 | 1,64E-06 | 8,85E-16 | 9,58E-14 | 1,23E-07 | 0,00E+00 | 7,72E-14 | 4,14E-07 | 7,03E-04 | 1,98E-12 | 1,91E-07 |
| Transport - bateau | 1 kg.km | 5,34E-07 | 1,33E-05 | 7,92E-06 | 2,76E-12 | 4,46E-12 | 1,22E-07 | 1,34E-06 | 1,89E-16 | 4,28E-14 | 2,63E-08 | 0,00E+00 | 1,65E-14 | 3,45E-07 | 1,63E-04 | 4,62E-13 | 4,20E-08 |
| Transport - avion | 1 kg.km | 8,77E-06 | 2,11E-03 | 1,37E-03 | 5,44E-11 | 7,44E-10 | 3,95E-06 | 4,32E-05 | 3,19E-14 | 1,67E-12 | 3,89E-06 | 0,00E+00 | 2,44E-12 | 1,06E-05 | 2,95E-02 | 8,31E-11 | 8,38E-06 |
| Fin de vie | 1kg de carte | 3,16E-02 | 1,48E+00 | 7,62E+02 | 9,40E-08 | 3,01E-05 | 2,11E-02 | 1,44E-02 | 5,58E-09 | 2,32E-07 | 1,20E-01 | 6,61E+00 | 1,36E-07 | 5,29E-03 | 1,90E+01 | 3,43E-06 | 7,02E+02 |

Tableau 1 - Facteurs d'impact par composant
