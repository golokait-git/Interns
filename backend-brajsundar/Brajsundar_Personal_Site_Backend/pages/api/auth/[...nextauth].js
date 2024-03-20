import { dbConn } from "lib/db";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { validatePassword } from "lib/auth";

// import mysql from "mysql2";
const options = {
  providers: [
    // ...add more providers here
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      // type: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.

      async authorize(credentials) {
        // const result = await dbConn({
        //   query: "SELECT * FROM admin_login WHERE email = ? and password =?",
        //   values: [credentials.email, credentials.password],
        // });

        // var connection = await mysql.createConnection(dbConfig);
        // const query = 'SELECT * FROM admin_login WHERE email = ? and password_decrypted = ?';
        // connection.query(query, [credentials.email, credentials.password], (error, results, fields) => {
        //   if (error) {

        //     res.status(200).json({ reel: [], totalReels: 0, message: "Not valid user" });
        //   } else {

        //     return results;

        //     // // Execute the query using dbConn
        //   }
        // });
        // // mongodb
        // const { db } = await connectToDatabase();
        // const collection = db.collection("admin_login");
        const email = credentials.email;
        const password = credentials.password;

        // const result = await collection.findOne({
        //   email: email,
        //   password_decrypted: password,
        // });
        if (email == "admin@gmail.com" && password == "123456") {
          return { id: 1, name: "admin", email: "admin@gmail.com" };
        } else {
          throw new Error("Invalid email or password");
        }

        // if (!result) {
        // } else {
        //   return result;
        // }
      },
    }),
  ],
  secret: "sefsefsefsefsef",

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token;

      return session;
    },
  },
};
export default (req, res) => NextAuth(req, res, options);
// export async function validatePassword(user, inputPassword) {
//     const inputHash = crypto
//         .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
//         .toString('hex');
//     const passwordsMatch = user.hash === inputHash;
//     return passwordsMatch;
// }
