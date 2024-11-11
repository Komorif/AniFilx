import datetime

from django.db import models
from django.utils import timezone


GENRE_CHOICES = [
    ("Comedy", "Комедии"),
    ("Cartoons", "Мультфильмы"),
    ("Horror", "Ужасы"),
    ("Fantastic", "Фантастика"),
    ("Thrillers", "Триллеры"),
    ("Fighters", "Боевики"),
    ("Melodramas", "Мелодрамы"),
    ("Detectives", "Детективы"),
    ("Adventures", "Приключения"),
    ("Fantasy", "Фэнтези"),
    ("Military", "Военные"),
    ("Family", "Семейные"),
    ("Anime", "Аниме"),
    ("Historical", "Исторические"),
    ("Dramas", "Драмы"),
    ("Documentary", "Документальные"),
    ("Children's", "Детские"),
    ("Crime", "Криминал"),
    ("Biographies", "Биографии"),
    ("Westerns", "Вестерны"),
    ("Film Noir", "Фильмы-нуар"),
    ("Sports", "Спортивные"),
    ("Real TV", "Реальное ТВ"),
    ("Short films", "Короткометражки"),
    ("Musical", "Музыкальные"),
    ("Musicals", "Мюзиклы"),
    ("Talk show", "Ток-шоу"),
    ("Games", "Игры"),
]

GENRE_MAIN_CHOICES = [
    ("series", "Сериалы"),
    ("anime", "Аниме"),
    ("films", "Фильмы"),
]

class ModelVideo(models.Model):    
    image = models.ImageField(upload_to='images/', null=True)
    title_en = models.CharField(max_length=50)
    title_ru = models.CharField(max_length=50)
    genre = models.CharField(max_length=50, null=True, choices=GENRE_CHOICES, default="Comedy")

    main_genre = models.CharField(max_length=50, null=True, choices=GENRE_MAIN_CHOICES, default="series")

    date = models.DateField(default=timezone.now, null=True)
    description = models.CharField(max_length=130)