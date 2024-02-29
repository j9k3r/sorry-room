from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def test_post_view(request):
    if request.method == 'POST':
        # Возвращаем JSON-ответ со статусом
        return JsonResponse({'status': 'success'}, status=200)
    else:
        # Если запрос не методом POST, возвращаем ошибку
        return JsonResponse({'error': 'Invalid request method'}, status=405)