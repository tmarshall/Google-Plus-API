var https = require('https');

function GooglePlus(apiKey) {
    if(apiKey === undefined) {
        throw 'No API key defined';
        return;
    }
    
    this.getProfile  = function(id, b, c /* id, callback || id, opts, callback */) {
        return makeRequest('/plus/v1/people/' + id, c === undefined ? {} : b, c === undefined ? b : c);
    };
    
    this.getActivites = function(id, b, c /* id, callback || id, opts, callback */) {
        return makeRequest('/plus/v1/people/' + id + '/activities/public', c === undefined ? {} : b, c === undefined ? b : c);
    };
    
    this.getActivity = function(id, b, c /* id, callback || id, opts, callback */) {
        return makeRequest('/plus/v1/activities/' + id, c === undefined ? {} : b, c === undefined ? b : c);
    };
    
    function makeRequest(path, opts, callback) {
        var 
            key,
            req,
            dataStr = '';
            
        if(callback === undefined) {
            throw 'No callback defined';
            return;
        }

        path += '?key=' + apiKey;
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
}

module.exports = GooglePlus;
