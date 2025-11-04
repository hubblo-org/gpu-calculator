#!/bin/bash

typeset CSV_FILE="./gpus_impact_factors.csv"
typeset JSON_FILE="./gpus_impact_factors.json"

typeset GPUS=("NVIDIA GeForce GTX 1080 Ti" "NVIDIA Titan RTX" "NVIDIA Tesla P100 PCIe 16GB" "NVIDIA L4" "NVIDIA A100 PCIe 40GB" "NVIDIA A100 SXM4 40GB" "NVIDIA H100 PCIe 80GB")
typeset GPUS_LAST_INDEX=$((${#GPUS[@]} - 1))
typeset START_JSON_ARRAY="["
typeset END_JSON_ARRAY="]"

echo "${START_JSON_ARRAY}" > ${JSON_FILE}
for card in "${GPUS[@]}"
do
	graphics_card_object="{\"graphics_card\":\"${card}\","
	components="\"components\":"
	{ echo "${graphics_card_object}";
	echo "${components}"; 
	csvgrep -c graphics_card -m "${card}" ${CSV_FILE} | csvjson --indent 4 --key component; 
	if [ "${card}" = "${GPUS[$GPUS_LAST_INDEX]}" ]; then
		echo "}";
	else 
		echo "},";
	fi
	} >> ${JSON_FILE}
done

echo "${END_JSON_ARRAY}" >> ${JSON_FILE}
