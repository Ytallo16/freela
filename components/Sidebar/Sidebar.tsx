"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Componentes de ícone simplificados para evitar dependência externa
const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="h-5 w-5 flex items-center justify-center">{children}</div>
);

// Ícones existentes que vamos reutilizar
const HomeIcon = () => (
  <IconWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  </IconWrapper>
);

const ClipboardDocumentListIcon = () => (
  <IconWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V19.5a2.25 2.25 0 002.25 2.25h.75m0-3h-3a2.25 2.25 0 00-2.25 2.25v.75m0-3h3m-3 3h3m1.5-3h3m-3 3h3M6.75 7.5h3v3h-3v-3z" />
    </svg>
  </IconWrapper>
);

// Novos ícones para as novas opções
const QuestionMarkCircleIcon = () => (
  <IconWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </svg>
  </IconWrapper>
);

const DocumentTextIcon = () => (
  <IconWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  </IconWrapper>
);

const CurrencyDollarIcon = () => (
  <IconWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  </IconWrapper>
);

// Novo ícone de setinha que muda de direção dependendo se está colapsado ou não
const ChevronIcon = ({ collapsed }: { collapsed: boolean }) => (
  <IconWrapper>
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="currentColor"
      className={`transition-transform ${collapsed ? 'rotate-180' : ''}`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  </IconWrapper>
);

// Mantendo apenas o ícone de menu para a versão mobile
const Bars3Icon = () => (
  <IconWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  </IconWrapper>
);

const UserCircleIcon = () => (
  <IconWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  </IconWrapper>
);

const ArrowRightOnRectangleIcon = () => (
  <IconWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
    </svg>
  </IconWrapper>
);

type SidebarProps = {
  userName?: string;
  userRole?: string;
  userImage?: string;
};

type NavItem = {
  name: string;
  href: string;
  icon: () => JSX.Element;
};

export default function Sidebar({ 
  userName = "Dr. Silva", 
  userRole = "Médico",
  userImage
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Navegação atualizada para apontar para as rotas dentro do dashboard
  const navigation: NavItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Anamnese', href: '/dashboard/anamnese', icon: QuestionMarkCircleIcon },
    { name: 'Prontuário', href: '/dashboard/prontuario', icon: ClipboardDocumentListIcon },
    { name: 'Prescrição', href: '/dashboard/prescricao', icon: DocumentTextIcon },
    { name: 'Orçamento', href: '/dashboard/orcamento', icon: CurrencyDollarIcon },
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  // Verificando se a rota atual está ativa (considerando rotas aninhadas)
  const isActiveRoute = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile sidebar toggle button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMobileSidebar}
          className="p-2 rounded-md bg-emerald-500 shadow-md text-white hover:bg-emerald-600 transition-colors"
        >
          <Bars3Icon />
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-white to-emerald-50 shadow-xl z-50 transition-all duration-300 flex flex-col
          ${collapsed ? 'w-20' : 'w-72'} 
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Sidebar header */}
        <div className="p-5 border-b border-emerald-100 flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">CM</span>
              </div>
              <h2 className="ml-3 font-bold text-emerald-800 text-lg">Clínica Médica</h2>
            </div>
          )}
          
          {collapsed && (
            <div className="w-11 h-11 mx-auto rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">CM</span>
            </div>
          )}

          {/* Botão único de setinha para colapsar/expandir */}
          <button
            onClick={toggleSidebar}
            className="text-emerald-600 hover:text-emerald-800 hover:bg-emerald-100 p-1.5 rounded-full transition-all"
          >
            <ChevronIcon collapsed={collapsed} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-6">
          <ul className="space-y-2 px-3">
            {navigation.map((item) => {
              const isActive = isActiveRoute(item.href);
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center py-3.5 px-4 rounded-lg transition-all duration-200
                      ${isActive 
                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md shadow-emerald-200' 
                        : 'text-gray-700 hover:bg-emerald-100 hover:text-emerald-700'
                      }
                      ${collapsed ? 'justify-center' : ''}`}
                  >
                    <span className={isActive ? 'text-white' : ''}>
                      <item.icon />
                    </span>
                    {!collapsed && (
                      <span className={`ml-3.5 font-medium ${isActive ? 'font-semibold' : ''}`}>{item.name}</span>
                    )}
                    {!collapsed && isActive && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-white"></span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User profile */}
        <div className={`p-5 border-t border-emerald-100 mt-auto bg-gradient-to-r from-emerald-50 to-teal-50`}>
          <div className={`flex ${collapsed ? 'justify-center' : 'items-center'}`}>
            <div className="flex-shrink-0">
              {userImage ? (
                <img
                  src={userImage}
                  alt={userName}
                  className="h-11 w-11 rounded-full border-2 border-emerald-300 shadow-sm"
                />
              ) : (
                <div className="h-11 w-11 rounded-full bg-gradient-to-br from-emerald-300 to-teal-400 flex items-center justify-center shadow-sm text-white">
                  <UserCircleIcon />
                </div>
              )}
            </div>
            {!collapsed && (
              <div className="ml-3 min-w-0 flex-1">
                <div className="text-sm font-medium text-emerald-800 truncate">
                  {userName}
                </div>
                <div className="text-xs text-emerald-600 truncate">{userRole}</div>
              </div>
            )}
          </div>
          
          <Link
            href="/logout"
            className={`mt-4 flex items-center py-2.5 px-4 rounded-lg border border-red-200 bg-white
              hover:bg-red-50 transition-all duration-200 shadow-sm
              ${collapsed ? 'justify-center' : ''}`}
          >
            <span className="text-red-600">
              <ArrowRightOnRectangleIcon />
            </span>
            {!collapsed && <span className="ml-2.5 text-red-600 font-medium">Sair</span>}
          </Link>
        </div>
      </aside>
    </>
  );
}
