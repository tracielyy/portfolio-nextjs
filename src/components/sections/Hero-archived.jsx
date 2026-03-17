import { getData } from '@/lib/data';
import { getDictionary } from '@/lib/dictionary';
import Image from 'next/image';

export default function Hero({ locale }) {
  const basicData = getData(locale, 'basic');
  const dict = getDictionary(locale);

  return (

    <section className="py-[30vh] w-screen bg-transparent inset-0">
      {/* Content container with max width */}
      <div className="absolute inset-0 z-10 max-width mx-auto">
        <div className="flex items-stretch justify-between h-full">
          {/* Left side: Text content */}
          <div className="w-2/3 text-left flex flex-col justify-center p-8">
            <h3 className="text-emerald-200 font-medium">{dict.hero.welcome}</h3>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {dict.hero.greetings}
            </h1>
            <p className="text-xl md:text-2xl mb-8 secondary">
              {dict.hero.role}
            </p>
            <div className="flex gap-4">
              {/* Your buttons/links */}
            </div>
          </div>

          {/* Right side: Square/Rectangular image container */}
          <div className="w-1/3 flex justify-end items-stretch">
            <div className="relative w-full max-h-full aspect-square border-white/10 shadow-2xl">
              <img
                src="/images/personal/hero-personal-dp.jpg"
                alt="Your Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>




  )
}