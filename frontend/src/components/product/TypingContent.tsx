// import React, { useState, useEffect } from 'react';

// interface ProductDisplayProps {
//   content: string; // The entire AI-generated string
// }

// const TypingContent: React.FC<ProductDisplayProps> = ({ content }) => {
//   const [displayedContent, setDisplayedContent] = useState('');
//   const [parsedContent, setParsedContent] = useState<{
//     summary: string;
//     positive: string[];
//     negative: string[];
//   } | null>(null);
//   console.log(content);

//   // Parse the incoming string content
//   useEffect(() => {
//     const parseString = (input: string) => {
//       // Replaced '.*?' with '[\\s\\S]*?' to match any character including newlines
//       const summaryMatch = input.match(/### Product Summary: ([\s\S]*?)\s*### Positive Points:/);
//       const positivePointsMatch = input.match(/### Positive Points:\s*-([\s\S]*?)\s*### Negative Points:/);
//       const negativePointsMatch = input.match(/### Negative Points:\s*-([\s\S]*)/); // Last section might not have a trailing marker

//       let summary = summaryMatch ? summaryMatch[1].trim() : '';
//       let positive = positivePointsMatch
//         ? positivePointsMatch[1]
//             .split(/\s*-\s*/)
//             .map(s => s.trim())
//             .filter(Boolean)
//         : [];
//       let negative = negativePointsMatch
//         ? negativePointsMatch[1]
//             .split(/\s*-\s*/)
//             .map(s => s.trim())
//             .filter(Boolean)
//         : [];

//       return { summary, positive, negative };
//     };

//     setParsedContent(parseString(content));
//   }, [content]);

//   // Handle the word-by-word typing effect
//   useEffect(() => {
//     if (!parsedContent) return;

//     const formatForTyping = () => {
//       let formattedText = `
//         <p>${parsedContent.summary}</p>
//         <h3>Positive Points:</h3>
//         <ul>
//       `;
//       parsedContent.positive.forEach(point => {
//         formattedText += `<li>${point}</li>`;
//       });
//       formattedText += `</ul><h3>Negative Points:</h3><ul>`;
//       parsedContent.negative.forEach(point => {
//         formattedText += `<li>${point}</li>`;
//       });
//       formattedText += `</ul>`;
//       return formattedText;
//     };

//     const fullFormattedHtml = formatForTyping();

//     const words = fullFormattedHtml
//       .split(/(\s+|<[^>]+>)/g)
//       .filter(word => word !== '' && word !== undefined && word !== null);

//     let wordIndex = 0;
//     setDisplayedContent('');

//     const typingInterval = setInterval(() => {
//       if (wordIndex < words.length) {
//         const currentWord = words[wordIndex];
//         if (currentWord !== undefined) {
//           setDisplayedContent(prev => prev + currentWord + (currentWord.match(/<[^>]+>/) ? '' : ' '));
//         }
//         wordIndex++;
//       } else {
//         clearInterval(typingInterval);
//       }
//     }, 50);

//     return () => clearInterval(typingInterval);
//   }, [parsedContent]);

//   if (!parsedContent) {
//     return null;
//   }

//   return (
//     <div className="product-display-container" style={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.6, maxWidth: '800px', margin: '20px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
//       <style>{`
//         .product-display-container h3 {
//           color: #333;
//           border-bottom: 1px solid #eee;
//           padding-bottom: 5px;
//           margin-top: 20px;
//           margin-bottom: 10px;
//         }
//         .product-display-container ul {
//           list-style-type: disc;
//           margin-left: 20px;
//           padding-left: 0;
//         }
//         .product-display-container ul li {
//           margin-bottom: 5px;
//         }
//         .product-display-container strong {
//           color: #007bff;
//         }
//       `}</style>
//       <div dangerouslySetInnerHTML={{ __html: displayedContent }} />
//     </div>
//   );
// };

// export default TypingContent;

import React, { useState, useEffect } from 'react';

interface ProductDisplayProps {
  content: string; // The entire AI-generated string
}

const TypingContent: React.FC<ProductDisplayProps> = ({ content }) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [parsedContent, setParsedContent] = useState<{
    summary: string;
    positive: string[];
    negative: string[];
    overallExperience: string; // Added new field for Overall Purchase Experience
  } | null>(null);

  // Parse the incoming string content
  useEffect(() => {
    const parseString = (input: string) => {
      const summaryMatch = input.match(/### Product Summary: ([\s\S]*?)\s*### Positive Points:/);
      const positivePointsMatch = input.match(/### Positive Points:([\s\S]*?)\s*### Negative Points:/);
      const negativePointsMatch = input.match(/### Negative Points:([\s\S]*?)\s*### Overall Purchase Experience:/);
      const overallExperienceMatch = input.match(/### Overall Purchase Experience:([\s\S]*)/);

      let summary = summaryMatch ? summaryMatch[1].trim() : '';

      // Refined splitting for bullet points: only split by newline followed by a hyphen and space
      const parseBulletPoints = (text: string | undefined) => {
        if (!text) return [];
        // Split only on newline followed by '-' and a space, and ensure no empty strings
        return text.split(/\n\s*-\s*/).map(s => s.trim()).filter(Boolean);
      };

      let positive = parseBulletPoints(positivePointsMatch ? positivePointsMatch[1] : undefined);
      let negative = parseBulletPoints(negativePointsMatch ? negativePointsMatch[1] : undefined);
      let overallExperience = overallExperienceMatch ? overallExperienceMatch[1].trim() : '';

      return { summary, positive, negative, overallExperience };
    };

    setParsedContent(parseString(content));
  }, [content]);

  // Handle the word-by-word typing effect
  useEffect(() => {
    if (!parsedContent) return;

    const formatForTyping = () => {
      let formattedText = `
        <p>${parsedContent.summary}</p>
        <h3><b>Positive Points:</b></h3>
        <ul>
      `;
      parsedContent.positive.forEach(point => {
        formattedText += `<li>${point}</li>`;
      });
      formattedText += `</ul><h3><b>Negative Points:</b></h3><ul>`;
      parsedContent.negative.forEach(point => {
        formattedText += `<li>${point}</li>`;
      });
      formattedText += `</ul><h3><b>Overall Purchase Experience:</b></h3><p>${parsedContent.overallExperience}</p>`;
    
      // ✅ Replace **text** with <strong>text</strong>
      formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    
      return formattedText;
    };
    

    const fullFormattedHtml = formatForTyping();

    // Split by any sequence of whitespace or any HTML tag.
    const words = fullFormattedHtml
      .split(/(\s+|<[^>]+>)/g)
      .filter(word => word !== '' && word !== undefined && word !== null);

    let wordIndex = 0;
    setDisplayedContent(''); // Reset displayed content on new parse

    const typingInterval = setInterval(() => {
      if (wordIndex < words.length) {
        const currentWord = words[wordIndex];
        if (currentWord !== undefined) {
          setDisplayedContent(prev => prev + currentWord + (currentWord.match(/<[^>]+>/) ? '' : ' '));
        }
        wordIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 10); // Adjust typing speed here (milliseconds per word/chunk)

    return () => clearInterval(typingInterval); // Cleanup on unmount or content change
  }, [parsedContent]);

  if (!parsedContent) {
    return null; // Or a loading spinner, or some placeholder
  }

  return (
    <div className="product-display-container" style={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.6, maxWidth: '800px', margin: '20px auto', borderRadius: '8px' }}>
      <style>{`
        .product-display-container h3 {
          color: #333;
          padding-bottom: 5px;
          margin-top: 20px;
          margin-bottom: 10px;
        }
        /* Added a specific style for bold h3 titles for clarity, though <b> handles it */
        .product-display-container h3 b {
            font-weight: bold;
        }
        .product-display-container ul {
          list-style-type: disc;
          margin-left: 20px;
          padding-left: 0;
        }
        .product-display-container ul li {
          margin-bottom: 5px;
        }
        .product-display-container strong {
          color: #007bff;
        }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: displayedContent }} />
    </div>
  );
};

export default TypingContent;