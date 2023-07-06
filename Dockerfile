# Read: https://dockertraining.readthedocs.io/en/latest/django/
FROM python:3.11
ENV PYTHONUNBUFFERED 1
ADD requirements.txt requirements.txt
RUN pip install -r requirements.txt
RUN mkdir server/
ADD server/* server/ 
# WORKDIR server/
# CMD python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000