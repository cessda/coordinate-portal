export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';

export const changeLanguage = code => {
  return {
    type: CHANGE_LANGUAGE,
    code
  };
};
