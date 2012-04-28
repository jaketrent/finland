from django.conf.urls.defaults import patterns, url, include
from tastypie.api import Api
from charts.api import SongResource, ArtistResource
from charts.views import *

v1_api = Api(api_name='v1')
v1_api.register(ArtistResource())
v1_api.register(SongResource())

urlpatterns = patterns('',
  url(r'^$', home, name='home'),
  url(r'^song/(?P<title_slug>[\-\d\w]+)/$', song, name='song'),

  (r'^api/', include(v1_api.urls)),
)