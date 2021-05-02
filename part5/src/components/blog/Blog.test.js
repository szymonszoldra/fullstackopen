import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Blog from './Blog.component';

describe('Blog component', () => {
  test('renders title and author and doesn\'t render url and likes by default', () => {
    const blog = {
      author: 'Dan Abramov',
      title: 'Overreacted',
      url: 'overreacted.io',
      likes: 1,
      user: {
        username: 'szymon',
        name: 'Szymon',
        id: '2902849128409'
      },
      id: '1242141212412'
    };

    const user = 'szymon';
    const blogs = [];
    const setBlogs = () => null;

    const component = render(
      <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} loggedUser={user} />
    );

    expect(component.container).toHaveTextContent(blog.title);
    expect(component.container).toHaveTextContent(blog.author);
    expect(component.container).not.toHaveTextContent(blog.url);
    expect(component.container).not.toHaveTextContent(blog.likes);
  });
});
