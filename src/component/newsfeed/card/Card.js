import React from 'react'
import "./Card.css"
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Marilyn from "../../../services/images/marilyn.jpg"
import Arasto from "../../../services/images/arasto.jpg"
import user1 from "../../../services/images/user1.png"
import user2 from "../../../services/images/user2.png"
import user3 from "../../../services/images/user3.png"
import user4 from "../../../services/images/user4.png"

export default function NewsFeed() {
  return (
    <div className="cardContainer">
        <Card className="card1">
        <CardHeader avatar={ <Avatar aria-label="Recipe">  <img className="image1" src={user1} alt="Eng" style={{"width":40, "height":40}}/> </Avatar> }
            title="Jenny Hill"
            subheader="2019-04-17" />

             <CardContent>
                <Typography component="p">
                <h3>What does EW§21 really mean?</h3>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                  </Typography>
            </CardContent>
        </Card>

        <Card className="card2">
          <CardHeader avatar={ <Avatar aria-label="Recipe">  <img className="image1" src={user2} alt="Eng" style={{"width":40, "height":40}}/> </Avatar> }
            title="Maria Asteroza"
            subheader="2019-03-29" />
            <CardContent>
                <Typography component="p">
               <h3>Try our latest Quick Law feature!</h3>
               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                  </Typography>
            </CardContent>
      </Card>

      <Card className="card3">
          <CardHeader avatar={ <Avatar aria-label="Recipe">  <img className="image1" src={user3} alt="Eng" style={{"width":40, "height":40}}/> </Avatar> }
            title ="Dan Joshuas"
            subheader="2019-04-17" />
            <CardContent>
                <Typography component="p">
                <h3>Ramboll Annual Law Review</h3>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                  </Typography>
            </CardContent>
      </Card>

      <Card className="card4">
          <CardHeader avatar={ <Avatar aria-label="Recipe">  <img className="image1" src={user4} alt="Eng" style={{"width":40, "height":40}}/> </Avatar> }
            title = "Jeff Trentor"
            subheader = "2019-04-30" />
            <CardContent>
                <Typography component="p">
                <h3>Getting Started..</h3>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                  </Typography>
            </CardContent>
      </Card>
    </div>
  )
}
