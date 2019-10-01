import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Divider from "@material-ui/core/Divider";

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

const SearchBar = (props) => {
  const classes = useStyles();
  
  return (
    <Paper className={ classes.paper }>
      <InputBase
        className={classes.input}
        placeholder="Search User By Name"
        inputProps={{'aria-label': 'search google maps'}}
        onChange={event => props.onSearchInputChange(event.target.value)}
      />
        <IconButton
          className={ classes.iconButton }
          onClick={ props.onClickSearch }
        >
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider}/>
    </Paper>
  )
}

export default SearchBar;