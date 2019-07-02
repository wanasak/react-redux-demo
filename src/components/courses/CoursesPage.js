import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import { bindActionCreators } from 'redux';
import CoursesList from './CoursesList';
import { Redirect } from 'react-router-dom';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

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

  handleDeleteCourse = async course => {
    toast.success('Course deleted');
    try {
      await this.props.actions.deleteCourse(course);
    } catch (error) {
      toast.error(`Delete failed. ` + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Course</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
              className="btn btn-primary"
            >
              Add Course
            </button>
            <CoursesList
              onDeleteClick={this.handleDeleteCourse}
              courses={this.props.courses}
            />
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

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
  authors: state.authors,
  loading: state.apiCallInProgress > 0
});

const mapDispatchToProps = dispatch => ({
  actions: {
    loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
    loadAuthors: bindActionCreators(authorActions.loadAuhtors, dispatch),
    deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
