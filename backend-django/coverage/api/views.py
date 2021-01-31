from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import userDetails, coverageQuestion, userResponse
from .serializers import userSerializer, questionSerializer

"""
API Overview
"""
@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List Users' : '/users/',
        'Create User' : '/createUser/',
        'Coverage Quesitons' : '/coverageQuestions/'
    }
    return Response(api_urls)

"""
Below Function going to display all the users in the data base.
"""
@api_view(['GET'])
def userList(request):
    users = userDetails.objects.all()
    serializer = userSerializer(users, many = True)
    return Response(serializer.data)

"""
Below Function going to create user in the database
"""

@api_view(['POST'])
def createUser(request):
    serializer = userSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response({"message": "User is successfully added!"}, status=status.HTTP_200_OK)

"""
Below Function is used to submit the user response
"""

@api_view(['POST'])
def submitUserResponse(request):
    try:
        userName = request.data['userName']
        dob = request.data['dob']
        address = request.data['address']
        """ Validating User """
        try:
            userObj = userDetails.objects.get(userName=userName, dob=dob, address=address)
            userId = userObj.id
        except Exception as e:
            return Response({"message": "User does not exist"}, status=status.HTTP_400_BAD_REQUEST)

        questionId = request.data['question']
        response = request.data['response']
        try:
            if(userResponse.objects.get(userName=userDetails.objects.get(id=userId), question=coverageQuestion.objects.get(id=questionId))):
                return Response({"message": "User has already submitted the response"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
                print("New Response From User has come")

        userResponseObj = userResponse(userName=userDetails.objects.get(id=userId), question=coverageQuestion.objects.get(id=questionId),
                                        response = response    
                                        )
        userResponseObj.save()
        return Response({"message": "Saved the Response"}, status=status.HTTP_200_OK)
    except Exception as exp:
        print("Some Error Occurred", exp)
        return Response({"error": "Unexpected error occurred, please report this to Admin"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

"""
Below Function is used to get the user response
"""

@api_view(['POST'])
def getUserCoverage(request):
    userName = request.data['userName']
    dob = request.data['dob']
    address = request.data['address']
    """ Validating User """
    try:
        userObj = userDetails.objects.get(userName=userName, dob=dob, address=address)
        userId = userObj.id
    except Exception as e:
        return Response({"message": "User does not exist"}, status=status.HTTP_400_BAD_REQUEST)
    # """ Validating the User Id"""
    # try:
    #     userDetails.objects.get(id=pk)
    # except Exception as e:
    #     return Response({"message": "User does not exist"}, status=status.HTTP_400_BAD_REQUEST)
    
    userResponses = list(userResponse.objects.filter(userName=userId))
    coverageArray = []

    for i in range(0,len(userResponses)):
        coverageObj = coverageQuestion.objects.get(question=userResponses[i].question)
        if(userResponses[i].response == 'Yes'):
            coverageArray.append(coverageObj.coverageIfYes)
        else:
            coverageArray.append(coverageObj.coverageIfNo) 
    
    finalCoverage = sum(coverageArray)
    if(finalCoverage < 0):
        finalCoverage = 0

    return Response({"coverage": finalCoverage}, status=status.HTTP_200_OK)


"""
Below Function going to display all the questions for coverage in the data base.
"""
@api_view(['GET'])
def coverageQuestions(request):
    questions = coverageQuestion.objects.all()
    serializer = questionSerializer(questions, many = True)
    return Response(serializer.data)
