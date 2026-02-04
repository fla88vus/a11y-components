// import { render, screen } from '@testing-library/react';
// import { axe, toHaveNoViolations } from 'jest-axe';
// import { describe, it, expect } from 'vitest';
// import { Radio } from './Radio';

// expect.extend(toHaveNoViolations);

// describe('Radio - a11y', () => {
//   it('has no accessibility violations by default', async () => {
//     const { container } = render(<Radio label="Option A" />);
//     const results = await axe(container);
//     expect(results).toHaveNoViolations();
//   });

//   it('has no violations when checked and in group', async () => {
//     const { container } = render(
//       <fieldset>
//         <legend>Choose</legend>
//         <Radio label="A" name="g" />
//         <Radio label="B" name="g" defaultChecked />
//       </fieldset>
//     );
//     expect(await axe(container)).toHaveNoViolations();
//   });

//   it('has no violations when disabled', async () => {
//     const { container } = render(<Radio label="Option A" disabled />);
//     expect(await axe(container)).toHaveNoViolations();
//   });
// });
