import React from 'react';
import './App.css';

import {
  Radiogroup,
  Radio,
  FormField,
  Checkbox,
  CheckboxGroup,
} from '@flavia-dev/a11y-ui-kit-react';
function App() {
  const options = [
    { value: 'card', label: 'Credit Card' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'bank', label: 'Bank Transfer' },
  ];

  const [values, setValues] = React.useState<string[]>([]);

  return (
    <>
      <h1>Test a11y-ui-kit</h1>
      {/* <div className="card">
        <FormField
          label="Payment method"
          helperText="Choose one option"
          error="Please select a payment method"
        >
          {(props) => (
            <Radiogroup legend="Select your payment method" name="payment" {...props}>
              {radioOptions.map((option) => {
                return <Radio value={option.value} label={option.label} />;
              })}
            </Radiogroup>
          )}
        </FormField>
      </div> */}

      <div className="card">
        <FormField
          label="Payment method"
          helperText="Choose one option"
          error="Please select a payment method"
        >
          {(props) => (
            <CheckboxGroup
              legend="Preferences"
              name="prefs"
              value={values}
              onChange={setValues}
              showSelectAll
            >
              {options.map((option, index) => {
                console.log(index, options.length, option.value);

                return (
                  <Checkbox key={index} label={option.label} value={option.value} {...props} />
                );
              })}
            </CheckboxGroup>
          )}
        </FormField>
      </div>
    </>
  );
}

export default App;
