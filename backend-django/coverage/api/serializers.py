from rest_framework import serializers

from .models import userDetails, coverageQuestion

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = userDetails
        fields = '__all__'

class questionSerializer(serializers.ModelSerializer):
    class Meta:
        model = coverageQuestion
        fields = '__all__'