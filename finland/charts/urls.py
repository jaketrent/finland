from django.conf.urls.defaults import patterns, url

from charts.views import *

urlpatterns = patterns('',
  url(r'^$', home, name='home'),
)