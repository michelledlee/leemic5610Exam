import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import fetch from "node-fetch";
import axios from "axios";
import { HTTP } from "meteor/http";

// // Gets the JSON of a page
// if (Meteor.isServer) {
//   const urlget =
//     "https://www.reddit.com/r/aww/comments/a2a5t2/this_sevenyearold_girl_shows_friends_her_new/.json";
//   Meteor.methods({
//     async "comments.get"(post) {
//       return await axios
//         .get(urlget)
//         .then(response => {
//           let data = response.data[1].data.children;

//           return data;
//         })
//         .catch(error => {
//           console.log(error);
//         });
//     }
//   });
// }

if (Meteor.isServer) {

  Meteor.methods({
    async "comments.get"(post) {
      let urlget = "https://www.reddit.com" + post + ".json";
      return await axios
        .get(urlget)
        .then(response => {
          let data = response.data[1].data.children;

          return data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  });
}

// Gets the JSON of a page
if (Meteor.isServer) {
  Meteor.methods({
    async "get.post"(subreddit) {
      let trimSubreddit = subreddit.trim();
      let catURL = "https://www.reddit.com/search.json?q=" + trimSubreddit;
      let finalURL = catURL.replace(" ", "%20");
      return await axios
        .get(finalURL)
        .then(response => {
          console.log(response.data.data.children);
          let data = response.data.data.children;

          return data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  });
}