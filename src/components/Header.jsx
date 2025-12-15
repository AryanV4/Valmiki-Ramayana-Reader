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

                <div className="nav-controls desktop-only">
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
                            marginLeft: '12px',
                            background: 'transparent',
                            color: expandedMode ? 'var(--text-sanskrit)' : 'inherit',
                            border: expandedMode ? '1px solid var(--text-sanskrit)' : '1px solid var(--border-color)'
                        }}
                    >
                        {expandedMode ? 'Detailed' : 'Simple'}
                    </button>

                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        style={{ marginLeft: '8px' }}
                    >
                        {theme === 'dark' ? '☾' : '☀'}
                    </button>
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
                                <div className="toggle-row">
                                    <label>Dark Mode</label>
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            checked={theme === 'dark'}
                                            onChange={() => { toggleTheme(); }}
                                        />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                            </div>

                            <div className="sidebar-item">
                                <div className="toggle-row">
                                    <label>Detailed View</label>
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            checked={expandedMode}
                                            onChange={() => setExpandedMode(!expandedMode)}
                                        />
                                        <span className="slider"></span>
                                    </label>
                                </div>
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
