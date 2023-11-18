import {
  Typography,
  Container,
  Box,
  Card,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import moment from "moment";
import Header from "../conponents/Header";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const filterData = (query: any, data: any) => {
  if (!query) {
    return data;
  } else {
    let filterdData = data.filter((d: any) =>
      d?.content?.toLowerCase().includes(query)
    );
    return filterdData;
  }
};

const Dashboard = () => {
  const [todos, setTodos] = useState<any>();
  const [todo, setTodo] = useState("");
  const [updateTodo, setUPdateTodo] = useState("");
  const [selectedTodo, setSelectedTodo] = useState<any>();

  const [searchQuery, setSearchQuery] = useState("");

  const dataFiltered = filterData(searchQuery, todos);
  console.log({ dataFiltered });

  const [open, setOpen] = useState(false);

  const handleOpen = (todo: any) => {
    setSelectedTodo(todo);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const fetchToDo = async () => {
    try {
      const res = await axios.get("http://localhost:1337/api/todos");
      setTodos(res?.data);
    } catch (error: any) {
      alert(error.response?.data?.message);
    }
  };

  const addToDo = async () => {
    try {
      const res = await axios.post("http://localhost:1337/api/create-todo", {
        content: todo,
      });
      alert("New task added!");
      fetchToDo();
    } catch (error: any) {
      alert(error.response?.data?.message);
    }
  };

  const updateTodoHandler = async () => {
    try {
      const res = await axios.put(
        `http://localhost:1337/api/todo/${selectedTodo?._id}`,
        {
          content: updateTodo,
        }
      );
      if (res) {
        handleClose();
        fetchToDo();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteToDo = async (id: string) => {
    try {
      await axios.delete(`http://localhost:1337/api/todo/${id}`);
      fetchToDo();
    } catch (error: any) {
      alert(error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchToDo();
  }, []);

  return (
    <>
      <Header />
      <Container component="main" maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 4,
            mt: 2,
            width: "100%",
          }}
        >
          <Typography variant="h2" textAlign="center">
            ✅ To Do's
          </Typography>

          <Box sx={{ mt: 2, width: "80%" }}>
            <TextField
              fullWidth
              label="Search TODO..."
              onChange={(e: any) => setSearchQuery(e.target.value)}
            />
          </Box>

          {dataFiltered &&
            dataFiltered.map((data: any) => (
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Card sx={{ p: 3, boxShadow: "3px", mt: 4, width: "60%" }}>
                  <Typography variant="h6" component="p" sx={{ color: "grey" }}>
                    {data?.content}
                  </Typography>
                  <Typography>
                    {moment(data?.createdAt).format("DD-MM-YYYY")}
                  </Typography>
                </Card>

                <Box sx={{ mt: 5 }}>
                  <CloseIcon
                    sx={{ width: 30, height: 30, cursor: "pointer" }}
                    onClick={() => deleteToDo(data._id)}
                  />

                  <BorderColorIcon
                    sx={{ width: 30, height: 30, cursor: "pointer", ml: 1 }}
                    onClick={() => handleOpen(data)}
                  />
                </Box>
              </Box>
            ))}

          <Box sx={{ display: "flex", mt: 10, width: "80%" }}>
            <TextField
              label="Add To Do"
              fullWidth
              onChange={(e: any) => setTodo(e.target.value)}
            />
            <AddIcon
              onClick={addToDo}
              sx={{ ml: 2, width: 40, height: 40, mt: 1, cursor: "pointer" }}
            />
          </Box>
        </Box>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Update TODO
            </Typography>

            <TextField
              fullWidth
              label="content"
              placeholder="content"
              sx={{ mt: 2 }}
              defaultValue={selectedTodo?.content}
              onChange={(e: any) => setUPdateTodo(e.target.value)}
            />

            <Button sx={{ mt: 2 }} onClick={updateTodoHandler}>
              Update
            </Button>
          </Box>
        </Modal>
      </Container>
    </>
  );
};

export default Dashboard;
