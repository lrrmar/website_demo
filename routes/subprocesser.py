import subprocess as sp


#sp.run("parallel python plot_some_arguments.py 1 2 3 ::: 44 55 66", shell=True)

sp.run("ls ../wrf_data/ | parallel python plot_some_arguments.py 1 2 3 ", shell=True)
