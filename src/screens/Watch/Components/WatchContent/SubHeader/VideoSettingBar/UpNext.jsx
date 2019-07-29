/**
 * UpNext menu
 */

import React, { useState } from 'react'
import $ from 'jquery'
// UI
import { IconButton, MenuItem, Menu } from '@material-ui/core'
import { Card } from 'react-bootstrap'
// Vars
import { util, api } from 'utils'
const imgHolder = require('images/Video-Placeholder.jpg')

const menuStyle = {
  backgroundColor: '#424242', 
  color: 'rgb(236, 236, 236)',
  width: '100%',
  height: '15rem'
}

export default function UpNext({ media, playlistName, medias, courseNumber, isMobile }) {
  const [anchorEl, setAnchorEl] = useState(null)

  /** Function for helping switch focusing card, starting from the current video */
  const keyDownHandler = ({keyCode}) => {
    let currFocus = $(".upnext-menu .videos .vcard:focus")
    if (!currFocus.length) currFocus = $(".curr-media")  
    if (keyCode === 39) {   
      currFocus.next().focus()
    }
    if (keyCode === 37) {    
      currFocus.prev().focus()
    }
  }

  /** Function for scrolling to the current playing video */
  const scrollToCurrVideo = () => {
    console.log('show upnext')
    if (media.id) {
      const currMedia = document.getElementById(media.id)
      if (currMedia && !currMedia.classList.contains('curr-media')) {
        currMedia.classList.add('curr-media')
        currMedia.scrollIntoView({ inline: "center" })
      }
    }
  }

  function handleClick(event) {
    setAnchorEl(event.currentTarget)
    scrollToCurrVideo()
  }

  function handleClose() {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <div id="upnext" onKeyDown={keyDownHandler}>
      <IconButton
        aria-label="Mode Setting"
        title="Mode Setting"
        aria-controls="mode-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className="trigger"
      >
        <i class="material-icons">video_library</i>
        {!isMobile && <span>&ensp;Up Next</span>}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        className="upnext-menu"
        PaperProps={{style: menuStyle}}
      >
        <MenuItem className="header" disabled>
          <h4>{courseNumber}</h4>&ensp;{playlistName}
        </MenuItem>

        <div className="videos" id="upnext-videos">
          {medias.map( media2 => (
            <VideoCard media={media2.media} courseNumber={courseNumber} />
          ))}
        </div>
      </Menu>
    </div>
  )
}

function VideoCard({media, courseNumber}) {
  const { id, mediaName } = api.parseMedia(media)
  return (
    <Card 
      className="vcard" 
      id={id}
      key={id} 
      title={mediaName}
      aria-label={mediaName}
      as="a" href={util.links.watch(courseNumber, id)}
    >
      <Card.Img 
        className="img" variant="top" 
        src={imgHolder} style={{pointerEvents: 'none'}}
      />
      <Card.Body style={{margin: 'none'}}>
        <Card.Title className="title">
          {mediaName}
        </Card.Title>
      </Card.Body>
    </Card>
  )
}