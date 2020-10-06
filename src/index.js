import ApolloBoost, { gql } from 'apollo-boost';

const client = new ApolloBoost({
  uri: 'http://localhost:4000',
});

// query object inside client.query method do not accept string but JavaScript absctact type
// convert string to graphql readable abstract type using 'gql' prefixed to template string
const getUsers = gql`
  query {
    users {
      id
      name
    }
  }
`;

const getPosts = gql`
  query {
    posts {
      id
      title
      body
      published
      author {
        name
      }
    }
  }
`;

client
  .query({
    query: getUsers,
  })
  .then((response) => {
    let html = '';

    response.data.users.forEach((user) => {
      html += `
        <div>
          <h3>${user.name}</h3>
        </div>
      `;
    });

    document.getElementById('users').innerHTML = html;
  })
  .catch((error) => {
    console.log('error querying users from apollo client', error);
  });

client
  .query({
    query: getPosts,
  })
  .then((response) => {
    let html = '';

    response.data.posts.forEach((post) => {
      html += `
      <div>
        <h3>${post.title}</h3>
        <h4>isPublished: ${post.published}</h4>
        <h4>Author: ${post.author.name}</h4>
        <p>${post.body}</p>
      </div>
      `;
    });

    document.getElementById('posts').innerHTML = html;
  })
  .catch((error) => {
    console.log('error querying posts from apollo client');
  });
