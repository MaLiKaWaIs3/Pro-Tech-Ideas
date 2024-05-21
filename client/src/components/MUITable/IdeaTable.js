import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { UserContext } from '../../Context/UserContext';
import '../../css/App.css';

const columns = [
    { id: 'Name', label: 'Name', minWidth: 170 },
    { id: 'IdeaName', label: 'IdeaName', minWidth: 170 },
    { id: 'IdeaDescription', label: 'IdeaDescription', minWidth: 170 },
    { id: 'Status', label: 'Status', minWidth: 100 },
    { id: 'Remarks', label: 'Remarks', minWidth: 170 }, // New column for remarks
];

function createData(Name, IdeaName, IdeaDescription, Status, Remarks, id) {
    return { Name, IdeaName, IdeaDescription, Status, Remarks, id };
}

export default function UserTable({ ideaList }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [selectedIdea, setSelectedIdea] = React.useState(null);
    const [remarks, setRemarks] = React.useState('');
    const { currentUser } = React.useContext(UserContext);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleReview = (row) => {
        setSelectedIdea(row);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedIdea(null);
        setRemarks('');
    };

    const handleSubmitReview = () => {
        if (remarks.trim() !== '') {
            fetch('http://localhost:3002/addremarks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ideaId: selectedIdea.id,
                    remarks: remarks
                }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Remarks submitted successfully:', data);
                    handleCloseDialog();
                })
                .catch(error => {
                    console.error('Error submitting remarks:', error);
                    handleCloseDialog();
                });
        } else {
            console.error('Remarks cannot be empty');
        }
    };

    // Update rows data to include remarks
    let rows = ideaList.map((idea) => {
        const statusText = idea.status ? "Reviewed" : "Pending";
        const ideaDescriptionWithMsg = idea.message ? `${idea.idea_Description} - Message: ${idea.message}` : idea.idea_Description;

        const remarks = idea.remarks || 'Still Pending'; // Default to empty string if remarks are not available
        return createData(
            idea.name,
            idea.idea_name,
            ideaDescriptionWithMsg,
            statusText,
            remarks,
            idea._id
        );
    });

    return (
        <Paper sx={{ width: '95%', overflow: 'hidden', marginTop: 2, boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2) " }}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, fontWeight: "bold" }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            {currentUser.userType === 'Expert' && (
                                <TableCell key="Action" align="center" style={{ fontWeight: "bold" }}>
                                    Review
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                    {columns.map((column) => (
                                        <TableCell key={column.id} align={column.align} className={row.statusStyle}>
                                            {column.id === 'Status' ? row.Status : column.id === 'Remarks' ? row.Remarks : row[column.id]}
                                        </TableCell>
                                    ))}
                                    {currentUser.userType === 'Expert' && (
                                        <TableCell key="Action" align="center">
                                            <button className='uploadideabtn' onClick={() => handleReview(row)}>Review</button>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                    "& p": {
                        "marginTop": 'auto',
                        "marginBottom": 'auto'
                    }
                }}
            />
            {/* Review Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Review Idea</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {selectedIdea && selectedIdea.Status === 'Reviewed' ? (
                            "This idea is already reviewed."
                        ) : (
                            <TextField
                                autoFocus
                                margin="dense"
                                id="remarks"
                                label="Remarks"
                                type="text"
                                fullWidth
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                            />
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleSubmitReview} color="primary">Submit</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}
