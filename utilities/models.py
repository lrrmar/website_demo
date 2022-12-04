from pydantic import BaseModel
from typing import List

class InputData(BaseModel):
    lats: List[float]
    lngs: List[float]


class OutputData(InputData):
    plot_name: List[str]

