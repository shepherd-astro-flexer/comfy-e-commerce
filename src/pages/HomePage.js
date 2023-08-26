import React from "react";
import { FeaturedProducts, Hero, Services, Contact } from "../components";
import { useQuery } from "@tanstack/react-query";
import { products_url as url } from "../utils/constants";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
const homeQuery = (value) => {
  return {
    queryKey: ["products", value],
    queryFn: async () => {
      const { data } = await axios.get(url);
      return data;
    },
  };
};

export const loader = (queryClient) => async () => {
  const value = "all";

  await queryClient.ensureQueryData(homeQuery(value));

  return { value };
};

const HomePage = () => {
  const { value } = useLoaderData();
  const { data: products} = useQuery(homeQuery(value));
  
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
