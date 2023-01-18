import { ReactNode } from 'react';
import { ChannelPreviewUIComponentProps, Avatar, useChatContext } from 'stream-chat-react';

type Props = {
  type: 'team' | 'messaging';
  children?: ReactNode;
} & ChannelPreviewUIComponentProps;

export default function TeamChannelPreview({
  channel,
  type,
  children,
  setActiveChannel,
  setIsCreating,
  setIsEditing,
  setCreateType,
  setToggleContainer,
}: Props) {
  const { channel: activeChannel, client } = useChatContext();
  const isActiveChannel = channel?.id === activeChannel?.id;
  const Preview = type === 'team' ? <ChannelPreview /> : <DirectPreview />;

  function ChannelPreview() {
    return <p className='channel-preview__item'>{`# ${channel?.data?.name || channel?.data?.id}`}</p>;
  }

  function DirectPreview() {
    // remove current user from members
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user?.id !== client.userID
    );

    const userName = members[0].user?.name || members[0].user?.id;
    const userImage = members[0].user?.image;

    return (
      <div className='channel-preview__item single'>
        <Avatar image={userImage} name={userName} size={24} />
        <p>{userName}</p>
      </div>
    );
  }

  return (
    <div
      className={isActiveChannel ? 'channel-preview__wrapper__selected' : 'channel-preview__wrapper'}
      onClick={() => console.log(channel)}>
      {Preview}
    </div>
  );
}
