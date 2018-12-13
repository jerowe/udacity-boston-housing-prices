FROM continuumio/miniconda3:4.5.11

RUN apt-get update -y; apt-get upgrade -y
RUN apt-get install -y vim-tiny vim-athena mysql-client ssh

RUN adduser --home /home/flask flask

USER flask
WORKDIR /home/flask

COPY environment.yml environment.yml

RUN conda env create -f environment.yml
RUN echo "alias l='ls -lah'" >> ~/.bashrc
RUN echo "source activate boston-housing-prices" >> ~/.bashrc

ENV CONDA_EXE /opt/conda/bin/conda
ENV CONDA_PREFIX /home/flask/.conda/envs/boston-housing-prices
ENV CONDA_PYTHON_EXE /opt/conda/bin/python
ENV CONDA_PROMPT_MODIFIER (boston-housing-prices)
ENV CONDA_DEFAULT_ENV boston-housing-prices
ENV PATH /home/flask/.conda/envs/boston-housing-prices/bin:/opt/conda/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

ENV HOUSING_DATA '/home/flask/data/housing.csv'

RUN mkdir -p data
RUN mkdir -p scripts/python_app

COPY python_app/__init__.py /home/flask/scripts/python_app/__init__.py
COPY python_app/data_bp.py /home/flask/scripts/python_app/data_bp.py
COPY python_app/model_bp.py /home/flask/scripts/python_app/model_bp.py
COPY python_app/flask_app.py /home/flask/scripts/python_app/flask_app.py

COPY python_app/materials/housing.csv /home/flask/data
COPY start_flask_app.sh /home/flask/scripts/start_flask_app.sh

WORKDIR /home/flask/scripts
EXPOSE 5000

CMD ["/bin/bash", "-c", "/home/flask/scripts/start_flask_app.sh"]
#CMD ["/bin/bash", "-c", "tail -f /dev/null"]
