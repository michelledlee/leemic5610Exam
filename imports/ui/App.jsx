import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import Modal from "react-modal";

const customStyles = {
  content: {
    "top": "50%",
    "left": "50%",
    "right": "auto",
    "bottom": "auto",
    "overflowY": "scroll",
    "marginRight": "-50%",
    "transform": "translate(-50%, -50%)"
  }
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // comments: [],
      // titles: [],
      modalIsOpen: false,
      modalEquipIsOpen: false,
      wikipage: [],
      wikititle: [],
      wikilinks: [],
      message: "",
      previousSearch: []
      // messageComments: ""
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  // renders comments given a title of a post'
  renderLinks() {
    return this.state.wikilinks.map((p, i) => 
      <div key={i++}>
        <button
        type="submit"
        onClick={()=> this.onSubmit(p["*"])}
        >
        {p["*"]}
        </button>
      </div>
      );
  }

  renderHistory() {
        return this.state.previousSearch.map((p, i) => 
      <div key={i++}>
        <button
        type="submit"
        onClick={this.onSubmit(p["*"])}
        >
        {p["*"]}
        </button>
      </div>
      );
  }

  onSubmit(search) {
    this.state.previousSearch.concat(search);
    Meteor.call("getPostData", search, (err, res) => {
        if (err) {
          alert("There was error inserting check the console");
          // console.log(err);
          return;
        } else {
          console.log(res);
          this.setState({
            wikipage: res.text["*"],
            wikititle: res.title,
            wikilinks: res.links
            // store links (array)
            // store title
          });
          // console.log(this.state.wikipage);
        }
      });
  }

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
          console.log(res);
          this.setState({
            wikipage: res.text["*"],
            wikititle: res.title,
            wikilinks: res.links
            // store links (array)
            // store title
          });
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
    return <div dangerouslySetInnerHTML={{ __html: this.state.wikipage }} />;
  }

  // onMouseClick() {
  //   let list = this.state.previousSearch; 
  //   window.onclick = function(e) {
  //     if (e.target.localName == "a") {
  //       alert(e.target);
  //       // let list = this.state.previousSearch;
  //       list.push(e.target);

  //     }
  //   };
  //           this.setState({
  //         previousSearch: list
  //       });
  //       console.log(this.state.previousSearch);
  // }

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
          <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Example Modal"
              ariaHideApp={false}
            >
              <h2 ref={subtitle => (this.subtitle = subtitle)}>
                Hello
              </h2>
              <button onClick={this.closeModal}>close</button>
              <div>I am a modal</div>
              {this.renderLinks()}
            </Modal>
          {this.renderLinks()}
          {this.renderPage()}

          <h1>Previous History</h1>
          {this.renderHistory()}

        </div>
      </div>
    );
  }
}