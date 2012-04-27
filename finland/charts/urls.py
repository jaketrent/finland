from django.conf.urls.defaults import patterns, url

from charts.views import *

urlpatterns = patterns('',
  url(r'^$', home, name='home'),
  url(r'^song/(?P<title_slug>[\-\d\w]+)/$', song, name='song'),
)