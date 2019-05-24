import React from 'react'
import PropTypes from 'prop-types'
import "./DashBoardPage.css"
import axios from 'axios'
import ActionFeed from "./actionfeed/ActionFeed"
import NewsFeed from '../../component/newsfeed/NewsFeed';

class dashBoardPage extends React.Component {

  componentDidMount = () => {
    axios.get('http://localhost:8080/lagbevakning/company').then(response => {
        sessionStorage.setItem("id", (response.data.id))
    })
  }

  render() {
    return (
      <div className="dashBoardWrapper">
        <div><NewsFeed/></div>
             <div className="actionFeedFlow"> 
             <p className="actionTitle">Recent Actions</p>
             <ActionFeed/> 
             </div>   
      </div>
    )
  }
}

dashBoardPage.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default dashBoardPage