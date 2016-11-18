import React, { Component, PropTypes } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, ListView, Text, StyleSheet } from 'react-native';
import { Container, Content, List, ListItem } from 'native-base';

import { connect } from 'react-redux';
import * as actions from '../actions/site';

import styles from '../styles';

class SitesContainer extends Component {
  state = {
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })
  };

  componentDidMount() {
    this.props.fetchSites();
  }

  componentWillReceiveProps(nextProps) {
    const sites = nextProps.siteData.sites;
    if (sites) {
      const siteNames = this.getSiteNames(sites);
      this.setState({
        dataSource: siteNames
      });
    }
  }

  render() {
    return (
      <Container style={styles.container}>
          <Content>
              <List dataArray={this.state.dataSource}
                  renderRow={(rowData) =>
                    <ListItem button onPress={()=>Actions.programs({title: rowData})}>
                        <Text>{rowData}</Text>
                    </ListItem>
                  }>
              </List>
          </Content>
      </Container>
    );
  }

  // Return a list of names, one for each site.
  getSiteNames(sites) {
    var siteNames = [];
    for (var key in sites) {
      if (sites.hasOwnProperty(key)) {
        siteNames.push(sites[key].title);
      }
    }
    return siteNames;
  }
}

SitesContainer.propTypes = {
  fetchSites: PropTypes.func.isRequired,
  siteData: PropTypes.object.isRequired
};

SitesContainer.defaultProps = {
  siteData: {}
};

const mapStateToProps = (state) => ({
  siteData: state.sitesState
});

const mapDispatchToProps = (dispatch) => ({
  fetchSites: () => {
    dispatch(actions.fetchSites());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SitesContainer);
