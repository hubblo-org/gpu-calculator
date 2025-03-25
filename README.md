# Product Category Rules (PCR) for Cloud services

This project aims at making available the environmental evaluation of each Functional Unit (FU) of the Product Category Rules of Cloud services
edited by the *Agence de l'environnement et de la maîtrise de l'énergie* (ADEME), available [here](https://librairie.ademe.fr/produire-autrement/6105-methodological-standard-for-the-environmental-assessment-of-datacenter-it-hosting-services-and-cloud-services.html).

After inputting the necessary data center characteristics and its inventory elements, it outputs the computed results and displays a visualization of these results.

### TODO

- [ ] have quantity and lifespan inside each DataCenterInventoryElementWithImpactFactors object, coming right from mocked inventory
- [ ] fix barplot charts with quantity and lifespan involved in calculation
- [ ] make sample treemap
- [ ] replicate barplot and treemap for per-category view, in addition to per-lifecycle step view
- [ ] replicate and add fu1 calculation for fu specific view
