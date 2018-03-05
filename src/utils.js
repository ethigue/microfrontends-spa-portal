import string from 'string';
import queryString from 'query-string';

export const Strings = {
    substitute: (str = '', values = []) => string(str).template(values).s,
    queryfy: query => query ? `?${queryString.stringify(query)}` : ''
};