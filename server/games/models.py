from django.db import models
from django.urls import reverse

# Create your models here.
class Game(models.Model):
    gameName = models.CharField(max_length=200)
    gameDescription = models.CharField(max_length=200)
    gameBin = models.FileField()

    # Metadata
    class Meta:
        ordering = ['-gameId']

    # Methods
    def get_absolute_url(self):
        """Returns the URL to access a particular instance of MyModelName."""
        return reverse('model-detail-view', args=[str(self.id)])

    def __str__(self):
        """String for representing the MyModelName object (in Admin site etc.)."""
        return self.gameName