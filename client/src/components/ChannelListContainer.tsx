import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';
import HospitalIcon from '../assets/hospital.png';
import LogoutIcon from '../assets/logout.png';

function Sidebar() {
  return (
    <div className='channel-list__sidebar'>
      <div className='channel-list__sidebar__icon1'>
        <div className='icon1__inner'>
          <img src={HospitalIcon} alt='hospital icon' width={30} />
        </div>
      </div>
      <div className='channel-list__sidebar__icon2'>
        <div className='icon1__inner'>
          <img src={LogoutIcon} alt='logout icon' width={30} />
        </div>
      </div>
    </div>
  );
}

function CompanyHeader() {
  return (
    <div className='channel-list__header'>
      <p className='channel-list__header__text'>Chat</p>
    </div>
  );
}

export default function ChannelListContainer() {
  return (
    <>
      <Sidebar />
      <div className='channel-list__list__wrapper'>
        <CompanyHeader />
        <ChannelSearch />
        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => []}
          List={props => (
            <TeamChannelList {...props} type='team'>
              <p>Nopgfe</p>
            </TeamChannelList>
          )}
        />
      </div>
    </>
  );
}
