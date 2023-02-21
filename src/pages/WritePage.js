import { Button, TextField } from "@mui/material";
import { useNoticeSnackbarStatus } from "../components/NoticeSnackbar";
import { useTodosStatus } from "../hooks";

export default function WritePage() {
  const noticeSnackbarStatus =useNoticeSnackbarStatus();
  const todosStatus = useTodosStatus();
  const onSubmit=(e)=>{
    e.preventDefault();

    const form = e.target;

    if(form.regDate.value.length == 0 ){
      alert("날짜를 입력해주세요");
      form.regDate.focus();

      return;
    }
    if(form.content.value.length == 0){
      alert("내용을 입력해주세요");
      form.content.focus();
      
      return;
    }
    const newTodoId = todosStatus.addTodo(form.regDate.value, form.content.value); 

    
    noticeSnackbarStatus.open(`${newTodoId}번 할일이 추가 되었습니다.`);

    form.content.value="";
    form.content.focus();
  }

  
  return (
    <>
      <form className="flex-1 flex p-10 flex-col gap-7" onSubmit={onSubmit}>
        <TextField label="언제 해야 하나요?" focused type="datetime-local" name="regDate"/>
        <TextField label="무엇을 해야하나요?" focused name="content"
        className="flex-1 flex "
        InputProps={{className:" flex-1 flex-col"}} 
        inputProps={{className:" flex-1"}} 
        multiline/>
        <Button type="submit" variant="contained">
          <span><i className="fa-solid fa-pen-to-square"></i></span>
          <span>&nbsp;&nbsp;</span>
          <span>할 일 추가</span>
        </Button>
      </form>
    </>
  );
}
