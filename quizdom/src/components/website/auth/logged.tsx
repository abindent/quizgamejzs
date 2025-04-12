"use client";
import React from "react";
import Image from "next/image";

// CONTEXT
import { ContextType } from "@/context/auth/context";
import { useAuthContext } from "@/context/auth/state";

export default function Logged() {
  const { team }: ContextType = useAuthContext();

  // Helper function to check if a member has data
  const hasMemberData = (memberKey: 'member1' | 'member2' | 'member3' | 'member4') => {
    return team?.member?.[memberKey]?.name && team?.member?.[memberKey]?.name !== '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Team Card */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="relative">
            <div className="h-48 bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
              <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-pattern"></div>
              <h1 className="text-white text-4xl font-bold tracking-wide z-10 text-center px-4">
                {team?.team || "Team Dashboard"}
              </h1>
            </div>
            
            {/* School Badge */}
            <div className="absolute -bottom-16 inset-x-0 flex justify-center">
              <div className="bg-gray-700 rounded-full h-32 w-32 border-4 border-gray-800 shadow-xl flex items-center justify-center overflow-hidden">
                <div className="text-3xl font-bold text-white text-center">
                  {team?.school?.substring(0, 2).toUpperCase() || "QD"}
                </div>
              </div>
            </div>
          </div>
          
          {/* Team Info */}
          <div className="pt-20 pb-8 px-6 sm:px-10">
            <div className="text-center mb-8">
              <h2 className="text-gray-300 text-xl font-medium">
                {team?.school || "School Name"}
              </h2>
              <div className="flex items-center justify-center mt-2">
                <span className="px-3 py-1 bg-indigo-900 rounded-full text-xs text-indigo-300 font-medium">
                  {team?.category || "Category"}
                </span>
                <span className="mx-2 h-1 w-1 rounded-full bg-gray-500"></span>
                <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300 font-medium">
                  ID: {team?.id || "N/A"}
                </span>
              </div>
            </div>
            
            {/* Divider */}
            <div className="flex items-center my-8">
              <div className="flex-grow h-px bg-gray-700"></div>
              <div className="px-4 text-lg font-semibold text-indigo-400">TEAM MEMBERS</div>
              <div className="flex-grow h-px bg-gray-700"></div>
            </div>
            
            {/* Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['member1', 'member2', 'member3', 'member4'].map((memberKey, index) => (
                <div 
                  key={memberKey} 
                  className={`bg-gray-750 rounded-xl p-5 border border-gray-700 transition-all duration-300 ${
                    hasMemberData(memberKey as 'member1' | 'member2' | 'member3' | 'member4') 
                      ? 'hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-900/20' 
                      : 'opacity-50'
                  }`}
                >
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-lg bg-indigo-900/50 flex items-center justify-center mr-4">
                      <span className="text-lg font-bold text-indigo-300">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-lg font-semibold mb-1">
                        {team?.member?.[memberKey as 'member1' | 'member2' | 'member3' | 'member4']?.name || "Not Assigned"}
                      </h3>
                      <div className="flex items-center">
                        <span className="text-gray-400 text-sm">
                          Class: {team?.member?.[memberKey as 'member1' | 'member2' | 'member3' | 'member4']?.class || "N/A"}
                        </span>
                        {team?.role && (
                          <>
                            <span className="mx-2 h-1 w-1 rounded-full bg-gray-500"></span>
                            <span className="text-indigo-400 text-sm font-medium">
                              {team?.role}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Stats Section */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-750 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-indigo-400">4</div>
                <div className="text-gray-400 text-sm">Team Size</div>
              </div>
              <div className="bg-gray-750 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-indigo-400">{team?.category?.includes("Junior") ? "Jr." : "Sr."}</div>
                <div className="text-gray-400 text-sm">Division</div>
              </div>
              <div className="bg-gray-750 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-indigo-400">0</div>
                <div className="text-gray-400 text-sm">Contests</div>
              </div>
              <div className="bg-gray-750 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-indigo-400">-</div>
                <div className="text-gray-400 text-sm">Rank</div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-10 text-center">
              <div className="inline-flex items-center justify-center">
                <div className="h-1 w-10 rounded bg-indigo-500 mr-3"></div>
                <span className="text-gray-400 text-sm">QUIZDOM TEAM PORTAL</span>
                <div className="h-1 w-10 rounded bg-indigo-500 ml-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}