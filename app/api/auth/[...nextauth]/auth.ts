import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getBaseUrl } from "@/lib/config";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await connectDB();
          
          // Buscar si el usuario ya existe
          const existingUser = await User.findOne({ email: user.email });
          
          if (!existingUser) {
            // Crear nuevo usuario con la imagen de Google
            await User.create({
              email: user.email,
              name: user.name,
              avatar: user.image, // Guardar la imagen de Google
              createdAt: new Date(),
              role: 'user',
              level: 'Iniciación',
              isProfileComplete: false
            });
          } else if (!existingUser.avatar && user.image) {
            // Actualizar el avatar si el usuario existe pero no tiene avatar
            await User.findByIdAndUpdate(existingUser._id, {
              avatar: user.image
            });
          }
          
          return true;
        } catch (error) {
          console.error('Error en signIn callback:', error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session?.user) {
        try {
          await connectDB();
          const user = await User.findOne({ email: session.user.email });
          if (user) {
            session.user.id = user._id.toString();
            session.user.role = user.role;
            session.user.level = user.level;
            session.user.phone = user.phone;
            session.user.image = session.user.image; // Usar la imagen de Google si no hay avatar
            session.user.isProfileComplete = user.isProfileComplete;
            session.user.createdAt = user.createdAt?.toISOString();
          }
        } catch (error) {
          console.error('Error en session callback:', error);
        }
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.id = user.id;
      }
      return token;
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/',
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  useSecureCookies: process.env.NODE_ENV === 'production',
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
}; 