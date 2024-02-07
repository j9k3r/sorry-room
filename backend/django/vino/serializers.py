from rest_framework import serializers

class FileSerializer(serializers.Serializer):
    # print("Результат: ", serializers.Serializer)
    # import sys
    # sys.exit()
    img_src = serializers.ImageField()