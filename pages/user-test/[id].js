import Link from 'next/link';
import Home from '../../components/Home';

export default function UserDetails({ user }) {
  return (
    <>
      <Link href={`/user-test`}>
        <a style={{ color: '' }}>Return to Index</a>
      </Link>
      <table id="user">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Website</th>
        </tr>
        <tr>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{user.website}</td>
        </tr>
      </table>
    </>
  );
}

// export const getServerSideProps = async (context) => {
//   const response = await fetch(
//     `https://jsonplaceholder.typicode.com/users/${context.params.id}`
//   );

//   const user = await response.json();

//   return {
//     props: {
//       user,
//     },
//   };
// };

export const getStaticProps = async (context) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${context.params.id}`
  );

  const user = await response.json();

  return {
    props: {
      user,
    },
  };
};

export const getStaticPaths = async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users`);

  const users = await response.json();

  const ids = users.map((user) => user.id);

  // paths : {params : {id:'1',id:'2'}}
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};
