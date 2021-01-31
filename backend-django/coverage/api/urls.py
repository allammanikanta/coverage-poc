from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name="api-overview"),
    path('users/', views.userList, name="user-details"),
    path('createUser/', views.createUser, name="user-create"),
    path('submitUserResponse/', views.submitUserResponse, name="submit-user-response"),
    path('getUserCoverage/', views.getUserCoverage, name="get-user-coverage"),
    path('coverageQuestions/', views.coverageQuestions, name="coverage-questions")
  ]