import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';

export default function Contact() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#232946] via-[#161b22] to-[#232946] py-12 px-2">
      <div className="w-full max-w-6xl rounded-2xl overflow-hidden shadow-2xl border border-gray-800 bg-[#181c2a]/90 backdrop-blur-md">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left info panel */}
          <div className="relative px-10 py-14 flex flex-col justify-between min-h-[500px] bg-gradient-to-br from-[#232946]/80 via-[#232946]/60 to-[#181c2a]/80">
            <div>
              <h2 className="text-4xl font-extrabold text-white mb-6">Get in touch</h2>
              <p className="text-gray-300 mb-10 max-w-md">Ready to streamline your support process? Contact our AI-powered ticket management team for expert assistance and personalized solutions tailored to your business needs.</p>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <MapPinIcon className="h-6 w-6 text-gray-400 mt-1" />
                  <div>
                    <div className="font-semibold text-white">A-42, Sector 63, Noida</div>
                    <div className="text-gray-400">Delhi NCR, 201301, India</div>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <PhoneIcon className="h-6 w-6 text-gray-400" />
                  <span className="text-gray-300">+91 11 4567 8900</span>
                </li>
                <li className="flex items-center gap-4">
                  <EnvelopeIcon className="h-6 w-6 text-gray-400" />
                  <span className="text-gray-300">support@aiticketassistant.com</span>
                </li>
              </ul>
            </div>
          </div>
          {/* Right form panel */}
          <div className="bg-[#181c2a]/80 px-10 py-14 flex items-center">
            <form className="w-full max-w-lg mx-auto space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-white mb-2">First name</label>
                  <input id="firstName" name="firstName" type="text" autoComplete="given-name" className="block w-full rounded-md border border-gray-700 bg-[#232946] text-white px-4 py-2 focus:border-pink-500 focus:ring-pink-500 outline-none" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-white mb-2">Last name</label>
                  <input id="lastName" name="lastName" type="text" autoComplete="family-name" className="block w-full rounded-md border border-gray-700 bg-[#232946] text-white px-4 py-2 focus:border-pink-500 focus:ring-pink-500 outline-none" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" className="block w-full rounded-md border border-gray-700 bg-[#232946] text-white px-4 py-2 focus:border-pink-500 focus:ring-pink-500 outline-none" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-white mb-2">Phone number</label>
                <input id="phone" name="phone" type="tel" autoComplete="tel" className="block w-full rounded-md border border-gray-700 bg-[#232946] text-white px-4 py-2 focus:border-pink-500 focus:ring-pink-500 outline-none" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">Message</label>
                <textarea id="message" name="message" rows={4} className="block w-full rounded-md border border-gray-700 bg-[#232946] text-white px-4 py-2 focus:border-pink-500 focus:ring-pink-500 outline-none resize-none" />
              </div>
              <div>
                <button type="submit" className="rounded-md bg-indigo-500 px-6 py-2 text-white font-semibold shadow hover:bg-indigo-600 transition">Send message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
