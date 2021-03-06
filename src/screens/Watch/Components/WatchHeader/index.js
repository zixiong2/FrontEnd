import React, { Fragment } from 'react';
import { connectWithRedux, SEARCH_INIT, SEARCH_HIDE } from '../../Utils';
import './index.css';
import './Buttons/index.css';

import MediaInfo from './MediaInfo';
import PlaylistMenuTrigger from './Buttons/PlaylistMenuTrigger';
import DownloadMenuTrigger from './Buttons/DownloadMenuTrigger';
import ShortcutsTableTrigger from './Buttons/ShortcutsTableTrigger';
import ShareTrigger from './Buttons/ShareTrigger';
import GuideTrigger from './Buttons/GuideTrigger';
import Search from './Search';


function WatchHeaderRightElemWithRedux(props) {
  let {
    search = SEARCH_INIT,
    plain = false,
  } = props;

  const showButtons = search.status === SEARCH_HIDE && !plain;

  return showButtons ? (
    <>
      <Search />
      <ShortcutsTableTrigger />
      <ShareTrigger />
      <DownloadMenuTrigger />
      <GuideTrigger />
      <PlaylistMenuTrigger />
    </>
  ) : null;
};

export const WatchHeaderRightElem = connectWithRedux(
  WatchHeaderRightElemWithRedux, 
  ['isFullscreen', 'search']
);

export const WatchHeaderLeftElem = MediaInfo;
