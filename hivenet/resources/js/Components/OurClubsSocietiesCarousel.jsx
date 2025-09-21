"use client";
import { motion } from "framer-motion"; // For animated text
import React from "react";

export default function OurClubsSocietiesCarousel() {
  const logos = [
    "https://ik.imagekit.io/qlaegzdb2/Adobe%20Express%20-%20file%20(86).png",
    "https://ik.imagekit.io/qlaegzdb2/271756523_109469641627057_2744856006829852045_n_1_removebg_preview.png",
    "https://ik.imagekit.io/qlaegzdb2/austpic%20new%20logo%20(light%20theme)-01%20(1)%20(2).png?updatedAt=1756048907819",
    "https://ik.imagekit.io/vutfc4tgw/AUST_CSES_logo%20(2).png?updatedAt=1758414293663",
    "https://ik.imagekit.io/vutfc4tgw/464676240_8662674200480248_2474573589948982348_n-removebg-preview.png?updatedAt=1758414353330",
    "https://ik.imagekit.io/vutfc4tgw/327461956_1555378161605951_7648685892932341360_n-removebg-preview.png?updatedAt=1758414490641",
    "https://ik.imagekit.io/vutfc4tgw/470732679_617035200894652_7540192694670899648_n-removebg-preview.png?updatedAt=1758414620710",
    "https://ik.imagekit.io/qlaegzdb2/Adobe%20Express%20-%20file%20(86).png",
    "https://ik.imagekit.io/qlaegzdb2/271756523_109469641627057_2744856006829852045_n_1_removebg_preview.png",
    "https://ik.imagekit.io/qlaegzdb2/austpic%20new%20logo%20(light%20theme)-01%20(1)%20(2).png?updatedAt=1756048907819",
    "https://ik.imagekit.io/vutfc4tgw/AUST_CSES_logo%20(2).png?updatedAt=1758414293663",
    "https://ik.imagekit.io/vutfc4tgw/464676240_8662674200480248_2474573589948982348_n-removebg-preview.png?updatedAt=1758414353330",
    "https://ik.imagekit.io/vutfc4tgw/327461956_1555378161605951_7648685892932341360_n-removebg-preview.png?updatedAt=1758414490641",
    "https://ik.imagekit.io/vutfc4tgw/470732679_617035200894652_7540192694670899648_n-removebg-preview.png?updatedAt=1758414620710",
    "https://ik.imagekit.io/qlaegzdb2/Adobe%20Express%20-%20file%20(86).png",
    "https://ik.imagekit.io/qlaegzdb2/271756523_109469641627057_2744856006829852045_n_1_removebg_preview.png",
    "https://ik.imagekit.io/qlaegzdb2/austpic%20new%20logo%20(light%20theme)-01%20(1)%20(2).png?updatedAt=1756048907819",
    "https://ik.imagekit.io/vutfc4tgw/AUST_CSES_logo%20(2).png?updatedAt=1758414293663",
    "https://ik.imagekit.io/vutfc4tgw/464676240_8662674200480248_2474573589948982348_n-removebg-preview.png?updatedAt=1758414353330",
    "https://ik.imagekit.io/vutfc4tgw/327461956_1555378161605951_7648685892932341360_n-removebg-preview.png?updatedAt=1758414490641",
    "https://ik.imagekit.io/vutfc4tgw/470732679_617035200894652_7540192694670899648_n-removebg-preview.png?updatedAt=1758414620710",
    "https://ik.imagekit.io/qlaegzdb2/Adobe%20Express%20-%20file%20(86).png",
    "https://ik.imagekit.io/qlaegzdb2/271756523_109469641627057_2744856006829852045_n_1_removebg_preview.png",
    "https://ik.imagekit.io/qlaegzdb2/austpic%20new%20logo%20(light%20theme)-01%20(1)%20(2).png?updatedAt=1756048907819",
    "https://ik.imagekit.io/vutfc4tgw/AUST_CSES_logo%20(2).png?updatedAt=1758414293663",
    "https://ik.imagekit.io/vutfc4tgw/464676240_8662674200480248_2474573589948982348_n-removebg-preview.png?updatedAt=1758414353330",
    "https://ik.imagekit.io/vutfc4tgw/327461956_1555378161605951_7648685892932341360_n-removebg-preview.png?updatedAt=1758414490641",
    "https://ik.imagekit.io/vutfc4tgw/470732679_617035200894652_7540192694670899648_n-removebg-preview.png?updatedAt=1758414620710",
    "https://ik.imagekit.io/qlaegzdb2/Adobe%20Express%20-%20file%20(86).png",
    "https://ik.imagekit.io/qlaegzdb2/271756523_109469641627057_2744856006829852045_n_1_removebg_preview.png",
    "https://ik.imagekit.io/qlaegzdb2/austpic%20new%20logo%20(light%20theme)-01%20(1)%20(2).png?updatedAt=1756048907819",
    "https://ik.imagekit.io/vutfc4tgw/AUST_CSES_logo%20(2).png?updatedAt=1758414293663",
    "https://ik.imagekit.io/vutfc4tgw/464676240_8662674200480248_2474573589948982348_n-removebg-preview.png?updatedAt=1758414353330",
    "https://ik.imagekit.io/vutfc4tgw/327461956_1555378161605951_7648685892932341360_n-removebg-preview.png?updatedAt=1758414490641",
    "https://ik.imagekit.io/vutfc4tgw/470732679_617035200894652_7540192694670899648_n-removebg-preview.png?updatedAt=1758414620710",
    "https://ik.imagekit.io/qlaegzdb2/Adobe%20Express%20-%20file%20(86).png",
    "https://ik.imagekit.io/qlaegzdb2/271756523_109469641627057_2744856006829852045_n_1_removebg_preview.png",
    "https://ik.imagekit.io/qlaegzdb2/austpic%20new%20logo%20(light%20theme)-01%20(1)%20(2).png?updatedAt=1756048907819",
    "https://ik.imagekit.io/vutfc4tgw/AUST_CSES_logo%20(2).png?updatedAt=1758414293663",
    "https://ik.imagekit.io/vutfc4tgw/464676240_8662674200480248_2474573589948982348_n-removebg-preview.png?updatedAt=1758414353330",
    "https://ik.imagekit.io/vutfc4tgw/327461956_1555378161605951_7648685892932341360_n-removebg-preview.png?updatedAt=1758414490641",
    "https://ik.imagekit.io/vutfc4tgw/470732679_617035200894652_7540192694670899648_n-removebg-preview.png?updatedAt=1758414620710"
  ];

  return (
    <div className="py-40 w-full relative z-10">
      <div className="max-w-7xl mx-auto text-center z-20 relative">
        {/* Animated Title */}
        <p className="font-bold text-xl md:text-4xl text-neutral-400">
          Our{" "}
          <span className="text-neutral-400">
            <motion.span
              className="inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              clubs and societies
            </motion.span>
          </span>
        </p>

        {/* Description Text */}
        <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
          Explore our clubs and societies.
        </p>
      </div> <br></br><br></br><br></br>

      {/* Infinite Moving Logos */}
      <div className="relative w-full overflow-hidden">
        <ul className="flex gap-10 animate-scroll px-10 w-max">
          {/* Duplicating logos array to create the infinite loop effect */}
          {[...logos, ...logos].map((logo, index) => (
            <li
              key={index}
              className="relative w-[150px] h-[150px] bg-transparent hover:scale-110 transform transition-all duration-300 cursor-pointer"
            >
              <img
                src={logo}
                alt={`Club Logo ${index + 1}`}
                className="w-full h-full object-contain rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              />
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-white opacity-0 hover:opacity-50 transition-all duration-300 rounded-xl"></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
