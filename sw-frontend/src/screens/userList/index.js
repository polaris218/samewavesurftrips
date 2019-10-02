import React, { useState, useEffect } from 'react'
import classnames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import ImageIcon from "@material-ui/icons/Image";

import { userActions, tripActions, mapDispatchToProps } from 'api/actions'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { dispatch } from 'api/store'
import { apiQuery } from 'api/thunks/general'
import { General as config } from 'config'

import {
  Container,
  Fab,
  Footer,
  Header,
  Tabs,
  TripList,
  ScrollContainer,
  SearchBar,
} from 'components'
import { Trips, ContentContainer, FootContainer } from './styles'

/**
 * 
 * @todo User Search with Name
 * @todo Follower Items 
 */

const UserListScreen = props => {
  const [ loading, setLoading ] = useState(true)
  const [ activeTab, setActiveTab ] = useState(0)
  const [tabs] = useState(['Users', 'Following', 'Followers'])
  const [searchHint, setSearchHint] = useState("");
  const [usersForDisplay, setUsersForDisplay] = useState(props.user.allUsers);
  const [ following, setFollowing ] = useState(false)
  const [followers, setFollowers] = useState([])
  
  let mounted = true
  /*
  * Component Will Unmount HOOK
  */
  console.log(props.user);
  useEffect(() => {
    return () => {
      mounted = false
    }
  }, [])
  
  useEffect(() => {
    onTabPress(0)
    fetchTrips()
    fetchAllUsers()
    onGetFollowers()
    // console.log('USER SEARCH____ ')
  }, [])

  const fetchTrips = () => {
    setLoading(true)
    dispatch(
      apiQuery(
        null,
        props.fetchOwnTrips,
        config.EndPoints.trips + `/${props.user.id}`,
        onFetchResult,
        'get'
      )
    )
  }


  /**
   * 
   * @param {string} id UserID from Users
   * @function toUserDetailPage with ID, it will route to user detail page
   * @from 2019-9-25
   */
  const toUserDetailPage = (id) => {
    props.history.push(`/user/${id}`);
  }

  const fetchAllUsers = () => {
    setLoading(true);
    dispatch(
      apiQuery(null, props.getAllUsers, config.EndPoints.users, onFetchResult, "get")
    )
  }
  
  const handleFetchWithSearchHint = () => {
    const { allUsers } = props.user; 
    const filteredUsersBySearchHint = allUsers.filter(item =>
      item.first_name && item.first_name.toLowerCase().includes(searchHint.toLowerCase()) ||
      item.last_name && item.last_name.toLowerCase().includes(searchHint.toLowerCase())
    );
    setUsersForDisplay(filteredUsersBySearchHint);
  }
  
  const onFetchResult = error => {
    if (error.status !== 200) {
      console.log('fetch trip error', error)
    } else {
      mounted && setLoading(false)
    }
  }

  const onGetFollowersResult = res => {
    if (res.status !== 200) {
      console.log('follow user error', res)
    } else {
      const cleanFollows = []
      res.data.forEach(user => {
        if (!cleanFollows.includes(user.follower_id)) {
          cleanFollows.push(user.follower_id)
        }
      })
      if (cleanFollows.includes(props.user.id)) {
        setFollowing(true)
        mounted && setFollowers(cleanFollows)
      } else {
        setFollowing(false)
        mounted && setFollowers(cleanFollows)
      }
    }
  }

  const onGetFollowers = () => {
    const endpoint = `${config.EndPoints.user}/${props.user.id}/followers`
    dispatch(
      apiQuery(null, props.userFollow, endpoint, onGetFollowersResult, 'GET')
    )
  }

  const onTabPress = value => {
    mounted && setActiveTab(value)
    if (value === 0) setUsersForDisplay(props.user.allUsers);
    if (value === 1) {
      console.log(following);
    }
    if (value === 2) {
      const usersForDisplay = props.user.allUsers.filter(item => followers.includes(item._id));
      setUsersForDisplay(usersForDisplay);
    }
  }

  const filterTrips = (trips, value) => {
    const active = []
    const old = []
    trips.forEach(trip => {
      if (new Date(trip.date_times.return_date_time) >= new Date()) {
        active.push(trip)
      } else {
        old.push(trip)
      }
    })

    switch (value) {
      case 0:
        return active
      case 1:
        return old
      default:
        return props.trips.yourTrips
    }
  }

  return (
    <Trips>
      <Header title={'Users'} />
      <Tabs tabs={tabs} onTabPress={onTabPress} />
      <ScrollContainer padTop={false}>
        <ContentContainer>
          <Container>
            { usersForDisplay && 
              <AllUserList
                users={usersForDisplay}
                onFetchUserDetail={ toUserDetailPage }
                onSearchInputChage={ setSearchHint }
                onClickSearch={handleFetchWithSearchHint}
              />
            }
          </Container>
        </ContentContainer>
      </ScrollContainer>
      <Fab />
      <FootContainer>
        <Footer />
      </FootContainer>
    </Trips>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  trips: state.trips
})

export default connect(mapStateToProps, dispatch =>
  mapDispatchToProps(dispatch, [ userActions, tripActions ])
)(withRouter(UserListScreen))

export const AllUserList = props => {
  const classes = useStyles();

  return (
    <div className={ classes.root }>
      <MuiThemeProvider theme={ theme }>
        <SearchBar
          onSearchInputChange={props.onSearchInputChage}
          onClickSearch={props.onClickSearch}
        />
        <List>
        {
        props.users.map((item, key) => (
          <Paper key={key}>
            <ListItem
              button
              alignItems="flex-start"
              className={classes.listItem}
              onClick={ () => props.onFetchUserDetail(item._id) }
            >
              <ListItemAvatar>
                { item.avatar ?
                  <Avatar
                    alt={ `${item.first_name} ${ item.last_name}` }
                    src={ `
                      ${item.avatar.includes("https://")
                        ? item.avatar
                        : config.EndPoints.digitalOcean + item.avatar}
                    ` }
                    className={classes.avatar}
                  />
                  : <Avatar className={classes.avatar}><ImageIcon /></Avatar>
                }
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="h6" className={classnames(classes.inline, classes.username)}>
                    {item.first_name}&nbsp;{item.last_name}
                  </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {item.email}
                    </Typography>
                  </React.Fragment>
                }
                className={classes.userContent}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </Paper>
        ))
        }
        </List>
      </MuiThemeProvider>
    </div>
  )
}

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Ubuntu",
      "sans-serif"
    ].join(","),
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    width: '60%',
    marginTop: `5%`,
    [theme.breakpoints.down("sm")]: {
      width: '100%',
    }
  },
  inline: {
    color: '#626262',
  },
  username: {

  },
  userContent: {
    marginTop: 20,
    marginLeft: '5%',
  },
  paper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px'
  },
  input: {
    marginLeft: theme.spacing(2),
    flex: 1,
    underline: false,
  },
  avatar: {
    width: 80,
    height: 80,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    margin: 5,
  },
  listItem: {
    marginTop: 3,
  },
}))