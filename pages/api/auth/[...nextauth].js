import User from '../../../models/user';
import dbConnect from '../../../config/dbConnect';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
        dbConnect();

        const { email, password } = credentials;

        // check if emaill and passoword is entered
        if (!email || !password)
          throw new Error('Please Eenter email and/or password');

        // find user in the database
        const user = await User.findOne({ email }).select('+password');

        if (!user) throw new Error('Invalid Email or Password');

        // check if password is correct
        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) throw new Error('Invalid Email or Password');

        return user;
      },
    }),
  ],
  secret: 'w3E53nzCKrR3KNLJxXYoRcp8hWfO/Jjr1xesMj2g8Ww=',
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);

      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;

      return session;
    },
  },
});
