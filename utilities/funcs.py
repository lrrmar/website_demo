import numpy as np
import matplotlib.pyplot as plt
import os
plt.switch_backend('agg')

def oscillator_func(f, d, x):

    y = np.sin(2*np.pi*f*x)*np.exp(-d*x)

    return y

def plotting_func(x, y, f, d, plot_name):
    plt.plot(x,y)


    plt.xlabel('x')
    plt.ylabel('y')
    plt.title('Dampened Oscillator with frequency ' + str(f) + ' and damping ' + str(d))

    plt.savefig(plot_name, dpi=300, bbox_inches='tight')

    plt.close()

def return_json(plot_name, f, g):

    json_data = {"plot_name": plot_name, "frequency": f, "damping": d}

    return json_data


def plot_names(plot_dir, keyword):


    plot_names = []

    for file in os.listdir(plot_dir):
        if file.startswith(keyword):
            plot_names.append(file)

    return plot_names
