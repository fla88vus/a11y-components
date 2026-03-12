import React from 'react';
import './App.css';

import { FormField, Textarea } from '@flavia-dev/a11y-ui-kit-react';
function App() {
  return (
    <>
      <h1>Test a11y-ui-kit</h1>
      {/* TEXTAREA — Default */}
      <div className="card">
        <FormField label="Bio" helperText="Descrivi te stesso in poche parole">
          {(fieldProps) => (
            <Textarea
              {...fieldProps}
              rows={4}
              placeholder="Scrivi qui..."
              showCounter
              maxLength={200}
            />
          )}
        </FormField>
      </div>

      {/* TEXTAREA — Error */}
      <div className="card">
        <FormField label="Bio" error="Il campo è obbligatorio" required>
          {(fieldProps) => (
            <Textarea
              {...fieldProps}
              rows={4}
              placeholder="Scrivi qui..."
              showCounter
              maxLength={200}
            />
          )}
        </FormField>
      </div>

      {/* TEXTAREA — Disabled */}
      <div className="card">
        <FormField label="Bio" helperText="Non modificabile">
          {(fieldProps) => (
            <Textarea {...fieldProps} rows={4} disabled defaultValue="Testo non modificabile" />
          )}
        </FormField>
      </div>

      {/* TEXTAREA — Controlled */}
      <div className="card">
        <FormField label="Messaggio" helperText="Modalità controllata">
          {(fieldProps) => {
            const [value, setValue] = React.useState('');
            return (
              <Textarea
                {...fieldProps}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                rows={4}
                placeholder="Scrivi qui..."
                showCounter
                maxLength={200}
              />
            );
          }}
        </FormField>
      </div>
    </>
  );
}

export default App;
