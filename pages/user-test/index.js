import Link from 'next/link';

export default function Index({ users }) {
  return (
    <>
      <table id="users">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Details</th>
        </tr>
        {users.map((u) => (
          <tr>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>
              <Link href={`/user-test/${u.id}`}>
                <a style={{ color: '' }}>View Details</a>
              </Link>
            </td>
          </tr>
        ))}
      </table>
    </>
  );
}

export const getStaticProps = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');

  const users = await response.json();

  return {
    props: {
      users,
    },
  };
};
