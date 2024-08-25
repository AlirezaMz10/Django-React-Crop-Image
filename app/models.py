from django.db import models
from django.conf import settings

# Create your models here.
class ProfileImage(models.Model):
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to=settings.MEDIA_ROOT)
    class Meta :
        db_table="profile_images"
        