import React, { useState } from 'react';
import Word from './Word';

const ShlokaCard = ({ shlokaData, expandedMode }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="shloka-card">
            {/* Header / Actions */}
            <div className="card-header">
                <span className="shloka-number">
                    {shlokaData.shlokanumber}
                </span>
                <div className="card-actions">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="analyze-btn"
                    >
                        {isExpanded ? 'Hide Analysis' : 'Analyze'}
                    </button>
                </div>
            </div>

            {/* Main Shloka Text */}
            <div className="shloka-content">
                <p className="sanskrit-text">
                    {shlokaData.shloka.replace(/([।]+)/g, '$1\n').split('\n').filter(line => line.trim()).map((line, i) => (
                        <React.Fragment key={i}>
                            {line.trim()}
                            <br />
                        </React.Fragment>
                    ))}
                </p>
            </div>

            {/* Sandhi Viched (Expanded View) */}
            <div className={`analysis-section ${isExpanded ? 'active' : ''}`}>
                <div className="padaccheda-container">
                    <h4 className="section-title">पद विच्छेद (Word Break)</h4>
                    <div className={`word-grid ${expandedMode ? 'expanded-mode' : ''}`}>
                        {shlokaData.words.map((word, index) => (
                            <Word key={index} wordData={word} expandedMode={expandedMode} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Translation */}
            <div className="translation-section">
                <p className="translation-text">
                    "{shlokaData.translation}"
                </p>
            </div>
        </div>
    );
};

export default ShlokaCard;
