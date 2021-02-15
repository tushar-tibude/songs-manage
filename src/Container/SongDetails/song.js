import React from "react";
import RightMenu from "../../Components/RightMenu/RightMenu";
import { Bar, HorizontalBar, Scatter } from "@reactchartjs/react-chart.js";
import "./style.css";

export default class ViewSong extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getEmptyState();
  }

  getEmptyState = () => ({
    open: false,
    openPreview: false,
    song: null,
  });

  //   UNSAFE_componentWillReceiveProps(nextProps) {
  //     if (nextProps.id && nextProps.id !== this.props.id) {
  //       this.props.getSong(nextProps.id);
  //     }
  //   }

  getTitle = () => {
    return (
      <div className="title-sow-history">
        {" "}
        {this.props.openSong
          ? ` Title - ${this.props.song.title}`
          : "Statistics"} {}
      </div>
    );
  };

  getBody = () => {
    const rand = () => Math.round(Math.random() * 20 - 10);

    return (
      <div className="body sow-history-body col-md-12 col-sm-12">
        {this.props.openSong && this.props.song && (
          <HorizontalBar
            data={{
              labels: ["acoustics", "tempo"],
              datasets: [
                {
                  label: "Song acoustics & tempo ",
                  data: [this.props.song.acoustics, this.props.song.tempo],
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            width={80}
            height={20}
            options={{ maintainAspectRatio: true }}
          />
        )}
        <Bar
          data={{
            labels: this.props.list.map((x) => x.title),
            datasets: [
              {
                label: "Song Durations",
                data: this.props.list.map((x) => x.duration_ms / 1000),
                borderWidth: 1,
              },
            ],
          }}
          width={80}
          height={50}
          options={{ maintainAspectRatio: true }}
        />
        <Scatter
          data={{
            datasets: [
              {
                label: "danceability vs  acousticness",
                data: this.props.list.map((data) => {
                  return { x: data.danceability, y: data.acousticness };
                }),
              },
            ],
          }}
          width={80}
          height={40}
          options={{ maintainAspectRatio: true }}
        />
      </div>
    );
  };

  toggleOpenPreview = () => {
    this.setState({
      openPreview: !this.state.openPreview,
      sow: null,
    });
  };
  render() {
    return (
      <>
        <RightMenu
          show={this.props.openSong || this.props.openAll}
          onClose={this.props.onClose}
          titleElement={this.getTitle()}
          bodyElement={this.getBody()}
          footerElement={""}
          className=""
        />
      </>
    );
  }
}
