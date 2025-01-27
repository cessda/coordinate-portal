// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  withTranslation: () => (Component: { defaultProps: object; }) => {
    Component.defaultProps = { ...Component.defaultProps, t: (str: string) => str };
    return Component;
  },
}));
