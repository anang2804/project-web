import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Harus pakai SERVICE ROLE untuk query user
);

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          // Cari user berdasarkan email di Supabase
          const { data: user, error } = await supabase
            .from("users") // Ganti sesuai nama tabel
            .select("id, email, username, password") // Ambil hanya yang diperlukan
            .eq("email", email)
            .single();

          if (error || !user) {
            console.log("User not found or error:", error);
            return null;
          }

          // Bandingkan password yang dimasukkan dengan password di database
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            console.log("Password mismatch");
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            username: user.username,
          };
        } catch (error) {
          console.log("Error during authentication:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.username = token.username;
      return session;
    },
  },
};

export const GET = async (req, res) => {
  return NextAuth(req, res, authOptions);
};

export const POST = async (req, res) => {
  return NextAuth(req, res, authOptions);
};
