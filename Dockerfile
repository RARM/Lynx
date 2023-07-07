# Read: https://dockertraining.readthedocs.io/en/latest/django/
# Loading server folder: https://stackoverflow.com/a/75743012/11117045
FROM python:3.11
ENV PYTHONUNBUFFERED 1
ADD requirements.txt requirements.txt
RUN pip install -r requirements.txt
ADD server.tar .
CMD python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000