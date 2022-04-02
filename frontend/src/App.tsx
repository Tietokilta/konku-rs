import { Button } from "./input/Button"
import { Checkbox } from "./input/Checkbox"
import { TextField } from "./input/TextField"

const App = () => {
  return (
    <div className="m-4">
      <header>
        <h1 className="font-mono font-bold text-2xl mb-4">Laskugeneraattori</h1>
      </header>
      {/* <InvoicePreview /> */}
      <form>
        <fieldset className="border border-tikgray p-4">
          <legend className="font-mono font-bold text-lg">Perustiedot</legend>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2">
              <TextField label="Etunimi" name="fname" />
            </div>
            <div className="col-span-2">
              <TextField label="Sukunimi" name="lname" />
            </div>
            <div className="col-span-2">
              <TextField label="Katuosoite" name="address" />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <TextField label="Postinumero" name="zip" />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <TextField label="Postitoimipaikka" name="city" />
            </div>
            <div className="col-span-2">
              <TextField type="tel" label="Puhelinnumero" name="phone" />
            </div>
            <div className="col-span-2">
              <TextField type="email" label="Sähköpostiosoite" name="email" />
            </div>
            <div className="col-span-2 md:col-span-4">
              <Checkbox label="Tallenna perustiedot seuraavaa kertaa varten" />
            </div>
          </div>
        </fieldset>
        <Button>Lähetä</Button>
      </form>
    </div>
  )
}

export default App
