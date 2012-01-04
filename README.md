Google+ API 0.1.1
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
plus.getPublicActivities('106180961098165812195', function(err, res) {});

// id, options, callback
plus.getPublicActivities('106180961098165812195', { maxResults: 10 }, function(err, res) {});
```

Another way of doing it is:

```javascript
// id, collection, callback
plus.getActivities('106180961098165812195', 'public', function(err, res) {});
```

Right now the only available collection is 'public,' but this allows some flexibility if and when that changes.

## Getting a specific activity

Once you have a list of activities from a user, you can then get more information for a specific one:

```javascript
// activity id, callback
plus.getActivity('z134sdlycvycc5ufd22pedkz0rbijjnzm04', function(err, res) {});
```

## Getting more about a specific activity

One of the core features of Google+ is the 'Plus One,' similar to Facebook's 'Like.' You can find a list of 'Plusoners' like this:

```javascript
// activity id, collection, callback
plus.getActivityPeople('z134sdlycvycc5ufd22pedkz0rbijjnzm04', 'plusoners', function(err, res) {});
```

The collection types are currently 'plusoners' and 'resharers.' You can also access this via a shortcut:

```javascript
// activity id, callback
plus.getActivityPlusoners('z134sdlycvycc5ufd22pedkz0rbijjnzm04', function(err, res) {});

// activity id, callback
plus.getActivityResharers('z134sdlycvycc5ufd22pedkz0rbijjnzm04', function(err, res) {});
```

You may also want to dig deeper and look at the comments for the activity.

```javascript
// activity id, callback
plus.getActivityComments('z134sdlycvycc5ufd22pedkz0rbijjnzm04', function(err, res) {});
```

## Getting a specific comment

As seen above you can retrieve the list of comments for a specific activity. But maybe you'd like to simply retrieve a single comment.

```javascript
// comment id, callback
plus.getComment('i_gHb6AxAiPxyLxjJaW0gMItm0Eark-KwrOudJQ8F8Unt0muh-y4stTqGy_Tl24DKXYJWezdgDzlLveXdYO-Fg', function(err, res) {});
```

## Searching

There are currently two types of searches available; Public activities and profiles.

```javascript
// query, callback
plus.searchActivities('2012 election', function(err, res) {});

// query, callback
plus.searchProfiles('Marshall', function(err, res) {});
```

## Future updates

The Google+ API is still pretty young. There have already been a number of changes, and there are bound to be more. This module is subject to change.