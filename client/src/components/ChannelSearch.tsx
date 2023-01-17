import { useState, useEffect } from 'react';
import { useChatContext } from 'stream-chat-react';
import { SearchIcon } from '../assets';

export default function ChannelSearch() {
const [searchQuery, setSearchQuery] = useState('');
const [isLoading, setIsLoading] = useState(false);

async function getChannels(value: string) {
  try {
    // TODO: fetch channels
  } catch (error) {
    setSearchQuery('');
  }
}

function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
  e.preventDefault();
  const value = e.target.value;

  setIsLoading(true);
  setSearchQuery(value);
  getChannels(value);
}

return (
  <div className='channel-search__container'>
    <div className='channel-search__input__wrapper'>
      <div className='channel-search__input__icon'>
        <SearchIcon />
      </div>
      <input
        type='text'
        className='channel-search__input__text'
        placeholder='Search'
        value={searchQuery}
        onChange={handleSearch}
      />
    </div>
  </div>
);
}
