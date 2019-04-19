import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import fetch from "node-fetch";
import axios from "axios";
import { HTTP } from "meteor/http";

let wikipedia = require("node-wikipedia");

if (Meteor.isServer) {
	Meteor.methods({
		getPostData(searchQuery) {
			console.log(searchQuery);
			let trimQuery = searchQuery.trim();
		    let parsedSearch = trimQuery.replace(" ", "_");
			return new Promise((resolve, reject) => { 
				wikipedia.page.data(parsedSearch, { content: true }, resolve);
				 });
		}
	});
}

// if (Meteor.isServer) {
// 	Meteor.methods({
// 		getLinkandPush(searchQuery) {
// 			console.log(searchQuery);
// 			let trimQuery = searchQuery.trim();
// 		    let parsedSearch = trimQuery.replace(" ", "_");
// 			return new Promise((resolve, reject) => { 
// 				wikipedia.page.data(parsedSearch, { content: true }, resolve);
// 				 });
// 		}
// 	});
// }