'use client';

import { useState, useMemo } from 'react';

// Types
export interface FAQItem {
  question: string;
  answer: string;
}

export interface Tab {
  id: string;
  label: string;
  questions: FAQItem[];
}

interface FAQProps {
  tabs: Tab[];
  titleFont: string;      // e.g., tt_wellingtons_demi.className
  bodyFont: string;       // e.g., tt_wellingtons.className
}

export default function FAQ({ tabs, titleFont, bodyFont }: FAQProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Get current tab's questions
  const currentQuestions = useMemo(() => {
    const currentTab = tabs.find(tab => tab.id === activeTab);
    return currentTab?.questions || [];
  }, [tabs, activeTab]);

  // Filter questions based on search query
  const filteredQuestions = useMemo(() => {
    if (!searchQuery.trim()) return currentQuestions;
    const query = searchQuery.toLowerCase();
    return currentQuestions.filter(
      item =>
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query)
    );
  }, [currentQuestions, searchQuery]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setOpenQuestionIndex(null);
    setSearchQuery('');
  };

  return (
    <div className="min-w-[65%]">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 lg:gap-3 mb-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`${titleFont} px-6 py-3 rounded-t-lg text-base lg:text-lg transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-[#036d6d] text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <h2>{tab.label}</h2>
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <div className="relative">
          <label htmlFor="help-search" className="sr-only">
            Search for help topics
          </label>
          <input
            id="help-search"
            type="search"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`${bodyFont} w-full px-4 py-3 pl-12 pr-12 border-2 border-[#036d6d] rounded-lg focus:outline-none focus:border-[#036d6d] transition-all`}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              aria-label="Clear search bar"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-16 h-16 mx-auto text-gray-300 mb-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6"
              />
            </svg>
            <p className={`${bodyFont} text-gray-500 text-lg`}>
              No results found for "{searchQuery}"
            </p>
            <p className={`${bodyFont} text-gray-400 text-sm mt-2`}>
              Try searching with different keywords
            </p>
          </div>
        ) : (
          filteredQuestions.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Question */}
              <button
                onClick={() =>
                  setOpenQuestionIndex(openQuestionIndex === index ? null : index)
                }
                aria-expanded={openQuestionIndex === index}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
                className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <h3 className={`${titleFont} text-lg text-gray-800 pr-4`}>
                  {item.question}
                </h3>
                <svg
                  className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${
                    openQuestionIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="#036d6d"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Answer */}
              {openQuestionIndex === index && (
                <div 
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                className="px-6 pb-5 pt-2 bg-gray-50/50 border-t border-gray-100 lg:max-w-4xl">
                  <p className={`${bodyFont} text-gray-700 leading-relaxed`}>
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}