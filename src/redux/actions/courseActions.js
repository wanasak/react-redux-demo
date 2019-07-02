import {
  LOAD_COURSES_SUCCESS,
  CREATE_COURSE_SUCCESS,
  UPDATE_COURSE_SUCCESS
} from './actionTypes';
import * as courseApi from '../../api/courseApi';

// export function createCourse(course) {
//   return {
//     type: CREATE_COURSE,
//     course
//   };
// }

export function loadCoursesSuccess(courses) {
  return {
    type: LOAD_COURSES_SUCCESS,
    courses
  };
}

export function createCourseSuccess(course) {
  return {
    type: CREATE_COURSE_SUCCESS,
    course
  };
}

export function updateCourseSuccess(course) {
  return {
    type: UPDATE_COURSE_SUCCESS,
    course
  };
}

export function loadCourses() {
  return function(dispatch) {
    return courseApi
      .getCourses()
      .then(courses => dispatch(loadCoursesSuccess(courses)))
      .catch(error => {
        throw error;
      });
  };
}

export function saveCourse(course) {
  return function(dispatch, getState) {
    debugger;
    return courseApi
      .saveCourse(course)
      .then(savedCourse => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch(error => {
        throw error;
      });
  };
}
