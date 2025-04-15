import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { motion, useAnimation, useScroll } from "framer-motion";

function Navbar() {
  const { cart } = useSelector((store) => store.cart);
  const [scrolled, setScrolled] = useState(false);
  const controls = useAnimation();
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      if (latest > 10 && !scrolled) {
        setScrolled(true);
        controls.start("scrolled");
      } else if (latest <= 10 && scrolled) {
        setScrolled(false);
        controls.start("unscrolled");
      }
    });
  }, [scrollY, controls, scrolled]);

  const linkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    }),
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  const navVariants = {
    unscrolled: {
      padding: "1rem 0",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(5px)"
    },
    scrolled: {
      padding: "0.5rem 0",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      backgroundColor: "rgba(255, 255, 255, 0.98)",
      backdropFilter: "blur(10px)"
    }
  };

  const cartIconVariants = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 3
      }
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <motion.header
      initial="unscrolled"
      animate={controls}
      variants={navVariants}
      className="fixed top-0 z-50 w-full"
    >
      <div className="container flex justify-between h-16 mx-auto">
        <div className="flex items-center">
          <Link
            to="/"
            aria-label="Back to homepage"
            className="flex items-center p-2"
          >
            <motion.div
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 32 32"
                className="w-8 h-8 dark:text-violet-600"
              >
                <path d="M27.912 7.289l-10.324-5.961c-0.455-0.268-1.002-0.425-1.588-0.425s-1.133 0.158-1.604 0.433l0.015-0.008-10.324 5.961c-0.955 0.561-1.586 1.582-1.588 2.75v11.922c0.002 1.168 0.635 2.189 1.574 2.742l0.016 0.008 10.322 5.961c0.455 0.267 1.004 0.425 1.59 0.425 0.584 0 1.131-0.158 1.602-0.433l-0.014 0.008 10.322-5.961c0.955-0.561 1.586-1.582 1.588-2.75v-11.922c-0.002-1.168-0.633-2.189-1.573-2.742z"></path>
              </svg>
            </motion.div>
          </Link>
          
          <ul className="items-stretch hidden space-x-3 lg:flex">
            {navLinks.map((link, i) => (
              <motion.li
                key={link.name}
                custom={i}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                variants={linkVariants}
                className="flex"
              >
                <Link
                  to={link.path}
                  className="flex items-center px-4 -mb-1 border-b-2 dark:border-violet-600 dark:text-violet-600"
                >
                  {link.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="flex items-center">
          <Link to="/cart">
            <motion.div
              initial="initial"
              animate={cart.length > 0 ? "pulse" : "initial"}
              variants={cartIconVariants}
            >
              <IconButton color="primary" aria-label="add to shopping cart">
                <Badge 
                  badgeContent={cart.length} 
                  color="error"
                  component={motion.span}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <AddShoppingCartIcon />
                </Badge>
              </IconButton>
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}

export default Navbar;