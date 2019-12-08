import React, { Component } from "react";
import firebase, { auth, db } from "./firebase";
import CourseDetails from "./CourseDetails";
import CourseListingsTable from "./CourseListingsTable";
import TopicForm from "./TopicForm";

class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_topic: null,
      selected_course: null,
      showCourseDetailsModal: false,
      coursesForTopic: []
    };
  }

  showCourseDetails() {
    this.setState({ showCourseDetailsModal: true });
  }

  hideCourseDetails() {
    this.setState({ showCourseDetailsModal: false });
  }

  setSelectedTopic(topic) {
    //console.log("Catalog.setSelectedTopic() " + topic);
    this.getCoursesForTopic(topic);
    this.setState({
      selected_topic: topic,
      selected_course: null
    });
  }

  courseClickHandler(course) {
    this.setState({
      selected_course: course
    });
    this.showCourseDetails();
  }

  getCoursesForTopic(topic) {
    let matchingCourses = [];

    if (topic === "art") {
      matchingCourses.push({
        class_id: "ART101",
        description: "This class teaches the basics of pencil drawing.",
        name: "ART 101",
        short_summary: "Introduction to Drawing",
        teacher: "John Artist",
        record_id: "ART101"
      });
    } else if (topic === "math") {
      matchingCourses.push(
        {
          class_id: "MATH101",
          description: "This class teaches basic arithmetic",
          name: "MATH 101",
          short_summary: "Basic Arithmetic",
          teacher: "Joanne Mathe",
          record_id: "MATH101"
        },
        {
          class_id: "MATH201",
          description: "This class teaches basic algebra",
          name: "MATH 201",
          short_summary: "Basic Algebra",
          teacher: "Jane Adder",
          record_id: "MATH201"
        }
      );
    } else if (topic === "technology") {
      matchingCourses.push({
        class_id: "CS101",
        description: "This class teaches the basics computer programming.",
        name: "CS 101",
        short_summary: "Introduction to Programming",
        teacher: "Tieu Luu",
        record_id: "CS101"
      });
    } else if (topic === "writing") {
      matchingCourses.push({
        class_id: "LOW5",
        description: "This class teaches how to write words.",
        name: "LOW 5",
        short_summary: "Introduction to Writing",
        teacher: "The-Very-Best",
        record_id: "LOW5"
      }); //Add your code here for courses in the writing topic
    } else if (topic === "pe") {
      matchingCourses.push({
        class_id: "HI10",
        description: "This class teaches how to run, jump, strech, etc.",
        name: "HI 10",
        short_summary: "Introduction to pe",
        teacher: "The-Very-Best",
        record_id: "HI10"
      });
    } else if (topic === "reading") {
      matchingCourses.push({
        class_id: "HI5",
        description:
          "This class teaches how to read small words(why, how, where, why,etc)",
        name: "HI 5",
        short_summary: "Introduction to reading",
        teacher: "The-Very-Best",
        record_id: "HI5"
      });
    }

    this.setState({ coursesForTopic: matchingCourses });
  }

  render() {
    return (
      <div className="catalog">
        <div className="home-page-banner"> Course Catalog </div>
        <TopicForm submitHandler={topic => this.setSelectedTopic(topic)} />
        <CourseListingsTable
          coursesForTopic={this.state.coursesForTopic}
          courseClickHandler={course => this.courseClickHandler(course)}
        />
        <CourseDetails
          getUser={() => this.props.getUser()}
          selectedCourse={this.state.selected_course}
          showModal={this.state.showCourseDetailsModal}
          hideModalHandler={() => this.hideCourseDetails()}
        />
      </div>
    );
  }
}

export default Catalog;
