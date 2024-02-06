from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import FileSerializer
from .image_cleaner.image_cleaner import ImageCleaner

class OpVinoView(APIView):
    def get(self, request):
        return Response("GET hello world", status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        if 'type' in data:
            serializer = FileSerializer(data=request.data)
            if serializer.is_valid():
                image = serializer.validated_data['image']
                if image.content_type not in ['image/jpeg', 'image/png']:
                    return Response("Only JPG and PNG files are allowed", status=status.HTTP_403_FORBIDDEN)
                else:
                    image_cleaner = ImageCleaner()
                    processed_data = image_cleaner.process(image, request.data)

                    # Возврат результата обработки
                    return Response(processed_data, status=status.HTTP_200_OK)

                    # file_type = serializer.validated_data['image'].content_type
                    # return Response({'file_type': file_type}, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            message = data['type']
            return Response(message, status=status.HTTP_200_OK)
        else:
            return Response("Parameter 'type' is missing", status=status.HTTP_400_BAD_REQUEST)
        # return Response("Post hello world", status=status.HTTP_200_OK)