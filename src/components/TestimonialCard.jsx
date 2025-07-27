export default function TestimonialCard({ text, name, username, avatar, logo, logoAlt, center, dark }) {
  return (
    <div className={`rounded-2xl shadow-lg p-6 ${center ? 'md:col-span-2 text-center' : ''} ${dark ? 'bg-gray-800' : 'bg-white'}`}>
      <div className={`${dark ? 'text-gray-100' : 'text-gray-900'} text-lg mb-4 font-medium`}>{text}</div>
      <div className={`flex items-center ${center ? 'justify-center' : ''} mt-4 gap-3`}>
        <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover" />
        <div className="text-left">
          <div className={`font-semibold leading-tight ${dark ? 'text-gray-100' : 'text-gray-900'}`}>{name}</div>
          <div className={`${dark ? 'text-gray-400' : 'text-gray-500'} text-sm`}>{username}</div>
        </div>
        {logo && (
          <img src={logo} alt={logoAlt} className="ml-auto h-6" />
        )}
      </div>
    </div>
  );
}
