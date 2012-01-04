var https = require('https');

/**
    Base function
    
    Takes your API key
*/
function GooglePlus(apiKey) {
    if(apiKey === undefined) {
        throw 'No API key defined';
        return;
    }
    
    this.apiKey = apiKey;
    
    return this;
}

/**
    Lists a user's activities in a given collection type
    https://developers.google.com/+/api/latest/activities/list
    
    First argument must be the user's Id
    Second argument must be the collection type. Can be "public"
    Arguments may be (id, collection, callback) or (id, collection, options, callback)
    
    Returns the HTTP request instance
*/
GooglePlus.prototype.getActivities = function(id, collection, a, b /* id, callback || id, options, callback */) {
    return makeRequest(this.apiKey, 'people/' + id + '/activities/' + collection, b === undefined ? {} : a, b === undefined ? a : b);
};

/**
    Retrieves a single activity
    https://developers.google.com/+/api/latest/activities/get
    
    First argument must be the activity Id
    Arguments may be (id, callback) or (id, options, callback)
    
    Returns the HTTP request instance
*/
GooglePlus.prototype.getActivity = function(id, a, b /* id, callback || id, opts, callback */) {
    return makeRequest(this.apiKey, 'activities/' + id, b === undefined ? {} : a, b === undefined ? a : b);
};

/**
    Lists the comments for a given activity
    https://developers.google.com/+/api/latest/comments/list
    
    First argument must be the activity Id
    Arguments may be (id, callback) or (id, options, callback)
    
    Returns the HTTP request instance
*/
GooglePlus.prototype.getActivityComments = function(id, a, b /* id, callback || id, options, callback */) {
    return makeRequest(this.apiKey, 'activities/' + id + '/comments', b === undefined ? {} : a, b === undefined ? a : b);
};

/**
    Lists people who are in a given collection, for a given activity
    https://developers.google.com/+/api/latest/people/listByActivity
    
    First argument must be the activity Id
    Second argument must be the collection type. Can be "plusoners" or "resharers"
    Arguments may be (id, collection, callback) or (id, collection, options, callback)
    
    Returns the HTTP request instance
*/
GooglePlus.prototype.getActivityPeople = function(id, collection, a, b /* id, callback || id, options, callback */) {
    return makeRequest(this.apiKey, 'activities/' + id + '/people/' + collection, b === undefined ? {} : a, b === undefined ? a : b);
};

/**
    Lists people who gave the given activity a plus one
    https://developers.google.com/+/api/latest/people/listByActivity
    
    First argument must be the activity Id
    Arguments may be (id, callback) or (id, options, callback)
*/
GooglePlus.prototype.getActivityPlusoners = function(id, a, b /* id, callback || id, options, callback */) {
    return makeRequest(this.apiKey, 'activities/' + id + '/people/plusoners', b === undefined ? {} : a, b === undefined ? a : b);
};

/**
    Lists people who reshared the given activity
    https://developers.google.com/+/api/latest/people/listByActivity
    
    First argument must be the activity Id
    Arguments may be (id, callback) or (id, options, callback)
    
    Returns the HTTP request instance
*/
GooglePlus.prototype.getActivityResharers = function(id, a, b /* id, callback || id, options, callback */) {
    return makeRequest(this.apiKey, 'activities/' + id + '/people/resharers', b === undefined ? {} : a, b === undefined ? a : b);
};

/**
    Gets a specific comment
    https://developers.google.com/+/api/latest/comments/get
    
    First argument must be the comment Id
    Arguments may be (id, callback) or (id, options, callback)
    
    Returns the HTTP request instance
*/
GooglePlus.prototype.getComment = function(id, a, b /* id, callback || id, options, callback */) {
    return makeRequest(this.apiKey, 'comments/' + id, b === undefined ? {} : a, b === undefined ? a : b);
};

/**
    Gets a user's profile
    https://developers.google.com/+/api/latest/people/get
    
    First argument must be the user's Id
    Arguments may be (id, callback) or (id, options, callback)
    
    Returns the HTTP request instance
*/
GooglePlus.prototype.getProfile = function(id, a, b /* id, callback || id, options, callback */) {
    return makeRequest(this.apiKey, 'people/' + id, b === undefined ? {} : a, b === undefined ? a : b);
};

/**
    Lists a user's public activity
    https://developers.google.com/+/api/latest/activities/list
    
    First argument must be the user's Id
    Arguments may be (id, callback) or (id, options, callback)
    
    Returns the HTTP request instance
*/
GooglePlus.prototype.getPublicActivities = function(id, a, b /* id, callback || id, options, callback */) {
    return makeRequest(this.apiKey, 'people/' + id + '/activities/public', b === undefined ? {} : a, b === undefined ? a : b);
};

/**
    Searches public activities
    https://developers.google.com/+/api/latest/activities/search
    
    First argument must be the search string
    Arguments may be (id, callback) or (id, options, callback)
    The search string will be placed into the options (wheter options is given or not), and will overwrite any existing key of 'query'
    
    Returns the HTTP request instance
*/
GooglePlus.prototype.searchActivities = function(query, a, b /* id, callback || id, opts, callback */) {
    var options = b === undefined ? {} : a;
    options.query = query;
    return makeRequest(this.apiKey, 'activities', options, b === undefined ? a : b);
};

/**
    Searches public profiles
    https://developers.google.com/+/api/latest/people/search
    
    First argument must be the search string
    Arguments may be (id, callback) or (id, options, callback)
    The search string will be placed into the options (wheter options is given or not), and will overwrite any existing key of 'query'
    
    Returns the HTTP request instance
*/
GooglePlus.prototype.searchProfiles = function(query, a, b /* id, callback || id, opts, callback */) {
    var options = b === undefined ? {} : a;
    options.query = query;
    return makeRequest(this.apiKey, 'people', options, b === undefined ? a : b);
};

/**
    Private function, used to make requests to G+
    
    Takes the path, any options (becomes query params) & a callback
    
    Returns the HTTP request instance
*/
function makeRequest(apiKey, path, opts, callback) {
    var 
        key,
        req,
        dataStr = '';
        
    if(callback === undefined) {
        throw 'No callback defined';
        return;
    }

    path = '/plus/v1/' + path + '?key=' + apiKey;
    for(key in opts) {
        path += '&' + key + '=' + opts[key];
    }

    req = https.request({
        host: 'www.googleapis.com',
        port: 443,
        path: path,
        method: 'GET'
    }, function(res) {
        res.on('data', function(data) {
            dataStr += data;
        });
        
        res.on('end', function() {
            if(opts.alt === undefined || opts.alt.toLowerCase() == 'json') {
                try {
                    callback(null, JSON.parse(dataStr));
                } catch(err) {
                    callback(null, dataStr);
                }
            }
            else {
                callback(null, dataStr);
            }
        });
        
        res.on('close', function () {
            res.emit('end');
        });
    });
    req.end();
    
    req.on('error', function(err) {
        callback(err);
    });

    return req;
}

module.exports = GooglePlus;