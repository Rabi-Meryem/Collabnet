'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const goToSignupChercheur = () => {
    router.push('/signup-chercheur');
  };

  const goToSignupEntreprise = () => {
    router.push('/signup-entreprise');
  };

  return (
    <main className="bg-[#0b1526] text-white font-sans">
      {/* Header Section */}
      <section className="relative h-[50vh] w-full">
        <Image
          src="/homepic.jpg"
          alt="Background"
          fill
          className="object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Accelerate your  scientific <br /> innovation projects
          </h1>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={goToSignupEntreprise}
              className="px-6 py-3 bg-[#3db6f7] text-white rounded-lg hover:bg-[#319ed6] transition"
            >
            Publish a need
            </button>
            <button
              onClick={goToSignupChercheur}
              className="px-6 py-3 bg-[#1f3c88] text-white rounded-lg hover:bg-[#162b6f] transition"
            >
             Find a project
          
            </button>
            <button
              onClick={() => router.push('/login-chercheur')}
              className="px-6 py-3 bg-[#45B4D0] text-white rounded-lg hover:bg-[#3aa0b9] transition"
            >
             Log in
            </button>
          </div>
        </div>
      </section>

      {/* Platform Description */}
      <section className="py-12 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">
          The platform connecting researchers and companies
          </h2>
          <p className="text-gray-10">
          Facilitate collaboration in research & development and innovation by connecting companies with research laboratories and university researchers
          </p>
        </div>
        <Image
          src="/img 1.webp"
          alt="Handshake"
          width={300}
          height={200}
          className="rounded-xl shadow-lg"
        />
      </section>

      {/* Stats */}
      <section className="py-12 border-t border-gray-700">
        <h3 className="text-center text-2xl font-semibold mb-10">Impact statistics</h3>
        <div className="flex justify-center gap-12 text-center">
          <div>
            <p className="text-4xl font-bold text-[#3db6f7]">200+</p>
            <p className="text-gray-300">Registered researchers</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-[#3db6f7]">150</p>
            <p className="text-gray-300">Published projects</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-[#3db6f7]">300</p>
            <p className="text-gray-300">Connections</p>
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h3 className="text-center text-2xl font-semibold mb-10">Why join our platform</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#0e1d34] p-6 rounded-xl text-center">
            <p className="text-lg font-medium">Extensive network of researchers and companies</p>
          </div>
          <div className="bg-[#0e1d34] p-6 rounded-xl text-center">
            <p className="text-lg font-medium">Targeted and personalized project calls</p>
          </div>
          <div className="bg-[#0e1d34] p-6 rounded-xl text-center">
            <p className="text-lg font-medium">Research tools and secure messaging</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0b1526] border-t border-gray-800 py-8 px-6">
        <div className="flex flex-col md:flex-row justify-between max-w-6xl mx-auto text-sm text-gray-400">
          <div>
            <p>© 2025 CollabScience. All rights reserved</p>
            <p>Powered by Next.js, Supabase, and Vercel. Designed with ❤️ using Figma.</p>
          </div>
          <div className="mt-6 md:mt-0">
            <p className="font-semibold text-white mb-2">Quick Links</p>
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
          <div className="mt-6 md:mt-0">
            <p className="font-semibold text-white mb-2">Contact Us</p>
            <div className="flex gap-3">
              <Image src="/email logo.webp" alt="gmail" width={20} height={20} />
              <Image src="/logo linkdin 1.jpeg" alt="linkedin" width={20} height={20} />
              <Image src="/LOGO github 1.webp" alt="github" width={20} height={20} />
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
