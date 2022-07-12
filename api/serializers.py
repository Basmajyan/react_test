from attr import field
from rest_framework import serializers
from .models import Todos


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todos
        fields = (
            'id',
            'user',
            'title',
            'description',
            'category',
            'date',
        )
