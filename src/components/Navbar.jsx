import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Logo from "../assets/logo.jpeg"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('user');
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication status on component mount and location change
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      const email = localStorage.getItem('email');
      
      setIsLoggedIn(!!token);
      setUserRole(role || 'user');
      setUserEmail(email || '');
    };

    checkAuthStatus();
  }, [location]); // Re-check when route changes

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Create Ticket', href: '/create-ticket', protected: true },
    { name: 'My Tickets', href: '/all-tickets', protected: true },
    { name: 'Assigned Tickets', href: '/moderator-dashboard', moderatorOnly: true },
    { name: 'Admin Dashboard', href: '/admin-dashboard', adminOnly: true },
    { name: 'Contact', href: '/contact' },
  ];

  const handleNavClick = (item) => (e) => {
    if (item.protected && !isLoggedIn) {
      e.preventDefault();
      navigate('/login');
    } else if (item.adminOnly && userRole !== 'admin') {
      e.preventDefault();
      navigate('/login');
    } else if (item.moderatorOnly && userRole !== 'moderator') {
      e.preventDefault();
      navigate('/login');
    }
    // else allow navigation
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    setIsLoggedIn(false);
    setUserRole('user');
    setUserEmail('');
    navigate('/');
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50 ">
      <nav aria-label="Global" className="flex items-center justify-between p-6  lg:px-8">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Ticket Assistant</span>
            <img
              alt=""
              src={Logo}
              className="h-8 w-auto"
            />
          </Link>
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
            if (item.moderatorOnly && userRole !== 'moderator') return null;
            if (item.protected && !isLoggedIn) return null;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={handleNavClick(item)}
                className="text-sm/6 font-semibold text-gray-100 hover:text-indigo-400 transition-colors"
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-4">
          {!isLoggedIn ? (
            <div className="flex gap-x-4">
              <Link to="/signup" className="text-sm/6 font-semibold text-gray-100 hover:text-indigo-400 transition-colors">
                Sign up
              </Link>
              <Link to="/login" className="text-sm/6 font-semibold text-gray-100 hover:text-indigo-400 transition-colors">
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-x-4">
              <div className="text-sm text-gray-300">
                Welcome, <span className="text-indigo-400 font-medium">{userEmail}</span>
              </div>
              <button 
                onClick={handleLogout} 
                className="text-sm/6 font-semibold text-gray-100 hover:text-red-400 transition-colors bg-transparent border-none cursor-pointer"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Ticket Assistant</span>
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </Link>
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
                  if (item.moderatorOnly && userRole !== 'moderator') return null;
                  if (item.protected && !isLoggedIn) return null;
                  
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleNavClick(item);
                      }}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-100 hover:bg-gray-800"
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
              <div className="py-6">
                {!isLoggedIn ? (
                  <div className="space-y-2">
                    {/* <Link
                      to="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-100 hover:bg-gray-800"
                    >
                      Sign up
                    </Link> */}
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-100 hover:bg-gray-800"
                    >
                      Log in
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="-mx-3 px-3 py-2.5 text-sm text-gray-300">
                      Welcome, <span className="text-indigo-400 font-medium">{userEmail}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-100 hover:bg-gray-800 bg-transparent border-none cursor-pointer w-full text-left"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}