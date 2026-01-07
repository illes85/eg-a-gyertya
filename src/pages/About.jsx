import { Link } from 'react-router-dom';
import { ArrowLeft, Leaf, Heart, Recycle } from 'lucide-react';
import illesPortrait from '../img/illes-01.png';

const About = () => {
  return (
    <div className="min-h-screen bg-wax-100 font-sans text-earth-dark">
      <main className="pt-16">
        {/* Hero */}
        <div className="relative h-[400px] md:h-[500px]">
           <img 
            src="https://images.unsplash.com/photo-1602143407151-11115a32ac01?auto=format&fit=crop&q=80&w=1920" 
            alt="Műhely hangulat" 
            className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
             <div className="text-center text-white px-4">
                <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">A Mi Történetünk</h1>
                <p className="text-lg md:text-xl font-light max-w-2xl mx-auto">
                    Ahol a szenvedély találkozik a természettel. Ismerd meg a "Ég a gyertya" lelkét.
                </p>
             </div>
           </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 py-20 space-y-24">
            
            {/* Küldetés */}
            <section className="text-center">
                <span className="text-lavender font-bold uppercase tracking-widest text-sm">Küldetésünk</span>
                <h2 className="text-3xl font-serif font-bold mt-2 mb-6">Fényt vinni a mindennapokba</h2>
                <p className="text-lg text-earth leading-relaxed">
                    Hisszük, hogy egy gyertya több, mint fényforrás. Emlékeket ébreszt, megnyugtat, és otthonná varázsolja a teret.
                    Célunk, hogy olyan környezetbarát, egészséges alternatívát nyújtsunk a hagyományos paraffingyertyákkal szemben, 
                    amelyek nemcsak szépek, de a lelkednek is jót tesznek.
                </p>
            </section>

            {/* Értékek */}
            <section className="grid md:grid-cols-3 gap-12">
                <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Leaf className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-xl mb-2">100% Szójaviasz</h3>
                    <p className="text-earth">
                        Természetes, biológiailag lebomló alapanyagot használunk, amely tisztábban és hosszabb ideig ég.
                    </p>
                </div>
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-xl mb-2">Szeretettel Készítve</h3>
                    <p className="text-earth">
                        Minden gyertya kézzel készül kis műhelyünkben, odafigyelve minden apró részletre.
                    </p>
                </div>
                <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Recycle className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-xl mb-2">Környezettudatosság</h3>
                    <p className="text-earth">
                        Csomagolásunk műanyagmentes, üvegeink pedig könnyen újrahasznosíthatók vagy újratölthetők.
                    </p>
                </div>
            </section>

             {/* A Készítő */}
            <section className="flex flex-col md:flex-row items-center gap-12 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-wax-200">
                <div className="w-full md:w-1/3 aspect-square rounded-2xl overflow-hidden shadow-lg">
                    <img 
                        src={illesPortrait}
                        alt="Készítő portré" 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="w-full md:w-2/3 text-center md:text-left">
                    <h2 className="text-3xl font-serif font-bold mb-4">Szia, Illés vagyok!</h2>
                    <p className="text-earth text-lg leading-relaxed mb-6">
                        Mindig is vonzott a természet és az alkotás. A gyertyakészítés számomra a nyugalom szigete ebben a rohanó világban. 
                        Remélem, hogy alkotásaim neked is annyi örömöt okoznak majd használat közben, mint nekem az elkészítésük.
                    </p>
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Signature_sample.svg/1200px-Signature_sample.svg.png" 
                        alt="Aláírás" 
                        className="h-12 opacity-50 mx-auto md:mx-0"
                    />
                </div>
            </section>
        </div>

        {/* Footer */}
        <footer className="bg-earth-dark text-white py-12 text-center">
            <p className="text-wax-200">Készült szenvedéllyel. © 2026 Ég a gyertya.</p>
        </footer>
      </main>
    </div>
  );
};

export default About;
