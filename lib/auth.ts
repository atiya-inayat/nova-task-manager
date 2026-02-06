// this file configures NextAuth with credientials providers, callbacks and session management

import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { connectDB } from "./db";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    // 1 hour = 60 * 60
    // 1 day = 24 * 60 * 60
    maxAge: 24 * 60 * 60, // The user will be logged out after 24 hours

    // How often the session is "refreshed" while the user is active
    updateAge: 1 * 60 * 60, // Refresh the session every 1 hour
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // authorize() - This is where login actually happens.
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        // coneect to db
        await connectDB();
        // Find user in DB
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("User not found");
        }

        // Check if blocked
        if (user.isBlocked) {
          throw new Error("User is blocked");
        }
        // Compare password
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        // Return user data → session created
        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    // jwt callback → runs when token is created
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    // session callback → controls what frontend receives
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};

// “How do you add custom fields to NextAuth session?”
// “By extending NextAuth types using module augmentation.”
