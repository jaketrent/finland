from django.db import models
from taggit.managers import TaggableManager

class Artist(models.Model):
  name = models.CharField(max_length=250)
  name_slug = models.SlugField(unique=True)
  byline = models.CharField(max_length=250, blank=True, null=True)
  img = models.CharField(max_length=500, blank=True, null=True)
  large_img = models.CharField(max_length=500, blank=True, null=True)
  location = models.CharField(max_length=500, blank=True, null=True)
  desc = models.TextField(max_length=1000, blank=True, null=True)
  date_created = models.DateTimeField(editable=False, auto_now_add=True)
  date_updated = models.DateTimeField(editable=False, auto_now=True)

  tags = TaggableManager(blank=True)

  class Meta:
    ordering = ["name"]
  def __unicode__(self):
    return u'%s' % (self.name)

class Song(models.Model):
  title = models.CharField(max_length=250)
  title_slug = models.SlugField(unique=True)
  byline = models.CharField(max_length=250, blank=True, null=True)
  file = models.CharField(max_length=500)
  artist = models.ForeignKey(Artist)
  desc = models.TextField(max_length=1000, blank=True, null=True)
  art = models.CharField(max_length=500, blank=True, null=True)
  large_art = models.CharField(max_length=500, blank=True, null=True)
  date_created = models.DateTimeField(editable=False, auto_now_add=True)
  date_updated = models.DateTimeField(editable=False, auto_now=True)

  tags = TaggableManager(blank=True)

  class Meta:
    ordering = ["title"]
  def __unicode__(self):
    return u'%s' % (self.title)