const validation = (form) => {
  const errors = {};

  if (form.name === "") {
    errors.name = "* obligatory field";
  }

  if (!form.difficulty) {
    errors.difficulty = "* obligatory field";
  }

  if (!form.duration) {
    errors.duration = "* obligatory field";
  }

  if (!form.season) {
    errors.season = "* obligatory field";
  }

  if (!form.pais.length) {
    errors.pais = "* select at least one country";
  }

  return errors;
};

export default validation;
