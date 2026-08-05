import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-slate-200/80 w-full relative z-20">
      {/* Page indicator info */}
      <div className="text-xs sm:text-sm font-semibold text-slate-500">
        Page <span className="font-extrabold text-slate-900">{currentPage}</span> of{" "}
        <span className="font-extrabold text-slate-900">{totalPages}</span>
      </div>

      {/* Pagination control buttons */}
      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
            currentPage === 1
              ? "opacity-40 cursor-not-allowed bg-slate-100 text-slate-400 border border-slate-200"
              : "bg-white text-slate-700 hover:text-blue-600 hover:bg-slate-50 border border-slate-200 hover:border-blue-300 shadow-xs active:scale-95"
          }`}
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Page Number Buttons */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, idx) => {
            if (typeof page === "string") {
              return (
                <span key={`ellipsis-${idx}`} className="px-2 py-1 text-xs text-slate-400 font-bold select-none">
                  ...
                </span>
              );
            }
            const isActive = currentPage === page;
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`min-w-[36px] h-9 px-3 rounded-xl text-xs font-extrabold transition-all duration-300 cursor-pointer flex items-center justify-center ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 scale-105 border border-transparent"
                    : "bg-white text-slate-700 hover:text-blue-600 hover:bg-slate-50 border border-slate-200 hover:border-blue-300 active:scale-95"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
            currentPage === totalPages
              ? "opacity-40 cursor-not-allowed bg-slate-100 text-slate-400 border border-slate-200"
              : "bg-white text-slate-700 hover:text-blue-600 hover:bg-slate-50 border border-slate-200 hover:border-blue-300 shadow-xs active:scale-95"
          }`}
          aria-label="Next Page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
