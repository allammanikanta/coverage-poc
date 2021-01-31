from django.db import models

# Create your models here.

class userDetails(models.Model):
    userName = models.CharField(max_length=200)
    address = models.CharField(max_length=2000)
    dob = models.DateField()
    
    def __str__(self):
        return self.userName

class coverageQuestion(models.Model):
    question = models.CharField(max_length=2000)
    coverageIfYes = models.IntegerField()
    coverageIfNo = models.IntegerField()

    def __str__(self):
        return self.question

class userResponse(models.Model):
    userName = models.ForeignKey(userDetails, on_delete=models.SET_NULL, null=True)
    question = models.ForeignKey(coverageQuestion, on_delete=models.SET_NULL, null=True)
    response = models.CharField(max_length=100)
