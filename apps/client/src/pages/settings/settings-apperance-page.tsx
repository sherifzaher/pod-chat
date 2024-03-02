import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Page } from '../../utils/styles';
import { setTheme } from '../../store/slices/settings-slice';
import { SelectableTheme } from '../../utils/themes';

export const SettingsAppearancePage = () => {
  const dispatch = useDispatch();

  const handleThemeChange = (theme: SelectableTheme) => {
    dispatch(setTheme(theme));
    localStorage.setItem('theme', theme);
  };

  useEffect(() => {
    return () => console.log('something weired');
  }, []);

  return (
    <Page>
      <div>
        <span>Theme</span>
        <form>
          <input type="radio" id="dark" name="theme" onChange={() => handleThemeChange('dark')} />
          <label htmlFor="dark">Dark</label>
          <input type="radio" id="light" name="theme" onChange={() => handleThemeChange('light')} />
          <label htmlFor="light">Light</label>
        </form>
      </div>
    </Page>
  );
};
