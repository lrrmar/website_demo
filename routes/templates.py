from os import path
import os
from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from bokeh.resources import CDN

from utilities.models import OutputData
from utilities.funcs import plot_names

router = APIRouter()

js_resources = CDN.render_js()


templates = Jinja2Templates(directory=path.join(
    path.dirname(__file__), "templates"))


plot_list = []

@router.get('/', response_class=RedirectResponse)
def initial_redirect(request: Request):
    return '/xsec'

@router.get('/xsec', response_class=HTMLResponse)
def xsec(request: Request):
    return templates.TemplateResponse('xsec_input.html', {"request": request})

@router.get('/xsec/display', response_class=RedirectResponse)
def xsec_display_plot_alloc(request: Request):
    return '/xsec/display/0'


@router.get('/xsec/display/{id}', response_class=HTMLResponse)
def display_plot_by_id(request: Request, id: int):

    plot_dir = "plots/"
    plot_list = plot_names(plot_dir, "wthxsection")
    plot_list.sort()
    id_plot = "http://0.0.0.0:7800/" + plot_list[id]
    plot_time = plot_list[id][plot_list[id].index("T")+1:plot_list[id].index(".")]
    num_plots = len(plot_list)
    return templates.TemplateResponse('xsec_display.html', {"request": request, "id": id, "id_plot": id_plot, "plot_time":  plot_time, "num_plots": num_plots})
