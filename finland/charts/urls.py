from django.conf.urls.defaults import patterns, url, include
from tastypie.api import Api
from charts.api import SongResource, ArtistResource
from charts.views import *

v1_api = Api(api_name='v1')
v1_api.register(ArtistResource())
v1_api.register(SongResource())

urlpatterns = patterns('',
  url(r'^$', songs, name='songs'),
  url(r'^music/$', songs, name='songs2'),
  url(r'^music/song/(?P<title_slug>[\-\d\w]+)/$', song, name='song'),
  url(r'^artists/$', artists, name='artists'),
  url(r'^artists/(?P<name_slug>[\-\d\w]+)/$', artist, name='artist'),

  (r'^api/', include(v1_api.urls)),
)