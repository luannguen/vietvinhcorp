import { useState, useEffect } from 'react';
import { settingsService } from '../services/settingsService';

const SETTINGS_CACHE_KEY = 'vrc_site_settings_cache';
let memorySettingsCache: Record<string, string> | null = null;

const getInitialSettings = (): Record<string, string> => {
    if (memorySettingsCache) return memorySettingsCache;
    if (typeof window !== 'undefined') {
        try {
            const cached = localStorage.getItem(SETTINGS_CACHE_KEY);
            if (cached) {
                const parsed = JSON.parse(cached);
                memorySettingsCache = parsed;
                return parsed;
            }
        } catch (e) {
            // ignore JSON error
        }
    }
    return {};
};

export const useSettings = () => {
    const [settings, setSettings] = useState<Record<string, string>>(getInitialSettings);
    const [loading, setLoading] = useState(() => Object.keys(settings).length === 0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        const fetchSettings = async () => {
            try {
                const result = await settingsService.getSettings();

                if (result.success && result.data) {
                    memorySettingsCache = result.data;
                    if (typeof window !== 'undefined') {
                        try {
                            localStorage.setItem(SETTINGS_CACHE_KEY, JSON.stringify(result.data));
                        } catch (e) {
                            // ignore storage error
                        }
                    }
                    if (isMounted) {
                        setSettings(result.data);
                        setError(null);
                    }
                } else {
                    const failureResult = result as { success: false; error: { message: string } };
                    if (isMounted) {
                        setError(failureResult.error?.message || 'Failed to load settings');
                    }
                }
            } catch (err) {
                console.error('useSettings exception:', err);
                if (isMounted) {
                    setError('An unexpected error occurred');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchSettings();

        return () => {
            isMounted = false;
        };
    }, []);

    const getSetting = (key: string, defaultValue: string = '') => {
        return settings[key] || defaultValue;
    };

    return {
        settings,
        loading,
        error,
        getSetting
    };
};
