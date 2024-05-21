import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ErrorDialogueBox from "../MUIDialogueBox/ErrorDialogueBox";
import Box from "@mui/material/Box";
import { UserContext } from "../../Context/UserContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function ProjectIdealist() {
  const [ideas, setIdeas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useContext(UserContext);
  const [errorDialogueBoxOpen, setErrorDialogueBoxOpen] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const [experts, setExperts] = useState([]);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [selectedExpert, setSelectedExpert] = useState("");
  const [message, setMessage] = useState("");
  const [expertDialogOpen, setExpertDialogOpen] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const handleDialogueOpen = () => {
    setErrorDialogueBoxOpen(true);
  };

  const handleDialogueClose = () => {
    setErrorList([]);
    setErrorDialogueBoxOpen(false);
  };

  useEffect(() => {
    getIdeas();
    getExperts();
  }, []);

  const getIdeas = async () => {
    try {
      const response = await axios.get("http://localhost:3002/getideas");
      setIdeas(response.data.allIdeas);
    } catch (error) {
      console.error("Error fetching ideas:", error);
      handleDialogueOpen();
      setErrorList(["Failed to fetch ideas. Please try again later."]);
    }
  };

  const getExperts = async () => {
    try {
      const response = await axios.get("http://localhost:3002/experts");
      setExperts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching experts:", error);
      handleDialogueOpen();
      setErrorList(["Failed to fetch experts. Please try again later."]);
    }
  };
  const handleSendMessage = async () => {
    try {
      const response = await axios.post("http://localhost:3002/uploadideas", {
        studentName: `${currentUser.firstName} ${currentUser.lastName}`, // Use firstName and lastName
        ideaName: selectedIdea.idea_name,
        ideaDescription: selectedIdea.idea_Description,
        userId: currentUser.userId, // Or currentUser._id depending on your UserContext structure
        expertId: selectedExpert,
        message: message,
      });
      console.log(response.data);
      setMessageDialogOpen(false);
      setSelectedExpert("");
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      handleDialogueOpen();
      setErrorList(["Failed to send message. Please try again later."]);
    }
  };

  const handleSendRequestClick = (idea) => {
    setSelectedIdea(idea);
    setExpertDialogOpen(true);
  };

  const handleExpertSelect = () => {
    setExpertDialogOpen(false);
    setMessageDialogOpen(true);
  };

  const filteredIdeas = ideas.filter((idea) =>
    idea.idea_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <div className="page-wrapper">
        <div className="content mt-4">
          <div className="row">
            <div className="col-sm-4 col-3">
              <h3 className="page-title">Search New Ideas</h3>
            </div>
            <div className="col-sm-8 col-9 text-right m-b-20">
              <TextField
                label="Search Ideas"
                variant="outlined"
                value={searchTerm}
                placeholder="Idea Name..."
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
              />
            </div>
          </div>
          <div className="row">
            {filteredIdeas.map((idea) => (
              <div className="col-md-4" key={idea.id}>
                <Card sx={{ minWidth: 275, mb: 2 }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {idea.idea_name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {idea.name}
                    </Typography>
                    <Typography variant="body2">
                      {idea.idea_Description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() => handleSendRequestClick(idea)}
                    >
                      Send Request
                    </Button>
                  </CardActions>
                </Card>
              </div>
            ))}
          </div>
          <ErrorDialogueBox
            open={errorDialogueBoxOpen}
            handleToClose={handleDialogueClose}
            ErrorTitle="Error: Add idea"
            ErrorList={errorList}
          />
        </div>
      </div>
      <Dialog
        open={expertDialogOpen}
        onClose={() => setExpertDialogOpen(false)}
      >
        <DialogTitle>Choose Expert</DialogTitle>
        <DialogContent>
          <Select
            value={selectedExpert}
            onChange={(e) => setSelectedExpert(e.target.value)}
            fullWidth
          >
            {experts.map((expert) => (
              <MenuItem key={expert._id} value={expert.userId._id}>
                {`${expert.userId.firstName} ${expert.userId.lastName}`}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExpertDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleExpertSelect} disabled={!selectedExpert}>
            Select
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={messageDialogOpen}
        onClose={() => setMessageDialogOpen(false)}
      >
        <DialogTitle>Send Message to Expert</DialogTitle>
        <DialogContent>
          <TextField
            label="Message"
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMessageDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSendMessage} disabled={!message}>
            Send Message
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ProjectIdealist;
