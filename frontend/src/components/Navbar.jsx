import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Navbar() {
  const links = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Audio Playground", path: "/audioplayground" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 w-full z-50 flex justify-center bg-black/40 backdrop-blur-md border-b border-purple-600/20"
    >
      <ul className="flex gap-8 py-4 text-sm uppercase text-purple-300">
        {links.map((l) => (
          <li key={l.name}>
            <Link
              to={l.path}
              className="hover:text-purple-400 transition-colors"
            >
              {l.name}
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
