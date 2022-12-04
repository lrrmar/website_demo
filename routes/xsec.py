from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from typing import List
import numpy as np
import time
import os
from utilities.funcs import oscillator_func, plotting_func, plot_names
from utilities.models import InputData, OutputData
import subprocess

router = APIRouter()


x = np.linspace(0,10,100)


@router.post("/xsec/input")
async def post_input(input: InputData):

    plotting_script = "utilities/wetbulb_xsec.py"
    input_dir = "wrf_data/"
    output_dir = "plots/"
    plots_to_remove = plot_names(output_dir, "wthxsection")

    for plot_name in plots_to_remove:
        os.remove(output_dir + plot_name)


    base_alt = 0
    top_alt = 10000
    lats = str(input.lats).strip('[').strip(']')
    lngs = str(input.lngs).strip('[').strip(']')
    
    command_string = "ls " + input_dir  + " | parallel -j 8 python " + plotting_script + " " + str(lats).replace(" ", "") + " " + str(lngs).replace(" ", "") + " " + str(base_alt) + " " + str(top_alt) + " " + input_dir + " " + output_dir 

    print(command_string)
    subprocess.run(command_string, shell=True)

    return lats, lngs

#    output = OutputData(
#            frequency=input.frequency,
#            damping=input.damping,
#            plot_name = [])
#
#    if len(f) != len(d):
#        return "WRONG LENGTH!"
#    else:
#        for i in range(0,len(f)):
#
#            y = oscillator_func(f[i], d[i], x)
#
#            plot_name = 'frequency-' + str(f[i]) +'_damping-' + str(d[i]) +  '.png'
#
 #           plotting_func(x, y, f[i], d[i], plot_name)
#
#            output.plot_name.append(plot_name)
#
#
#
#
#    return output


