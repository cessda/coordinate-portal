import '@testing-library/jest-dom';
import fetch from 'jest-mock-fetch' ;

// @ts-expect-error - overriding default fetch
global.fetch = fetch;
