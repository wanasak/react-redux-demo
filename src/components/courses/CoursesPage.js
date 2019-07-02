import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import { bindActionCreators } from 'redux';
import CoursesList from './CoursesList';
import { Redirect } from 'react-router-dom';

const mapStateToProps = state => ({
  courses:
    state.authors.length === 0
      ? []
      : state.courses.map(course => {
          return {
            ...course,
            authorName: state.authors.find(a => a.id === course.authorId).name
          };
        }),
  authors: state.authors
});

const mapDispatchToProps = dispatch => ({
  actions: {
    loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
    loadAuthors: bindActionCreators(authorActions.loadAuhtors, dispatch)
  }
});

class CoursesPage extends Component {
  state = { redirectToAddCoursePage: false };

  componentDidMount() {
    if (this.props.courses.length === 0) {
      this.props.actions.loadCourses();
    }
    if (this.props.authors.length === 0) {
      this.props.actions.loadAuthors();
    }
  }

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Course</h2>
        <button
          style={{ marginBottom: 20 }}
          onClick={() => this.setState({ redirectToAddCoursePage: true })}
          className="btn btn-primary"
        >
          Add Course
        </button>
        <CoursesList courses={this.props.courses} />
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
