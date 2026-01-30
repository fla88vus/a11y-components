import './App.css';
import { Radio } from '@flavia-dev/a11y-ui-kit-react/atoms/Radio';
import { Input } from '@flavia-dev/a11y-ui-kit-react/atoms/Input';
function App() {
  return (
    <>
      <div></div>
      <h1>Test a11y-ui-kit</h1>
      <div className="card">
        {/* <Input label="Input" onChange={(e) => console.log(e.target.value)} /> */}
        <Radio name="payment" value="card" label="Credit Card" />
        <Radio name="payment" value="paypal" label="PayPal" />
        <Radio name="payment" value="bank" label="Bank Transfer" />
      </div>
    </>
  );
}

export default App;
