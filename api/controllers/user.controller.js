import User from "../models/user.model.js"

//DElET
export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return next(createError(403, "You can delete only your account!"));
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("deleted.");
};

// UPDATE
export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    next(err)
  }
}

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send(user)
    // console.log(user);
  }
  catch (err) {
    res.status(404).send("User Not Found");
    next(err);
  }
}


// Add and Remove Hotel from Fav list 
export const addOrRemove = async (req, res, next) => {
  const userId = req.params.id;
  const hotelId = req.body.hotelId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const alreadyAdded = user.favoriteList.find((id) => id.toString() === hotelId);
    if (alreadyAdded) {
      let updatedUser = await User.findByIdAndUpdate(
        userId,
        { $pull: { favoriteList: hotelId } },
        { new: true }
      );
      res.json(updatedUser);
    } else {
      let updatedUser = await User.findByIdAndUpdate(
        userId,
        { $push: { favoriteList: hotelId } },
        { new: true }
      );
      res.json(updatedUser);
    }
    res.status(200).json(User);
  } catch (err) {
    next(err);
  }
};


