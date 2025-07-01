'use client';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 shadow text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-white hover:text-blue-400 text-lg font-bold">
          BlogApp
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/" className="hover:text-blue-400 px-3 py-2">Home</Link>

          {session?.user ? (
            <>
              <Link href="/admin/myposts" className="hover:text-blue-400 px-3 py-2">
                My Posts
              </Link>
              <Link href="/admin/create" className="hover:text-blue-400 px-3 py-2">
                Create Post
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="text-red-400 hover:text-red-500 px-3 py-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-blue-400 px-3 py-2">
                Login
              </Link>
              <Link href="/admin/register" className="hover:text-blue-400 px-3 py-2">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;