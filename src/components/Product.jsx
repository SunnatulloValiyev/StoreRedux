import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrement, increment } from "../app/feature/CartSlice";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  IconButton,
  Tooltip
} from "@mui/material";
import { Add, Remove, ShoppingCart, Close } from "@mui/icons-material";
import { motion, useAnimation, useInView } from "framer-motion";

function Product({ product }) {
  const dispatch = useDispatch();
  const [showControls, setShowControls] = useState(false);
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const cartItems = useSelector((state) => state.cart?.cart || []);
  const isAdded = cartItems.find((item) => item.id === product.id);

  const handleBuy = (e) => {
    e.preventDefault();
    dispatch(addToCart({ ...product, amount: 1 }));
    setShowControls(true);
  };

  const handleCloseControls = () => {
    setShowControls(false);
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.5
      }
    }
  };

  const splashVariants = {
    hidden: { scale: 0.7, opacity: 0 },
    visible: {
      scale: 1.2, 
      opacity: 0.4, 
      transition: {
        delay: 0.1,
        duration: 1.2, 
        ease: "easeOut"
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: i => ({
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.7
      }
    })
  };

  const gradientColors = [
    ['#FF9A8B', '#FF6B95', '#FF8E53'],
    ['#4FACFE', '#00F2FE', '#3EC0FE'],
    ['#A18CD1', '#FBC2EB', '#C471F5'],
    ['#F093FB', '#F5576C', '#F093FB']
  ];
  const randomGradient = gradientColors[Math.floor(Math.random() * gradientColors.length)];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      style={{ 
        position: "relative", 
        width: "100%", 
        maxWidth: "400px",
        padding: "20px",
        margin: "0 auto"
      }}
    >
      <motion.div
        variants={splashVariants}
        style={{
          position: "absolute",
          top: "-50px",
          left: "-50px",
          right: "-50px",
          bottom: "-50px",
          background: `linear-gradient(135deg, ${randomGradient[0]}, ${randomGradient[1]}, ${randomGradient[2]})`,
          zIndex: -1,
          borderRadius: "30px",
          clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
          filter: "blur(8px)"
        }}
      />

      <Card
        sx={{
          width: "100%",
          minHeight: "450px",
          borderRadius: 4,
          boxShadow: 6,
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.04)",
            boxShadow: 10
          },
          position: "relative",
          overflow: "hidden",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(2px)"
        }}
      >
        <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <CardMedia
              component="img"
              height="220"
              image={product.thumbnail}
              alt={product.title}
              sx={{
                objectFit: "cover",
                width: "100%",
                transition: "transform 0.5s ease",
                "&:hover": {
                  transform: "scale(1.05)"
                }
              }}
            />
          </motion.div>
        </Link>

        <CardContent>
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              {product.title}
            </Typography>
          </motion.div>

          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {product.description.substring(0, 80)}...
            </Typography>
          </motion.div>

          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2
              }}
            >
              <Typography variant="h5" sx={{ color: "green", fontWeight: "bold" }}>
                ${product.price}
              </Typography>

              <Box display="flex" alignItems="center" gap={0.5}>
                {[...Array(5)].map((_, i) => (
                  <span key={i}>{i < Math.floor(product.rating) ? "⭐" : "☆"}</span>
                ))}
                <Typography variant="body2" color="textSecondary">
                  ({product.rating})
                </Typography>
              </Box>
            </Box>
          </motion.div>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Sotuvda: {product.stock} dona
            </Typography>
          </motion.div>

          {!showControls ? (
            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              style={{ marginTop: 24 }}
            >
              <Button
                fullWidth
                variant="contained"
                color="primary"
                startIcon={<ShoppingCart />}
                onClick={handleBuy}
                sx={{
                  py: 1.5,
                  fontWeight: "bold",
                  fontSize: "1rem",
                  borderRadius: 2,
                  textTransform: "none"
                }}
              >
                Sotib olish
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ marginTop: 24 }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 1,
                  mb: 1
                }}
              >
                <Tooltip title="Kamaytirish">
                  <IconButton
                    onClick={() => {
                      if (isAdded.amount <= 1) {
                        handleCloseControls();
                      }
                      dispatch(decrement(product.id));
                    }}
                    sx={{
                      bgcolor: "#ff1744",
                      color: "white",
                      "&:hover": { bgcolor: "#d50000" },
                      width: 40,
                      height: 40
                    }}
                  >
                    <Remove />
                  </IconButton>
                </Tooltip>

                <Typography variant="h6">{isAdded.amount}</Typography>

                <Tooltip title="Ko'paytirish">
                  <IconButton
                    onClick={() => dispatch(increment(product.id))}
                    disabled={isAdded.amount >= product.stock}
                    sx={{
                      bgcolor: "#00c853",
                      color: "white",
                      "&:hover": { bgcolor: "#00b248" },
                      width: 40,
                      height: 40
                    }}
                  >
                    <Add />
                  </IconButton>
                </Tooltip>

                <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                  <Tooltip title="Yopish">
                    <IconButton
                      onClick={handleCloseControls}
                      sx={{
                        color: "text.secondary",
                        "&:hover": { 
                          color: "text.primary",
                          backgroundColor: "rgba(0, 0, 0, 0.04)"
                        }
                      }}
                    >
                      <Close />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default Product;