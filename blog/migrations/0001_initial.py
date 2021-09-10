# Generated by Django 3.2.6 on 2021-09-06 14:44

from django.db import migrations, models
import django.db.models.deletion
import froala_editor.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('icon_class', models.CharField(max_length=128)),
            ],
        ),
        migrations.CreateModel(
            name='TimeType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=128)),
            ],
        ),
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=256)),
                ('content', froala_editor.fields.FroalaField()),
                ('image', models.ImageField(upload_to='media/articles')),
                ('datetime', models.DateTimeField(auto_now_add=True)),
                ('cost_from', models.CharField(blank=True, max_length=16, null=True)),
                ('cost_to', models.CharField(blank=True, max_length=16, null=True)),
                ('time', models.IntegerField(blank=True, null=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='article_author', to='authentication.author')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='blog.category')),
                ('time_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='blog.timetype')),
            ],
        ),
    ]