const User = require("../models/users/Usermodel");
const UserProfile = require("../models/users/UserProfilemodel");
const ClinicUser = require("../models/users/ClinicUsermodel");

module.exports = {
  me: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const profiles = await UserProfile.find({ userId: req.user.id });
      const clinics = await ClinicUser.find({ userId: req.user.id }).populate("clinicId");

      res.json({ user, profiles, clinics });
    } catch (err) {
      console.error("me error", err);
      res.status(500).json({ error: "Server error" });
    }
  }
};
