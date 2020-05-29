import _ from 'lodash';

const VALID_URL = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
const VALID_EMAIL = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class UrlHandler {
  to(url) {
    window.history.pushState(null, null, url);
  }
  /**
   * Compare 2 urls
   * @param {String} href1 a url/pathname
   * @param {String} href2 a url/pathname (default as the `window.location.pathname`)
   */
  isEqual(href1, href2) {
    const href2_ = href2 === undefined ? window.location.pathname : href2;
    return href1 === href2_;
  }
  
  /**
   * Validate the url
   * @param {String} url a url to validate
   */
  isValidUrl(url) {
    return VALID_URL.test(url);
  }

  /**
   * Determine whether a imput email is valid
   */
  isValidEmail(email) {
    return VALID_EMAIL.test(email);
  }

  /**
   * Get parsed query object
   * @param {String} query query string
   */
  useParams(query) {
    if (!query) return {};
    const params = {};

    try {
      const pairs = query.substr(1).split('&');
      pairs.forEach((pair) => {
        const [name = '', value = ''] = pair.split('=');
        params[decodeURIComponent(name)] = decodeURIComponent(value);
      });
    } catch (error) {
      console.error('Invalid query');
    }

    return params;
  }

  /**
   * Create a query based on the values in params
   * @param {Object} params search query's params
   * @param {String} prefix the first char in the query '?' or '#'
   */
  createQuery(params, prefix = '') {
    let query = '';
    const keys = Object.keys(params);
    _.forEach(keys, (key) => {
      if (params[key]) {
        let value = params[key];
        if (typeof value === 'string') {
          value = encodeURIComponent(value);
        }

        query += `&${key}=${value}`;
      }
    });

    query = query.replace('&', '');
    return query ? prefix + query : '';
  }

  /**
   * Get parsed window.location.search query of href
   * @param {String} href default to window.href
   */
  useSearch(href) {
    return this.useParams(
      this.isValidUrl(href)
        ? href.substring(href.indexOf('?'), href.length)
        : window.location.search,
    );
  }

  /**
   * Create a window.location.search query
   * @param {Object} params search query's params
   */
  createSearch(params) {
    return this.createQuery(params, '?');
  }

  /**
   * Replace current window.location.search
   * @param {Object} params search query's params
   */
  replaceSearch(params) {
    const query = this.createSearch(params);
    window.history.pushState(null, null, window.location.pathname + query);
  }

  /**
   * Push new value to current window.location.search
   * @param {Object} params search query's params
   */
  pushSearch(params) {
    const allParams = { ...this.useSearch(), ...params };
    const newQuery = this.createSearch(allParams);
    window.history.pushState(null, null, window.location.pathname + newQuery);
  }

  setHash(hash = '#') {
    if (!hash.startsWith('#')) {
      hash = `#${hash}`;
    }

    let aElem = document.createElement('a');
    aElem.href = hash;
    aElem.click();
  }

  /**
   * Create a window.location.hash query
   * @param {Object} params hash query's params
   */
  createHash(params) {
    return this.createQuery(params, '#');
  }
}

export const uurl = new UrlHandler();