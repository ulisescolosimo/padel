import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    role: string;
    level: string;
    isProfileComplete: boolean;
    phone?: string;
    createdAt: Date;
  }

  interface Session {
    user: User & {
      id: string;
      role: string;
      level: string;
      isProfileComplete: boolean;
      phone?: string;
      createdAt: Date;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
    level: string;
  }
} 