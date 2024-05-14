import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ErrorDialogueBox from "../MUIDialogueBox/ErrorDialogueBox";
import Box from "@mui/material/Box";
import IdeaTable from "../MUITable/IdeaTable";
import { UserContext } from "../../Context/UserContext";

function Idealist() {
  const [ideas, setidea] = useState([]);

  const { currentUser } = useContext(UserContext);
  const [errorDialogueBoxOpen, setErrorDialogueBoxOpen] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const handleDialogueOpen = () => {
    setErrorDialogueBoxOpen(true);
  };
  const handleDialogueClose = () => {
    setErrorList([]);
    setErrorDialogueBoxOpen(false);
  };

  useEffect(() => {
    getideas();
  }, []);

  const getideas = async () => {
    try {
      const response = await axios.get("http://localhost:3002/getideas");
      setidea(response.data.allIdeas);
    } catch (error) {
      console.error("Error fetching ideas:", error);
      handleDialogueOpen();
      setErrorList(["Failed to fetch ideas. Please try again later."]);
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <div className="page-wrapper">
        <div className="content mt-4">
          <div className="row">
            <div className="col-sm-4 col-3">
              <h3 className="page-title"> {currentUser.userType==="Student"?"Ideas": "Review Student Ideas"} </h3>
            </div>
            {currentUser.userType === "Student" ? (
              <div className="col-sm-8 col-9 text-right m-b-20">
                <Link to="/uploadideas">
                  <button
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      border: "none",
                      outline: "none",
                      padding: "10px 15px",
                      borderRadius: "5px",
                    }}
                  >
                    {" "}
                    <i className="fa fa-plus"></i> Upload New Idea
                  </button>
                </Link>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <IdeaTable ideaList={ideas} />
        </div>
        <ErrorDialogueBox
          open={errorDialogueBoxOpen}
          handleToClose={handleDialogueClose}
          ErrorTitle="Error: Add idea"
          ErrorList={errorList}
        />
      </div>
    </Box>
  );
}

export default Idealist;
