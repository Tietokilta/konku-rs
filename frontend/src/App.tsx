import { Button } from "./input/Button"
import { TextField } from "./input/TextField"

const App = () => {
  return (
    <main className="m-4">
      <h1 className="font-mono font-bold text-2xl mb-4">Laskugeneraattori</h1>
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
          </div>
        </fieldset>
        <Button>Lähetä</Button>
      </form>
    </main>
  )
}

export default App
