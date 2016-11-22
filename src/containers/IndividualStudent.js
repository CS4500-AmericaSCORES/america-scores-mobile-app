import React, { Component, PropTypes } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, ListView, Text } from 'react-native';
import { Container, Content, List, ListItem, InputGroup, Input } from 'native-base';

import { connect } from 'react-redux';
import * as actions from '../actions/student';

import styles from '../styles';

class IndividualStudentContainer extends Component {
  constructor(props) {
    super(props);
    this.props.fetchStudents(this.props.program_id);
    this.state = {
      dataSource: []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: nextProps.studentData.students
    });
  }

  render() {
    return (
      <Container style={[styles.container, styles.grayBg]}>
          <Content>
            <Text style={styles.textAlignCenter}>Bib No.</Text>
            <Text style={[styles.largerText, styles.textAlignCenter]}>1</Text>
            <InputGroup style={styles.inputGroup}>
                <Input placeholder="First Name"/>
            </InputGroup>
            <InputGroup style={styles.inputGroup}>
                <Input placeholder="Last Name"/>
            </InputGroup>
          </Content>
      </Container>
    );
  }
}

IndividualStudentContainer.propTypes = {
  fetchStudents: PropTypes.func.isRequired,
  studentData: PropTypes.object.isRequired
};

IndividualStudentContainer.defaultProps = {
  studentData: {}
};

const mapStateToProps = (state) => ({
  studentData: state.studentsState
});

const mapDispatchToProps = (dispatch) => ({
  fetchStudents: (program_id) => {
    dispatch(actions.fetchStudents(program_id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndividualStudentContainer);
