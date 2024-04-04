# Choose our version of Python
FROM python:3.10

# Set up a working directory
WORKDIR /code

# Copy just the requirements into the working directory so it gets cached by itself
COPY ./api/requirements.txt /code/requirements.txt

# Install the dependencies from the requirements file
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
RUN pip install 'crewai[tools]'
RUN pip install crewai-tools==0.0.15
RUN pip install crewai[tools]

# Copy the code into the working directory
COPY ./api /code/api

# Tell uvicorn to start spin up our code, which will be running inside the container now
CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "80"]