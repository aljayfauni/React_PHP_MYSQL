import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ListTask() {
    const [backlogTasks, setBacklogTasks] = useState([]);
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);
    const [newTask1, setNewTask1] = useState({ title: "", description: "", status: "" });
    const [newTask2, setNewTask2] = useState({ title: "", description: "", status: "" });
    const [newTask3, setNewTask3] = useState({ title3: "", description3: "", status: "" });

    const [showBacklogModal, setShowBacklogModal] = useState(false);
    const [showInProgressModal, setShowInProgressModal] = useState(false);
    const [showDoneModal, setShowDoneModal] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);
   

    const [editTask, setEditTask] = useState({ title: "", description: "", status: "" });
    

    useEffect(() => {
        getTasks();
    }, []);

    function getTasks() {
        axios.get('http://127.0.0.1/backend_Ramile-Aljay_20230305/backend/get_list_task.php')
            .then(response => {
                const tasks = response.data;
                setBacklogTasks(tasks.filter(task => task.status === "Backlog"));
                setInProgressTasks(tasks.filter(task => task.status === "In Progress"));
                setDoneTasks(tasks.filter(task => task.status === "Done"));
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });
    }

    const deleteTask = (id) => {
        axios.delete(`http://127.0.0.1/backend_Ramile-Aljay_20230305/backend/delete_task.php`, { data: { id } })
            .then(response => {
                alert("task deleted successfully");
                getTasks();
            })
            .catch(error => {
                console.error('Error deleting task:', error);
            });
    }

    const edit_Task = (id) => {
        axios.get(`http://127.0.0.1/backend_Ramile-Aljay_20230305/backend/get_task_id.php?id=${id}`)
        .then(response => {
            const taskData = response.data;
            setEditTask({
                id: taskData.id,
                title: taskData.title,
                description: taskData.description,
                status: taskData.status
            });
        })
        .catch(error => {
            console.error('Error editing task:', error);
        });
    }

    const handleSubmit_backlog = (e, status) => {
        e.preventDefault();
        // Add logic
        axios.post('http://127.0.0.1/backend_Ramile-Aljay_20230305/backend/create_task.php', { ...newTask1, status })
            .then(response => {
                alert("New task added successfully");
                // Refresh tasks
                getTasks();
                // Clear the form fields
                setNewTask1({ title: "", description: "" ,status:"" });
            })
            .catch(error => {
                console.error('Error adding task:', error);
            });
            setShowBacklogModal(false);
    }

    const handle_update = (e) => {
        e.preventDefault();
        axios.put('http://127.0.0.1/backend_Ramile-Aljay_20230305/backend/update_task.php', editTask)
            .then(response => {
                alert("Task updated successfully");
                getTasks();
                // Clear the editTask state
                setEditTask({ title: "", description: "", status: "" });
                // Close the edit modal
                setShowEditModal(false);
            })
            .catch(error => {
                console.error('Error updating task:', error);
            });
    }
    

    const handleSubmit_inProgress = (e, status) => {
        e.preventDefault();
        axios.post('http://127.0.0.1/backend_Ramile-Aljay_20230305/backend/create_task.php', { ...newTask2, status })
            .then(response => {
                alert("New task added in progress ");
                getTasks();
                setNewTask2({ title: "", description: "" ,status:"" });
            })
            .catch(error => {
                console.error('Error adding task:', error);
            });
            setShowInProgressModal(false);
    }
    const handleSubmit_Done = (e, status) => {
        e.preventDefault();
        // Add logic 
        axios.post('http://127.0.0.1/backend_Ramile-Aljay_20230305/backend/create_task.php', { ...newTask3, status })
            .then(response => {
                alert("New task added in Done successfully");
                getTasks();
                setNewTask3({ title: "", description: "" ,status:"" });
            })
            .catch(error => {
                console.error('Error adding task:', error);
            });
            setShowDoneModal(false);
    }
    return (
        <div className="container">
            {showEditModal && (
                <div className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit task</h5>
                                <button type="button" className="close" onClick={() => setShowEditModal(false)}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={(e) => handle_update(e)}>
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="title" value={editTask.title} placeholder="Title" onChange={(e) => setEditTask({ ...editTask, title: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <textarea className="form-control" name="description" value={editTask.description} placeholder="Description" onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}></textarea>
                                    </div>
                                    <div className="form-group">
                                        <select className="form-control"  name="status" value={editTask.status} onChange={(e) => setEditTask({ ...editTask, status: e.target.value })} >
                                            <option value="Backlog">Backlog</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Done">Done</option>
                                            
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-warning">Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="d-flex justify-content-around">
                {/* Backlog */}
                <div className="category">
                    <h2>Backlog</h2>
                
                    <button className="btn btn-primary mt-2" onClick={() => setShowBacklogModal(true)}>+</button>
                    {showBacklogModal && (
                        <div className="modal">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Add Task to Backlog</h5>
                                        <button type="button" className="close" onClick={() => setShowBacklogModal(false)}>
                                            <span>&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={(e) => handleSubmit_backlog(e, "Backlog")}>
                                            <div className="form-group">
                                                <input type="text" className="form-control" name="title" value={newTask1.title} placeholder="Title" onChange={(e) => setNewTask1({ ...newTask1, title: e.target.value })} />
                                            </div>
                                            <div className="form-group">
                                                <textarea className="form-control" name="description" value={newTask1.description} placeholder="Description" onChange={(e) => setNewTask1({ ...newTask1, description: e.target.value })}></textarea>
                                            </div>
                                            <button type="submit" className="btn btn-primary">Add backlog</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {backlogTasks.map(task => (
                        <div className="card" key={task.id}>
                            <div className="card-body">
                                <h5 className="card-title">{task.title}</h5>
                                <p className="card-text">{task.description}</p>
                               
                                <button className="btn btn-edit" onClick={() => { edit_Task(task.id); setShowEditModal(true); }}>Edit</button>
                                <button className="btn btn-danger" onClick={() => deleteTask(task.id)}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
    
                {/* In Progress */}
                <div className="category">
                    <h2>In Progress</h2>
                    <button className="btn btn-warning mt-2" onClick={() => setShowInProgressModal(true)}>+</button>
                    {showInProgressModal && (
                        <div className="modal">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Add Task to In Progress</h5>
                                        <button type="button" className="close" onClick={() => setShowInProgressModal(false)}>
                                            <span>&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={(e) => handleSubmit_inProgress(e, "In Progress")}>
                                            <div className="form-group">
                                                <input type="text" className="form-control" name="title2" value={newTask2.title} placeholder="Title" onChange={(e) => setNewTask2({ ...newTask2, title: e.target.value })} />
                                            </div>
                                            <div className="form-group">
                                                <textarea className="form-control" name="description2" value={newTask2.description} placeholder="Description" onChange={(e) => setNewTask2({ ...newTask2, description: e.target.value })}></textarea>
                                            </div>
                                            <button type="submit" className="btn btn-primary">Add Task</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {inProgressTasks.map(in_progress_task => (
                        <div className="card" key={in_progress_task.id}>
                            <div className="card-body">
                                <h5 className="card-title">{in_progress_task.title}</h5>
                                <p className="card-text">{in_progress_task.description}</p>
                                <button className="btn btn-edit" onClick={() => { edit_Task(in_progress_task.id); setShowEditModal(true); }}>Edit</button>
                                <button className="btn btn-danger" onClick={() => deleteTask(in_progress_task.id)}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
    
                {/* Done */}
                <div className="category">
                    <h2>DONE</h2>
                    <button className="btn btn-success mt-2" onClick={() => setShowDoneModal(true)}>+</button>
                    {showDoneModal && (
                        <div className="modal">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Add Task to Done</h5>
                                        
                                        <button type="button" className="close" onClick={() => setShowDoneModal(false)}>
                                            <span>&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={(e) => handleSubmit_Done(e, "Done")}>
                                            <div className="form-group">
                                                <input type="text" className="form-control" name="title3" value={newTask3.title} placeholder="Title" onChange={(e) => setNewTask3({ ...newTask3, title: e.target.value })} />
                                            </div>
                                            <div className="form-group">
                                                <textarea className="form-control" name="description3" value={newTask3.description} placeholder="Description" onChange={(e) => setNewTask3({ ...newTask3, description: e.target.value })}></textarea>
                                            </div>
                                            <button type="submit" className="btn btn-primary">Add Task</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {doneTasks.map(done_task => (
                        <div className="card" key={done_task.id}>
                            <div className="card-body">
                                <h5 className="card-title">{done_task.title}</h5>
                                <p className="card-text">{done_task.description}</p>
                                <button className="btn btn-edit" onClick={() => { edit_Task(done_task.id); setShowEditModal(true); }}>Edit</button>
                                <button className="btn btn-danger" onClick={() => deleteTask(done_task.id)}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
