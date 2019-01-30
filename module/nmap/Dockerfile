FROM python:2

WORKDIR /usr/src/app

RUN apt update && apt install -y nmap
RUN pip install --no-cache-dir python-nmap

COPY ./Auto-NMAP-Script-Scanning-Tool .

CMD [ "python", "AutoNMAP.py", "127.0.0.1" ]