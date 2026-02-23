"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function TrustBadges() {
    return (
        <section className="bg-[#f5f5f3] py-24">
            <div className="max-w-7xl mx-auto px-4 text-center">
                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl md:text-3xl font-medium mb-16 tracking-tight"
                >
                    We are a community of{" "}
                    <span className="font-semibold">5000+</span> women Farmers of
                    Uttarakhand
                </motion.h2>

                {/* TRUST STRIP */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center group"
                >
                    <div className="relative w-full max-w-5xl">
                        <Image
                            src="/icons/ethical.svg.svg" // ✅ USE COMBINED STRIP
                            alt="Trust badges"
                            width={1200}
                            height={220}
                            priority
                            className="
  w-full h-auto object-contain
  brightness-90 contrast-125
  transition-all duration-500 ease-out
  group-hover:brightness-100
  group-hover:contrast-150
  group-hover:scale-[1.02]
"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    )
}