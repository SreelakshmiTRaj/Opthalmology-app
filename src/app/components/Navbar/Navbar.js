// // import Link from "next/link";

// // export default function Navbar() {
// //   return (
// //     <header className="top-0 left-0 w-full z-50 bg-black/5 text-white py-4 px-8 ">
// //       <div className="container mx-auto flex justify-between items-center relative">

        
// //         <div className="flex items-center space-x-4">
// //           <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center"></div>
// //           <span className="absolute left-[90px] top-3 text-lg uppercase tracking-wider whitespace-nowrap">
// //             LOGO
// //           </span>
// //           <span className="absolute left-[90px] bottom-3 text-xs uppercase tracking-wider whitespace-nowrap">
// //             LOGO SUBTITLE
// //           </span>
// //         </div>

// //         <nav className="flex items-center space-x-0">
// //           <div className="bg-slate-800 h-10 flex space-x-4 text-sm font-medium rounded-lg">
// //             <Link
// //               href="/"
// //               className="px-3 py-2 text-sky-400 hover:text-sky-300 transition duration-150"
// //             >
// //               Home
// //             </Link>
// //             <Link
// //               href="/services"
// //               className="px-3 py-2 text-white hover:text-gray-300 transition duration-150"
// //             >
// //               Services
// //             </Link>
// //             <Link
// //               href="/eye-is-the-window"
// //               className="px-3 py-2 text-white hover:text-gray-300 transition duration-150 whitespace-nowrap"
// //             >
// //               Eye is the Window
// //             </Link>
// //             <Link
// //               href="/for-sites"
// //               className="px-3 py-2 text-white hover:text-gray-300 transition duration-150 whitespace-nowrap"
// //             >
// //               For Sites
// //             </Link>
// //             <Link
// //               href="/company"
// //               className="px-3 py-2 text-white hover:text-gray-300 transition duration-150"
// //             >
// //               Company
// //             </Link>
// //           </div>

// //           <div className="flex space-x-3">
// //             <Link
// //               href="/investigator"
// //               className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-4 rounded-lg transition duration-150 text-sm whitespace-nowrap"
// //             >
// //               Become an Investigator
// //             </Link>

// //             <Link
// //               href="/participant"
// //               className="bg-white hover:bg-gray-100 text-gray-900 font-medium py-2 px-4 rounded-lg transition duration-150 text-sm whitespace-nowrap border border-white"
// //             >
// //               Become Study Participant
// //             </Link>

// //             <button className="h-10 w-10 bg-slate-900 rounded-r-full flex items-center justify-center text-sky-400 hover:bg-sky-500 hover:text-white transition duration-150">
// //               <svg
// //                 className="w-5 h-5"
// //                 fill="none"
// //                 stroke="currentColor"
// //                 viewBox="0 0 24 24"
// //                 xmlns="http://www.w3.org/2000/svg"
// //               >
// //                 <path
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth="2"
// //                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
// //                 ></path>
// //               </svg>
// //             </button>
// //           </div>
// //         </nav>
// //       </div>
// //     </header>
// //   );
// // }

// import Link from 'next/link';

// const Navbar = () => {
//   const navLinks = [
//     { title: 'Home', href: '/' },
//     { title: 'Services', href: '/services' },
//     { title: 'Eye is the Window', href: '/eye-is-the-window' },
//     { title: 'For Sites', href: '/for-sites' },
//     { title: 'Company', href: '/company' },
//   ];

//   const ACTIVE_TEXT_COLOR = '#3AADED'; 
//   const ACTIVE_BG_COLOR = '#2B3F56';
//   const PRIMARY_BLUE_BG = '#489FF5'; 
//   const NAV_DARK_BG = '#192A40';

//   return (
//     <header 
//       className="fixed top-0 z-50 w-full h-[105px]"
//       style={{ 
//         backgroundColor: 'rgba(3, 21, 36, 0.7)', 
//         backdropFilter: 'blur(15px)',
//       }}
//     >
//       <div 
//         className="flex items-center justify-between mx-auto max-w-[1366px] h-full px-4 lg:px-8"
//       >
//         <div 
//           className="flex items-center h-[82px] w-[266px]" 
//           style={{ position: 'relative', top: '12px' }} 
//         >
//           <div className="rounded-full bg-white w-[82px] h-[82px] absolute left-0 top-0 transform -translate-y-1/2" 
//                 style={{ top: '50%' }}
//                 role="img" 
//                 aria-label="Logo Icon">
//           </div>
          
//           <div className="ml-[100px] flex flex-col justify-center h-full">
//             <div 
//               className="text-white" 
//               style={{ 
//                 fontSize: '34px', 
//                 fontWeight: 900, 
//                 lineHeight: '100%', 
//                 height: '24px', 
//               }}
//             >
//                 LOGO
//             </div>
//             <div 
//               className="text-gray-200 mt-4" 
//               style={{ 
//                 fontSize: '14px', 
//                 fontWeight: 700, 
//                 lineHeight: '100%', 
//                 height: '17px', 
//               }}
//             >
//                 LOGO SUBTITLE
//             </div>
//           </div>
//         </div>

//         <nav className="flex items-center space-x-4 lg:space-x-6">
          
//           <div 
//             className="hidden lg:flex items-center rounded-lg px-2"
//             style={{ 
//                 width: '508px', 
//                 height: '45px', 
//                 backgroundColor: NAV_DARK_BG 
//             }}
//           >
//             {navLinks.map((link) => (
//               <Link
//                 key={link.title}
//                 href={link.href}
//                 className={`
//                   text-[14px] leading-none py-2 transition duration-150 rounded-md
//                   ${link.title === 'Home' 
//                     ? `text-[${ACTIVE_TEXT_COLOR}] font-semibold bg-[${ACTIVE_BG_COLOR}] px-4` 
//                     : 'text-white font-normal opacity-80 px-4 hover:text-white hover:opacity-100'}
//                 `}
//               >
//                 {link.title}
//               </Link>
//             ))}
//           </div>

//           <div className="hidden md:flex space-x-3">
//             <button className="
//               px-5 py-3 text-base font-semibold 
//               bg-primary-blue text-white rounded-md 
//               shadow-lg hover:bg-opacity-90 transition
//             ">
//               Become an Investigator
//             </button>

//             <button className="
//               px-5 py-3 text-base font-semibold 
//               bg-white text-primary-blue rounded-md 
//               border border-primary-blue
//               hover:bg-gray-100 transition
//             ">
//               Become Study Participant
//             </button>
//           </div>
          
//           <div className="p-3 bg-nav-dark-bg rounded-full hover:bg-[#2B3F56] transition cursor-pointer">
//             <svg 
//               className="w-5 h-5 text-white" 
//               fill="none" 
//               viewBox="0 0 24 24" 
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           </div>
//         </nav>

//       </div>
//     </header>
//   );
// };

// export default Navbar;

"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navItems = [
    "Home",
    "Services",
    "Eye is the Window",
    "For Sites",
    "Company",
  ];

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-transparent backdrop-blur-md">
        {/* Logo */}
        <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
           <div
            className="flex items-center h-[82px] w-[266px] relative"
            style={{ marginLeft: "-20px" }}
          >
            <div
              className="rounded-full bg-white w-[70px] h-[70px] absolute left-0 top-1/2 transform -translate-y-1/2"
              role="img"
              aria-label="Logo Icon"
            ></div>

            <div className="ml-[85px] flex flex-col justify-center h-full">
              <div
                className="text-white"
                style={{
                  fontSize: "30px",
                  fontWeight: 900,
                  lineHeight: "100%",
                  height: "24px",
                }}
              >
                LOGO
              </div>
              <div
                className="text-gray-400 mt-4"
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  lineHeight: "100%",
                  height: "17px",
                }}
              >
                LOGO SUBTITLE
              </div>
            </div>
          </div>


        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="text-white text-sm font-medium hover:text-[#46B3E6] transition"
            >
              {item}
            </a>
          ))}
          <button className="bg-[#46B3E6] text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-[#3699C6] transition">
            Become an Investigator
          </button>
          <button className="bg-white text-[#031530] text-sm font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition">
            Become Study Participant
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white focus:outline-none"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#031530]/90 px-6 pb-4 space-y-3 text-white">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="block text-sm font-medium hover:text-[#46B3E6]"
            >
              {item}
            </a>
          ))}
          <button className="block w-full bg-[#46B3E6] text-white text-sm font-semibold px-4 py-2 rounded-md">
            Become an Investigator
          </button>
          <button className="block w-full bg-white text-[#031530] text-sm font-semibold px-4 py-2 rounded-md">
            Become Study Participant
          </button>
        </div>
      )}
    </nav>
  );
}

