import React from 'react';
import { cleanup, render } from 'react-testing-library';
import CourseForm from './CourseForm';

afterEach(cleanup);

function renderCourseForm(args) {
  let defaultProps = {
    course: {},
    authors: [],
    onSave: () => {},
    onChange: () => {},
    saving: false,
    errors: {}
  };

  const props = { ...defaultProps, ...args };
  return render(<CourseForm {...props} />);
}

it('should render Add Course header', () => {
  const { getByText } = renderCourseForm();
  getByText('Save');
});

it('should label save button as Save when not saving', () => {
  const { getByText } = renderCourseForm();
  getByText('Save');
});

it('should label save button as Saving... when saving', () => {
  const { getByText } = renderCourseForm({ saving: true });
  getByText('Saving...');
});
