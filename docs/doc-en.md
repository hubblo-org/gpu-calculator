# Methodology

## Introduction

The calculator is based on the parametric model developed for ADEME by Tide, Hubblo, and TND as part of research published in 2025 (Falk et al., 2025). The model is the result of extensive data collection, including the dismantling of a dozen graphics cards and the performance of a dozen elemental analyses. The following references give more detail on the data collected in question.

> [Link to documentation](data.hubblo.org/gpu/doc)
> [ADEME report](TBD)
> [Research paper](https://arxiv.org/abs/2509.00093)

## Objective

This parametric model aims at making available a simplified quantitative framework allowing for the evaluation of embedded environmental impacts of graphics cards. "Embedded" impacts are the impacts of raw materials extraction and transformation, manufacturing, transport and end-of-life.
Through the analysis of seven graphics cards accomplished during a research project (ADEME, 2026 ; Falk et al., 2025), we have been able to identify key parameters useful in sizing the environmental impacts of a given graphics cards. These parameters can be found rather easily, without an extensive data collection accomplished in our research work.

The upstream impacts (raw material extraction and transformation, manufacturing) are given on a "component" scale, in order to distinguish their discrete characteristics. Transport and end-of-life impacts are treated on a "equipment" scale, given that these steps concern the assembled graphics card.

The methodology and data are detailed in the following sections.

## Parameters

The key parameters are detailed in the following table. Default parameters are suggested when data is not publicly available.

|      Parameter                          |     Default value                                |     Note                                                             |
|-----------------------------------------|--------------------------------------------------|----------------------------------------------------------------------|
|     Card weight                         |     This should be public                        |     Usually documented in product information                        |
|     Heatsink weight share               |     53%                                          |                                                                      |
|     Electronic card surface             |     Graphics card surface                        |                                                                      |
|     Video memory capacity (VRAM)        |     This should be public                        |     Usually found in https://www.techpowerup.com/                    |
|     Number of VRAM dies                 |     This should be public                        |     Usually found in https://www.techpowerup.com/                    |
|     GPU chip surface                    |     This should be public                        |     Usually found in https://www.techpowerup.com/                    |
|     Travel distance - plane             |     19,000 km                                    |     Distance between Shenzhen and Paris                              |
|     Travel distance - truck             |     1,000 km                                     |     Default inland distance                                          |
|     Travel distance - boat              |     0 km                                         |                                                                      |

Table 1 - Model parameters 
