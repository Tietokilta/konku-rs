import { Button } from "./Button"

const DevFillButton = ({
  setValue,
}: {
  setValue: (key: string, value: string) => void
}) => {
  const fillForm = () => {
    setValue("fname", "Test")
    setValue("lname", "Tester")
    setValue("address", "Test Address 11")
    setValue("zip", "02150")
    setValue("city", "Otaniemi")
    setValue("phone", "0401234567")
    setValue("email", "test.tester@testmail.com")
    setValue("iban", "FI49 5000 9420 0287 30")
    setValue("topic", "test topic")
    setValue(
      "description",
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pellentesque purus eu aliquam vestibulum. Proin congue enim risus, eget rutrum nulla interdum ac. Proin eget leo in ligula accumsan congue sit amet a quam. Nullam dictum, justo at consectetur convallis, nibh erat cursus lacus, eget porttitor leo nisl id diam. Vivamus rhoncus libero ipsum, et auctor dui convallis ornare. Nulla facilisi. Proin at urna consectetur libero commodo porttitor. Sed sed condimentum sapien, eget convallis nisi. Cras ut augue ac purus eleifend egestas sed sit amet tellus."
    )
    setValue("other", "hello world")
  }

  return (
    <Button type="button" onClick={fillForm}>
      fill form
    </Button>
  )
}

export default DevFillButton
