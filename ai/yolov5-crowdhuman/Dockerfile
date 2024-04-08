# Base image
FROM ubuntu:20.04
FROM python:3.12-slim

RUN apt-get update && apt-get install -y \
    git \
    build-essential \
    python3-dev \
    libgl1-mesa-glx \
    libglib2.0-dev
# Set the working directory in the container
WORKDIR /app

# Copy the local requirements.txt to the container's workspace
COPY requirements.txt .

# Update pip
RUN pip install --no-cache-dir --upgrade pip
RUN pip install cython
# Install dependencies
RUN pip3 install -r requirements.txt
RUN pip install ipykernel && \
python -m ipykernel install --sys-prefix && \
pip install --quiet --no-cache-dir \
'boto3>1.0<2.0' \
'sagemaker>2.0<3.0'

# Copy the local directory contents into the container at /app
COPY . /app

# Command to run the application
CMD [ "bash" ]
