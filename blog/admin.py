from django.apps import apps
from django.contrib import admin
from django.contrib.admin.sites import AlreadyRegistered

app_models = apps.get_app_config('blog').get_models()
for model in app_models:
    try:
        admin.site.register(model)
    except AlreadyRegistered:
        pass

app_models_2 = apps.get_app_config('authentication').get_models()
for model in app_models_2:
    try:
        admin.site.register(model)
    except AlreadyRegistered:
        pass