from django.db import models
from django.urls import reverse

class Game(models.Model):
    """Representation of a game in the Lynx server. It follows the DRF Model super class.
    
    It is used in the API and for the database schema.
    """
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=200)
    gbin = models.FileField(upload_to="games/")
    thumbnail = models.FileField(upload_to="games-thumbnails/")
    exepath = models.CharField(max_length=200)
    userId = models.IntegerField(default=-1)

    # Metadata
    class Meta:
        ordering = ['-id']

    # Methods
    def get_absolute_url(self):
        """Returns the URL to access a particular instance of MyModelName."""
        return reverse('model-detail-view', args=[str(self.id)])

    def __str__(self):
        """String for representing the MyModelName object (in Admin site etc.)."""
        return self.name