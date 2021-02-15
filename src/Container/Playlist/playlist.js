import React from "react";
import ReactTable from "../../Components/ReactTable/Table";
import { exportCSVFile } from "../../Components/Utils/download";
import { InputGroup, Button, FormControl } from "react-bootstrap";
import ViewSong from "./../SongDetails/song";
import "./style.css";
export default class PlayList extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getEmptyState();
  }
  getEmptyState = () => ({
    list: [],
    searchString: "",
    data: null,
    id: null,
  });

  getRows = () => {
    let list = [];
    this.state.data && Object.entries(this.state.data).map((field, index) => {
      const name = field[0];
      Object.values(field[1]).map((value, i) => {
        if (list[i]) {
          list[i][name] = value;
        } else {
          list.push({ [name]: value, index: i });
        }
      });
    });

    this.setState({
      list: list.filter((row) =>
        row.title.toLowerCase().includes(this.state.searchString)
      ),
    });
  };

  handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file.name.includes(".json")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = JSON.parse(e.target.result);
        const list = [];
        // Object.entries(data).map((field, index) => {
        //   const name = field[0];
        //   Object.values(field[1]).map((value, i) => {
        //     if (list[i]) {
        //       list[i][name] = value;
        //     } else {
        //       list.push({ [name]: value, index: i });
        //     }
        //   });
        // });
        this.setState({ data }, () => {
          this.getRows();
        });
      };

      reader.onerror = (ex) => {
        console.info(ex);
      };

      reader.readAsBinaryString(file);
    } else {
      alert("Incorrect file type");
    }
  };

  onRowClick = (rowInfo) => {
    this.setState({
      openAll: false,
      id: rowInfo.original.index,
      openSong: true,
    });
  };
  toggleMenu = (rowInfo) => {
    this.setState({
      openAll: false,
      id: 0,
      openSong: false,
    });
  };
  render() {
    const headers = [
      {
        Header: "View",
        Cell: ({ row }) => (
          <button className="btn btn-light" onClick={(e) => this.onRowClick(row)}>View</button>
        ),
      },
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "danceability",
        accessor: "danceability",
      },
      {
        Header: "energy",
        accessor: "energy",
      },
      {
        Header: "mode",
        accessor: "mode",
      },
      {
        Header: "acousticness",
        accessor: "acousticness",
      },
      {
        Header: "tempo",
        accessor: "tempo",
      },
      {
        Header: "duration_ms",
        accessor: "duration_ms",
      },
      {
        Header: "num_sections",
        accessor: "num_sections",
      },
      {
        Header: "Num_segments",
        accessor: "num_segments",
      },
    ];
    return (
      <div className="playlist">
        <div className="file-input">
          <input
            type="file"
            name="xlsxFile"
            accept=".json"
            onChange={this.handleFileSelect}
            onClick={(event) => {
              event.target.value = null;
            }}
          />
          <div className="buttons-header">
            <Button
              variant="primary"
              onClick={() =>
                this.setState({
                  openAll: true,
                  id: null,
                  openSong: false,
                })
              }
              disabled={this.state.list.length === 0}
            >
              Statistics
            </Button>{" "}
            <Button
              variant="primary"
              onClick={() =>
                exportCSVFile(
                  Object.keys(this.state.list[0]),
                  this.state.list,
                  "plalist"
                )
              }
              disabled={this.state.list.length === 0}
            >
              Download CSV
            </Button>{" "}
            <InputGroup className="search-bar">
              <FormControl
                placeholder="Search by song title"
                aria-label="Search by song title"
                aria-describedby="basic-addon2"
                // onChange={e => this.setState({searchString : e.target.value})}
                onChange={(e) =>
                  this.setState({ searchString: e.target.value }, () => {
                    this.getRows();
                  })
                }
              />
              <InputGroup.Append>
                <Button variant="outline-secondary">Search</Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
        </div>
        <ReactTable
          headers={headers}
          data={this.state.list}
          onRowClick={this.onRowClick}
        />
        {(this.state.openSong || this.state.openAll) && (
          <ViewSong
            openSong={this.state.openSong}
            openAll={this.state.openAll}
            onClose={this.toggleMenu}
            className="song-details"
            song={this.state.list.find((x) => x.index === this.state.id)}
            list={this.state.list}
          />
        )}
      </div>
    );
  }
}
