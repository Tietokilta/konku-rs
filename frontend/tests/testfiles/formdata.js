;(function (window) {
  "use strict"
  var document = window.document,
    fieldValueMap = {
      fname: "Test",
      lname: "Tester",
      address: "Test Address 11",
      zip: "02150",
      city: "Otaniemi",
      phone: "0401234567",
      email: "test.tester@testmail.com",
      iban: "FI49 5000 9420 0287 30",
      topic: "test topic",
      description:
        " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pellentesque purus eu aliquam vestibulum. Proin congue enim risus, eget rutrum nulla interdum ac. Proin eget leo in ligula accumsan congue sit amet a quam. Nullam dictum, justo at consectetur convallis, nibh erat cursus lacus, eget porttitor leo nisl id diam. Vivamus rhoncus libero ipsum, et auctor dui convallis ornare. Nulla facilisi. Proin at urna consectetur libero commodo porttitor. Sed sed condimentum sapien, eget convallis nisi. Cras ut augue ac purus eleifend egestas sed sit amet tellus.",
      other: "hello world",
    }

  Object.keys(fieldValueMap).forEach(function (name) {
    var input =
      document.querySelector("form input[name='" + name + "']") ||
      document.querySelector("form select[name='" + name + "']") ||
      document.querySelector("form textarea[name='" + name + "']")

    input && input.type !== "hidden" && (input.value = fieldValueMap[name])
  })
})(window)
