from authentication.models import *
from froala_editor.fields import FroalaField



class Category(models.Model):
    name = models.CharField(max_length=64)
    icon_class = models.CharField(max_length=128)

    def __str__(self):
        return self.name


class TimeType(models.Model):
    title = models.CharField(max_length=128)

    def __str__(self):
        return self.title


class Article(models.Model):
    title = models.CharField(max_length=256)
    content = FroalaField()
    category = models.ForeignKey('Category', on_delete=models.DO_NOTHING)
    image = models.ImageField(upload_to='media/articles')
    datetime = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey('authentication.Author', on_delete=models.CASCADE, related_name='article_author')
    cost_from = models.CharField(max_length=16,null=True,blank=True)
    cost_to = models.CharField(max_length=16,null=True,blank=True)
    time = models.IntegerField(null=True,blank=True)
    time_type = models.ForeignKey('TimeType', on_delete=models.CASCADE)

    def __str__(self):
        return self.title
