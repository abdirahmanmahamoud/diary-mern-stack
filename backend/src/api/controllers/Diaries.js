import Diary from "../models/Diary.js";

export const getDiaries = async (req, res) => {
  try {
    const objects = await Diary.find({ user: req.user.id })
      .lean()
      .populate("user", ["name", "email"]);
    res.send(objects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDiary = async (req, res) => {
  try {
    const objects = await Diary.findOne({
      user: req.user.id,
      _id: req.params.id,
    })
      .lean()
      .populate("user", ["name", "email"]);
    res.send(objects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createDiary = async (req, res) => {
  try {
    const { title, description, eventDate } = req.body;

    const object = await Diary.create({
      title,
      description,
      eventDate,
      user: req?.user?._id,
    });

    res.status(200).send(object);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateDiary = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, eventDate } = req.body;

    const object = await Diary.findById(id);
    if (!object) return res.status(400).json({ error: `Diary not found` });

    object.title = title;
    object.description = description;
    object.eventDate = eventDate;

    await object.save();

    res.status(200).json({ message: `Diary updated` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteDiary = async (req, res) => {
  try {
    const { id } = req.params;
    const object = await Diary.findById(id);

    if (!object) return res.status(400).json({ error: `Diary not found` });

    await object.remove();
    res.status(200).json({ message: `Diary removed` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
