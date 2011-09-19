Google+ API 0.0.1
=================

## What's this?

This is a Node module for making requests using the official Google+ API (v1).

***Important!*** This is an early version. It currently has no support (but should later on) for OAuth. Also, it assumes that when you request a user's activities they are of the public collection.

See the Google+ API docs for more on available parameter options. https://developers.google.com/+/api/

## Dependencies

This module employs https, which come stock in Node. So you shouldn't have to npm anything.

## Installation

The easiest way to install this module is to use [npm](http://npmjs.org/). Execute `npm install Google_Plus_API` in your terminal.

## Creating a new instance

Using your API key you can create a new instance of the module as follows:

```javascript
var GooglePlusAPI = require('google-plus-api');
var plus = new GooglePlusAPI('YOUR-API-KEY');
```

## Getting a user's profile

Once you have your instance you can get a user's profile by doing something like:

```javascript
// id, callback
plus.getProfile('106180961098165812195', function(err, res) {});

// id, options, callback
plus.getProfile('106180961098165812195', { prettyPrint: 'true' }, function(err, res) {});
```

## Getting a user's activities

Getting a user's activities looks something like:

```javascript
// id, callback
plus.getActivities('106180961098165812195', function(err, res) {});

// id, options, callback
plus.getActivities('106180961098165812195', { maxResults: 10 }, function(err, res) {});
```

## Getting a specific activity

Once you have a list of activities from a user, you can then get more information for a specific one:

```javascript
// activity id, callback
plus.getActivity('z134sdlycvycc5ufd22pedkz0rbijjnzm04', function(err, res) {});

// id, options, callback
plus.getActivity('z134sdlycvycc5ufd22pedkz0rbijjnzm04', { alt: 'json' }, function(err, res) {});
```

## Future updates

The Google+ API just came out. So this will likely be updated in the near future.