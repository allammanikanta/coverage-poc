from django.contrib import admin
from .models import userDetails, coverageQuestion, userResponse
# Register your models here.

admin.site.register(userDetails)
admin.site.register(coverageQuestion)
admin.site.register(userResponse)
