import { useSession, signIn, signOut, getProviders } from "next-auth/react";

const Login = ({ providers }) => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        JSON Example {JSON.stringify(session)}
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const providers = await getProviders();

  return {
    props: { providers },
  };
};

export default Login;
