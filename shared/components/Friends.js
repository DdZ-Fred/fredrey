import React, { PropTypes } from 'react';
import Friend from './Friend';

const propTypes = {
  friends: PropTypes.array.isRequired,
};

function Friends({ friends }) {
  return (
    <div id="friends" className="one column row">
      <div className="column">
        <div className="ui segment">
          <a className="ui blue right ribbon label">
            <h3>Friends</h3>
          </a>
          <div className="ui large horizontal divided list">
            {friends.map((friend, idx) => (
              <Friend
                key={idx}
                name={friend.name}
                provider={friend.provider}
                icon={friend.icon} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Friends.propTypes = propTypes;

export default Friends;
