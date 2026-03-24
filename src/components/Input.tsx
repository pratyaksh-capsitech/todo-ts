import { DownCircleOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import Search from "antd/es/transfer/search";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/slices/todoSlice";
import { Bounce, toast } from "react-toastify";
import TextArea from "antd/es/input/TextArea";

const Input = () => {
  const [text, setText] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const dispatch = useDispatch();
  const handleAdd = (e: any) => {
    e.preventDefault();
    if (text.trim() !== "") {
      dispatch(
        addTodo({
          id: `${Math.floor(Math.random() * 90000) + 10000}`,
          title: text,
          description: description,
          completed: false,
          createdAt: new Date().toISOString(),
        }),
      );
      toast.success("Task added!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else{
      toast.error("todo can't be Empty")
    }
    setText("");
    setDescription("");
  };

  return (
    <>
      <form
        className="w-full flex items-center gap-4 mb-4"
        onSubmit={(e) => handleAdd(e)}
      >
        <div className="w-full flex flex-col gap-4">
          <Search
            placeholder="input search text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Form.Item>
            <TextArea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>
        </div>

        <Button
          variant="filled"
          color="primary"
          icon={<DownCircleOutlined />}
          className="border-2 border-red-500"
          htmlType="submit"
        >
          Add
        </Button>
      </form>
    </>
  );
};

export default Input;
