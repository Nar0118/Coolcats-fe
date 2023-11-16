
/**
 * Service worker interepts requests for images
 * It puts retrieved images in cache for 10 minutes 
 * If image not found responds with fallback
 */

var INVALIDATION_INTERVAL = 10 * 60 * 1000; // 10 min
var NS = "CAT";
var SEPARATOR = "|";
var VERSION = Math.ceil( now() / INVALIDATION_INTERVAL  );
var VALIDAPIURLS = [
  "https://nfaqmkade7.execute-api.us-east-1.amazonaws.com",
  "https://private-b23b4-coolcatsapi.apiary-mock.com"
];
var CACHEABLE_API_PATHS = [
  '/Prod/cat',
  /cat\/([0-9]+)/
];
var isDev = [
  'https://coolcatsnft.com',
  'https://www.coolcatsnft.com'
].indexOf(self.location.origin) < 0;

/**
 * Helper to get current timestamp
 * @returns {Number}
 */
function now() {
  var d = new Date();
  return d.getTime();
}

/**
 * Build cache storage key that includes namespace, url and record version
 * @param {String} url
 * @returns {String}
 */
function buildKey( url ) {
  return  NS + SEPARATOR + url + SEPARATOR + VERSION;
}

function log() {
  if (isDev) {
    //console.log(...arguments);
  }
}

/**
 * The complete Triforce, or one or more components of the Triforce.
 * @typedef {Object} RecordKey
 * @property {String} ns - namespace
 * @property {String} url - request identifier
 * @property {String} ver - record varsion
 */

/**
 * Parse cache key
 * @param {String} key
 * @returns {RecordKey}
 */
function parseKey( key ) {
  var parts = key.split( SEPARATOR );
  return {
    ns: parts[ 0 ],
    key: parts[ 1 ],
    ver: parseInt( parts[ 2 ], 10 )
  };
}

/**
 * Invalidate records matchinf actual version
 *
 * @param {Cache} caches
 * @returns {Promise}
 */
function purgeExpiredRecords( caches ) {
  log( "Purging..." );
  return caches.keys().then(function( keys ) {
    return Promise.all(
      keys.map(function( key ) {
        var record = parseKey( key );
        if ( record.ns  === NS && record.ver !== VERSION ) {
          log("deleting", key);
          return caches.delete( key );
        }
      })
    );
  });
}

/**
 * Proxy request using cache-first strategy
 *
 * @param {Cache} caches
 * @param {Request} request
 * @returns {Promise}
 */
function proxyRequest( caches, request ) {
  var key = buildKey( request.url );
  // set namespace
  return caches.open( key ).then( function( cache ) {
    // check cache
    return cache.match( request ).then( function( cachedResponse ) {
      if ( cachedResponse ) {
        log( "Take it from cache", request.url );
        return cachedResponse;
      }
      // { mode: "no-cors" } gives opaque response
      // https://fetch.spec.whatwg.org/#concept-filtered-response-opaque
      // so we cannot get info about response status
      return fetch( request.clone() )
        .then(function( networkResponse ) {
            if ( networkResponse.type !== "opaque" && networkResponse.ok === false ) {
              throw new Error( "Resource not available" );
            }
            log( "Fetch it through Network", request.url, networkResponse.type );
            cache.put( request, networkResponse.clone() );
            return networkResponse;
        }).catch(function() {
          log( "Failed to fetch", request.url );
          // Placeholder image for the fallback
          return fetch( "./placeholder.jpg", { mode: "no-cors" });
        });
    });
  });
}


self.addEventListener( "install", function( event ) {
  event.waitUntil( self.skipWaiting() );
});

self.addEventListener( "activate", function( event ) {
  event.waitUntil( purgeExpiredRecords( caches ) );
});

self.addEventListener( "fetch", function( event ) {
  var request = event.request;

  var u = new URL(request.url);

  var validApiPath = CACHEABLE_API_PATHS.filter((p) => {
    if (typeof p === 'string') {
      return p === u.pathname;
    } else if (typeof p === 'object'
      && typeof p.test === 'function'
    ) {
      return p.test(u.pathname);
    }

    return false;
  });

  var apiRequest = VALIDAPIURLS.indexOf(u.origin) >= 0
    && validApiPath.length > 0
    && request.mode === 'cors';
  var imageRequest = request.url.match( /\.(jpe?g|png|gif|svg)$/ );
  
  if (request.method !== 'GET') {
    return;
  }

  if (!imageRequest && !apiRequest) {
    return;
  }

  log( "Accepted request", request.url );

  event.respondWith(
    proxyRequest( caches, request )
  );
});