var CursorMaintenanceDemo = (function () {

  function commatizeValidator(text) {
    return /^[0-9,]*$/.test(text);
  }

  function setFormatter(input, format, validate) {
    var eventNames = [ 'change', 'keydown', 'keyup', 'click' ],
        previous = { text: '', cursor: 0 },
        i;
    function respond() {
      var text = input.value,
          cursor = input.selectionStart,
          formatted;
      if (text === previous.text) {
        previous.cursor = cursor;
        return;
      }
      if (!validate || validate(text) === true) {
        formatted = format(text, cursor);
        previous = formatted;
      } else {
        formatted = { text: previous.text, cursor: previous.cursor };
      }
      input.value = formatted.text;
      input.setSelectionRange(formatted.cursor, formatted.cursor);
    }
    for (i = 0; i < eventNames.length; ++i) {
      input.addEventListener(eventNames[i], respond);
    }
  }

  function load() {
    setFormatter(document.getElementById('commatizeInput'),
        CursorMaintainer.meta.commatize, commatizeValidator);
  }

  return {
    load: load
  };
})();

onload = CursorMaintenanceDemo.load;
