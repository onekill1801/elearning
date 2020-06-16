from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.http import JsonResponse

# Create your views here.
def chat(request):
	# return HttpResponse('Save Success!!!')
	# return 'helleo'
	return render(request, 'chat.html')

def ajax_chat(request):
	import pdb; pdb.set_trace()
	username = request.GET.get('chat', None)
	# username = request.POST.get('chat', None)
	return JsonResponse({"error": '1231321'}, status=200)
	# return JsonResponse({"error": ""}, status=400)
	# return HttpResponse('Save Success!!!')