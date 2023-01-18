import { ReactNode } from 'react';
import { ChannelListMessengerProps } from 'stream-chat-react';
import { AddChannel } from '../assets';

type Props = {
  type: 'team' | 'messaging';
  children?: ReactNode;
} & ChannelListMessengerProps;

export default function TeamChannelList({ loading, type, children, error = null }: Props) {
  const errorMessage =
    type === 'team' ? (
      <div className='team-channel-list'>
        <p className='team-channel-list__message'>
          Connection error, please wait a moment and try again.
        </p>
      </div>
    ) : null;

  const loadingMessage = (
    <div className='team-channel-list'>
      <p className='team-channel-list__message loading'>
        {type === 'team' ? 'Channels' : 'Messages'} loading...
      </p>
    </div>
  );

  if (error) {
    return errorMessage;
  }

  if (loading) {
    return loadingMessage;
  }

  return (
    <div className='team-channel-list'>
      <div className='team-channel-list__header'>
        <p className='team-channel-list__header__title'>
          {type === 'team' ? 'Channels' : 'Direct Messages'}
        </p>
        {/* Button - add channel */}
      </div>
      {children}
    </div>
  );
}
