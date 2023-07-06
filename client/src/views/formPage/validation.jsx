const validation = (form) => {
  const errors = {};

  if (form.name === "") {
    errors.name = "Debes seleccionar una actividad";
  }

  if (!form.difficulty) {
    errors.difficulty = "Selecciona un grado de dificultad";
  }

  if (!form.duration) {
    errors.duration = "Selecciona o ingresa un número";
  }

  if (!form.season) {
    errors.season = "Selecciona una temporada";
  }

  if (!form.pais.length) {
    errors.pais = "Debes seleccionar al menos un (1) país";
  }

  return errors;
};

export default validation;
