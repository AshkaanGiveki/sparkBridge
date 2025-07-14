import React, { useState, useEffect } from 'react'; // Assuming these are still needed for TypingContent
import Image from 'next/image'; // Assuming you're using Next.js Image component
import TypingContent from './TypingContent'; // Adjust path if necessary
import aiGif from '../../assets/images/ai.gif'; // Adjust path to your GIF if necessary

interface YourComponentProps {
  loading: boolean;
  summaryText: string;
}

const YourParentComponent: React.FC<YourComponentProps> = ({ loading, summaryText }) => {
  return (
    <section className="mt-8 border border-gray-200 rounded-lg p-4 shadow-sm bg-white space-y-2">
      {/* New div to wrap Image and h3 for horizontal alignment */}
      <div className="flex items-center space-x-2 mb-2"> {/* Added mb-2 for spacing below this header block */}
        <Image alt="AI Generated Description" src={aiGif} className="w-8 h-8"/>
        <h3 className="text-sm font-semibold text-gray-700">
          AI Assistant Summary
        </h3>
      </div>

      {loading ? (
        <p className="text-gray-400 animate-pulse">
          Generating smart insights...
        </p>
      ) : (
        <p className="text-gray-700 leading-relaxed text-sm">
          <TypingContent content={summaryText} />
        </p>
      )}
    </section>
  );
};

export default YourParentComponent;