from django.urls import path
from .views import GenerateReadme

urlpatterns = [
    path("generate-readme/", GenerateReadme.as_view(), name="generate-readme"),
]
