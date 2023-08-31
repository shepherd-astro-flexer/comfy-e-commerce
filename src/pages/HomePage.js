import React from "react";
import { FeaturedProducts, Hero, Services, Contact } from "../components";
import { useProductsContext } from "../context/products_context";

const HomePage = () => {
  const {products} = useProductsContext()

  return (
    <main>
      <Hero />
      <FeaturedProducts products={products} />
      <Services />
      <Contact />
    </main>
  );
};

export default HomePage;
