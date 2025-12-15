import React, { useEffect, useState } from 'react';
import ShlokaCard from './ShlokaCard';

const Reader = ({ kanda, sarga, expandedMode }) => {
    const [data, setData] = useState({ shlokas: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                // In a real app, we would construct the URL based on kanda/sarga
                // For now, we only have one file.
                const response = await fetch('/data/ramayan-1-1.json');
                if (!response.ok) throw new Error('Failed to load data');
                const json = await response.json();
                setData(json);
            } catch (err) {
                console.error(err);
                setError('Could not load Shlokas. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [kanda, sarga]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-message">
                {error}
            </div>
        );
    }

    return (
        <div className="reader-container">
            <div className="chapter-header">
                <h2>{kanda}</h2>
                <h3 className="sarga-number">Sarga {sarga}</h3>
                {data.sargaDesc && (
                    <div className="chapter-desc-container">
                        <p className="chapter-description">
                            {data.sargaDesc}
                        </p>
                    </div>
                )}
            </div>

            {data.shlokas && data.shlokas.map((shloka) => (
                <ShlokaCard key={shloka.shlokanumber} shlokaData={shloka} expandedMode={expandedMode} />
            ))}
        </div>
    );
};

export default Reader;
