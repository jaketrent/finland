from tastypie.resources import ModelResource
from charts.models import Song


class SongResource(ModelResource):
  class Meta:
    queryset = Song.objects.all()
    resource_name = 'song'
    list_allowed_methods = ['get']
    detail_allowed_methods = ['get']
  def determine_format(self, request):
    return 'application/json'