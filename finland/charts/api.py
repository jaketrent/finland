from django.conf.urls.defaults import url
from django.shortcuts import get_object_or_404
from tastypie import fields
from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from charts.models import Song, Artist


class ArtistResource(ModelResource):
#  songs = fields.ToManyField('charts.api.SongResource', 'song_set', related_name='artist')
  class Meta:
    queryset = Artist.objects.all()
    resource_name = 'artist'
    list_allowed_methods = ['get']
    detail_allowed_methods = ['get']
  def determine_format(self, request):
    return 'application/json'

class SongResource(ModelResource):
  artist = fields.ToOneField(ArtistResource, 'artist')
#  artist = get_object_or_404(Artist, id=1)

  class Meta:
    queryset = Song.objects.all()
    resource_name = 'song'
    list_allowed_methods = ['get']
    detail_allowed_methods = ['get']
    filtering = {
      'artist': ALL_WITH_RELATIONS
    }

  def determine_format(self, request):
    return 'application/json'

#  def override_urls(self):
#    return [
#      url(r"^(?P<resource_name>%s)/$" % (self._meta.resource_name), self.wrap_view('get_children'), name="api_get_children"),
#      ]
#
#  def get_children(self, request, **kwargs):
#    try:
#      obj = self.cached_obj_get(request=request, **self.remove_api_resource_names(kwargs))
#    except ObjectDoesNotExist:
#      return HttpGone()
#    except MultipleObjectsReturned:
#      return HttpMultipleChoices("More than one resource is found at this URI.")
#
#    artist = ArtistResource()
#    return artist.get_detail(request, song=obj.pk)

#  def dispatch(self, request_type, request, **kwargs):
#    username = kwargs.pop('username')
#    kwargs['artist'] = get_object_or_404(Artist, id=1)
#    return super(SongResource, self).dispatch(request_type, request, **kwargs)