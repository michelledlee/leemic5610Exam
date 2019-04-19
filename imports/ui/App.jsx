import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // comments: [],
      // titles: [],
      wikipage: [],
      message: "",
      previousSearch: []
      // messageComments: ""

    };
  }

  componentDidMount() {
    // Meteor.call("comments.get", (err, response) => {
    //   if (err) {
    //     console.log(err);
    //     return;
    //   }
    //   this.setState({
    //     comments: response
    //   });
    // });
  }

  // // renders comments given a title of a post
  // renderComments() {
  //   return this.state.comments.map((p, i) => (
  //     <div key={i++}>
  //       {p.kind}
  //       {p.data.body}
  //     </div>
  //   ));
  // }

  // renders matching title results after searching for a keyword
  // renderTitles() {
  //   return this.state.titles.map((p, j) => (
  //     <div key={j++}>
  //       {p.kind}
  //       {p.data.title}
  //       {p.data.permalink}
  //     </div>
  //   ));
  // }

  onChange(evt) {
    this.setState({
      message: evt.target.value
    });
  }

  onKey(evt) {
    if (evt.key === "Enter") {
      Meteor.call("getPostData", this.state.message, (err, res) => {
        if (err) {
          alert("There was error inserting check the console");
          // console.log(err);
          return;
        } else {
          // console.log(res.text["*"]);
          this.setState({
            wikipage: res.text["*"]
          })
          // console.log(this.state.wikipage);
        }

        this.setState({
          message: ""
        });
      });
    }
  }

  renderPage() {
    // console.log(this.state.wikipage);
     return (
      <div dangerouslySetInnerHTML={{ __html: this.state.wikipage }} />
    );
  }

  window.onclick = function(e) { 
  if(e.target.localName=='a')
    let list = [];
    list.push(e.target);
        this.setState({
      previousSearch: list
    })
        console.log(this.state.previousSearch);
  };


  // onChangeComments(evt) {
  //   this.setState({
  //     messageComments: evt.target.value
  //   });
  // }

  // onKeyComments(evt) {
  //   if (evt.key === "Enter") {
  //     Meteor.call("comments.get", this.state.messageComments, (err, res) => {
  //       if (err) {
  //         alert("There was error inserting check the console");
  //         // console.log(err);
  //         return;
  //       } else {
  //         this.setState({
  //           comments: res
  //         })
  //       }

  //       this.setState({
  //         messageComments: ""
  //       });
  //     });
  //   }
  // }

        // {this.renderTitles()}
        // <h1>Render Comments from Post</h1>
        // <input
        //   className="fixlabel form-control"
        //   type="text"
        //   id="inMessage"
        //   placeholder="Enter a search term"
        //   value={this.state.messageComments}
        //   onChange={this.onChangeComments.bind(this)}
        //   onKeyPress={this.onKeyComments.bind(this)}
        // />
        // {this.renderComments()}

  render() {
    return (
      <div>
        {this.state.err ? <div> ERROR{this.state.err}</div> : " "}
        <h1>Wikipedia - Search by Keyword</h1>
        <input
          className="fixlabel form-control"
          type="text"
          id="inMessage"
          placeholder="Enter a search term"
          value={this.state.message}
          onChange={this.onChange.bind(this)}
          onKeyPress={this.onKey.bind(this)}
        />
        {this.renderPage()}
      </div>
    );
  }
}