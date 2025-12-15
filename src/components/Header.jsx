import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import Select from './Select';

const KANDAS = ['Bala Kanda', 'Ayodhya Kanda', 'Aranya Kanda', 'Kishkindha Kanda', 'Sundara Kanda', 'Yuddha Kanda'];
const SARGAS = Array.from({ length: 77 }, (_, i) => i + 1); // Mock 77 sargas

const Header = ({ currentSelection, onSelectionChange, theme, toggleTheme, expandedMode, setExpandedMode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleChange = (field, value) => {
        onSelectionChange(prev => ({ ...prev, [field]: value }));
    };

    const kandaOptions = KANDAS.map(k => ({ label: k, value: k }));
    const sargaOptions = SARGAS.map(s => ({ label: `Sarga ${s}`, value: s.toString() }));

    return (
        <header className="site-header">
            <div className="header-content">
                <div className="logo-section">
                    <img src="/logo.png" alt="Ramayan Reader Logo" className="logo-image" />
                    <h1 className="site-title">
                        Vālmikī Rāmāyaṇa
                    </h1>
                </div>

                {/* Desktop Controls */}
                <div className="nav-controls desktop-only">
                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        {theme === 'dark' ? '☾' : '☀'}
                    </button>

                    <button
                        className={`theme-toggle ${expandedMode ? 'active' : ''}`}
                        onClick={() => setExpandedMode(!expandedMode)}
                        title="Toggle Detail View"
                        style={{
                            fontSize: '0.8rem',
                            width: 'auto',
                            padding: '0 12px',
                            fontWeight: 500,
                            borderRadius: '20px',
                            marginLeft: '4px',
                            background: expandedMode ? 'var(--accent-color)' : 'transparent',
                            color: expandedMode ? '#fff' : 'inherit',
                            border: expandedMode ? 'none' : '1px solid var(--border-color)'
                        }}
                    >
                        {expandedMode ? 'Detailed' : 'Simple'}
                    </button>

                    <Select
                        value={currentSelection.kanda}
                        onChange={(val) => handleChange('kanda', val)}
                        options={kandaOptions}
                        className="desktop-select"
                    />

                    <Select
                        value={currentSelection.sarga.toString()}
                        onChange={(val) => handleChange('sarga', val)}
                        options={sargaOptions}
                        className="desktop-select"
                    />
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsSidebarOpen(true)}
                >
                    ☰
                </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && createPortal(
                <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}>
                    <div className="sidebar" onClick={e => e.stopPropagation()}>
                        <div className="sidebar-header">
                            <h2>Valmiki Ramayana</h2>
                            <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>
                                ✕
                            </button>
                        </div>

                        <div className="sidebar-content">
                            <div className="sidebar-item">
                                <label>Theme</label>
                                <button className="theme-toggle-large" onClick={() => { toggleTheme(); setIsSidebarOpen(false); }}>
                                    {theme === 'dark' ? '☀ Light Mode' : '☾ Dark Mode'}
                                </button>
                            </div>

                            <div className="sidebar-item">
                                <label>View Mode</label>
                                <button
                                    className="theme-toggle-large"
                                    onClick={() => { setExpandedMode(!expandedMode); setIsSidebarOpen(false); }}
                                    style={{
                                        background: expandedMode ? 'var(--accent-color)' : 'var(--bg-secondary)',
                                        color: expandedMode ? '#fff' : 'var(--text-primary)',
                                        borderColor: expandedMode ? 'transparent' : 'var(--border-color)'
                                    }}
                                >
                                    {expandedMode ? 'Detailed View' : 'Simple View'}
                                </button>
                            </div>

                            <div className="sidebar-item">
                                <label>Kanda</label>
                                <Select
                                    value={currentSelection.kanda}
                                    onChange={(val) => { handleChange('kanda', val); setIsSidebarOpen(false); }}
                                    options={kandaOptions}
                                />
                            </div>

                            <div className="sidebar-item">
                                <label>Sarga</label>
                                <Select
                                    value={currentSelection.sarga.toString()}
                                    onChange={(val) => { handleChange('sarga', val); setIsSidebarOpen(false); }}
                                    options={sargaOptions}
                                />
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </header>
    );
};

export default Header;
