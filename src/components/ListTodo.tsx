import { Checkbox, Form, List, Modal } from "antd";
import type { Todo } from "../Interface";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  completedTodo,
  deleteTodo,
  updateTodo,
} from "../redux/slices/todoSlice";
import { useState } from "react";
import Search from "antd/es/transfer/search";
import TextArea from "antd/es/input/TextArea";

const ListTodo = ({ data }: { data: Todo[] }) => {
  const [editTodoId, setEditTodoId] = useState<string | null>(null);
  const [editTodoTitle, setEditTodoTitle] = useState<string>("");
  const [editTodoDesc, setEditTodoDesc] = useState<string>("");
  const [openResponsive, setOpenResponsive] = useState<boolean>(false);

  const dispatch = useDispatch();
  const handleDeleteTodo = (id: string) => {
    console.log(id);
    dispatch(deleteTodo(id));
    return;
  };

  const handleTaskCompleted = (id: string) => {
    dispatch(completedTodo(id));
  };
  const handleEditTodo = (item: Todo) => {
    setEditTodoId(item.id);
    setEditTodoTitle(item.title);
    setEditTodoDesc(item.description);
    setOpenResponsive(true);
  };

  const saveUpdatedData = () => {
    if (!editTodoId ) return;
    dispatch(
      updateTodo({
        id: editTodoId,
        title: editTodoTitle,
        description: editTodoDesc,
        completed: false,
        // editedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      }),
    );
    console.log("form submitted");
  };

  // .sort(
  //           (a, b) =>
  //             new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  //         )
  return (
    <>
      <div className="flex-1 overflow-y-auto over">
        <List
          size="large"
          bordered
          dataSource={data.sort()}
          renderItem={(item) => (
            <>
              <List.Item className="hover:bg-gray-200 flex flex-col w-full">
                <div className={`hover:bg-gray-200 flex justify-between w-full `}>
                  <Checkbox
                    className="font-semibold"
                    checked={item.completed}
                    onChange={() => handleTaskCompleted(item.id)}
                  >
                    <p className={`wrap-break-word ${item.completed? 'line-through' : null}`}>{item.title}</p>
                  </Checkbox>
                  <p className={` ${item.completed? 'line-through' : null} text-gray-500 text-sm`}>
                    {new Date(item.createdAt).toLocaleDateString()} /{" "}
                    {new Date(item.createdAt).toLocaleTimeString()}
                    <DeleteOutlined
                      className="mx-2 cursor-pointer text-lg"
                      onClick={() => handleDeleteTodo(item.id)}
                    />
                    {item.completed? null : (<>
                    <EditOutlined
                      className="cursor-pointer text-lg"
                      onClick={() => handleEditTodo(item)}
                    />
                    </>)}
                    
                  </p>
                </div>
                <div className="w-full px-6">
                  <p className={`${item.completed? 'line-through' : null} text-gray-700 wrap-break-word`}>{item.description}</p>
                  <p className="text-gray-500 text-sm">
                    {item.completed ? "Completed" : "Not completed"}
                  </p>
                </div>
              </List.Item>
            </>
          )}
        />
      </div>
      <Modal
        title="Modal responsive width"
        centered
        open={openResponsive}
        onOk={() => {
          saveUpdatedData();
          setOpenResponsive(false);
        }}
        onCancel={() => setOpenResponsive(false)}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
      >
        <form action="" onSubmit={saveUpdatedData}>
          <div className="w-full flex flex-col gap-4">
            <Search
              placeholder="input search text"
              value={editTodoTitle}
              onChange={(e) => setEditTodoTitle(e.target.value)}
            />
            <Form.Item>
              <TextArea
                rows={3}
                value={editTodoDesc}
                onChange={(e) => setEditTodoDesc(e.target.value)}
              />
            </Form.Item>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ListTodo;
