from django.contrib import admin
from django.contrib.auth.models import User
from charts.models import Artist, Song

class SongAdmin(admin.ModelAdmin):
  list_display = ['title', 'id', 'date_created']
  prepopulated_fields = {'title_slug': ('title',)}
  search_fields = ['title','desc', 'artist']
  date_hierarchy = 'date_created'
  fieldsets = (
    (None, {
      'classes': ('',),
      'fields': ('title', 'title_slug', 'byline', 'artist', 'file')
    }),
    ('Other', {
      'classes': ('',),
      'fields': ('desc', 'art', 'tags')
    }),
  )

class ArtistAdmin(admin.ModelAdmin):
  list_display = ['name', 'id', 'date_created']
  prepopulated_fields = {'name_slug': ('name',)}
  search_fields = ['name','desc', 'location']
  date_hierarchy = 'date_created'
  fieldsets = (
    (None, {
      'classes': ('',),
      'fields': ('name', 'name_slug', 'img', 'location', 'desc')
    }),
  )

admin.site.register(Song, SongAdmin)
admin.site.register(Artist, ArtistAdmin)