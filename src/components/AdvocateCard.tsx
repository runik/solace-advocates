"use client";

import { Advocate } from "@/types/advocate";
import { useState } from "react";
import { 
  AcademicCapIcon,
  ClockIcon, 
  PhoneIcon,
  TagIcon
} from '@heroicons/react/24/outline';

interface AdvocateCardProps {
  advocate: Advocate;
}

export function AdvocateCard({ advocate }: AdvocateCardProps) {
  const [showAllSpecialties, setShowAllSpecialties] = useState(false);
  const INITIAL_SHOW_COUNT = 3;
  
  const displayedSpecialties = showAllSpecialties 
    ? advocate.specialties 
    : advocate.specialties.slice(0, INITIAL_SHOW_COUNT);
  
  const remainingCount = advocate.specialties.length - INITIAL_SHOW_COUNT;
  return (
    <div className="relative flex flex-col rounded-lg border bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-x-2">
        <div className="h-12 w-12 flex items-center justify-center rounded-full bg-indigo-100">
          <span className="text-xl font-semibold text-indigo-600">
            {advocate.firstName[0]}{advocate.lastName[0]}
          </span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {advocate.firstName} {advocate.lastName}
          </h3>
          <p className="text-sm text-gray-500">{advocate.city}</p>
        </div>
      </div>
      
      <div className="mt-4 flex flex-col gap-y-2">
        <div className="flex items-center gap-x-2">
          <AcademicCapIcon className="h-5 w-5 text-gray-400" />
          <div>
            <span className="text-sm font-medium text-gray-500">Degree</span>
            <p className="text-sm text-gray-900">{advocate.degree}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-x-2">
          <ClockIcon className="h-5 w-5 text-gray-400" />
          <div>
            <span className="text-sm font-medium text-gray-500">Experience</span>
            <p className="text-sm text-gray-900">{advocate.yearsOfExperience} years</p>
          </div>
        </div>
               
        <div className="flex items-center gap-x-2">
          <PhoneIcon className="h-5 w-5 text-gray-400" />
          <div>
            <span className="text-sm font-medium text-gray-500">Contact</span>
            <p className="text-sm text-gray-900">{advocate.phoneNumber}</p>
          </div>
        </div>
        
        <div>
          <div className="flex items-center gap-x-2">
            <TagIcon className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-500">Specialties</span>
          </div>
          <div className="mt-2 ml-7 flex flex-wrap gap-2">
            {displayedSpecialties.map((specialty) => (
              <span
                key={specialty}
                className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
                title={specialty}
              >
                {specialty.length > 30 ? `${specialty.substring(0, 27)}...` : specialty}
              </span>
            ))}
            {!showAllSpecialties && remainingCount > 0 && (
              <button
                onClick={() => setShowAllSpecialties(true)}
                className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-500 hover:bg-gray-100 transition-colors"
              >
                +{remainingCount} more
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
