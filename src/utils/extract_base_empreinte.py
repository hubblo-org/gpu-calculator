#!/usr/bin/env python3

import csv
import json
from pprint import pprint
import pandas as p

impact_criteria_matching = {
    "ADPe": "Minerals and metal resource use",
    "ADPf": "Fossile resource use",
    "AP": "Acidification",
    "CTUe": "Freshwater ecotoxicity",
    "Epf": "Freshwater eutrophication",
    "Epm": "Marine eutrophication",
    "Ept": "Terrestrial eutrophication",
    "GWP": "Climate change",
    "GWPb": "Climate change-Biogenic",
    "GWPf": "Climate change-Fossil",
    "GWPlu": "Climate change - Contribution of emissions from land use change",
    "IR": "Emissions of radionizing substances",
    "LU": "Land use",
    "ODP": "Ozone depletion",
    "PM": "Particulate matter",
    "POCP": "Photochemical ozone formation",
    "WU": "Use of water resources",
    "MIPS": "Material input per unit of service",
    "TPE": "Primary energy",
    "WEEE": "Waste electrical and electronic equipment",
    "CTUh_c": "Human Toxicity - Carcinogenic Effects",
    "CTUh_nc": "Human toxicity - non-carcinogenic effects"
}

def main():
    path = "../mocks/BASE-IMPACTS-v3-0/BI_3.0__03_Procedes_Impacts.csv"
    df = p.read_csv(path, encoding="ISO-8859-1", skipinitialspace=True,
        delimiter=';', lineterminator="\n", skiprows=0, header=None)

    criterias = df.T.iloc[2][2:]
    units = df.T.iloc[3][2:]
    print("CRITERIA: \n{}".format(criterias))
    print("UNITS: \n{}".format(units))

    path = "../mocks/BASE-IMPACTS-v3-0/extract_electricity_mix.csv"
    df = p.read_csv(path, encoding="ISO-8859-1", skipinitialspace=True,
        delimiter=',', lineterminator="\n")
    #df = df.T # reverting columns and rows
    #df = df.iloc[: , 1:] # droping first column
    ordered_crits = [ "ODP", "EPF", "EPM", "EPT", "POCP", "PM", "IR", "ADPf", "ADPe",
        "LU", "GWP", "GWPb", "GWPf", "AP"]
    #pprint(df)

    elec_mixes = {}

    for n in df.T.iterrows():
        #print(n[1][0])
        key = str(n[0]).split(',')[2].strip()
        elec_mixes[key] = {}
        for i, c in enumerate(ordered_crits):
            elec_mixes[key][c] = n[1][i]

    path = "../mocks/BASE-IMPACTS-v3-0/BI_3.0__02_Procedes_Details.xlsx"
    df = p.read_excel(path)

    for k in elec_mixes.keys():
        elec_mixes[k]["meta"] = {}
        for n in df.T.iterrows():
            if k in n[1][3]:
                country_fullname = str(n[1][27]).replace(";", "").strip()
                elec_mixes[k]["meta"]["country"] = country_fullname
                elec_mixes[k]["meta"]["reference_year"] = int(n[1][23])
                elec_mixes[k]["meta"]["source"] = "ADEME Base Empreinte"
                break

    pprint(elec_mixes)

    with open("result.json", 'w') as fd:
        json.dump(elec_mixes, fd)
        fd.close()
    #print(df.iloc[4:])
    #for i in df.iloc[4:]:
    #    pprint(i)
    #    res[i[1]] = {}
    #    for n in range(1,15):
    #        res[criterias[n]] = {
    #            "value": i[n],
    #            "unit": units[n]
    #        }


    #df.reset_index(inplace=True)
    #df.set_index(df.columns[0])
    #pprint(df)
    #with open('result.json', 'w') as fd:
    #    json_content = df.to_json()
    #    if json_content is not None:
    #        fd.write(json_content)
    #    else:
    #        print("FAIL")

if __name__ == '__main__':
    main()
