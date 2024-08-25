from django.shortcuts import render
from django.http import JsonResponse
import json
import base64

import io
from django.core.files.base import File
# Create your views here.
def index(request):
    data = json.loads(request.body.decode("utf-8"))
    blob = data["blob"].split(",")

    blob_info = blob[0].strip("data:").split(";")
    image_info = blob_info[0].split("/")
    image_name = image_info[0]
    image_format = image_info[1]
    blob_format = blob_info[1]
    blob_body = blob[1]

    with open(f"images/{image_name}.{image_format}", "wb") as fh:
        fh.write(base64.decodebytes(blob_body.encode()))

    return JsonResponse({"error": 0,"message": "success"})