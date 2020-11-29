from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, 'index.htm')

def chess(request):
    username = request.POST['FullName']

    try:
        asssistant = request.POST['WithAssistant']
    except:
        asssistant = None

    try:
        multiplayer = request.POST['WithPlayer']
    except:
        multiplayer = None

    #print(asssistant)
    if asssistant != None:
        return render(request, 'chess.htm',{'username' : username})
    elif multiplayer != None:
        return render(request, 'man_chess.htm',{'username' : username})