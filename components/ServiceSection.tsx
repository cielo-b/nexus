"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { fetchServices, fetchCases } from "@/sanity/queries/services";
import RichContent, { type Content } from "./RichContent";

interface Service {
  _id: string;
  title: string;
  excerpt: Content[];
  image: string;
  titleOfExpertise: string;
  descriptionOfExpertise: Content[];
}

interface Case {
  _id: string;
  title: string;
  excerpt: Content[];
  image: string;
  service?: {
    _id: string;
    title: string;
  };
}

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [cases, setCases] = useState<Case[]>([]);
  const [activeSection, setActiveSection] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const loadServicesAndCases = useCallback(async () => {
    try {
      const fetchedServices = await fetchServices();
      setServices(fetchedServices);

      if (fetchedServices.length > 0) {
        setActiveSection(fetchedServices[0].title);

        const allCases: Case[][] = await Promise.all(
          fetchedServices.map((service: Service) => fetchCases(service._id))
        );
        setCases(allCases.flat());
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to fetch services and cases";
      setError(errorMessage);
      console.error("Error fetching services and cases:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadServicesAndCases();
  }, [loadServicesAndCases]);

  const activeService = useMemo(
    () =>
      services.find((service) => service.title === activeSection) || {
        title: "",
        excerpt: [],
        image: "",
        _id: "",
        titleOfExpertise: "",
        descriptionOfExpertise: [],
      },
    [services, activeSection]
  );

  const activeCases = useMemo(
    () =>
      cases.filter((caseItem) => caseItem.service?._id === activeService._id),
    [cases, activeService._id]
  );

  const handleSectionChange = useCallback((title: string) => {
    setActiveSection(title);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto min-h-screen p-4 md:p-8">
      <div className="flex flex-col lg:flex-row gap-9">
        {/* Navigation Links */}
        <nav className="lg:w-1/4 space-y-2">
          {services.map((service) => (
            <button
              key={service._id}
              onClick={() => handleSectionChange(service.title)}
              className={`text-left w-full px-4 py-2 rounded-lg transition-colors ${
                activeSection === service.title
                  ? "text-blue-600 font-semibold bg-blue-50"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {service.title}
            </button>
          ))}
        </nav>

        <div className="flex-1">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Content Area */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <div className="relative">
                      <h2 className="text-3xl font-bold">
                        {activeService.title}
                      </h2>
                      <div className="absolute -bottom-2 left-0 w-16 h-1 bg-blue-600"></div>
                    </div>
                    <div className="text-gray-700 text-md leading-relaxed">
                      <RichContent content={activeService.excerpt} />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Service Image */}
            <div className="lg:col-span-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative h-[300px] lg:h-[400px] rounded-2xl overflow-hidden"
                >
                  <Image
                    src={activeService.image || "/placeholder.svg"}
                    alt={activeService.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Cases Grid */}
        </div>
      </div>
      <div className="mt-12 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              {activeService.titleOfExpertise && (
                <div>
                  <div className="relative">
                    <h2 className="text-3xl font-bold">How we do it</h2>
                    <div className="absolute -bottom-2 left-0 w-16 h-1 bg-blue-600"></div>
                  </div>
                  <h4 className="text-xl font-semibold mt-5">
                    {activeService.titleOfExpertise}
                  </h4>
                </div>
              )}
              <div className="text-gray-700 text-md leading-relaxed">
                <RichContent content={activeService.descriptionOfExpertise} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeCases.map((caseItem) => (
            <Link href={`/cases/${caseItem._id}`} key={caseItem._id}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg shadow-md overflow-hidden relative group h-full"
              >
                <Image
                  src={caseItem.image || "/placeholder.svg"}
                  alt={caseItem.title}
                  width={250}
                  height={150}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-semibold text-lg mb-2">
                    {caseItem.title}
                  </h4>
                  <div className="text-sm text-gray-600 line-clamp-2">
                    <RichContent content={caseItem.excerpt} />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
