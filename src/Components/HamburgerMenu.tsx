import { motion } from "framer-motion";

type HamburgerMenuProps = {
  isOpen: boolean;
  handleClick: () => void;
};

export const HamburgerMenu = ({ isOpen, handleClick }: HamburgerMenuProps) => {
  return (
    <button
      onClick={handleClick}
      aria-label="Toggle menu"
      className="relative w-10 h-10 flex flex-col justify-center items-center gap-[6px] cursor-pointer"
    >
      <motion.div
        className="w-8 h-1 bg-black rounded-full origin-center"
        animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      <motion.div
        className="w-8 h-1 bg-black rounded-full origin-center"
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="w-8 h-1 bg-black rounded-full origin-center"
        animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </button>
  );
};
