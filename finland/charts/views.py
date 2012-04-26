
from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext

from charts.models import Song

def home(request):
  songs = Song.objects.all().order_by('-date_created')
  return render_to_response("home.html", locals(),
    context_instance=RequestContext(request))
