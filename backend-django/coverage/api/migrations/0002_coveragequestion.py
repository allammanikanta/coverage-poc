# Generated by Django 3.1.5 on 2021-01-30 07:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='coverageQuestion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField(max_length=2000)),
                ('coverageIfYes', models.IntegerField()),
                ('coverageIfNo', models.IntegerField()),
            ],
        ),
    ]
