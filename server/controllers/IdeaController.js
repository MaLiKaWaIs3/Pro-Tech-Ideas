const Idea = require('../models/ideas');

const getIdeas = async (req, res) => {
    try {
        const ideas = await Idea.find({});

        if (ideas && ideas.length > 0) {
            return res.status(200).json({ allIdeas: ideas });
        } else {
            return res.status(404).json({ message: "No ideas found" });
        }
    } catch (error) {
        console.error("Error fetching ideas:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


const saveIdeas = async (req, res) => {
    try {
        const { studentName, ideaName, ideaDescription, userId } = req.body;

        if (!studentName || !ideaName || !ideaDescription) {
            return res.status(400).json({ message: "Please provide all the required information" });
        }

        const newIdea = new Idea({
            name: studentName,
            idea_name: ideaName,
            idea_Description: ideaDescription,
            studentId: userId,
        });

        await newIdea.save();

        return res.status(201).json({ message: "Idea saved successfully", idea: newIdea });
    } catch (error) {
        console.error("Error saving idea:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const deleteidea = (req, res)=>
{

    console.log(req.boyy);

}


const saveRemark = (req, res) => {
  const { ideaId, remarks } = req.body;

  // Find the idea by id and update its remarks and status
  Idea.findByIdAndUpdate(ideaId, { remarks: remarks, status: true }, { new: true })
    .then((idea) => {
      if (!idea) {
        return res.status(404).json({ error: 'Idea not found' });
      }
      console.log('Remark saved successfully:', idea);
      return res.status(200).json({ message: 'Remark saved successfully', idea });
    })
    .catch((error) => {
      console.error('Error saving remark:', error);
      return res.status(500).json({ error: 'Internal server error' });
    });
};


module.exports = {
    getIdeas,
    saveIdeas,
    deleteidea,
    saveRemark,
}