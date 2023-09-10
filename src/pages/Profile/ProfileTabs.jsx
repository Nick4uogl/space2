const ProfileTabs = ({ activeSideTab, isGoogleAuth, handleActiveSideTab }) => {
  return (
    <div className="profile-info__tabs">
      <button
        className={`profile-info__tab ${
          activeSideTab === 'general info' && 'profile-info__tab--active'
        }`}
        onClick={() => handleActiveSideTab('general info')}
      >
        General Info
      </button>
      {!isGoogleAuth && (
        <button
          className={`profile-info__tab ${
            activeSideTab === 'password' && 'profile-info__tab--active'
          }`}
          onClick={() => handleActiveSideTab('password')}
        >
          Password
        </button>
      )}
      <button
        className={`profile-info__tab ${
          activeSideTab === 'notifications' && 'profile-info__tab--active'
        }`}
        onClick={() => handleActiveSideTab('notifications')}
      >
        Notifications
      </button>
    </div>
  );
};

export default ProfileTabs;
