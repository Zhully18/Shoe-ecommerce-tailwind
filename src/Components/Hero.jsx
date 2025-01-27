import React from 'react'
import hero from '../assets/nike-hero.png'

const Hero = () => {
  return (
    <div>
        {/* Hero Section */}
      <div className="grid w-full place-items-center bg-gradient-to-r from-[#0f0fd7] via-[#2c67f2] to-[#00d4ff]">
        <div className="text-center">
          <h1 className="text-5xl font-bold mt-20 text-white">Step Into The Future With Our Collection </h1>
          <p className="text-lg mt-3">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus recusandae vero, quod ipsa ea <br />ipsam  iure quae  repudiandae qui tenetur enim in? Non repellendus animi 
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <button className="px-10 py-4 bg-white text-blue-900 font-semibold rounded-full hover:bg-sky-500">
              View Collection
            </button>
          </div>
          <img
            src={hero}
            alt="hero-img"
            className="w-[790px] h-[400px] mt-10"
          />
        </div>
      </div>
    </div>
  )
}

export default Hero