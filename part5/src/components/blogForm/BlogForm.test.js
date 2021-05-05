import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm.component';

describe('BlogForm component', () => {
  test('calls the event handler with the right details', () => {
    const handleAddNewBlog = jest.fn();

    const component = render(
      <BlogForm handleAddNewBlog={handleAddNewBlog} />
    );

    const form = component.container.querySelector('form');
    const inputTitle = component.container.querySelector('input[name="Title"]');
    const inputAuthor = component.container.querySelector('input[name="Author"]');
    const inputUrl = component.container.querySelector('input[name="Url"]');

    const title = 'Overreacted';
    const author = 'Dan Abramov';
    const url = 'overreacted.io';

    fireEvent.change(inputTitle, {
      target: { value: title }
    });

    fireEvent.change(inputAuthor, {
      target: { value: author }
    });

    fireEvent.change(inputUrl, {
      target: { value: url }
    });

    fireEvent.submit(form);
    const sentObject = handleAddNewBlog.mock.calls[0][0];

    expect(handleAddNewBlog.mock.calls).toHaveLength(1);
    expect(sentObject.title).toBe(title);
    expect(sentObject.author).toBe(author);
    expect(sentObject.url).toBe(url);
  });
});