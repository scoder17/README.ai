from django.shortcuts import render

# Create your views here.

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests
from django.conf import settings
import re

class GenerateReadme(APIView):
    def post(self, request):
        repo_url = request.data.get("repo_url")
        if not repo_url:
            return Response({"error": "Repo URL required"}, status=400)

        prompt = f"Generate a professional README.md file for the GitHub repository at this URL: {repo_url}"

        try:
            response = requests.post(
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
                headers={"Content-Type": "application/json"},
                params={"key": settings.GEMINI_API_KEY},
                json={
                    "contents": [{"parts": [{"text": prompt}]}]
                },
            )
            response.raise_for_status()
            readme = response.json()["candidates"][0]["content"]["parts"][0]["text"]
            
            # Clean the markdown code block markers
            readme = self.clean_markdown_blocks(readme)
            
            return Response({"readme": readme})
        except Exception as e:
            return Response({"error": str(e)}, status=500)
    
    def clean_markdown_blocks(self, text):
        """Remove markdown code block markers from the text"""
        text = re.sub(r'^```markdown\s*\n?', '', text, flags=re.MULTILINE)
        # Remove ``` at the end
        text = re.sub(r'\n?```\s*$', '', text, flags=re.MULTILINE)
        # Remove any remaining standalone ``` lines
        text = re.sub(r'^```\s*$', '', text, flags=re.MULTILINE)
        
        return text.strip()