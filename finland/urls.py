from django.conf.urls.defaults import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'finland.views.home', name='home'),
    # url(r'^finland/', include('finland.foo.urls')),

    url(r'^admin/', include(admin.site.urls)),
)
