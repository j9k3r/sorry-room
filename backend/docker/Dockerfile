#FROM python:3.9.18-bullseye
FROM python:3.8.18-bullseye

# model_server
RUN apt-get update && apt-get install -y python3-pip

RUN pip install --upgrade pip

#либа для cv2
RUN apt-get install -y libgl1-mesa-glx
#либа для openVINO
RUN apt-get install -y libpython3.8

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/