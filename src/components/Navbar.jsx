import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';


// Placeholder auth/role logic. Replace with real auth context or state.
const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
const userRole = localStorage.getItem('role') || 'user'; // 'admin' or 'user'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Create Ticket', href: '/create-ticket', protected: true },
  { name: 'Admin Dashboard', href: '/admin-dashboard', adminOnly: true },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (item) => (e) => {
    if (item.protected && !isLoggedIn) {
      e.preventDefault();
      navigate('/login');
    } else if (item.adminOnly && userRole !== 'admin') {
      e.preventDefault();
      navigate('/login');
    }
    // else allow navigation
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => {
            if (item.adminOnly && userRole !== 'admin') return null;
            if (item.protected && !isLoggedIn) {
              // Show as clickable, but will redirect to login
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={handleNavClick(item)}
                  className="text-sm/6 font-semibold text-gray-100"
                >
                  {item.name}
                </Link>
              );
            }
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={handleNavClick(item)}
                className="text-sm/6 font-semibold text-gray-100"
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {!isLoggedIn ? (
            <Link to="/login" className="text-sm/6 font-semibold text-gray-100">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          ) : (
            <button onClick={handleLogout} className="text-sm/6 font-semibold text-gray-100 bg-transparent border-none cursor-pointer">
              Log out
            </button>
          )}
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-200"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => {
                  if (item.adminOnly && userRole !== 'admin') return null;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={handleNavClick(item)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-100 hover:bg-gray-800"
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
              <div className="py-6">
                {!isLoggedIn ? (
                  <Link
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-100 hover:bg-gray-800"
                  >
                    Log in
                  </Link>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-100 hover:bg-gray-800 bg-transparent border-none cursor-pointer"
                  >
                    Log out
                  </button>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
