import React, { useState, useRef, useEffect } from 'react';

const Word = ({ wordData, expandedMode, isLineMode }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipRef = useRef(null);

    // Close tooltip when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
                setShowTooltip(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Punctuation in Line Mode
    if (isLineMode && wordData.tag === 'Punctuation') {
        return <span className="sanskrit-punctuation">{wordData.wordSa} </span>;
    }

    if (expandedMode) {
        return (
            <div className="word-container expanded">
                <span className="sanskrit-word">{wordData.wordSa}</span>
                <span className="word-meaning">{wordData.wordEng.replace(/_/g, ' ')}</span>
                {wordData.tag && (
                    <div className="tag-container inline">
                        {wordData.tag.split(' ').map((tag, i) => (
                            <span key={i} className="grammar-tag">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className={`word-container ${isLineMode ? 'line-mode' : ''}`}>
            <span
                className={`sanskrit-word ${showTooltip ? 'active' : ''}`}
                onClick={() => setShowTooltip(!showTooltip)}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                {wordData.wordSa}
            </span>

            {/* Tooltip */}
            <div
                ref={tooltipRef}
                className={`word-tooltip ${showTooltip ? 'visible' : ''}`}
            >
                <div className="tooltip-meaning">
                    {wordData.wordEng.replace(/_/g, ' ')}
                </div>

                {wordData.tag && (
                    <div className="tag-container">
                        {wordData.tag.split(' ').map((tag, i) => (
                            <span key={i} className="grammar-tag">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Triangle pointer */}
                <div className="tooltip-arrow"></div>
            </div>
        </div>
    );
};

export default Word;
