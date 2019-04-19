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
    "maxHeight": "90%",
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
      modalHistoryIsOpen: false,
      wikipage: [],
      wikititle: "Start Searching!",
      wikilinks: [],
      message: "",
      previousSearch: []
      // messageComments: ""
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.openHistoryModal = this.openHistoryModal.bind(this);
    this.afterOpenHistoryModal = this.afterOpenHistoryModal.bind(this);
    this.closeHistoryModal = this.closeHistoryModal.bind(this);
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

  openHistoryModal() {
    this.setState({ modalHistoryIsOpen: true });
  }

  afterOpenHistoryModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00";
  }

  closeHistoryModal() {
    this.setState({ modalHistoryIsOpen: false });
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
        onClick={()=> this.onSubmit2(p)}
        >
        {p}
        </button>
      </div>
      );
  }

  onSubmit(search) {
    console.log(this.state.previousSearch);
    let list = this.state.previousSearch;
    list.push(search);
    // this.state.previousSearch.concat(search);
    this.setState({
      previousSearch: list
    });

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

  onSubmit2(search) {
    let list = [];
    list.push(search);
    // this.state.previousSearch.concat(search);
    this.setState({
      previousSearch: list
    });

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
      let trimQuery = this.state.message.trim();
      let parsedSearch = this.state.message.replace(" ", "_");
      let list = this.state.previousSearch;
    list.push(parsedSearch);
    // this.state.previousSearch.concat(search);
    this.setState({
      previousSearch: list
    });
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
        <div className="col-lg-12" role="mail">
          {this.state.err ? <div> ERROR{this.state.err}</div> : " "}
          <h1>WikiSearch - {this.state.wikititle}</h1>
          <h6>Start searching by entering a keyword and hitting your enter key!</h6>
          <input
            className="fixlabel form-control"
            type="text"
            id="inMessage"
            placeholder="Enter a search term"
            value={this.state.message}
            onChange={this.onChange.bind(this)}
            onKeyPress={this.onKey.bind(this)}
          />
          <b>Links to other pages from this page:</b>{" "}
          <button 
          className="btn btn-xl btn-dark text-uppercase"
          onClick={this.openModal}>Links</button>
          <br />
          <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Example Modal"
              ariaHideApp={false}
            >
              <h2 ref={subtitle => (this.subtitle = subtitle)}>
                Links to Other Pages
              </h2>
              <button 
              className="btn btn-xl btn-dark text-uppercase"
              onClick={this.closeModal}>close</button>
              <div>Links from this Page</div>
              {this.renderLinks()}
            </Modal>


          <b>View your previous browsing history:</b>{" "}
          <button 
          className="btn btn-xl btn-dark text-uppercase"
          onClick={this.openHistoryModal}>History</button>
          <br />
          <Modal
              isOpen={this.state.modalHistoryIsOpen}
              onAfterOpen={this.afterOpenHistoryModal}
              onRequestClose={this.closeHistoryModal}
              style={customStyles}
              contentLabel="Example Modal"
              ariaHideApp={false}
            >
              <h2 ref={subtitle => (this.subtitle = subtitle)}>
                Browsing History Links
              </h2>
              <button onClick={this.closeHistoryModal}>close</button>
              <div>Browsing History</div>
              {this.renderHistory()}
            </Modal>
          {this.renderPage()}

        </div>
      </div>
    );
  }
}