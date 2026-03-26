export const settingsKeys = {
    COMPLETE_OPACITY: 'completeCellOpacity',
    HIDE_TIER_HINT: 'hideTierHintOnLocked',
    THEME: 'theme',
    TIER_FILTER: 'tierFilter',
    AUTO_WIKI_TOAST_ENABLED: 'autoWikiToastEnabled',
    AUTO_WIKI_TOAST_ACK_COUNT: 'autoWikiToastAckCount',
    USERNAME: 'username',
};

class Settings {
    _defaultSettings = {
        [settingsKeys.COMPLETE_OPACITY]: 0.2,
        [settingsKeys.HIDE_TIER_HINT]: false,
        [settingsKeys.THEME]: 'osrs',
        [settingsKeys.TIER_FILTER]: [],
        [settingsKeys.AUTO_WIKI_TOAST_ENABLED]: true,
        [settingsKeys.AUTO_WIKI_TOAST_ACK_COUNT]: 0,
        [settingsKeys.USERNAME]: '',
    };

    constructor(storageKey = 'osrs_grid_log:app_settings') {
        this.storageKey = storageKey;
        this.settings = this._loadSettings();
    }

    _loadSettings() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.warn('Failed to parse settings from localStorage:', e);
                return {};
            }
        }
        return {};
    }

    get(key) {
        return this.settings[key] ?? this._defaultSettings[key] ?? null;
    }

    set(key, value) {
        this.settings[key] = value;
        this._saveSettings();
    }

    _saveSettings() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.settings));
        } catch (e) {
            console.error('Failed to save settings to localStorage:', e);
        }
    }

    getAll() {
        return { ...this._defaultSettings, ...this.settings };
    }

    logout() {
        this.set(settingsKeys.USERNAME, '');
        window.location.reload(true);
    }
}

export default new Settings();
