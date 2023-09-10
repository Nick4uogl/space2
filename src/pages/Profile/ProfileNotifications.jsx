const ProfileNotifications = () => {
  return (
    <div className="profile-notifications">
      <h2>Marketing Communication</h2>
      <div className="profile-notifications__item flex-align-center">
        <label className="profile-notifications__control">
          <input onChange={() => {}} type="checkbox" name="checkbox" />
        </label>
        <label htmlFor="checkbox">Send me any marketing emails.</label>
      </div>
      <div className="profile-notifications__item flex-align-center">
        <label className="profile-notifications__control">
          <input type="checkbox" name="checkbox" />
        </label>
        <label htmlFor="checkbox">
          Specials offers and other knetspace updates.
        </label>
      </div>
    </div>
  );
};

export default ProfileNotifications;
