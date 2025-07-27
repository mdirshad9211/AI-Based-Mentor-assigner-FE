export default function CTA() {
  return (
    <section className="mx-auto   ">
      <div className=" bg-[#111827] shadow-2xl py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 rounded-3xl" style={{background: 'radial-gradient(ellipse at center bottom, rgba(126,34,206,0.25) 0%, transparent 70%)'}} />
        <div className="relative z-10">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6">Boost your productivity today</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-300 mb-10">
            Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua proident exceptetur commodo do ea.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#"
              className="inline-block rounded-md bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow hover:bg-gray-100 transition"
            >
              Get started
            </a>
            <a
              href="#"
              className="inline-block px-6 py-3 text-base font-semibold text-white hover:underline flex items-center justify-center gap-2"
            >
              Learn more
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
