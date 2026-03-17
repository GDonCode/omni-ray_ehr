'use client';

import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import { Search, X } from 'lucide-react'; 

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
  titleFont: string;
  bodyFont: string;
}

export default function FAQ({ tabs, titleFont, bodyFont }: FAQProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Flatten all questions with their tab info for global search
  const allQuestions = useMemo(() => {
    const flat: (FAQItem & { tabId: string; tabLabel: string })[] = [];
    tabs.forEach(tab => {
      tab.questions.forEach(q => {
        flat.push({ ...q, tabId: tab.id, tabLabel: tab.label });
      });
    });
    return flat;
  }, [tabs]);

  // Set up Fuse for fuzzy searching across question and answer
  const fuse = useMemo(() => new Fuse(allQuestions, {
    keys: ['question', 'answer'],
    threshold: 0.3,        // lower = more exact, higher = fuzzier
    ignoreLocation: true,   // treat the whole string equally
    findAllMatches: true,
  }), [allQuestions]);

   // Determine which questions to display with fallback
  const displayQuestions = useMemo(() => {
    if (!searchQuery.trim()) {
      const currentTab = tabs.find(t => t.id === activeTab);
      return currentTab?.questions.map(q => ({ ...q, tabLabel: currentTab.label })) || [];
    }

    // Stage 1: Fuzzy search with Fuse
    const fuseResults = fuse.search(searchQuery).map(result => result.item);
    if (fuseResults.length > 0) return fuseResults;

    // Stage 2: Fallback word‑based OR search
    const words = searchQuery.toLowerCase().split(/\s+/).filter(word => word.length > 2);
    if (words.length === 0) return [];

    return allQuestions.filter(item => {
      const searchableText = (item.question + ' ' + item.answer).toLowerCase();
      return words.some(word => searchableText.includes(word));
    });
  }, [searchQuery, activeTab, tabs, fuse, allQuestions]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setOpenQuestionIndex(null);
    setSearchQuery(''); // clear search when switching tabs
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setOpenQuestionIndex(null);
  };

  return (
    <div className="min-w-[65%]">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 lg:gap-3 mb-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`${titleFont} px-6 py-3 rounded-t-lg text-base lg:text-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer`}
            style={
              activeTab === tab.id && !searchQuery
              ? {
                  background: 'linear-gradient(180deg, #1a9e9e 0%, #058080 50%, #036d6d 100%)',
                  boxShadow: '0px 0.5px 0.5px rgba(3,80,80,0.3), 0px 1px 0.5px rgba(3,80,80,0.15)',
                  color: '#ffffff',
                  border: '1px solid transparent',
                }
              : {
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  color: '#6b7280',
                }
            }
          >
            <h2>{tab.label}</h2>
          </button>
        ))}
      </div>

      {/* Search Bar with icon and clear button */}
      <div className="mb-6 relative">
        <div className="relative">
          <label htmlFor="help-search" className="sr-only">
            Search across all FAQs
          </label>
          <input
            id="help-search"
            type="search"
            placeholder="Search across all FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`${titleFont} w-full px-12 py-3 rounded-sm border border-[#D0E6E6] bg-white text-[#181818] font-medium text-xl placeholder:text-[#9DBDBD] transition-all duration-200 outline-none focus:border-b-[#058080] focus:border-x-[#D0E6E6] focus:border-t-[#D0E6E6] focus:rounded-b-[2px] hover:ring-1 hover:ring-gray-300`}
            style={{ boxShadow: '0px 6px 12px -16px #000' }}
          />
          {/* Search Icon */}
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              aria-label="Clear search"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-5 h-5 text-[#181818]" />
            </button>
          )}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {displayQuestions.length === 0 ? (
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
              {searchQuery ? `No results found for "${searchQuery}"` : 'No questions in this section'}
            </p>
            {searchQuery && (
              <p className={`${bodyFont} text-gray-400 text-sm mt-2`}>
                Try different keywords or clear the search
              </p>
            )}
          </div>
        ) : (
          displayQuestions.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Question button */}
              <button
                onClick={() => setOpenQuestionIndex(openQuestionIndex === index ? null : index)}
                aria-expanded={openQuestionIndex === index}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
                className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  {/* Show tab label only when searching (so user knows where it came from) */}
                  {searchQuery && item.tabLabel && (
                    <span className={`${bodyFont} text-xs text-teal-600 block mb-1`}>
                      {item.tabLabel}
                    </span>
                  )}
                  <h3 className={`${titleFont} text-lg text-gray-800 pr-4`}>
                    {item.question}
                  </h3>
                </div>
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

              {/* Answer (expanded) */}
              {openQuestionIndex === index && (
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className="px-6 pb-5 pt-2 bg-gray-50/50 border-t border-gray-100 lg:max-w-4xl"
                >
                  <p className={`${bodyFont} text-gray-700 tracking-wide leading-relaxed`}>
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