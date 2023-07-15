const validation = (form) => {
  const errors = {};

  if (form.name === "") {
    errors.name = "*";
  }

  if (!form.difficulty) {
    errors.difficulty = "*";
  }

  if (!form.duration) {
    errors.duration = "*";
  }

  if (!form.season) {
    errors.season = "*";
  }

  if (!form.pais.length) {
    errors.pais = "* select at least one country";
  }

  return errors;
};

export default validation;
