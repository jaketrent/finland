from django.conf.urls.defaults import url
from django.shortcuts import get_object_or_404
from tastypie import fields
from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from charts.models import Song, Artist

class ArtistResource(ModelResource):
  songs = fields.ToManyField('charts.api.SongResource', 'song_set', related_name='artist')

  class Meta:
    queryset = Artist.objects.all()
    resource_name = 'artist'
    list_allowed_methods = ['get']
    detail_allowed_methods = ['get']

  def determine_format(self, request):
    return 'application/json'


class SongResource(ModelResource):
  artist = fields.ToOneField(ArtistResource, 'artist')

  class Meta:
    queryset = Song.objects.all()
    resource_name = 'song'
    list_allowed_methods = ['get']
    detail_allowed_methods = ['get']

  def determine_format(self, request):
    return 'application/json'