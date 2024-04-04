# Base image
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

# Copy the local directory contents into the container at /app
COPY . /app

# Command to run the application
CMD [ "bash" ]
