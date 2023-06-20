useEffect(() => {
  // запрос на все фильмы
  const fetch = async () => {
    return await moviesApi
      .getMovies()
      .then((res) => {
        if (res) {
          const array = [];
          // редактируем пришедшие данные
          res.forEach((movie, index) => {
            // копируем значение
            array[index] = movie;

            // добавляем thumbnail
            array[
              index
            ].thumbnail = `${configApi.Movies.ImageUrl}${movie.image.formats.thumbnail.url}`;

            // меняем image
            array[
              index
            ].image = `${configApi.Movies.ImageUrl}${movie.image.url}`;

            // movieId
            array[index].movieId = movie.id;

            array[index]._id = null;

            // добавляем _id
            savedMovies.length > 0
              ? savedMovies.forEach((savedMovie) => {
                  // сравниваем movieId
                  if (savedMovie.movieId === array[index].movieId) {
                    // если одинаковые, то устанавливаем _id
                    array[index]._id = savedMovie._id;
                  }
                })
              : (array[index]._id = null);
          });

          // записываем их
          setAllMovies(array);

          // ! dev
          if (configSite.status === status.dev)
            console.log(
              "Запрос на сервер с целью получить все фильмы вернул",
              res
            );
        }
      })
      .catch((err) => {
        // ! dev
        if (configSite.status === status.dev)
          console.log(
            `Запрос на сервер с целью получить все фильмы выдал: [${err.message}]`
          );

        // показываем уведомление об ошибке
        if (!err.status)
          addNotification({
            name: "500",
            type: "error",
            text: checkAnswerFromServer("all", "failFetch"),
          });
      })
      .finally(() => {
        setRequestProcessed(false);
      });
  };

  if (isRequestSavedMovies) fetch();
}, [isRequestSavedMovies]);
